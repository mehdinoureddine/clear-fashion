const montlimartbrand = require('./sources/montlimartbrand');
const fs = require('fs');
const MONGODB_URI = "mongodb+srv://clearfashion:<1234>@cluster0.wazsb.mongodb.net/Clear-fashion?retryWrites=true&w=majority"

async function sandbox () {
  try {
    
    
  
    let lien=`https://www.montlimart.com/polos-t-shirts.html?limit=all`;
    final_products=[];
    console.log(`🕵️‍♀️  browsing ${lien} source`);
    const products = await montlimartbrand.scrape(lien);
    final_products=products.flat();
  
    

    const { MongoClient } = require('mongodb');
    const client = new MongoClient(MONGODB_URI);

    
      
    await client.connect();
    const database = client.db("Clear-fashion");
    const prods = database.collection("product");
    // create an array of documents to insert
    const docs = final_products;

    const result = await prods.insertMany(docs, { ordered: true });
    console.log(`${result.insertedCount} documents were inserted !`);
  
    await client.close();
      
    
    

    


    
    fs.writeFileSync('Products_Montlimards.json', JSON.stringify(final_products));
    

    

    
    
  } catch (e) {
    console.error(e);
  }
}


sandbox();
