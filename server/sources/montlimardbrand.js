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
  return $('.category-products .item')
    .map((i, element) => {
      if (isNaN(parseInt($(element).find('.product-info .price-box').text()))===false)
      {
        
      const price = parseInt(
        $(element)
          .find('.product-info .price-box')
          .text()
      );
      const link = $(element)
      .find('.product-name a')
      .attr('href');
        
        

      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
       

      return {'brand':'Montlimart',"name": $(element)
      .find('.product-info .product-name').text().trim(), price,link,'photo': $(element)
      .find('.product-image a img')
      .attr('src'),'date':date,'_id': uuidv5(link, uuidv5.URL),'uuid': uuidv5(link, uuidv5.URL)
    };}
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
