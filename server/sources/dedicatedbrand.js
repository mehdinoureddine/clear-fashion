const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );

      return {name, price};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */

module.exports.scrape = async url => {
  try {
    //creating a products list
    
    //Fetching url
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.json();
      let productsList_Dedicated=[]
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      body.products.forEach((element) => {
        // We only want men for example
        if(element.name != undefined && element["canonicalUri"].startsWith('men') )
        {productsList_Dedicated.push({
          brand: "dedicated",
          name: element["name"],
          price: parseFloat(element["price"].price),
          link: "https://www.dedicatedbrand.com/en/" + element["canonicalUri"],
          photo: element["image"][0],
          'date':date,
          '_id': uuidv5("https://www.dedicatedbrand.com/en/" + element["canonicalUri"], uuidv5.URL),
          "uuid": uuidv5("https://www.dedicatedbrand.com/en/" + element["canonicalUri"], uuidv5.URL)
        })};
    
  });
  return productsList_Dedicated;
}

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
