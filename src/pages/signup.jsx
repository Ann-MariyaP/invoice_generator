import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import TextBox from "../components/TextBox";
import Button from "../components/button";
import { message } from "antd";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signupUser(form);
      message.success({
        content: "Signup successful!",
        duration: 4,
      });
      navigate("/login"); // redirect after signup
    } catch (err) {
      console.log(err);
      message.error({
        content: "Failed to sign up",
        duration: 4,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Signup</h3>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Name</label>
            {/* <input
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
            /> */}
            <TextBox
              type="text"
              value={form.name}
              placeholder="Enter your name"
              onChange={(value) => setForm({ ...form, name: value })}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            {/* <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            /> */}
            <TextBox
              type="email"
              value={form.email}
              placeholder="Enter your mail ID"
              onChange={(value) => setForm({ ...form, email: value })}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            {/* <input
              name="password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            /> */}
            <TextBox
              type="password"
              value={form.password}
              placeholder="Enter a strong password"
              onChange={(value) => setForm({ ...form, password: value })}
            />
          </div>

          <Button type="submit" variant="signup_page" className="w-100">
            Signup
          </Button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
