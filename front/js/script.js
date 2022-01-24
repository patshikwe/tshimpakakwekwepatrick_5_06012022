/* Create 8 elements(a) children of element id= "items"
crée 8 éléments(a) enfants de l'élément id= "items"*/
// const numberLink = 8
// for(let i = 0; i < numberLink; i++)  {
//     let link = document.createElement("a");
//     const continent = document.getElementById("items");
//     continent.appendChild(link);
//     link.className = 'my-link';
    
    // console.log(link);
// }

// ===================================================


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

   let section = document.getElementById("items");
   section.innerHTML = `<a href="./product.html?id=${productData[0]._id}">
   <article>
     <img src="${productData[0].imageUrl}" alt="${productData[0].altTxt}">
     <h3 class="productName">${productData[0].name}</h3>
     <p class="productDescription">${productData[0].description}</p>
   </article>
 </a>`;

 section.insertAdjacentHTML('beforeend', `<a href="./product.html?id=${productData[1]._id}">
 <article>
   <img src="${productData[1].imageUrl}" alt="${productData[1].altTxt}">
   <h3 class="productName">${productData[1].name}</h3>
   <p class="productDescription">${productData[1].description}</p>
 </article>
</a>`);

section.insertAdjacentHTML('beforeend', `<a href="./product.html?id=${productData[2]._id}">
<article>
  <img src="${productData[2].imageUrl}" alt="${productData[2].altTxt}">
  <h3 class="productName">${productData[2].name}</h3>
  <p class="productDescription">${productData[2].description}</p>
</article>
</a>`);
    
section.insertAdjacentHTML('beforeend', `<a href="./product.html?id=${productData[3]._id}">
<article>
  <img src="${productData[3].imageUrl}" alt="${productData[3].altTxt}">
  <h3 class="productName">${productData[3].name}</h3>
  <p class="productDescription">${productData[3].description}</p>
</article>
</a>`);

section.insertAdjacentHTML('beforeend', `<a href="./product.html?id=${productData[4]._id}">
<article>
  <img src="${productData[4].imageUrl}" alt="${productData[4].altTxt}">
  <h3 class="productName">${productData[4].name}</h3>
  <p class="productDescription">${productData[4].description}</p>
</article>
</a>`);

section.insertAdjacentHTML('beforeend', `<a href="./product.html?id=${productData[5]._id}">
<article>
  <img src="${productData[5].imageUrl}" alt="${productData[5].altTxt}">
  <h3 class="productName">${productData[5].name}</h3>
  <p class="productDescription">${productData[5].description}</p>
</article>
</a>`);

section.insertAdjacentHTML('beforeend', `<a href="./product.html?id=${productData[6]._id}">
<article>
  <img src="${productData[6].imageUrl}" alt="${productData[6].altTxt}">
  <h3 class="productName">${productData[6].name}</h3>
  <p class="productDescription">${productData[6].description}</p>
</article>
</a>`);

section.insertAdjacentHTML('beforeend', `<a href="./product.html?id=${productData[7]._id}">
<article>
  <img src="${productData[7].imageUrl}" alt="${productData[7].altTxt}">
  <h3 class="productName">${productData[7].name}</h3>
  <p class="productDescription">${productData[7].description}</p>
</article>
</a>`);

}

// =================================================


function init() {
    console.log(init)
    createLink()
}