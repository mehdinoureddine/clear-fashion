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

  return $('.product_list.grid.row .left-block')
  .map((i, element) => {


    const name = $(element).parent()
    .find('.product-name')
    .attr('title');

    const link =$(element)
    .find('.product-image-container a')
    .attr('href');

    const price =
    parseFloat($(element).parent()
      .find('.price')
      .text())
  ;
   const photo =  $(element)
        .find('.product-image-container a img')
        .attr('data-original');

      
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return {
     'brand': 'adresse',
      name,
      price,
      link,
      photo,
      'date':date,
      '_id': uuidv5(link, uuidv5.URL),
      'uuid': uuidv5(link, uuidv5.URL)
     
    };
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
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
