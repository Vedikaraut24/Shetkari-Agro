import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, "uploads/imports");

    },

    filename(req, file, cb) {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    }

});

const fileFilter = (req, file, cb) => {

    const allowed = [
        ".csv",
        ".xlsx"
    ];

    const extension =
        path.extname(file.originalname).toLowerCase();

    if (allowed.includes(extension)) {

        cb(null, true);

    } else {

        cb(new Error("Only CSV or XLSX files allowed"));

    }

};

export default multer({

    storage,

    fileFilter

});