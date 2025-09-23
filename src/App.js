import React, { useState, useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import InvoiceDetailsTab from "./components/InvoiceDetailsTab";
import ItemsTab from "./components/ItemsTab";
import PreviewTab from "./components/PreviewTab";

function App() {
  const [activeTab, setActiveTab] = useState("details");

  const [invoiceNumber, setInvoiceNumber] = useState("INV-2025-001");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [clientName, setclientName] = useState("");
  const [clientEmail, setclientEmail] = useState("");
  const [clientPhone, setclientPhone] = useState("");
  const [clientAddress, setclientAddress] = useState("");

  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  
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

  return (
    <div className="container-fluid py-2">
      <div className="p-4 rounded shadow">
        <h2 className="text-primary">Invoice Generator Pro</h2>
        <p>Create professional invoices in minutes</p>

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
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            clientName={clientName}
            setclientName={setclientName}
            clientEmail={clientEmail}
            setclientEmail={setclientEmail}
            clientPhone={clientPhone}
            setclientPhone={setclientPhone}
            clientAddress={clientAddress}
            setclientAddress={setclientAddress}
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
            name={name}
            email={email}
            phone={phone}
            address={address}
            clientName={clientName}
            clientEmail={clientEmail}
            clientPhone={clientPhone}
            clientAddress={clientAddress}
            items={items}
            notes={notes}
            taxRate={taxRate}
            discount={discount}
          />
        )}
      </div>
    </div>
  );
}

export default App;
