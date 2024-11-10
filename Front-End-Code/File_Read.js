import {parse} from "csv-parse"
import {Readable} from "stream";
import {collections} from "./PowerMyCode.js"

async function readFile(readBuffer) {
    collections.then((collection) => {
        return new Promise((resolve , reject) => {
            let data = Array();
            try {
                const readStream = Readable.from(readBuffer);

                readStream.pipe(parse({delimiter : "," , from_line : 1 , columns : true , skip_records_with_error : true , skip_records_with_empty_values : true})).on("data" , (row) => {
                    data.push(row);
                }).on("end" , async () => {
                    if (data.length > 0) {
                        await collection.insertMany(data);
                    }
                    else {
                        console.log("No Data Found");
                    }
                    resolve();
                });
            }
            catch (error) {
                console.log("Error : " , error)
                reject();
            }
        });
    }).catch ((error) => {
        console.log("Error : " , error);
    });
};

const readFiles = async function ReadfilesNow(buffer) {
    await readFile(buffer);
};

export {readFiles};