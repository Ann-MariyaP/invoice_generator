import "./shortpreview.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { currencies } from "../data/currencies";

export default function ShortPreview({ invoice, onUpdate }) {
  const navigate = useNavigate();
  if (!invoice) return null;

  const currencySymbol = currencies.find(
    (c) => c.code === invoice.currencyCode,
  );
  return (
    <div className="card preview-card border-0">
      <div className="card-header preview-header d-flex justify-content-between align-items-center">
        <span>Invoice Preview</span>

        <button
          className="btn btn-light btn-sm"
          onClick={() => onUpdate(invoice._id)}
        >
          Update
        </button>
      </div>
      <div className="card-body">
        <h4 className="invoice-title">INVOICE</h4>
        <p className="invoice-number">{invoice.invoiceNumber}</p>
        <h6>{invoice.client?.name}</h6>
        <p>{invoice.client?.email}</p>
        <p>{dayjs(invoice.invoiceDate).format("MM/DD/YYYY")}</p>
        <hr />

        <div className="d-flex justify-content-between align-items-center total-section">
          <span>Total Due</span>

          <strong className="amount">
            {invoice?.currencyCode}
            {currencySymbol?.symbol}
            {(invoice?.totalAmount ?? 0).toFixed(2)}
          </strong>
        </div>
      </div>
    </div>
  );
}
