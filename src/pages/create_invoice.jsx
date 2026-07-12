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
  getInvoice,
  updateInvoice,
  getAllSenders,
  getDefaultSender,
  createSender,
  setDefaultSender,
  updateSender,
  deleteSender,
  getInvoicePreview,
} from "../services/api";
import InvoiceDetailsTab from "./tabs/InvoiceDetailsTab";
import ItemsTab from "./tabs/ItemsTab";
import PreviewTab from "./tabs/PreviewTab";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import Button from "../components/button";
import Modal from "../components/modal";
import TextBox from "../components/TextBox";

function CreateInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const today = dayjs();

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

  const [isSaved, setIsSaved] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const handleSaveInvoice = async () => {
    console.log("Invoice payload:", {
      currencyCode: selectedCurrency,
    });
    const invoiceData = {
      invoiceDate: invoiceDate ? invoiceDate.format("YYYY-MM-DD") : null,
      dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : null,
      currencyCode: selectedCurrency,
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
    };

    try {
      let response;

      if (id) {
         console.log("Invoice payload:", invoiceData);
        response = await updateInvoice(id, invoiceData);
         message.success("Invoice updated successfully!");
        setIsSaved(true);
      } else {
        response = await saveInvoice(invoiceData);

        const newInvoiceNumber = response.data.invoiceNumber;
        setInvoiceNumber(newInvoiceNumber);
         message.success({
           content: "Invoice saved successfully!",
           duration: 4, 
         });
         setIsSaved(true);
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  const fetchInvoiceNumber = async () => {
    try {
      const response = await getInvoicePreview();
 console.log("Preview invoice response:", response.data);
      setInvoiceNumber(response.data.invoiceNumber);
    } catch (error) {
      console.error("Error fetching invoice preview:", error);
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
      setSelectedCurrency(invoice.currencyCode ?? "");
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
      if (defaultSeller?._id) {
        const { data } = await updateSender(defaultSeller._id, seller);
          message.success("Your Info updated successfully!");
      } else {
        const { data } = await createSender(seller);
        message.success("Your Info has been added!");
      }
      await loadSellers();
      await loadDefaultSeller();
    } catch (error) {
      console.error("Error saving seller:", error);
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
        localStorage.removeItem("token");
        navigate("/login");
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

        {/* RIGHT SIDE */}
        <div className="ms-auto d-flex align-items-center gap-3 flex-shrink-0">
          {!isLoggedIn ? (
            <>
              {/* Desktop */}
              <div className="d-none d-md-flex align-items-center gap-3">
                <span className="text-muted small">Continue as Guest</span>

                <Button onClick={() => navigate("/login")} variant="login">
                  Login
                </Button>

                <Button onClick={() => navigate("/signup")} variant="signup">
                  Signup
                </Button>
              </div>

              {/* Mobile */}
              <div className="d-md-none">
                <Dropdown
                  menu={{
                    items: [
                      { key: "/login", label: "Login" },
                      { key: "/signup", label: "Signup" },
                    ],
                    onClick: ({ key }) => navigate(key),
                  }}
                >
                  <span>
                    <Button variant="menu_btn">
                      <HiOutlineMenu />
                    </Button>
                  </span>
                </Dropdown>
              </div>
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
              <div>
                <span className="d-none d-sm-flex">
                  <Button variant="menu_btn">
                    Menu <HiOutlineMenu />
                  </Button>
                </span>
                <span className="d-sm-none">
                  <Button variant="menu_btn">
                    <HiOutlineMenu />
                  </Button>
                </span>
              </div>
            </Dropdown>
          )}
        </div>
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
          defaultSeller={defaultSeller}
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
          currencies={currencies}
          selectedCurrency={selectedCurrency}
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
          isLoggedIn={isLoggedIn}
          isSaved={isSaved}
        />
      )}
    </div>
  );
}

export default CreateInvoice;
