// import { useRef } from "react";
// import "./design.scss";
// import { FaSquarePhone } from "react-icons/fa6";
// import { TfiEmail } from "react-icons/tfi";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const PreviewTab = ({
//   invoiceNumber,
//   currencies,
//   invoiceDate,
//   dueDate,
//   name,
//   email,
//   phone,
//   address,
// }) => {
//   const subtotal = items.reduce(
//     (sum, item) => sum + item.quantity * item.price,
//     0
//   );
//   const taxAmount = subtotal * (taxRate / 100);
//   const discountAmount = subtotal * (discount / 100);
//   const total = subtotal + taxAmount - discountAmount;

//   const divRef = useRef(null);

//   const handlePrintPDF = async () => {
//     const element = divRef.current;
//     if (!element) return;

//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "px",
//       format: "letter",
//     });

//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
//     pdf.save("Invoice.pdf");
//   };

//   return (
//     <div className="preview-tab">
//       <div className="row">
//         <div className="col-2">
//           <button onClick={handlePrintPDF} className="btn dwnld_btn">
//             Download PDF
//           </button>
//         </div>
//       </div>
//       <div ref={divRef} className="container invoice_preview border">
//         <div
//           className="row"
//           style={{ backgroundColor: "rgba(88, 120, 140, 1)", height: "18px" }}
//         ></div>
//         <div className="row mb-5 from_row align-items-center">
//           <div className="col text-start ">
//             <p
//               className="mb-2"
//               style={{ fontSize: "30px", fontWeight: "600", color: "rgba(67, 74, 79, 1)" }}
//             >
//               {name}
//             </p>
//             {address && (
//               <p className="mb-1 preview_font" style={{ maxWidth: "7cm" }}>
//                 {address}
//               </p>
//             )}
//             {email && <p className="mb-1 preview_font">{email}</p>}
//             {phone && <p className="preview_font">{phone}</p>}
//           </div>
//           <div className="col text-end p-2">
//             <h4 className="invoice_head mb-1 mt-2">INVOICE</h4>
//             <p className="preview_font mb-4">{invoiceNumber}</p>
//             <p className="invoice_head mb-1">DATE</p>
//             <p className="preview_font mb-4">{invoiceDate}</p>
//             {dueDate && <p>Due Date: {dueDate}</p>}
//             <p className="invoice_head mb-1"> BALANCE DUE</p>
//             <p className="preview_font">
//               {currencies} {total.toFixed(2)}
//             </p>
//           </div>
//         </div>

