// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');
console.log("test");
const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

var cheapest_tshirt = "https://www.loom.fr/products/le-t-shirt";
console.log(`Cheapest t-shirt: ${cheapest_tshirt}`);




/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */
console.log(marketplace);

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

var num_p = marketplace.length;
console.log(num_p);
// 140

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

console.log("brand names");
var brands = [];
for (var i= 0; i <marketplace.length;i++) {
  if (!(brands.includes(marketplace[i]['brand']))) {
    brands.push(marketplace[i]['brand'])
  }
}
console.log(brands);
console.log(brands.length);
//it shows 5 brands : adresse', 'loom', 'aatise', '1083', 'dedicated'

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

console.log("sorted array");
var c;
var sortmarket;
function price_sort(tab) 
{
  var ordtab = tab;
  for (var i = 0; i <tab.length;i++)
  {
    for(var j = 0; j <= i;j++){
      if (ordtab[i]['price'] < ordtab[j]['price']) 
      {
        c = ordtab[j];
        ordtab[j] = ordtab[i];
        ordtab[i] = c;
      }
    }
  }
  return ordtab;
}
 sortmarket = price_sort(marketplace);
 console.log(sortmarket);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

console.log("sort by date");
function date_is_greater(date1,date2)
{
  date1 = date1.split('-').join('');
  date2 = date2.split('-').join('');
  return Number(date1) < Number(date2);
}

var c;
function date_sort(tab) 
{
  var ordtab = tab;
  for (var i = 0; i <tab.length;i++)
  {
    for(var j = 0; j <= i;j++){
      if (!date_is_greater(ordtab[i]['date'],ordtab[j]['date'])) 
      {
        c = ordtab[j];
        ordtab[j] = ordtab[i];
        ordtab[i] = c;
      }
    }
  }
  return ordtab;
}
var datetab;
datetab = date_sort(marketplace);
console.log(datetab);

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

console.log("specific price range");
var tab = [];
marketplace.forEach(element => {
  if ((element['price'] <= 100) && (element['price'] >= 50))
  {
    tab.push(element)
  }
  
});
console.log(tab);

// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average

console.log("average price");
var avg = 0;
marketplace.forEach(element =>
  {
    avg += element.price;
  })
avg = avg/marketplace.length;
console.log(avg);

//the average price is 91.99285714285715




/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

var tab0 = [];
var tab1 = [];
var tab2 = [];
var tab3 = [];
var tab4 = [];
marketplace.forEach(element =>
   {
     if(element.brand == brands[0]){
       tab0.push(element);
     }
     else if (element.brand == brands[1]){
       tab1.push(element);
     }
     else if (element.brand == brands[2]){
      tab2.push(element);
    }
    else if (element.brand == brands[3]){
      tab3.push(element);
    }
    else if (element.brand == brands[4]){
      tab4.push(element);
    } 
   })
var by_brand = {};
by_brand[brands[0]] = tab0;
by_brand[brands[1]] = tab1;
by_brand[brands[2]] = tab2;
by_brand[brands[3]] = tab3;
by_brand[brands[4]] = tab4;
console.log(by_brand);
console.log("number of products of the brand " + brands[0]);
console.log(by_brand[brands[0]].length);

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

console.log("sort by price for each brand :");
by_brand[brands[0]] = price_sort(tab0);
by_brand[brands[1]] = price_sort(tab1);
by_brand[brands[2]] = price_sort(tab2);
by_brand[brands[3]] = price_sort(tab3);
by_brand[brands[4]] = price_sort(tab4);
console.log(bybrand);

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

console.log("sort by date for each brand :");
by_brand[brands[0]] = date_sort(tab0);
by_brand[brands[1]] = date_sort(tab1);
by_brand[brands[2]] = date_sort(tab2);
by_brand[brands[3]] = date_sort(tab3);
by_brand[brands[4]] = date_sort(tab4);
console.log(by_brand);



/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products





/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties





/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
