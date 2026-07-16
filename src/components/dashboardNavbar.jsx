import { useState } from "react";
import CustomModal from "./modal";
import { Dropdown } from "antd";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { HiLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function DashboardNavbar({
  userName,
  userInitials,
  handleDeleteAccount,
  deleteAccountModal,
  setDeleteAccountModal,
  }) {
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogoutOpen(false);
    navigate("/");
  };

  const items = [
    {
      key: "logout",
      label: (
        <span onClick={() => setLogoutOpen(true)}>
          <HiLogout />{" "}
          Logout
        </span>
      ),
    },
    {
      key: "delete",
      danger: true,
      label: <span onClick={() => setDeleteAccountModal(true)}>Delete Account</span>,
    },
  ];
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
            <Dropdown menu={{ items }} trigger={["click"]}>
              <div className="user-avatar" style={{ cursor: "pointer" }}>
                {userInitials || "U"}
              </div>
            </Dropdown>
            <span className="user-name">{userName || "User"}</span>
          </div>
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
          <CustomModal
            open={deleteAccountModal}
            title="Delete Account"
            onOk={handleDeleteAccount}
            onCancel={() => setDeleteAccountModal(false)}
            okText="Delete"
            okButtonProps={{ danger: true }}
          >
            <p>
              Are you sure you want to permanently delete your account and all
              invoices? This action cannot be undone.
            </p>
          </CustomModal>
        </div>
      </div>
    </nav>
  );
}
