// Récupérer uniquement l'id (hors du tableau)
const myProduct = window.location.search.split("?").join("");
console.log(myProduct)

// ===========================================
/** Cette fonction permet d'aller récupérer les données d'un produit dans l'API(back end);
    les transformées en json et les stockées dans une variable sous forme de tableau;
    myProduct correspond à l'id du produit selectionné;
    ici la variable product stocke les données d'un produit(c'est un tableau) */

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

// ==============================================
/**  */

const productSelect = async () => {
    const product = await fetchProduct();

   let image = document.querySelector(".item__img");
   image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

   document.querySelector(".item__content__titlePrice > h1#title").innerHTML = 
   `${product.name}`;

   document.querySelector(".item__content__titlePrice > p > span#price").innerHTML = 
   `${product.price}`;

   document.querySelector(".item__content__description > p#description").innerHTML = 
   `${product.description}`;
 
   product.colors.forEach(colorName => {
    let tagOption = document.createElement("option");

    document.querySelector("select#colors").appendChild(tagOption);
    tagOption.innerHTML = `${colorName}`;
    tagOption.value = `${colorName}`;
   });
   
};

// // ===========================================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page product.html */

function init() {
    console.log(init);
    productSelect();
}