//         <div className="row mb-4">
//           <div className="col text-start">
//             <p className="preview_font">BILL TO :</p>
//             <p
//               className="mb-2 mt-3"
//               style={{ fontSize: "26px", fontWeight: "600" }}
//             >
//               {clientName}
//             </p>
//             {clientAddress && (
//               <p className="mb-1 preview_font" style={{ maxWidth: "5cm" }}>
//                 {clientAddress}
//               </p>
//             )}
//             {clientEmail && (
//               <p className="mb-1 preview_font">
//                 <TfiEmail className="phone-icon" />
//                 {clientEmail}
//               </p>
//             )}
//             {clientPhone && (
//               <p className="preview_font">
//                 <FaSquarePhone className="phone-icon" />
//                 {clientPhone}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="mb-4">
//           {/* <h6>Invoice Items</h6> */}
//           <div className="row" style={{ overflowX: "auto" }}>
//             <table className="mt-4">
//               <thead style={{ backgroundColor: "rgba(66, 88, 113, 1)" }}>
//                 <tr>
//                   <th
//                     style={{
//                       padding: "8px",
//                       color: "white",
//                       width: "60%",
//                       fontWeight: "500",
//                     }}
//                   >
//                     DESCRIPTION
//                   </th>
//                   <th
//                     style={{
//                       color: "white",
//                       textAlign: "end",
//                       fontWeight: "500",
//                     }}
//                   >
//                     RATE
//                   </th>
//                   <th
//                     style={{
//                       color: "white",
//                       textAlign: "center",
//                       fontWeight: "500",
//                       width:"15%"
//                     }}
//                   >
//                     QTY
//                   </th>
//                   <th
//                     style={{
//                       padding: "6px",
//                       color: "white",
//                       textAlign: "end",
//                       fontWeight: "500",
//                     }}
//                   >
//                     AMOUNT
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item, index) => (
//                   <tr
//                     key={index}
//                     className={index % 2 === 1 ? "custom-row-even" : " "}
//                   >
//                     <td className="rows">{item.description}</td>
//                     <td className="text-end rows">${item.price.toFixed(2)}</td>
//                     <td className="text-center rows">{item.quantity}</td>
//                     <td className="text-end rows">
//                       ${(item.quantity * item.price).toFixed(2)}
//                       {!item.taxable && "*"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="row">
//             <div className="col-6 note mt-2">
//               * Indicates non-taxable line item
//             </div>
//             <div className="col mt-4" style={{ color: "#434a4f" }}>
//               <div className="row" style={{ fontWeight: "500" }}>
//                 <div className="col">SUBTOTAL :</div>
//                 <div className=" col text-end">$ {subtotal.toFixed(2)}</div>
//               </div>

//               <div className="row" style={{ fontWeight: "500" }}>
//                 <div className="col"> TAX ({taxRate}%) :</div>
//                 <div className=" col text-end">$ {taxAmount.toFixed(2)}</div>
//               </div>

//               <div className="row" style={{ fontWeight: "500" }}>
//                 <div className="col">TOTAL :</div>
//                 <div className=" col text-end">$ {total.toFixed(2)}</div>
//               </div>
//               <div
//                 className="row mt-2 py-2"
//                 style={{ backgroundColor: "#cee0ea", fontWeight: "bold" }}
//               >
//                 <div className="col">BALANCE DUE :</div>
//                 <div className=" col text-end">
//                   {currencies} {total.toFixed(2)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {notes && (
//           <div className="mb-4" style={{ color: "#434a4f" }}>
//             <h6>Additional Notes</h6>
//             <p>{notes}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PreviewTab;

import "./design.scss";

import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PreviewTab = ({
  invoiceNumber,
  currencies,
  selectedCurrency,
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
  const [pdfUrl, setPdfUrl] = useState(null);

  // --- CALCULATIONS ---
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const taxAmount = subtotal * (taxRate / 100);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + taxAmount - discountAmount;

  // --- GENERATE PDF & PREVIEW ---
  useEffect(() => {
    // Revoke previous PDF URL to prevent memory leaks
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  useEffect(() => {
    const doc = new jsPDF();
    const code = selectedCurrency.code || "";
    const symbol = selectedCurrency.symbol || "";
    const headerColor = [88, 120, 140];
    const lightBlue = [206, 224, 234];

    // HEADER
    doc.setFillColor(...headerColor);
    doc.rect(11, 7, 188, 3, "F");

    doc.setFillColor(240, 240, 240); 
    doc.rect(11, 10, 188, 50, "F");

    // BILL FROM
    doc.setFont("helvetica", "bold"); 
    doc.setFontSize(13);
    doc.setTextColor(67, 74, 79);
    doc.text(name || "Company Name", 15, 25);
    doc.setFont("helvetica", "bold"); 
    doc.setFontSize(10);
    doc.text(address || "", 15, 34);
    doc.text(email || "", 15, 40);
    doc.text(phone || "", 15, 47);

    // INVOICE INFO
    doc.setFontSize(14);
    doc.text("INVOICE", 195, 18, {
      align: "right",
    });
    doc.setFont("helvetica", "bold"); 
    doc.setFontSize(10);
    doc.text(invoiceNumber || "", 195, 25, {
      align: "right",
    });
    doc.text("DATE", 195, 35, {
      align: "right",
    });
    doc.text(invoiceDate || "", 195, 41, {
      align: "right",
    });

    if (dueDate) {
      doc.text("DUE", 195, 52, { align: "right" });
      doc.text(dueDate, 195, 57, {
        align: "right",
      });
      doc.text("BALANCE DUE", 195, 68, {
        align: "right",
      });
      doc.text(`${code} ${total.toFixed(2)}`, 195, 73, {
        align: "right",
      });
    } else {
      doc.text("BALANCE DUE", 195, 52, {
        align: "right",
      });
      doc.text(`${code} ${symbol} ${total.toFixed(2)}`, 195, 57, {
        align: "right",
      });
    }

    // BILL TO
    doc.setFont("helvetica", "bold"); 
    doc.setTextColor(67, 74, 79);
    doc.text("BILL TO :", 15, 68);
    doc.setFontSize(11);
    doc.text(clientName || "", 15, 76);
    doc.setFontSize(10);
    doc.text(clientAddress || "", 15, 83);
    doc.text(clientEmail || "", 15, 89);
    doc.text(clientPhone || "", 15, 96);

    // ITEMS TABLE
    autoTable(doc, {
      startY: 110,
      head: [["DESCRIPTION", "RATE", "QTY", "AMOUNT"]],
      body: items.map((item) => [
        item.description,
        `${symbol} ${item.price.toFixed(2)}`,
        item.quantity,
        `${symbol} ${(item.quantity * item.price).toFixed(2)}`,
      ]),
      headStyles: {
        fillColor: headerColor,
        textColor: [247, 247, 247],
      },
      margin: { left: 11, right: 11 },
      tableWidth: "auto",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        textColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 96, halign: "left" },
        1: { cellWidth: 36, halign: "right" },
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: 36, halign: "right" },
      },
      didParseCell: function (data) {
    // Apply alternate background starting from 2nd row
    if (data.section === 'body' && data.row.index % 2 === 1) {
      data.cell.styles.fillColor = [204, 220, 229]; // light gray
    }
  },
      // alternateRowStyles: { fillColor: [204, 220, 229] },
      theme: "plain",
    });

    // SUMMARY
    let finalY = doc.lastAutoTable.finalY + 8;
    doc.setFont("helvetica", "bold"); 
    doc.setFontSize(10);
    doc.text("SUBTOTAL :", 93, finalY);
    doc.text(`${symbol} ${subtotal.toFixed(2)}`, 197, finalY, {
      align: "right",
    });
    doc.text(`TAX (${taxRate}%) :`, 93, finalY + 7);
    doc.text(`${symbol} ${taxAmount.toFixed(2)}`, 197, finalY + 7, {
      align: "right",
    });
    if (discountAmount) {
      doc.text(`DISCOUNT (${discount}%) :`, 93, finalY + 14);
      doc.text(`- ${symbol} ${discountAmount.toFixed(2)}`, 197, finalY + 14, {
        align: "right",
      });
      doc.text("TOTAL :", 93, finalY + 21);
      doc.text(`${symbol} ${total.toFixed(2)}`, 197, finalY + 21, {
        align: "right",
      });
       doc.setFontSize(11);
       doc.setFillColor(206, 224, 234); 
       doc.rect(91, finalY + 24, 108, 9, "F"); 
       doc.setFont("helvetica", "bold");
      doc.text("BALANCE DUE :", 93, finalY + 29);
      doc.text(`${symbol} ${total.toFixed(2)}`, 197, finalY + 29, {
        align: "right",
      });
    } else {
       doc.setFontSize(10);
      doc.text("TOTAL :", 93, finalY + 13);
      doc.text(`${symbol} ${total.toFixed(2)}`, 197, finalY + 13, {
        align: "right",
      });
      doc.setFillColor(206, 224, 234); // light blue background (R,G,B)
      doc.rect(91, finalY + 16, 108, 9, "F"); // x, y, width, height, "F" = fill
      doc.setFont("helvetica", "bold"); // default
      doc.setFontSize(11);
      doc.text("BALANCE DUE :", 93, finalY + 21);
      doc.text(`${symbol} ${total.toFixed(2)}`, 197, finalY + 21, {
        align: "right",
      });
    }
    

    // NOTES
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold"); 
    doc.text("Additional Notes:", 15, finalY + 45);
    doc.setFont("helvetica", "normal"); 
    doc.text(notes || "", 15, finalY + 51);

    // PREVIEW URL
    const pdfBlob = doc.output("blob");
    setPdfUrl(URL.createObjectURL(pdfBlob));
  }, [
    invoiceNumber,
    selectedCurrency,
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
    subtotal,
    taxAmount,
    discountAmount,
    total,
  ]);

  // --- DOWNLOAD FUNCTION ---
  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${invoiceNumber}.pdf`;
      link.click();
    }
  };

  return (
    <div>
      <button
        onClick={downloadPDF}
        disabled={!pdfUrl}
        className="btn dwnld_btn"
      >
        Download PDF
      </button>

      {/* LIVE PDF PREVIEW */}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          style={{ marginTop: "20px", border: "1px solid #ccc" }}
          title="PDF Preview"
        />
      )}
    </div>
  );
};

export default PreviewTab;
