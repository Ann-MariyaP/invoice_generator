import "./dashboard.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import InvoiceList from "../components/invoiceList";
import ShortPreview from "../components/shortPreview";
import DashboardNavbar from "../components/dashboardNavbar";
import MobilePreviewModal from "../components/mobilePreviewModal";
import { getAllInvoices, deleteInvoice, getMe } from "../services/api";

export default function Dashboard({ userName, onLogout, onUpdate }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
 const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
 const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const fetchInvoices = async () => {
    try {
      const response = await getAllInvoices();
      const invoices = Array.isArray(response.data)
        ? response.data
        : response.data?.invoices || [];
      setInvoices(invoices); 

      if (invoices.length > 0) {
        setSelectedInvoice(invoices[0]);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setInvoices([]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchInvoices();
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const userInitials = (user?.name || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  // setSelectedInvoiceId(invoice._id);
    if (window.innerWidth < 992) {
      setShowMobilePreview(true);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/create_invoice/${id}`);
  };

  // const handleDelete = async (id, e) => {
  //   e.stopPropagation(); // important (prevents row click)

  //   try {
  //     await deleteInvoice(id);
  //     // remove from UI
  //     setInvoices((prev) => prev.filter((inv) => inv._id !== id));
  //   } catch (err) {
  //     console.log(err);
  //     alert("Delete failed");
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting:", id);

      await deleteInvoice(id);
      setInvoices((prev) => prev.filter((inv) => inv._id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    } finally {
      setDeleteModal(false);
      setSelectedInvoiceId(null);
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return "badge-paid";
      case "Draft":
        return "badge-draft";
      case "Overdue":
        return "badge-overdue";
      default:
        return "badge-default";
    }
  };

  return (
    <div className="dashboard">
      <DashboardNavbar
        userName={user?.name}
        userInitials={userInitials}
        onLogout={onLogout}
      />
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center flex-nowrap gap-2">
          <div>
            <h2 className="dashboard-header mb-0">
              Welcome back,
              <span> {user?.name.split(" ")[0]}</span>
            </h2>
          </div>

          <Button
            onClick={() => navigate("/create_invoice")}
            variant="create_invoice_btn"
          >
            Create Invoice
          </Button>
        </div>

        <div className="row g-4">
          <div className="col-lg-7 col-md-7">
            <InvoiceList
              invoices={invoices}
              selectedInvoice={selectedInvoice}
              setSelectedInvoice={setSelectedInvoice}
              handleSelectInvoice={handleSelectInvoice}
              handleDelete={handleDelete}
              getStatusBadge={getStatusBadge}
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              selectedInvoiceId={selectedInvoiceId}
              setSelectedInvoiceId={setSelectedInvoiceId}
            />
          </div>

          <div className="col-lg-5 col-md-5 desktop-preview mt-4 pt-2">
            <ShortPreview invoice={selectedInvoice} onUpdate={handleUpdate} />
          </div>
        </div>
      </div>

      {showMobilePreview && (
        <MobilePreviewModal
          invoice={selectedInvoice}
          onClose={() => setShowMobilePreview(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
