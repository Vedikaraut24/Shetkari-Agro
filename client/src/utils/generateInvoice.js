import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (bill) => {

    const doc = new jsPDF();

    // ===========================
    // SHOP HEADER
    // ===========================

    doc.setFillColor(34, 139, 34);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255,255,255);

    doc.setFontSize(22);
    doc.text("🌾 शेतकरी अॅग्रो",14,16);

    doc.setFontSize(11);
    doc.text("Agricultural Products & Services",14,24);

    doc.text("Nagpur, Maharashtra",14,30);

    doc.setFontSize(20);
    doc.text("INVOICE",155,20);

    doc.setTextColor(0,0,0);

    // ===========================
    // BILL INFO
    // ===========================

    doc.setFontSize(11);

    doc.text(`Invoice No : ${bill._id}`,14,48);

    doc.text(
        `Date : ${
            new Date(bill.createdAt || Date.now()).toLocaleDateString()
        }`,
        140,
        48
    );

    // ===========================
    // CUSTOMER
    // ===========================

    doc.setFillColor(240,248,240);
    doc.rect(14,55,182,24,"F");

    doc.setFontSize(12);
    doc.text("Customer Details",16,63);

    doc.setFontSize(10);

    doc.text(
        `Name : ${bill.customer?.name || "-"}`,
        16,
        70
    );

    doc.text(
        `Phone : ${bill.customer?.phone || "-"}`,
        110,
        70
    );

    doc.text(
        `Address : ${bill.customer?.address || "-"}`,
        16,
        76
    );

    // ===========================
    // PRODUCTS TABLE
    // ===========================

    const rows = bill.items.map(item => [

        item.productName,

        item.quantity,

        `₹${item.price}`,

        `${item.gst}%`,

        `₹${item.total}`

    ]);

    autoTable(doc,{

        startY:88,

        head:[[
            "Product",
            "Qty",
            "Price",
            "GST",
            "Total"
        ]],

        body:rows,

        theme:"grid",

        headStyles:{
            fillColor:[34,139,34]
        }

    });

    const finalY = doc.lastAutoTable.finalY + 10;

    // ===========================
    // TOTALS
    // ===========================

    doc.setFontSize(12);

    doc.text(
        `Subtotal : ₹${bill.subTotal}`,
        130,
        finalY
    );

    doc.text(
        `GST : ₹${bill.gstAmount}`,
        130,
        finalY+8
    );

    doc.setFontSize(15);

    doc.setTextColor(34,139,34);

    doc.text(
        `Grand Total : ₹${bill.grandTotal}`,
        130,
        finalY+20
    );

    doc.setTextColor(0,0,0);

    // ===========================
    // FOOTER
    // ===========================

    doc.line(
        14,
        finalY+32,
        196,
        finalY+32
    );

    doc.setFontSize(11);

    doc.text(
        "Thank you for shopping with शेतकरी अॅग्रो!",
        14,
        finalY+42
    );

    doc.text(
        "Visit Again 🌾",
        14,
        finalY+49
    );

    doc.save(`Invoice-${bill._id}.pdf`);
};