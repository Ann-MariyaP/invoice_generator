import "./create_invoice.scss";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import { currencies } from "../data/currencies";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { HiMenu, HiX, HiOutlineMenu, HiCheckCircle } from "react-icons/hi";
import {
  saveInvoice,
  getNextInvoiceNumber,
  getInvoice,
  updateInvoice,
  getAllSenders,
  getDefaultSender,
  createSender,
  setDefaultSender,
  updateSender,
  deleteSender,
} from "../services/api";
import InvoiceDetailsTab from "./tabs/InvoiceDetailsTab";
import ItemsTab from "./tabs/ItemsTab";
import PreviewTab from "./tabs/PreviewTab";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Modal from "../components/modal";

function CreateInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("details");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(dayjs(new Date()));
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState("Draft");
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("CAD");
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");
  const handleSaveInvoice = async () => {
    const invoiceData = {
      invoiceDate: invoiceDate?.format("DD-MM-YYYY"),
      dueDate: dueDate?.format("YYYY-MM-DD"),
      status,
      sender: {
        name: seller?.name || "",
        email: seller?.email || "",
        phone: seller?.phone || "",
        address: {
          street: seller?.address?.street || "",
          city: seller?.address?.city || "",
          state: seller?.address?.state || "",
          postalCode: seller?.address?.postalCode || "",
          country: seller?.address?.country || "",
        },
      },
      client: {
        name: client?.name || "",
        email: client?.email || "",
        phone: client?.phone || "",
        address: {
          street: client?.address?.street || "",
          city: client?.address?.city || "",
          state: client?.address?.state || "",
          postalCode: client?.address?.postalCode || "",
          country: client?.address?.country || "",
        },
      },
      items,
      notes,
      taxRate,
      discount,
      currencyCode: selectedCurrency,
    };

    if (!id) {
      invoiceData.invoiceNumber = invoiceNumber;
    }

    try {
      let response;

      if (id) {
        response = await updateInvoice(id, invoiceData);
        alert("Invoice updated successfully!");
      } else {
        response = await saveInvoice(invoiceData);

        const newInvoiceNumber = response.data.invoiceNumber;
        setInvoiceNumber(newInvoiceNumber);
        alert("Invoice saved successfully!");
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  const fetchInvoiceNumber = async () => {
    try {
      const response = await getNextInvoiceNumber();

      setInvoiceNumber(response.data.invoiceNumber);
    } catch (error) {
      console.error(error);
    }
  };
  // update invoice

  const fetchInvoice = async () => {
    try {
      const { data: invoice } = await getInvoice(id);
      console.log("INVOICE DATA:", invoice.client);

      if (!invoice) return;
      setInvoiceNumber(invoice.invoiceNumber ?? "");
      setInvoiceDate(invoice.invoiceDate ? dayjs(invoice.invoiceDate) : null);
      setDueDate(invoice.dueDate ? dayjs(invoice.dueDate) : null);
      setStatus(invoice.status ?? "Draft");
      setSeller(invoice.sender ?? {});
      setClient(invoice.client ?? {});
      setItems(invoice.items ?? []);
      setNotes(invoice.additionalNotes ?? "");
      setTaxRate(invoice.taxRate ?? 0);
      setDiscount(invoice.discount ?? 0);
      setSelectedCurrency(invoice.currency ?? "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInvoice();
    } else {
      fetchInvoiceNumber();
      setInvoiceDate(dayjs());
    }
  }, [id]);

  const handleCreateSeller = async () => {
    try {
      const { data } = await createSender(seller);

      console.log("Seller created:", data);

      await loadSellers();
      await loadDefaultSeller();
    } catch (error) {
      console.error("Error creating seller:", error);
    }
  };

  const [sellers, setSellers] = useState([]);
  const [defaultSeller, setDefaultSeller] = useState(null);

  const loadSellers = async () => {
    try {
      const res = await getAllSenders();
      const sellersArray = res?.data?.data || res?.data || [];
      setSellers(sellersArray);
      return sellersArray;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

   const handleSetDefault = async (id) => {
     try {
       await setDefaultSender(id);
       await loadSellers(); // Refresh isDefault flags
       await loadDefaultSeller();
     } catch (error) {
       console.error(error);
     }
   };

   const [selectedSellerId, setSelectedSellerId] = useState(null);
   const handleSelectSeller = (sellerId) => {
     const selected = sellers.find((s) => s._id === sellerId);
     if (selected) {
       setSelectedSellerId(sellerId); // dropdown control
       setSeller(selected);
     }
   };

  const loadDefaultSeller = async () => {
    try {
      const { data } = await getDefaultSender();
      console.log("Default seller:", data);
      setDefaultSeller(data);
      if (data) {
        setSeller(data); // Auto-fill invoice form
      }
    } catch (error) {
      console.error("Error loading default seller:", error);
    }
  };

  useEffect(() => {
    loadSellers();
    loadDefaultSeller();
  }, []);

  const handleMenuClick = async ({ key }) => {
    switch (key) {
      case "dashboard":
        navigate("/dashboard");
        break;

      case "refresh":
        refreshData();
        // loadSellers();
        // loadDefaultSeller();
        break;

      case "logout":
        try {
          await logoutUser();
        } finally {
          localStorage.removeItem("token");
          navigate("/login");
        }
        break;

      default:
        if (key.startsWith("seller-")) {
          const sellerId = key.replace("seller-", "");
          handleSelectSeller(sellerId);
          await handleSetDefault(sellerId);
        }
        break;
    }
  };

  const menuItems = [
    {
      key: "dashboard",
      label: "🏠 Dashboard",
    },
    {
      type: "divider",
    },
    {
      key: "refresh",
      label: "🔄 Refresh Data",
    },
    {
      type: "divider",
    },
    {
      key: "loadSeller",
      label: "👤 Default Information",
      children: (sellers || []).map((s) => ({
        key: `seller-${s._id}`,
        label: (
          <span>
            {s.name}{" "}
            {s.isDefault && (
              <HiCheckCircle style={{ color: "#5654b1", fontSize: "20px" }} />
            )}
          </span>
        ),
      })),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: <span style={{ color: "red" }}>🚪 Logout</span>,
    },
  ];

  return (
    <div className="container-fluid mb-3">
      <div className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm px-3">
        {/* LEFT SIDE */}
        <div className="d-flex align-items-center gap-2 flex-shrink-1">
          <LiaFileInvoiceDollarSolid className="logo" />

          <div className="d-flex flex-column">
            <h3 className="nav-title">Invoice Generator</h3>
            <p className="slogan">Create professional invoices in minutes</p>
          </div>
        </div>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="ms-auto d-none d-md-flex align-items-center gap-3 flex-shrink-0">
          {!isLoggedIn ? (
            <>
              <span className="text-muted small">Continue as Guest</span>

              <button className="btn btn-outline-secondary btn-sm">
                Login
              </button>

              <button
                className="btn btn-primary btn-sm"
                style={{ backgroundColor: "#1e3a8a", borderColor: "#1e3a8a" }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <Dropdown
              menu={{
                items: menuItems,
                onClick: handleMenuClick,
                selectable: true,
                selectedKeys: selectedSellerId
                  ? [`seller-${selectedSellerId}`]
                  : [],
              }}
              trigger={["click"]}
            >
              <Button>
                Menu <HiOutlineMenu />
              </Button>
            </Dropdown>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="d-md-none ms-auto">
          <button
            className="btn btn-link text-dark p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="d-md-none w-100 border-top mt-2 pt-3">
            {!isLoggedIn ? (
              <div className="d-grid gap-2">
                <button className="btn btn-outline-secondary w-100">
                  Login
                </button>

                <button
                  className="btn btn-primary w-100"
                  style={{ backgroundColor: "#1e3a8a", borderColor: "#1e3a8a" }}
                >
                  Sign Up
                </button>

                <div className="text-center text-muted small pt-2">
                  Running in Guest Mode
                </div>
              </div>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            )}
          </div>
        )}
      </div>

      <ul className="nav mb-3" style={{ paddingTop: "89px" }}>
        <li className="nav-item">
          <button
            className={`btn ${
              activeTab === "details" ? "selected_tab" : "unselected_tab"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Invoice Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`btn ${
              activeTab === "items" ? "selected_tab" : "unselected_tab"
            }`}
            onClick={() => setActiveTab("items")}
          >
            Items & Pricing
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`btn ${
              activeTab === "preview" ? "selected_tab" : "unselected_tab"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
        </li>
      </ul>

      {activeTab === "details" && (
        <InvoiceDetailsTab
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
          currencies={currencies}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          invoiceDate={invoiceDate}
          setInvoiceDate={setInvoiceDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          status={status}
          setStatus={setStatus}
          seller={seller}
          setSeller={setSeller}
          client={client}
          setClient={setClient}
          setActiveTab={setActiveTab}
          onSaveSeller={handleCreateSeller}
        />
      )}

      {activeTab === "items" && (
        <ItemsTab
          items={items}
          setItems={setItems}
          notes={notes}
          setNotes={setNotes}
          taxRate={taxRate}
          setTaxRate={setTaxRate}
          discount={discount}
          setDiscount={setDiscount}
          setActiveTab={setActiveTab}
        />
      )}

      {activeTab === "preview" && (
        <PreviewTab
          invoiceNumber={invoiceNumber}
          currencies={currencies}
          selectedCurrency={selectedCurrency}
          invoiceDate={invoiceDate}
          dueDate={dueDate}
          seller={seller}
          client={client}
          items={items}
          notes={notes}
          taxRate={taxRate}
          discount={discount}
          handleSaveInvoice={handleSaveInvoice}
        />
      )}
    </div>
  );
}

export default CreateInvoice;
