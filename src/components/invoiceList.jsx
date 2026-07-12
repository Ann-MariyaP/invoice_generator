import "./invoicelist.scss";
import { LiaTrashAltSolid } from "react-icons/lia";
import { currencies } from "../data/currencies";
import CustomModal from "../components/modal";
import dayjs from "dayjs";

export default function InvoiceList({
  invoices,
  selectedInvoice,
  setSelectedInvoice,
  selectedInvoiceId,
  setSelectedInvoiceId,
  handleSelectInvoice,
  handleDelete,
  getStatusBadge,
  deleteModal,
  setDeleteModal
}) {
 
  const openDeleteModal = (id) => {
     console.log("Opening modal with ID:", id);
    setSelectedInvoiceId(id);
    setDeleteModal(true);
  };

  return (
   
      <div className="list-group list-group-flush mt-3">
        {invoices.map((invoice) => {
          const currencySymbol = currencies.find(
            (c) => c.code === invoice.currencyCode,
          );
          return (
            <div
              key={invoice._id}
              onClick={() => handleSelectInvoice(invoice)}
              className={`list-group-item invoice-item d-flex justify-content-between align-items-center
  ${selectedInvoice?.id === invoice.id ? "active-item" : ""}`}
            >
              {/* LEFT SIDE */}
              <div>
                <div className="d-flex gap-3 mb-1">
                  <small>{invoice.invoiceNumber}</small>

                  <span className={`badge ${getStatusBadge(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>

                <h6>{invoice.client?.name}</h6>

                <small>
                  Issued: {dayjs(invoice.invoiceDate).format("MM/DD/YYYY")}
                </small>
              </div>

              {/* RIGHT SIDE */}
              <div className="d-flex align-items-center gap-3 ms-auto">
                <strong>
                  {currencySymbol?.symbol}{" "}
                  {(invoice?.totalAmount ?? 0).toFixed(2)}
                </strong>

                <button
                  className="btn btn-link text-danger p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(invoice._id);
                  }}
                  // onClick={(e) => handleDelete(invoice._id, e)}
                >
                  <LiaTrashAltSolid />
                </button>
              </div>
            </div>
          );
        }
         )}
        <CustomModal
          open={deleteModal}
          title="Confirm Delete"
          onCancel={() => setDeleteModal(false)}
          onOk={() => {
            console.log("Selected ID in modal:", selectedInvoiceId);
            handleDelete(selectedInvoiceId);

          }}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete?</p>
        </CustomModal>
      </div>
  );
}
