
const myProduct = window.location.search.split("?").join("");
console.log(myProduct)

// ===========================================

async function fetchProduct() {
    let product = [];
    await fetch(`http://localhost:3000/api/products/${myProduct}`)
        .then((res) => res.json())
        .then((res2) => {
            product = res2
            console.log(product)
        })
    return product
}

// // ===========================================


function init() {
    console.log(init)
    fetchProduct()
}