import React from "react";
import "./Button.scss";

const Button = ({
  type = "button",
  children,
  variant = "primary",
  className = "",
  onClick,
}) => {
  const variants = {
    primary: "primary-btn",
    login: "btn-login",
    login_page: "btn-login-page",
    signup_page: "btn-signup-page",
    signup: "btn-signup",
    create_invoice_btn: "create-invoice-btn",
    save_seller: "save_seller",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-btn ${variants[variant] || ""} ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
