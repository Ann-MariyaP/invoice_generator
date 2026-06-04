import React from "react";
import "./design.scss";

const InvoiceDetailsTab = ({
  invoiceNumber,
  setInvoiceNumber,
  currencies,
  setCurrencies,
  selectedCurrency,
  setSelectedCurrency,
  invoiceDate,
  setInvoiceDate,
  dueDate,
  setDueDate,
  seller,
  setSeller,
  client,
  setClient,
  setActiveTab,
}) => {
  return (
    <div>
      <h5 className="mb-3 labels">Invoice Details</h5>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="labels">Invoice Number</label>
          <input
            type="text"
            className="form-control"
            value={invoiceNumber}
            readOnly
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Currency</label>

          <select
            className="form-control"
            value={selectedCurrency?.code || ""}
            onChange={(e) => {
              const code = e.target.value;
              const currency = currencies.find((c) => c.code === code);
              setSelectedCurrency(currency || null);
            }}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="labels">Invoice Date</label>
          <input
            type="date"
            className="form-control"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            min={invoiceDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <hr />

      <h6 className="mb-3 labels">Your Information </h6>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="labels">Name/Bussiness Name</label>
          <input
            type="text"
            className="form-control"
            value={seller.name}
            onChange={(e) => setSeller({ ...seller, name: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Email</label>
          <input
            type="email"
            className="form-control"
            value={seller.email}
            onChange={(e) => setSeller({ ...seller, email: e.target.value })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="labels">Phone</label>
          <input
            type="tel"
            className="form-control"
            value={seller.phone}
            onChange={(e) => setSeller({ ...seller, phone: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Address</label>
          <textarea
            className="form-control"
            rows="3"
            value={seller.address}
            onChange={(e) => setSeller({ ...seller, address: e.target.value })}
          ></textarea>
        </div>
      </div>

      <hr />

      <h6 className="mb-3 labels">Client Information </h6>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="labels">Client Name</label>
          <input
            type="text"
            className="form-control"
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Email</label>
          <input
            type="email"
            className="form-control"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="labels">Phone</label>
          <input
            type="tel"
            className="form-control"
            value={client.phone}
            onChange={(e) => setClient({ ...client, phone: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="labels">Address</label>
          <textarea
            className="form-control"
            rows="3"
            value={client.address}
            onChange={(e) => setClient({ ...client, address: e.target.value })}
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
