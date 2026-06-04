import "./design.scss";
import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import emailIcon from "../assets/gmail.png";
import phoneIcon from "../assets/phone.png";
import locationIcon from "../assets/location.png";

const PreviewTab = ({
  invoiceNumber,
  currencies,
  selectedCurrency,
  invoiceDate,
  dueDate,
  seller,
  client,
  items,
  notes,
  taxRate,
  discount,
  handleSaveInvoice,
}) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  // --- CALCULATIONS ---
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
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
    const generatePDF = async () => {
      const doc = new jsPDF({
        format: "letter",
      });
      const pageHeight = doc.internal.pageSize.height;
      const margin = 10;
      const marginLeft = 12;
      const marginRight = 192;

      const code = selectedCurrency.code || "CAD";
      const symbol = selectedCurrency.symbol || "$";
      const headerColor = [88, 120, 140];
      const mainText = [67, 74, 79];

      doc.setFillColor(...headerColor);
      doc.rect(marginLeft, margin, marginRight, 3, "F");
      // HEADER
      const addHeader = () => {
        doc.setFillColor(...headerColor);
        doc.rect(marginLeft, margin, marginRight, 3, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...mainText);
        doc.text(seller?.name || "Company Name", marginLeft, margin + 7);
        doc.setFontSize(8);
        doc.text(`Bill To: ${client?.name}` || "", marginLeft, margin + 12);
        doc.text(invoiceNumber || "", 185, margin + 7);
        doc.text(invoiceDate || "", 188, margin + 12);
        doc.setFillColor(...headerColor);
        doc.rect(marginLeft, margin + 14, marginRight, 0.1, "F");
      };

      // Footer function
      const addFooter = (i, totalPages) => {
        doc.setFillColor(...headerColor);
        doc.rect(marginLeft, pageHeight - 15, marginRight, 0.2, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(`Page ${i} of ${totalPages}`, 105, pageHeight - 10, {
          align: "center",
        });
        doc.setFontSize(7);
        doc.text("Thank you for your business!", 202, pageHeight - 12, {
          align: "right",
        });
      };

      doc.setFillColor(244, 245, 246);
      doc.rect(marginLeft, margin + 3, marginRight, dueDate ? 61 : 50, "F");
      //#####################################

      // BILL FROM
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(67, 74, 79);
      doc.text(seller?.name || "Company Name", 15, margin + 17);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(seller?.address || "", 15, margin + 25);
      doc.text(seller?.email || "", 15, margin + 31);
      doc.text(seller?.phone || "", 15, margin + 38);

      // INVOICE INFO
      doc.setFontSize(14);
      doc.text("INVOICE", 199, margin + 10, {
        align: "right",
      });
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(invoiceNumber || "", 199, margin + 16, {
        align: "right",
      });
      doc.text("DATE", 199, margin + 25, {
        align: "right",
      });
      doc.text(invoiceDate || "", 199, margin + 31, {
        align: "right",
      });
      doc.text(dueDate ? "DUE" : "", 199, margin + 39, { align: "right" });
      doc.text(dueDate || "", 199, margin + 44, { align: "right" });
      doc.text("BALANCE DUE", 199, dueDate ? margin + 53 : margin + 41, {
        align: "right",
      });
      doc.text(
        `${code} ${symbol} ${total.toFixed(2)}`,
        199,
        dueDate ? margin + 58 : margin + 46,
        {
          align: "right",
        },
      );

      // BILL TO
      doc.setFontSize(9);
      doc.setTextColor(150, 162, 172);
      doc.text("BILL TO :", 15, dueDate ? margin + 69 : margin + 60);
      doc.setFontSize(marginLeft);
      doc.setTextColor(67, 74, 79);
      doc.text(client?.name || "", 15, dueDate ? margin + 77 : margin + 68);
      doc.setFontSize(10);
      if (client?.address) {
        doc.addImage(
          locationIcon,
          "PNG",
          15,
          dueDate ? margin + 81 : margin + 72,
          4,
          4,
        );
      }
      doc.text(client?.address || "", 20, dueDate ? margin + 84 : margin + 75);
      if (client?.email) {
        doc.addImage(
          emailIcon,
          "PNG",
          15,
          dueDate ? margin + 87 : margin + 78,
          4,
          4,
        );
      }
      doc.text(client?.email || "", 20, dueDate ? margin + 90 : margin + 81);
      if (client?.phone) {
        doc.addImage(
          phoneIcon,
          "PNG",
          15,
          dueDate ? margin + 93 : margin + 85,
          4,
          4,
        );
      }
      doc.text(client?.phone || "", 20, dueDate ? margin + 96 : margin + 88);

      // ITEMS TABLE
      autoTable(doc, {
        startY: dueDate ? margin + 105 : margin + 100,
        head: [
          [
            { content: "DESCRIPTION", styles: { halign: "left" } },
            { content: "RATE", styles: { halign: "right" } },
            { content: "QTY", styles: { halign: "center" } },
            { content: "AMOUNT", styles: { halign: "right" } },
          ],
        ],
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
        margin: { left: marginLeft, right: 11, top: 20 },
        tableWidth: "auto",
        styles: {
          fontSize: 10,
          cellPadding: 3,
          textColor: [0, 0, 0],
        },
        columnStyles: {
          0: { cellWidth: 100, halign: "left" },
          1: { cellWidth: 36, halign: "right" },
          2: { cellWidth: 20, halign: "center" },
          3: { cellWidth: 36, halign: "right" },
        },
        didParseCell: function (data) {
          if (data.section === "body" && data.row.index % 2 === 1) {
            data.cell.styles.fillColor = [236, 245, 251];
          }
        },
        theme: "plain",
        didDrawPage: function () {
          const pageNumber = doc.getCurrentPageInfo().pageNumber;
          if (pageNumber > 1) addHeader();
        },
      });

      let finalY1 = doc.lastAutoTable.finalY + 1;
      doc.setFillColor(231, 233, 236);
      doc.rect(marginLeft, finalY1, marginRight, 0.1, "F");
      doc.setTextColor(206, 224, 234);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("* Indicates non-taxable line item", 11, finalY1 + 4);

      // SUMMARY
      let finalY = doc.lastAutoTable.finalY + 10;
      const summaryHeight = 60;

      // If summary won't fit, add a new page
      if (finalY + summaryHeight > pageHeight - 30) {
        doc.addPage();
        addHeader();
        if (addHeader) {
          finalY = 30; // reset to top margin of new page
        }
      }
      doc.setTextColor(...mainText);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("SUBTOTAL :", 93, finalY);
      doc.text(`${symbol} ${subtotal.toFixed(2)}`, 201, finalY, {
        align: "right",
      });
      doc.text(`TAX (${taxRate}%) :`, 93, finalY + 7);
      doc.text(`${symbol} ${taxAmount.toFixed(2)}`, 201, finalY + 7, {
        align: "right",
      });
      doc.text(
        discountAmount ? `DISCOUNT (${discount}%) :` : "",
        93,
        finalY + 14,
      );
      doc.text(
        discountAmount ? `- ${symbol} ${discountAmount.toFixed(2)}` : "",
        201,
        finalY + 14,
        {
          align: "right",
        },
      );
      doc.text("TOTAL :", 93, discountAmount ? finalY + 21 : finalY + 14);
      doc.text(
        `${symbol} ${total.toFixed(2)}`,
        201,
        discountAmount ? finalY + 21 : finalY + 14,
        {
          align: "right",
        },
      );
      doc.setFontSize(11);
      doc.setFillColor(236, 245, 251);
      doc.rect(91, discountAmount ? finalY + 24 : finalY + 17, 112, 9, "F");
      doc.setFont("helvetica", "bold");
      doc.text("BALANCE DUE :", 93, discountAmount ? finalY + 30 : finalY + 23);
      doc.text(
        `${symbol} ${total.toFixed(2)}`,
        201,
        discountAmount ? finalY + 30 : finalY + 23,
        {
          align: "right",
        },
      );

      // NOTES
      let notesY = discountAmount ? finalY + 45 : finalY + 38;
      if (notesY + 30 > pageHeight - 20) {
        doc.addPage();
        addHeader();
        notesY = 30;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Additional Notes:", 15, notesY + 2);
      doc.setFont("helvetica", "normal");
      doc.text(notes || "", 15, notesY + 8, {
        maxWidth: 190,
        align: "left",
      });

      // ------------------------
      // FOOTERS AFTER ALL CONTENT
      // ------------------------
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        addFooter(i, totalPages);
      }

      // PREVIEW URL
      const pdfBlob = doc.output("blob");
      setPdfUrl(URL.createObjectURL(pdfBlob));
    };
    generatePDF();
  }, [
    invoiceNumber,
    selectedCurrency,
    invoiceDate,
    dueDate,
    seller,
    client,
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
      link.download = `${invoiceNumber}-${seller?.name}.pdf`;
      link.click();
    }
  };

  return (
    <div>
      <div className="button-group">
        <button className="btn btn--save" onClick={handleSaveInvoice}>
          Save Invoice
        </button>
        <button
          className="btn btn--download" onClick={downloadPDF}
        disabled={!pdfUrl}
        >
          Download PDF
        </button>
      </div>
      {/* <button
        onClick={downloadPDF}
        disabled={!pdfUrl}
        className="btn dwnld_btn"
      >
        Download PDF
      </button> */}

      {/* LIVE PDF PREVIEW */}
      {pdfUrl && (
        <iframe
          src={`${pdfUrl}#view=fitH&zoom=page-width`}
          width="100%"
          height="100%"
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            height: "65vh",
          }}
          title="PDF Preview"
        />
      )}
    </div>
  );
};

export default PreviewTab;
