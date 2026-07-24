import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export const generateInvoice = (bill) => {


    const doc = new jsPDF();



    // =========================
    // HEADER
    // =========================


    doc.setFillColor(
        46,
        125,
        50
    );


    doc.rect(
        0,
        0,
        210,
        45,
        "F"
    );



    doc.setTextColor(
        255,
        255,
        255
    );



    doc.setFontSize(20);


    doc.text(
        "SHETKARI AGRO",
        14,
        15
    );



    doc.setFontSize(11);


    doc.text(
        "Agricultural Products Store",
        14,
        23
    );



    doc.text(
        "Maratha Complex, Near HDFC Bank",
        14,
        31
    );



    doc.text(
        "Bhaktidam Road, Chandur Bazaar, Amravati",
        14,
        38
    );



    doc.setTextColor(
        0,
        0,
        0
    );





    // =========================
    // INVOICE DETAILS
    // =========================


    const invoiceNo =
    `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;



    doc.setFontSize(11);



    doc.text(
        `Invoice No: ${invoiceNo}`,
        14,
        58
    );



    doc.text(
        `Date: ${
            new Date(
                bill.createdAt || Date.now()
            ).toLocaleDateString()
        }`,
        140,
        58
    );






    // =========================
    // CUSTOMER DETAILS
    // =========================


    doc.setFontSize(14);


    doc.text(
        "Customer Details",
        14,
        75
    );



    doc.setFontSize(11);



    doc.text(
        `Name: ${bill.customer?.name || "-"}`,
        14,
        84
    );



    doc.text(
        `Phone: ${bill.customer?.phone || "-"}`,
        14,
        91
    );



    doc.text(
        `Address: ${bill.customer?.address || "-"}`,
        14,
        98
    );







    // =========================
    // PRODUCT TABLE
    // =========================


    const rows =
    bill.items.map(item => [


        item.productName,


        item.quantity,


        `Rs ${item.price}`,


        `${item.gst}%`,


        `Rs ${item.total}`


    ]);





    autoTable(doc, {


        startY:110,


        head:[

            [
                "Product",
                "Qty",
                "Price",
                "GST",
                "Total"
            ]

        ],



        body:rows,



        theme:"grid",



        headStyles:{

            fillColor:[
                46,
                125,
                50
            ]

        }


    });






    const finalY =
    doc.lastAutoTable.finalY + 15;






    // =========================
    // TOTALS
    // =========================


    doc.setFontSize(12);



    doc.text(
        `Subtotal : Rs ${bill.subTotal}`,
        130,
        finalY
    );



    doc.text(
        `GST : Rs ${bill.gstAmount}`,
        130,
        finalY + 8
    );



    doc.setFontSize(15);



    doc.setTextColor(
        46,
        125,
        50
    );



    doc.text(
        `Grand Total : Rs ${bill.grandTotal}`,
        130,
        finalY + 20
    );



    doc.setTextColor(
        0,
        0,
        0
    );







    // =========================
    // FOOTER
    // =========================


    doc.setFontSize(11);



    doc.text(
        "Thank you for shopping with Shetkari Agro",
        14,
        finalY + 45
    );



    doc.text(
        "Visit Again",
        14,
        finalY + 52
    );







    // =========================
    // SIGNATURE SECTION
    // =========================


    doc.line(
        140,
        finalY + 75,
        195,
        finalY + 75
    );



    doc.setFontSize(11);



    doc.text(
        "Authorized Signature",
        145,
        finalY + 83
    );



    doc.text(
        "Shetkari Agro",
        155,
        finalY + 90
    );





    // =========================
    // SAVE PDF
    // =========================


    doc.save(
        `${invoiceNo}.pdf`
    );


};