const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());
const fs = require('fs');
const { MongoClient } = require('mongodb');
const MONGODB_URI = "mongodb+srv://clearfashion:<1234>@cluster0.wazsb.mongodb.net/Clear-fashion?retryWrites=true&w=majority"
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();
const database = client.db("Clear-fashion");
const collection = database.collection("product");


app.get('/', (request, response) => {
  response.send({'ack': true});
});


//Endpoint to search for a product with the id of the product
app.get('/products/:id', (request, response) => {
  client.connect( async (err) => {
    var id =request.params.id;
    console.log("connected !")
    const result = await collection.find({"_id":id}).toArray();
    console.log(result);
    response.send(result);
    
  });
 
});

//Endpoint to search for a product with the price or brand
app.get('/products/search', (request, response) => {
  client.connect( async (err) => {
    
    let limit = parseInt(request.query.limit) ? parseInt(request.query.limit) : 12; //default 12 as asked
    let brand = request.query.brand 
    console.log(brand);
    let price = parseFloat(request.query.price);
    const mongoQuery = []
    if (price)
    {
      mongoQuery.push({ $match :{"price": price}});
    }
    if(brand)
    {
      mongoQuery.push({ $match :{"brand": brand}});
    }
    mongoQuery.push({ $sort :{ "price": 1}})
    console.log(price);
    const result = await collection.aggregate(mongoQuery).limit(limit).toArray();

    console.log(result);
    response.send(result);
    
  });
  
});






app.listen(PORT);
client.close();
console.log(`📡 Running on port ${PORT}`);
