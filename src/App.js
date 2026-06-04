import React, { useState, useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LiaFileInvoiceSolid,
  LiaFileInvoiceDollarSolid,
} from "react-icons/lia";
import { saveInvoice,getNextInvoiceNumber, updateInvoice, getAllInvoices } from "./services/api";
import InvoiceDetailsTab from "./components/InvoiceDetailsTab";
import ItemsTab from "./components/ItemsTab";
import PreviewTab from "./components/PreviewTab";

function App() {
  const [activeTab, setActiveTab] = useState("details");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
 const [seller, setSeller] = useState({
   name: "",
   email: "",
   phone: "",
   address: "",
 });

  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleSaveInvoice = async () => {
    console.log("SAVE CLICKED");
    const invoiceData = {
      invoiceNumber,
      invoiceDate,
      dueDate,

      seller: {
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
      },

      client: {
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
      },

      items,
      notes,
      taxRate,
      discount,
      selectedCurrency,
    };

    try {
      console.log("Sending invoice:", invoiceData);
      const response = await saveInvoice(invoiceData);
console.log("Response:", response);
      // invoice number from backend
     const newInvoiceNumber = response.data.invoiceNumber;

     setInvoiceNumber(newInvoiceNumber);

      console.log("Invoice saved:", response.data);

      alert("Invoice saved successfully!");
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/currencies.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCurrencies(data);

        // 👇 set first currency as default
        if (data.length > 0) {
          setSelectedCurrency(data[0].code);
        }
      })
      .catch((err) => {
        console.error("Failed to load currencies:", err);
      });
  }, []);

  useEffect(() => {
    fetchInvoiceNumber();
  }, []);

  const fetchInvoiceNumber = async () => {
    try {
      const response = await getNextInvoiceNumber();

      setInvoiceNumber(response.data.invoiceNumber);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid py-2">
      <div className="px-2 py-3 rounded shadow">
        <div className="row">
          <div className="col-auto">
            <LiaFileInvoiceDollarSolid className="logo" />
          </div>
          <div className="col">
            <h3 className="maingHeading">Invoice Generator</h3>
            <p className="slogan">Create professional invoices in minutes</p>
          </div>
        </div>

        <ul className="nav mb-4">
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
            setCurrencies={setCurrencies}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
            dueDate={dueDate}
            setDueDate={setDueDate}
            seller={seller}
            setSeller={setSeller}
            client={client}
            setClient={setClient}
            setActiveTab={setActiveTab}
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
    </div>
  );
}

export default App;
