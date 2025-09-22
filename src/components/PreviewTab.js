import { useRef } from "react";
import "./design.scss";
import { FaSquarePhone } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PreviewTab = ({
  invoiceNumber,
  currency,
  invoiceDate,
  dueDate,
  name,
  email,
  phone,
  address,
  clientName,
  clientEmail,
  clientPhone,
  clientAddress,
  items,
  notes,
  taxRate,
  discount,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const taxAmount = subtotal * (taxRate / 100);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + taxAmount - discountAmount;

  const divRef = useRef(null);

  const handlePrintPDF = async () => {
    const element = divRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
    pdf.save("Invoice.pdf");
  };

  return (
    <div className="preview-tab">
      <div className="row">
        <div className="col-2">
          <button onClick={handlePrintPDF} className="btn dwnld_btn">
            Download PDF
          </button>
        </div>
      </div>
      <div ref={divRef} className="container invoice_preview border">
        <div
          className="row"
          style={{ backgroundColor: "#425f71", height: "18px" }}
        ></div>
        <div className="row mb-5 from_row align-items-center">
          <div className="col text-start ">
            <p
              className="mb-2"
              style={{ fontSize: "30px", fontWeight: "600", color: "#434a4f" }}
            >
              {name}
            </p>
            {address && (
              <p className="mb-1 preview_font" style={{ maxWidth: "7cm" }}>
                {address}
              </p>
            )}
            {email && <p className="mb-1 preview_font">{email}</p>}
            {phone && <p className="preview_font">{phone}</p>}
          </div>
          <div className="col text-end p-2">
            <h4 className="invoice_head mb-1 mt-2">INVOICE</h4>
            <p className="preview_font mb-4">{invoiceNumber}</p>
            <p className="invoice_head mb-1">DATE</p>
            <p className="preview_font mb-4">{invoiceDate}</p>
            {dueDate && <p>Due Date: {dueDate}</p>}
            <p className="invoice_head mb-1"> BALANCE DUE</p>
            <p className="preview_font">
              {currency} {total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col text-start">
            <p className="preview_font">BILL TO :</p>
            <p
              className="mb-2 mt-3"
              style={{ fontSize: "26px", fontWeight: "600" }}
            >
              {clientName}
            </p>
            {clientAddress && (
              <p className="mb-1 preview_font" style={{ maxWidth: "5cm" }}>
                {clientAddress}
              </p>
            )}
            {clientEmail && (
              <p className="mb-1 preview_font">
                <TfiEmail className="phone-icon" />
                {clientEmail}
              </p>
            )}
            {clientPhone && (
              <p className="preview_font">
                <FaSquarePhone className="phone-icon" />
                {clientPhone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          {/* <h6>Invoice Items</h6> */}
          <div className="row" style={{ overflowX: "auto" }}>
            <table className="mt-4">
              <thead style={{ backgroundColor: "#425f71" }}>
                <tr>
                  <th
                    style={{
                      padding: "8px",
                      color: "white",
                      width: "60%",
                      fontWeight: "500",
                    }}
                  >
                    DESCRIPTION
                  </th>
                  <th
                    style={{
                      color: "white",
                      textAlign: "end",
                      fontWeight: "500",
                    }}
                  >
                    RATE
                  </th>
                  <th
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "500",
                      width:"15%"
                    }}
                  >
                    QTY
                  </th>
                  <th
                    style={{
                      padding: "6px",
                      color: "white",
                      textAlign: "end",
                      fontWeight: "500",
                    }}
                  >
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 1 ? "custom-row-even" : " "}
                  >
                    <td className="rows">{item.description}</td>
                    <td className="text-end rows">${item.price.toFixed(2)}</td>
                    <td className="text-center rows">{item.quantity}</td>
                    <td className="text-end rows">
                      ${(item.quantity * item.price).toFixed(2)}
                      {!item.taxable && "*"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-6 note mt-2">
              * Indicates non-taxable line item
            </div>
            <div className="col mt-4" style={{ color: "#434a4f" }}>
              <div className="row" style={{ fontWeight: "500" }}>
                <div className="col">SUBTOTAL :</div>
                <div className=" col text-end">$ {subtotal.toFixed(2)}</div>
              </div>

              <div className="row" style={{ fontWeight: "500" }}>
                <div className="col"> TAX ({taxRate}%) :</div>
                <div className=" col text-end">$ {taxAmount.toFixed(2)}</div>
              </div>

              <div className="row" style={{ fontWeight: "500" }}>
                <div className="col">TOTAL :</div>
                <div className=" col text-end">$ {total.toFixed(2)}</div>
              </div>
              <div
                className="row mt-2 py-2"
                style={{ backgroundColor: "#cee0ea", fontWeight: "bold" }}
              >
                <div className="col">BALANCE DUE :</div>
                <div className=" col text-end">
                  {currency} {total.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mb-4" style={{ color: "#434a4f" }}>
            <h6>Additional Notes</h6>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewTab;
