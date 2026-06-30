import React from "react";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import "./home.scss";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Button from "../components/button.jsx";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaFileInvoiceDollar, FaUser, FaUserPlus } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".hero-icon", {
        scale: 0,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          ".hero-title-line1",
          {
            x: -100,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.3",
        )
        .from(
          ".hero-title-line2",
          {
            x: 100,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          ".hero-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3",
        )
        .from(
          ".hero-buttons",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-3 mt-1">
        <div className="container-fluid">
          {/* Logo */}
          <div className="d-flex align-items-center gap-2 flex-shrink-1">
            <LiaFileInvoiceDollarSolid className="logo" />

            <div className="d-flex flex-column">
              <h3 className="nav-title">Invoice Generator</h3>
              <p className="slogan">Create professional invoices in minutes</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="ms-auto d-none d-lg-flex gap-3 align-items-center">
            <Button onClick={() => navigate("/login")} variant="login">
              Login
            </Button>
            <Button onClick={() => navigate("/signup")} variant="signup">
              Signup
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container py-4">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 hero-content">
              {/* Icon */}
              <div className="hero-icon mx-auto mb-4">
                <FaFileInvoiceDollar size={52} />
              </div>

              {/* Title */}
              <h1 className="hero-title fw-bold display-2 mb-3">
                <span className="hero-title-line1 d-block">
                  Create Invoices
                </span>
                <span className="hero-title-line2 d-block">Easy and Fast</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle fs-5 mb-4">
                No signup required — download instantly as PDF. Login to save
                and manage invoices.
              </p>

              {/* CTA */}
              <div className="hero-buttons">
                <Link
                  to="/create_invoice"
                  className="btn btn-gradient btn-lg px-5 py-3 mb-3"
                >
                  <FaFileInvoiceDollar className="me-2" />
                  Generate Invoice
                </Link>

                <p className="hero-note text-muted small">
                  No login required • Instant PDF download
                </p>

                {/* secondary actions */}
                <div className="hero-mobile-auth d-flex gap-3 mt-4 px-5  d-lg-none">
                  <Button
                    onClick={() => navigate("/login")}
                    variant="login"
                    className="w-100 py-2"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/signup")}
                    variant="signup"
                    className="w-100 py-2"
                  >
                    Signup
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
