import os from "os"
import multer from "multer"
import express from "express"
import {readFiles} from "./File_Read.js"

const app = express();
const upload  = multer({dest : os.tempdir})

app.use(express.static("Public"))

app.post("/" , upload.single("file") , async (req , res) => {
    const file = req.file;

    if (file === undefined) {
        return res.status(400).json({error: "No file uploaded"});
    };

    try {
        await readFiles(file.buffer);
        console.log("Data Inserted in Database");
    }
    catch (error) {
        console.log("Error : " , error);
    }
});

app.listen(4000 , () => {console.log("Listning...")});

