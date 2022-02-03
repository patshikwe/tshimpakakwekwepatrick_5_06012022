let item = JSON.parse(localStorage.getItem("obj"));

async function basket() {
    await item;
    console.log(item);
    
  document.getElementById("cart__items").innerHTML = item.map((obj) => 
  ` <article class="cart__item" data-id="${obj._id}" data-color="${obj.choiceColor}">
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

  //=======================================================
  // Prix total des produits(affichage page panier)
  // ============================================
  document.getElementById("totalPrice").innerHTML = `${globalPrice}`;

  // Quantité totale des produits(affichage page panier)
  // ================================================
  document.getElementById("totalQuantity").innerHTML = `${sum}`;
  // ===============================
  // Suppression des produi
    // ====================
  let buttonDelete = document.querySelectorAll(".deleteItem");
  console.log(buttonDelete);

}

 // Quantité totale des produits(boucle)
    // ===================================
let sum = 0
item = JSON.parse(localStorage.getItem("obj"));

for(let i = 0; i < item.length; i++){
  sum += item[i].quantity
}
// ======================
 // Prix total des produits(boucle)
    // =============================
let globalPrice = 0

for(let i = 0; i < item.length; i++){
  globalPrice += item[i].price
}

// ===========================================
/** Validation du formulaire
 * Regex autorise les lettres majuscules, minuscules et avec accents, espace et tirets
 * pour les champs prénom et nom. if interdit l'envoie du champs vide. 
 */
document.querySelector("form.cart__order__form").addEventListener("submit", function(e) {
 
    let prenom = document.getElementById("firstName");
    let nom = document.getElementById("lastName");
    let myRegex = /^[a-zA-ZÅåÄàäÖöØøÆæÉéÈèÜüÊêÛûÎî-\s]+$/;

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
