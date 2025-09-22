import React from "react";
import "./design.scss";

const ItemsTab = ({
  items,
  setItems,
  taxRate,
  setTaxRate,
  discount,
  setDiscount,
  notes,
  setNotes,
  setActiveTab,
}) => {
  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] =
      field === "description" ? value : Number(value);
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const taxAmount = subtotal * (taxRate / 100);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div>
      <h5 className="mb-3">Invoice Items</h5>
      <table className="table table-bordered bg-light">
        <thead className="table-secondary">
          <tr>
            <th>Description</th>
            <th style={{ width: "100px" }}>Qty</th>
            <th style={{ width: "120px" }}>Price</th>
            <th style={{ width: "120px" }}>Total</th>
            <th style={{ width: "50px" }}></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) =>
                    handleChange(idx, "description", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(idx, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={item.price}
                  onChange={(e) => handleChange(idx, "price", e.target.value)}
                />
              </td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeItem(idx)}
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-outline-secondary mb-4" onClick={addItem}>
        + Add Item
      </button>

      <div className="mb-4">
        <h6>Additional Notes</h6>
        <textarea
          className="form-control"
          placeholder="Payment terms, delivery info, etc."
          rows="3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <label>Tax Rate (%)</label>
          <input
            type="number"
            className="form-control"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
        </div>
        <div className="col-md-6">
          <label>Discount (%)</label>
          <input
            type="number"
            className="form-control"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="p-3 bg-light rounded mb-4">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>
          Tax ({taxRate}%): ${taxAmount.toFixed(2)}
        </p>
        <p>
          Discount ({discount}%): -${discountAmount.toFixed(2)}
        </p>
        <h5>Total: ${total.toFixed(2)}</h5>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setActiveTab("details")}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default ItemsTab;
