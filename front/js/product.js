/** */

let params = new URLSearchParams(window.location.search);
let idProduct = params.get("id");
console.log(idProduct);

// ===========================================
/**Cette fonction permet d'aller récupérer les données d'un produit dans l'API(back-end); 
 * les transformées en json et les stockées dans une variable sous forme de tableau;
 * idProduct correspond à l'id du produit sélectionné;
 * ici la variable product stocke les données d'un produit(c'est un tableau).
*/
let product = [];

async function fetchProduct() {
    await fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then((res) => res.json())
        .then((res2) => {
            product = res2
            console.log(product);
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
    
   addProduct(); 
};

// ==================================================
// Sauvegarder panier dans localStorage -------------
function saveBasket(item) {
    localStorage.setItem("keyStorage", JSON.stringify(item));
}

// ============  ===============================

function addProduct() {

    let buttonProduct = document.getElementById("addToCart");
    let input = document.querySelector("#quantity");
    
    buttonProduct.addEventListener(("click"), (e) => {
        let item = JSON.parse(localStorage.getItem("keyStorage"));
        let select = document.getElementById("colors");

        /** selectColor est une variable par la quelle est assignée des éléments
         * choiceColor(la couleur choisie) et quantity(la quantité du produit de même id)
         * selectColor est un élément de product(tableau)
         */
        let quantity = 1;
        const selectColor = Object.assign({}, product, {
            choiceColor : `${select.value}`,
            quantity : quantity * input.value,
        }); 
    
        if (item === null) {
            item = [];
            if (select.value === "") {
                item = [];
            }else {
                item.push(selectColor);
                saveBasket(item);
            }
            
        } else if (item !== null ) {
            if (select.value === "") {
                item = [];
            }
            for (i = 0; i < item.length; i++){
                if (item[i]._id === product._id && 
                    item[i].choiceColor === select.value){
                    let cost = 1 * input.value;
                    item[i].quantity += cost;
                    saveBasket(item);
                    return (item = JSON.parse(localStorage.getItem("keyStorage")),
                        window.location.href = "./cart.html");
                }
            }
            for (i = 0; i < item.length; i++) {
                if((item[i]._id === product._id && 
                    item[i].choiceColor !== select.value) || 
                    item[i]._id !== product._id){
                    item.push(selectColor);
                    saveBasket(item);
                    return (item = JSON.parse(localStorage.getItem("keyStorage")),
                        window.location.href = "./cart.html");
                }
            }
        }
        window.location.href = "./cart.html";
    });
    return (item = JSON.parse(localStorage.getItem("keyStorage")));
}

// // ===========================================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page product.html */

function init() {
    console.log(init);
    productSelect();
   
}