const dedicatedbrand = require('./sites/dedicatedbrand');
const loom = require('./sites/loom');
const db = require('./db');
MONGODB_URI = "mongodb+srv://clearfashion:<1234>@cluster0.wazsb.mongodb.net/Clear-fashion?retryWrites=true&w=majority"
async function sandbox () {
  try {
    let products = [];
    let pages = [
      'https://www.dedicatedbrand.com/en/men/basics',
      'https://www.dedicatedbrand.com/en/men/sale'
    ];

    console.log(' browsing ${pages.length} pages ...`);

    for (let page of pages) {
      console.log(` scraping ${page}`);
      let results = await dedicatedbrand.scrape(page);
      console.log(` ${results.length} products found !`);
      products.push(results);
    }

    pages = [
      'https://www.loom.fr/collections/hauts',
      'https://www.loom.fr/collections/bas'
    ];

    console.log('\n');

    console.log(` browsing ${pages.length} pages using the Promise.all function`);
    const promises = pages.map(page => loom.scrape(page));
    const results = await Promise.all(promises);
    console.log(` ${results.length} results of promises found`);
    console.log(` ${results.flat().length} products found`);
    console.log(results);
    console.log(results.flat());
    products.push(results.flat());
    products = products.flat();

    console.log('\n');

    console.log(` ${products.length} total of products found`);

    console.log('\n');

    const { MongoClient } = require('mongodb');
    const client = new MongoClient(MONGODB_URI);
    
    await client.connect();
    const database = client.db("Clear-fashion");
    const prods = database.collection("product");
    const result = await prods.insertMany(products);;
    console.log(` ${result.insertedCount} inserted products`);

    console.log('\n');

    console.log(' Find "Loom" products only');
    const loomOnly = await prods.find({'brand': 'loom'});
    console.log(` ${loomOnly.length} products found for the brand "Loom" `);
    console.log(loomOnly);

    await client.close();
  } catch (e) {
    console.error(e);
  }
}

sandbox();
