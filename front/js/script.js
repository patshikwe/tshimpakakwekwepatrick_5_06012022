

async function fetchData() {
    let data = [];
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((res2) => {
            data = res2
            console.log(data);
        });
    return data
}

// =====================================


const createLink = async () => {
   const data = await fetchData();

document.getElementById("items").innerHTML = data.map((product)=> 
`<a href="./product.html?${product._id}">
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