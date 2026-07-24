export const addMarathiFont = async (doc) => {

    const response = await fetch(
        "/fonts/NotoSansDevanagari-Regular.ttf"
    );


    const buffer =
        await response.arrayBuffer();


    let binary = "";

    const bytes =
        new Uint8Array(buffer);


    bytes.forEach((byte)=>{

        binary += String.fromCharCode(byte);

    });


    const base64 =
        window.btoa(binary);



    doc.addFileToVFS(
        "NotoSansDevanagari-Regular.ttf",
        base64
    );


    doc.addFont(
        "NotoSansDevanagari-Regular.ttf",
        "NotoSansDevanagari",
        "normal"
    );

};