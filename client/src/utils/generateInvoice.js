import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generateInvoice(bill){

    const doc = new jsPDF();

    // Header

    doc.setFontSize(22);
    doc.text("Shetkari Agro",15,20);

    doc.setFontSize(12);

    doc.text("Agro Inventory & Billing System",15,28);

    doc.text(`Invoice Date : ${new Date().toLocaleDateString()}`,140,20);

    doc.text(`Invoice No : ${bill._id.slice(-6)}`,140,28);



    // Customer

    doc.setFontSize(14);

    doc.text("Customer Details",15,45);

    doc.setFontSize(11);

    doc.text(`Name : ${bill.customer.name}`,15,55);

    doc.text(`Phone : ${bill.customer.phone}`,15,62);

    doc.text(`Address : ${bill.customer.address}`,15,69);



    autoTable(doc,{

        startY:80,

        head:[[
            "Product",
            "Qty",
            "Price",
            "GST %",
            "Total"
        ]],

        body:bill.items.map(item=>([
            item.productName,
            item.quantity,
            item.price,
            item.gst,
            item.total
        ]))

    });



    const y =
    doc.lastAutoTable.finalY + 15;

    doc.text(`Subtotal : ₹ ${bill.subTotal}`,140,y);

    doc.text(`GST : ₹ ${bill.gstAmount}`,140,y+8);

    doc.setFontSize(14);

    doc.text(`Grand Total : ₹ ${bill.grandTotal}`,140,y+18);



    doc.setFontSize(10);

    doc.text(

        "Thank you for shopping with Shetkari Agro",

        15,

        285

    );



    doc.save(`Invoice-${bill._id}.pdf`);

}