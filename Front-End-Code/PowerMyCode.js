import {MongoClient} from "mongodb"

async function connectDatabase() {
    try {
        const mongoClient = new MongoClient("");    // Link for MongoDB Database 
        
        await mongoClient.connect();
        console.log("Connected with Database");
        
        return mongoClient
    }
    catch (error) {
        console.log("Connection Error : " , error);
        process.exit();
    }   
};

async function createDatabase() {
    const client = await connectDatabase();

    const database = client.db("PowerMyCode");
    const collection = database.collection("Items");

    return collection;
};

const collections = createDatabase();

export {collections};