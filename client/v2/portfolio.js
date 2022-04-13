// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors


const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const SelectBrand = document.querySelector('#brand-select');
const sectionProducts = document.querySelector('#products');
const selectDate = document.querySelector('#recently');
const selectPrice = document.querySelector('#price');
const selectSort = document.querySelector('#sort');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNew = document.querySelector('#nbNew');
const p50 = document.querySelector('#p50');
const p90 = document.querySelector('#p90');
const p95 = document.querySelector('#p95');
const lastDate = document.querySelector('#lastDate');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

const request_products = async () => {
  try {
    const response = await fetch(
      `https://server-theta-eight.vercel.app/products/find/?currentPage=1&pageLimit=0`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
 const renderIndicators = pagination => {
  const {count} = pagination;

  let new_indice = currentProducts.filter(elt => Date.parse(elt.released) > Date.now() - 12096e5*2).length;

  spanNbNew.innerHTML = new_indice;
  spanNbProducts.innerHTML = count;

  let sort_p_value = currentProducts.sort((x,y) => x.price - y.price);
  p50.innerHTML = sort_p_value[Math.round(sort_p_value.length/2)].price;
  p90.innerHTML = sort_p_value[Math.round(sort_p_value.length/10)].price;
  p95.innerHTML = sort_p_value[Math.round(sort_p_value.length/20)].price;

  let sortDate = currentProducts.sort((x,y) => Date.parse(y.released) - Date.parse(x.released));
  lastDate.innerHTML = sortDate[0].date;
};
const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

SelectBrand.addEventListener('change', async (event) => {
  let products = await request_products();
  setCurrentProducts(products);
  if (event.target.value !== "")
    currentProducts = currentProducts.filter(elt => elt.brand === event.target.value);
  currentPagination.count = currentProducts.length;
  currentPagination.pageCount = Math.floor(currentPagination.count / 12) + 1;
  currentPagination.pageSize = 12;
  selectPage.value = "1";
  selectShow.value = "12";
  render(currentProducts.slice(0,12), currentPagination);
});

selectDate.addEventListener('change', async (event) => {
  let min_date = Date.now() - 12096e5*2;
  if (selectDate.checked === true)
    currentProducts = currentProducts.filter(elt => Date.parse(elt.released) > min_date);
  else  {
    let products = await request_products();
    setCurrentProducts(products);
  }

  currentPagination.count = currentProducts.length;
  currentPagination.pageCount = Math.floor(currentPagination.count / 12) + 1;
  currentPagination.pageSize = 12;
  selectPage.value = "1";
  selectShow.value = "12";
  render(currentProducts.slice(0,12), currentPagination);
});

selectPrice.addEventListener('change', async (event) => {
  if (selectPrice.checked === true)
    currentProducts = currentProducts.filter(elt => elt.price < 50);
  else  {
    let products = await request_products();
    setCurrentProducts(products);
  }
  currentPagination.count = currentProducts.length;
  currentPagination.pageCount = Math.floor(currentPagination.count / 12) + 1;
  currentPagination.pageSize = 12;
  selectPage.value = "1";
  selectShow.value = "12";
  render(currentProducts.slice(0,12), currentPagination);
});

selectSort.addEventListener('change', async (event) => {
  switch (event.target.value) {
    case 'price-asc':
      currentProducts = currentProducts.sort((a,b) => a.price - b.price);
      break;
    case 'price-desc':
      currentProducts = currentProducts.sort((a,b) => b.price - a.price);
      break;
    case 'date-asc':
      currentProducts = currentProducts.sort((a,b) => Date.parse(a.released) - Date.parse(b.released));
      break;
    case 'date-desc':
      currentProducts = currentProducts.sort((a,b) => Date.parse(b.released) - Date.parse(a.released));
      break;
  }
  currentPagination.count = currentProducts.length;
  currentPagination.pageCount = Math.floor(currentPagination.count / 12) + 1;
  currentPagination.pageSize = 12;
  selectPage.value = "1";
  selectShow.value = "12";
  render(currentProducts.slice(0,12), currentPagination);
});


/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

/**
* Select the page number
 */

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),parseInt(selectShow.value))
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

/**
 * Display by brand
 */

var brands = [];
 const api1 = async (page = 1, size = -1) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    body.data.result.forEach(element => 
      {
        if (!(brands.includes(element.brand))) 
        {
            brands.push(element.brand);
        }
      })
    return body.data.result;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};
var api_b = api1();
