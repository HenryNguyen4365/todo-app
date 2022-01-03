import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Failed to create a new account");
    } else {
      try {
        await signup(email, password);
        navigate("/");
      } catch (error) {
        alert("Failed to create an account. Try again!");
      }
    }
  };
  return (
    <div className="signup-template">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Register</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <label style={{ marginBottom: "3px" }}>Email:</label>
            <input
              type="text"
              className="signup-email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <label style={{ marginBottom: "3px" }}>Password:</label>
            <input
              type="password"
              className="signup-password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <label style={{ marginBottom: "3px" }}>Confirm Password:</label>
            <input
              type="password"
              className="sigup-password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            Sign up
          </button>
        </div>
      </form>
      <div
        style={{
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
