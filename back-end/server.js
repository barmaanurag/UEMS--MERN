const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');
const cors = require('cors');

// Middleware for parsing JSON data
app.use(express.json());
//enable cors
app.use(cors())
// Registration route
app.post('/register', async (req, res) => {
    const { username, password, name, email, university } = req.body;

    // Check if all required fields are provided
    if (!username || !password || !name || !email || !university) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = new User({ username, password: hashedPassword, name, email, university });
        await user.save();

        res.status(201).json({ message: 'Registration Successful' });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ error: 'Unable to Register', details: err.message });
    }
});



connectDB();
app.listen(port, () => {
    console.log('Server is listening on Port 8000');
});


//login
app.post('/login',async(req,res)=>{
    try{
        const{username,password} = req.body;
        const user = await User.findOne({username});
        

        if(!user){
            return res.status(401).json({error:'Invalid username or password'});
        }
        if(user.password !== password){
            return res.status(401).json({error:'Invalid username or password'});
        }
        res.status(200).json({message:'Login successful'})
    }
    catch(error){
        res.status(500).json({error:'Login failed'})
    }
})