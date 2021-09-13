const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;

  // Get the api data
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

// show all products in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);

  // loop through each product
  for (const product of allProducts) {
    // It will be image in place of images (Fixed)
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
    <div>
      <img class="product-image mb-3" src=${image}></img>
    </div>
    <h4>${product.title}</h4>
    <p>Category: ${product.category}</p>
    <p>Reactions count: ${product.rating.count}</p>
    <p>Rating: ${product.rating.rate}</p>
    <h3>Price: $ ${product.price}</h3>
    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
    <button onclick="loadASingleProduct(${product.id})" id="details-btn" class="btn btn-primary">Details</button></div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  // the function invoked to update delivery charge and total Tax
  updateTaxAndCharge();

  // update (increase) the number of products added to the cart
  document.getElementById("total-Products").innerText = count;

  // to calculate the total, updateTotal function is invoked
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  // instead of the parseInt method, the parseFloat method is used to get the accurate calculation.
  const converted = parseFloat(element);

  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // instead of the Math.round(), the toFixed method is used. Fixed
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }

  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }

  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};

// load a single product when the details button is clicked
const loadASingleProduct = (productId) => {
  // get the api data for a single product
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(data => displayASingleProduct(data));
};

// display a single product to UI when the details button is clicked
const displayASingleProduct = (aProduct) => {
  const singleProductContainer = document.getElementById('single-product');
  singleProductContainer.style.display = 'block';

  singleProductContainer.innerHTML = `
  <img src="${aProduct.image}" width="150" class="mb-3"></img>
  <h3>${aProduct.title}</h3>
  <span>Category: ${aProduct.category}</span><br>
  <span>Reactions count: ${aProduct.rating.count}</span><br>
  <span>Rating: ${aProduct.rating.rate}</span>
  <h4 class="mt-2">Price: $ ${aProduct.price}</h4>
  `;
};