import { useState } from "react";
import CustomModal from "./modal";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { HiLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function DashboardNavbar({ userName, userInitials }) {
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogoutOpen(false);
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand bg-white shadow-sm px-2 py-2 border-bottom">
      <div className="container-fluid justify-content-between">
        <div className="d-flex align-items-center gap-2 flex-shrink-1">
          <LiaFileInvoiceDollarSolid className="logo" />
          <div className="d-flex flex-column">
            <h3 className="nav-title">Invoice Generator</h3>
            <p className="slogan">Create professional invoices in minutes</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <div className="user-avatar">{userInitials || "U"}</div>
            <span className="user-name">{userName || "User"}</span>
          </div>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setLogoutOpen(true)}
          >
            <HiLogout />
            <span className="ms-1 d-none d-sm-inline">Logout</span>
          </button>
          <CustomModal
            open={logoutOpen}
            title="Confirm Logout"
            onCancel={() => setLogoutOpen(false)}
            onOk={handleLogout}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <p>Are you sure you want to log out?</p>
          </CustomModal>
        </div>
      </div>
    </nav>
  );
}
