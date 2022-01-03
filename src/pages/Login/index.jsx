import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";

const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      alert("Your email or password is not correct. Try again!");
    }
  };
  return (
    <div className="signin-template">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Login</h1>
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
              className="signin-email"
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
            }}
          >
            <label style={{ marginBottom: "3px" }}>Password:</label>
            <input
              type="password"
              className="signin-password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            Login
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
          Need an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
