import React from "react";
import "./design.scss";

const InvoiceDetailsTab = ({
  invoiceNumber,
  setInvoiceNumber,
  currency,
  setCurrency,
  invoiceDate,
  setInvoiceDate,
  dueDate,
  setDueDate,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  clientName,
  setclientName,
  clientEmail,
  setclientEmail,
  clientPhone,
  setclientPhone,
  clientAddress,
  setclientAddress,
  setActiveTab,
}) => {
  return (
    <div>
      <h5 className="mb-3">Invoice Details</h5>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Invoice Number</label>
          <input
            type="text"
            className="form-control"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label>Currency</label>
          <select
            className="form-control"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="CAD ($)" selected>CAD ($)</option>
            <option value="EUR (€)">EUR (€)</option>
            <option value="INR (₹)">INR (₹)</option>
            <option value="USD ($)">USD ($)</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label>Invoice Date</label>
          <input
            type="date"
            className="form-control"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label>Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <hr />

      <h6 className="mb-3">Your Information </h6>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Name/Bussiness Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Phone</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label>Address</label>
          <textarea
            className="form-control"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
      </div>

      <hr />

      <h6 className="mb-3">Client Information </h6>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Client Name</label>
          <input
            type="text"
            className="form-control"
            value={clientName}
            onChange={(e) => setclientName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={clientEmail}
            onChange={(e) => setclientEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Phone</label>
          <input
            type="tel"
            className="form-control"
            value={clientPhone}
            onChange={(e) => setclientPhone(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label>Address</label>
          <textarea
            className="form-control"
            rows="3"
            value={clientAddress}
            onChange={(e) => setclientAddress(e.target.value)}
          ></textarea>
        </div>
      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={() => setActiveTab("items")}
      >
        Continue to Items
      </button>
    </div>
  );
};

export default InvoiceDetailsTab;
