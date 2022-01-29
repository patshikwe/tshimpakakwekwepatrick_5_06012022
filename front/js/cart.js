let addItem = JSON.parse(localStorage.getItem("obj"));

const basket = async () => {
        await addItem;
        console.log(addItem);

       document.getElementById("cart__items").innerHTML = addItem.map((obj) => 
        `<article class="cart__item" data-id="${obj._id}" data-color="${obj.choiceColor}">
        <div class="cart__item__img">
          <img src="${obj.imageUrl}" alt="${obj.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${obj.name}</h2>
            <p>${obj.choiceColor}</p>
            <p>${obj.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${obj.quantity} </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
       ).join("");
//     //=======================================================
//         // Prix total des produits
//        document.getElementById("totalPrice").innerHTML = addItem.map((obj) => 
//        `${obj.quantity * obj.price}`
//        );

//         // Quantité totale des produits
//        document.getElementById("totalQuantity").innerHTML = addItem.map((obj) => 
//        `${obj.quantity}`
//        );
};

// ===========================================
// Formulaire

document.querySelector("form.cart__order__form").addEventListener("submit", function(e) {
 
    let prenom = document.getElementById("firstName");
    let nom = document.getElementById("lastName");
    let adresse = document.getElementById("address");
    let ville = document.getElementById("city");
    let mail = document.getElementById("email");
    let myRegex = /^[a-zA-Z-\s]+$/;

    if(prenom.value.trim() == "") {
      e.preventDefault();
    }else if(myRegex.test(prenom.value) == false){
      document.getElementById("firstNameErrorMsg").innerHTML = "Le Prénom doit comporter des lettres, des tirets et espace uniquement";
      e.preventDefault();
    }

    if(nom.value.trim() == "") {
      e.preventDefault();
    }else if(myRegex.test(nom.value) == false){
      document.getElementById("lastNameErrorMsg").innerHTML = "Le Nom doit comporter des lettres, des tirets et espace uniquement";
      e.preventDefault();
    }

    
});




// ============================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page cart.html */

function init() {
    basket();
}