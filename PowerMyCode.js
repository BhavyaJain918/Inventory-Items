const fs = require("fs");
const {parse} = require("csv-parse");

const {MongoClient} = require("mongodb") 

async function connectDatabase() {
    try {
        const mongoClient = new MongoClient("");    // Link for MongoDB Database 
        
        await mongoClient.connect();
        console.log("Connection Successful");
        
        return mongoClient
    }
    catch (error) {
        console.log("Connection Error : " , error);
        process.exit()
    }   
};

async function createDatabase() {
    const client = await connectDatabase();
    const database = client.db("PowerMyCode");
    const collection = database.collection("Items");
    try {
        await readFile(collection);
        console.log("Data Stored in Database");
    }
    catch (error) {
        console.log("Error : " , error);
    }
    finally {
        await client.close()
    }
};

async function readFile(collection) {
    return new Promise((resolve , reject) => {
        let data = Array();
        try {
            const readStream = fs.createReadStream("Power_Invent.csv" , "utf8");

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
};

createDatabase();