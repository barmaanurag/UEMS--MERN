import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mosaicBackground from "../assests/mosaic1.jpg";
import studentIcon from "../assests/student.gif"; // Import student icon
import teacherGif from "../assests/teacher.gif"; // Import teacher gif
import adminGif from "../assests/admin.gif"; // Import admin gif

const ChooseUser = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleCardClick = (role) => {
    if (role === "Admin") {
      navigate("/register");
    } else if (role === "Student") {
      navigate("/student-login");
    } else if (role === "Teacher") {
      navigate("/faculty-login");
    }
  };

  return (
    <div style={{ ...styles.chooseUserContainer, backgroundImage: `url(${mosaicBackground})` }}>
      {["Admin", "Student", "Teacher"].map((role, index) => (
        <div
          key={role}
          style={{
            ...styles.userCard,
            boxShadow:
              hoveredCard === index
                ? "0 12px 20px rgba(0, 0, 0, 0.3)" // Raised shadow on hover
                : "0 4px 6px rgba(0, 0, 0, 0.1)",
            transform: hoveredCard === index ? "translateY(-5px)" : "translateY(0)", // Lift on hover
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCardClick(role)}
        >
          <img
            src={
              role === "Admin"
                ? adminGif
                : role === "Student"
                ? studentIcon
                : teacherGif
            }
            alt={`${role} Logo`}
            style={{
              width: "80px",
              height: "80px",
              marginBottom: "10px",
              transition: "transform 0.3s",
              transform: hoveredCard === index ? "scale(1.2)" : "scale(1)",
            }}
          />
          <h2 style={styles.cardTitle}>{role}</h2>
          <p style={styles.cardText}>
            {role === "Admin"
              ? "Login as an administrator to access the dashboard to manage app data."
              : role === "Student"
              ? "Login as a student to pay fees, register for exams, download admit card and view results."
              : "Login as a teacher to create question papers, assign marks and track student progress."}
          </p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  chooseUserContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  userCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    width: "300px",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  cardTitle: {
    fontSize: "24px",
    margin: "10px 0",
  },
  cardText: {
    fontSize: "16px",
  },
};

export default ChooseUser;
