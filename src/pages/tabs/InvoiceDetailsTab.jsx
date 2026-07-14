import React from "react";
import "./design.scss";
import TextBox from "../../components/TextBox";
import Button from "../../components/button";
import { SiNamecheap } from "react-icons/si";

const InvoiceDetailsTab = ({
  isLoggedIn,
  invoiceNumber,
  setInvoiceNumber,
  currencies,
  selectedCurrency,
  setSelectedCurrency,
  invoiceDate,
  setInvoiceDate,
  dueDate,
  setDueDate,
  seller,
  setSeller,
  defaultSeller,
  client,
  setClient,
  setActiveTab,
  status,
  setStatus,
  onSaveSeller,
}) => {
  return (
    <div className="ms-1">
      <h5 className="mb-3 labels">Invoice Details</h5>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="labels">Invoice Number</label>
          <TextBox value={invoiceNumber} readOnly />
        </div>
        <div className="col-md-6">
          <label className="labels">Currency</label>
          <TextBox
            type="select"
            value={selectedCurrency}
            onChange={setSelectedCurrency}
            options={currencies.map((currency) => ({
              value: currency.code,
              label: `${currency.code} ${currency.symbol} - ${currency.name}`,
            }))}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="labels">Invoice Date</label>
          <TextBox type="date" value={invoiceDate} onChange={setInvoiceDate} />
        </div>
        <div className="col-md-4">
          <label className="labels">Due Date</label>
          <TextBox
            type="date"
            value={dueDate}
            onChange={setDueDate}
            disablePastDates
          />
        </div>
        <div className="col-md-4">
          <label className="labels">Status</label>
          <TextBox
            type="select"
            value={status}
            onChange={setStatus}
            placeholder="Select Status"
            options={[
              { value: "Draft", label: "Draft" },
              { value: "Pending", label: "Pending" },
              { value: "Paid", label: "Paid" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
          />
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="labels">Your Information </h6>
        {isLoggedIn && (
          <Button type="submit" variant="save_seller" onClick={onSaveSeller}>
            {defaultSeller?._id ? "Update your Info" : "Add your Info"}
          </Button>
        )}
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="labels">Name/Business Name</label>
          <TextBox
            type="text"
            placeholder="Enter your name or company name"
            value={seller.name}
            onChange={(value) => setSeller({ ...seller, name: value })}
          />
        </div>
        <div className="col-md-4">
          <label className="labels">Email</label>
          <TextBox
            type="email"
            value={seller.email}
            placeholder="Enter your email"
            onChange={(value) => setSeller({ ...seller, email: value })}
          />
        </div>
        <div className="col-md-4">
          <label className="labels">Phone</label>
          <TextBox
            type="tel"
            placeholder="Enter your phone number"
            value={seller.phone}
            onChange={(value) => setSeller({ ...seller, phone: value })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <p className="mb-1 labels" style={{ fontWeight: "500" }}>
          Your Address
        </p>
        <div className="col-md-4">
          <label className="labels">Street</label>
          <TextBox
            type="text"
            placeholder="Enter  your street"
            value={seller.address.street}
            onChange={(value) =>
              setSeller((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  street: value,
                },
              }))
            }
          />
        </div>
        <div className="col-md-4">
          <label className="labels">City</label>
          <TextBox
            type="text"
            placeholder="Enter your city"
            value={seller.address.city}
            onChange={(value) =>
              setSeller((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  city: value,
                },
              }))
            }
          />
        </div>
        <div className="col-md-4">
          <label className="labels">State/Province</label>
          <TextBox
            type="text"
            placeholder="Enter your state or province"
            value={seller.address.state}
            onChange={(value) =>
              setSeller((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  state: value,
                },
              }))
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="labels">Postal Code</label>
          <TextBox
            type="text"
            placeholder="Enter postal code (eg: X1X 1X1)"
            value={seller.address.postalCode}
            onChange={(value) =>
              setSeller((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  postalCode: value,
                },
              }))
            }
          />
        </div>
        <div className="col-md-4">
          <label className="labels">Country</label>
          <TextBox
            type="text"
            placeholder="Enter your country"
            value={seller.address.country}
            onChange={(value) =>
              setSeller((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  country: value,
                },
              }))
            }
          />
        </div>
      </div>

      <hr />

      <h6 className="mb-3 labels">Client Information </h6>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="labels">Client Name</label>
          <TextBox
            type="text"
            placeholder="Enter client name or company name"
            value={client.name}
            onChange={(value) => setClient({ ...client, name: value })}
          />
        </div>
        <div className="col-md-4">
          <label className="labels">Email</label>
          <TextBox
            type="email"
            placeholder="Enter client mail ID"
            value={client.email}
            onChange={(value) => setClient({ ...client, email: value })}
          />
        </div>
        <div className="col-md-4">
          <label className="labels">Phone</label>
          <TextBox
            type="tel"
            placeholder="Enter client phone number"
            value={client.phone}
            onChange={(value) => setClient({ ...client, phone: value })}
          />
        </div>
      </div>

      <div className="row mb-3">
        <p className="mb-1 labels" style={{ fontWeight: "500" }}>
          Client Address{" "}
        </p>
        <div className="col-md-4">
          <label className="labels">Street</label>
          <TextBox
            type="text"
            value={client.address.street}
            onChange={(value) =>
              setClient((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  street: value,
                },
              }))
            }
          />
        </div>
        <div className="col-md-4">
          <label className="labels">City</label>
          <TextBox
            type="text"
            value={client.address.city}
            onChange={(value) =>
              setClient((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  city: value,
                },
              }))
            }
          />
        </div>
        <div className="col-md-4">
          <label className="labels">State/Province</label>
          <TextBox
            type="text"
            value={client.address.state}
            onChange={(value) =>
              setClient((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  state: value,
                },
              }))
            }
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="labels">Postal Code</label>
          <TextBox
            type="text"
            value={client.address.postalCode}
            onChange={(value) =>
              setClient((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  postalCode: value,
                },
              }))
            }
          />
        </div>
        <div className="col-md-4">
          <label className="labels">Country</label>
          <TextBox
            type="text"
            value={client.address.country}
            onChange={(value) =>
              setClient((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  country: value,
                },
              }))
            }
          />
        </div>
      </div>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setActiveTab("items")}
      >
        Continue to Items
      </button>
    </div>
  );
};

export default InvoiceDetailsTab;
