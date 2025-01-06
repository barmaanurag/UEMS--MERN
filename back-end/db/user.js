const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // To hash passwords

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,  // Trim spaces
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  // Ensures email is stored in lowercase
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],  // Email validation regex
    },
    university: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }  // Automatically adds 'createdAt' and 'updatedAt' fields
);

// Pre-save hook to hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {  // Only hash if password has been modified
    const salt = await bcrypt.genSalt(10);  // Generate salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
  }
  next();
});

// Method to check if entered password matches the hashed password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);  // Compare entered password with hashed password
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
