/** */

let params = new URLSearchParams(window.location.search);
let myProduct = params.get("id");
console.log(myProduct);

// ===========================================
/**Cette fonction permet d'aller récupérer les données d'un produit dans l'API(back-end);
    les transformées en json et les stockées dans une variable sous forme de tableau;
    myProduct correspond à l'id du produit sélectionné;
    ici la variable product stocke les données d'un produit(c'est un tableau)
 */

let product = [];

async function fetchProduct() {
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
   addProduct(product);
};

// ==================================================

const addProduct =  () => {
    let buttonProduct = document.getElementById("addToCart");
    console.log(buttonProduct);
    buttonProduct.addEventListener("click", () => {
        let arrayProducts = JSON.parse(localStorage.getItem("obj"));
        let select = document.getElementById("colors");
        console.log(select.value);
       
        const selectColor = Object.assign({}, product, {
            choiceColor : `${select.value}`,
            quantity : 1,
        }); 

        console.log(selectColor);

        if(arrayProducts == null) {
            arrayProducts = [];
            arrayProducts.push(selectColor);
            console.log(arrayProducts);
            localStorage.setItem("obj", JSON.stringify(arrayProducts));
        }
        else {
            for (i = 0; i < arrayProducts.length; i++){
                console.log("test");
                if(arrayProducts[i]._id == product._id && 
                    arrayProducts[i].choiceColor == select.value){
                    return (
                        arrayProducts[i].quantity++,
                        console.log("quantity++"),
                        localStorage.setItem("obj",JSON.stringify(arrayProducts)),
                        arrayProducts = JSON.parse(localStorage.getItem("obj"))
                    );
                }
            }
            for(i = 0; i < arrayProducts.length; i++){
                if(
                    (arrayProducts[i]._id == product._id && 
                    arrayProducts[i].choiceColor != select.value) || 
                    arrayProducts[i]._id != product._id
                    ){
                    return (
                        console.log("new"),
                        arrayProducts.push(selectColor),
                        localStorage.setItem("obj",JSON.stringify(arrayProducts)),
                        arrayProducts = JSON.parse(localStorage.getItem("obj"))
                    );
                }
            }
        }
    });
    return (arrayProducts = JSON.parse(localStorage.getItem("obj")));
};

// // ===========================================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page product.html */

function init() {
    console.log(init);
    productSelect();
   
}