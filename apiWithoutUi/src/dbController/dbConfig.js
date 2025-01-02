import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
let client = null;
let dbInstance = null;

// Function to connect to the database
export const dbConnect = async () => {
    try {
        // Establish the client connection
        client = await MongoClient.connect(MONGO_URI)
        // Assign the database instance globally
        dbInstance = client.db("simpleRestaurant");

        console.log("Database connected successfully");
        return dbInstance;
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);
        throw error; // Propagate the error
    }
};

// Function to disconnect from the database
export const dbDisConnect = async () => {
    try {
        if (client) {
            await client.close();
            client = null;
            dbInstance = null;
            console.log("Database disconnected successfully");
        }
    } catch (error) {
        console.error(`Error disconnecting from the database: ${error.message}`);
        throw error; // Propagate the error
    }
};

// Function to insert data into a collection
export const insertData = async (colName, data) => {
    try {
        if (!dbInstance) {
            throw new Error("Database is not connected");
        }
        const result = await dbInstance.collection(colName).insertOne(data);
        console.log("Data inserted successfully");
        return result;
    } catch (error) {
        console.error(`Error inserting data: ${error.message}`);
        throw error; // Propagate the error
    }
};


export const getAllData = async (colName, data) => {
    try {
        if (!dbInstance) {
            throw new Error("Database is not connected");
        }
        const result = await dbInstance.collection(colName).find(data).toArray();
        console.log("Data fetch successfully");
        return result;
    } catch (error) {
        console.error(`Error inserting data: ${error.message}`);
        throw error; // Propagate the error
    }
};

export const getData = async (colName, data) => {
    try {
        if (!dbInstance) {
            throw new Error("Database is not connected");
        }
        const result = await dbInstance.collection(colName).findOne(data);
        console.log("Data fetch successfully");
        return result;
    } catch (error) {
        console.error(`Error inserting data: ${error.message}`);
        throw error; // Propagate the error
    }
};

export const deleteData = async (colName, data) => {
    try {
        if (!dbInstance) {
            throw new Error("Database is not connected");
        }
        const result = await dbInstance.collection(colName).deleteOne(data);
        console.log("Data Deleted successfully");
        return result;
    } catch (error) {
        console.error(`Error inserting data: ${error.message}`);
        throw error; // Propagate the error
    }
};
export const updateData = async (colName, condition, data) => {
    try {
        if (!dbInstance) {
            throw new Error("Database is not connected");
        }
        const result = await dbInstance.collection(colName).updateOne(condition, data);
        console.log("Data updated successfully");
        return result;
    } catch (error) {
        console.error(`Error inserting data: ${error.message}`);
        throw error; // Propagate the error
    }
};

