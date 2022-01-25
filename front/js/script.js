

async function fetchProduct() {
    let productData = [];
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((res2) => {
            productData = res2
            console.log(productData);
        });
    return productData
}

// =====================================


const createLink = async () => {
   const productData = await fetchProduct();

document.getElementById("items").innerHTML = productData.map((product)=> 
`<a href="./product.html?id=${product._id}">
<article>
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  <h3 class="productName">${product.name}</h3>
  <p class="productDescription">${product.description}</p>
</article>
</a>`
).join("");


}

// =================================================


function init() {
    console.log(init)
    createLink()
}