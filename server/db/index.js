require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');

const MONGODB_DB_NAME = 'Clear-fashion';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = "mongodb+srv://clearfashion:<1234>@cluster0.wazsb.mongodb.net/Clear-fashion?retryWrites=true&w=majority"

let client = null;
let database = null;



//---------------------------------------- Connecting to the DataBase ----------------------------------------\\
/**
 * MongoDB Database Connection
 * @type {MongoClient}
 */
module.exports.dbconnect = async () => {
    try {
        if(database){
            console.log('already connected to ${MONGODB_DB_NAME}! \n');
            return database; }

        console.log(`|Connecting to  ${MONGODB_DB_NAME}|`);
        client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true});
        database = client.db(MONGODB_DB_NAME);
        console.log("The connection was successful \n");
        return database;

    } catch(error) {
        console.error('Error while trying to connect ');
        console.error(error);
        return null;
    }
};

//-------------------------------------------- Insertions in the DataBase --------------------------------------------\\
/**
 * MongoDB Database Insertion
 * @param  {Array}  products
 * @return {Object}
 */
 module.exports.insert = async (products,db) => {
    try {
        console.log("Starting the insertion);
        const collection = db.collection(MONGODB_COLLECTION);
        const result = await collection.insertMany(products, {'ordered': true});
        console.log("Insertion finished");
        console.log(`Total insertions : ${result.insertedCount} ---\n`);
        return result;

    } catch (error) {
        console.error('Insertion Failed');
        console.error(`Total insertions: ${error.result.nInserted}`);
        console.error("//------------------------------------------------------------------------------------//");
        console.error(error);
        return null;
    }
};

//------------------------------------------- MongoDB Requests -------------------------------------------\\
/**
 * MongoDB Query
 * @param {Array} query
 * @return {Array}
 */
module.exports.find = async (query,db) => {
    try {
        console.log("Starting the request");
        const collection = db.collection(MONGODB_COLLECTION);
        const products = await collection.find(query).toArray();
        console.log("Request successful");
        console.log(products);
        console.log("//---------------------------------------------------------------------------------//");
        return products;  
    } catch (error) {
        console.error('Request Failed');
        console.error("//----------------------------------------------------------------------------------//");
        console.error(error);
        return null;
    }
};
module.exports.mongoQueryCount = async (query,db) => {
    try {
        console.log("Starting the request");
        const collection = db.collection(MONGODB_COLLECTION);
        const countProducts = await collection.count(query);
        console.log("Request successful");
        console.log(countProducts);
        console.log("//---------------------------------------------------------------------------------//");
        return countProducts;  
    } catch (error) {
        console.error('Request Failed');
        console.error("//---------------------------------------------------------------------------------//");
        console.error(error);
        return null;
    }
};

//------------------------------------------- MongoDB Close -------------------------------------------//
/**
 * MongoDB Close Connection
 */
module.exports.mongoClose = async () => {
    try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};
  
};
