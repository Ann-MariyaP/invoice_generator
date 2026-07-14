import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import TextBox from "../components/TextBox";
import Button from "../components/button";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
       message.success({
              content: "Login successful!",
              duration: 4,
            });
      navigate("/dashboard");
    } catch (error) {
      message.error({
        content: error.response?.data?.message || "Failed to login!",
        duration: 4,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <TextBox
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={setEmail}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <TextBox
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
            />
          </div>

          <Button type="submit" variant="login_page" className="w-100">
            Login
          </Button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "#1023b5" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
        <p className="text-center">
          <span
            style={{ cursor: "pointer", color: "#636a86", fontSize: "15px" }}
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
