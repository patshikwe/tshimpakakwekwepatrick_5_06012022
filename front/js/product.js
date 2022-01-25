

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

console.log(fetchProduct)

// ===========================================






// ===========================================


// function init() {
//     console.log(init)
//     createLink()
// }