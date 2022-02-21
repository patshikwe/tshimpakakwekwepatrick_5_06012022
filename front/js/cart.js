/** keyStorage est la clé stockée dans localStorage
 * Récupérée est assignée dans la variable item
 */
let item = JSON.parse(localStorage.getItem("keyStorage"));
// ======================================================
// Données panier ===========
async function basket() {
    await item;
    console.log(item);
    
  document.getElementById("cart__items").innerHTML = item.map((keyStorage) => 
  ` <article class="cart__item" data-id="${keyStorage._id}" data-color="${keyStorage.choiceColor}">
      <div class="cart__item__img">
        <img src="${keyStorage.imageUrl}" alt="${keyStorage.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${keyStorage.name}</h2>
          <p>${keyStorage.choiceColor}</p>
          <p>${keyStorage.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : ${keyStorage.quantity} </p>
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
  // supprimer produit dans le panier
    // =============================
  const paragraphDelete = document.querySelector(".deleteItem");
  console.log(paragraphDelete);

  // const buttonDelete = Array.from(paragraphDelete);
  // console.log(buttonDelete);

  const collectArticle = document.querySelectorAll(".cart__item");
  console.log(collectArticle);

  // const dataArticle = Array.from(collectArticle);
  // console.log(dataArticle);

  let closestArticle = paragraphDelete.closest(".cart__item");
  console.log(closestArticle);

  // function selectDelete() {
  //   for (let i = 0; i < buttonDelete.length; i++) {
  //     buttonDelete[i].addEventListener("click", (e) => {
  //       item = item.filter(el => el._id !== item._id);
        
  //     });
  //   }
  // }
  // selectDelete();
  
  // for (let i = 0; i < closestArticle.length; i++) {
  //   closestArticle[i].addEventListener("click", function() {
  //     // dataArticle[i].addEventListener()
  //     item = item.filter(p => p.id != product.id);
  //   }) 
  // }
  // console.log(item);
}

console.log(window.location.href);

 // Quantité totale des produits(boucle)
    // ===================================
let sum = 0
item = JSON.parse(localStorage.getItem("keyStorage"));

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

let form = document.querySelector(".cart__order__form");

/** Validation du formulaire
 * Regex autorise les lettres majuscules, minuscules et avec accents, espace et tirets
 * pour les champs prénom et nom.  
 */
// **************** Ecouter La modification Pénom *****************
form.firstName.addEventListener('change', function() {
  validFirstName(this);
});

// ************ Validation Prénom ***************
const validFirstName = function(verif) {
  // regExp pour prénom  ----------
  let firstRegExp = /^[a-zA-ZÅåÄàäÖöØøÆæçÉéÈèùÜüÊêÛûÎî-\s]+$/;

  let  testFirstName = firstRegExp.test(verif.value);
  console.log(testFirstName);

  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
 
  if (testFirstName == true) {
    firstNameErrorMsg.innerHTML = 'Prénom Valide';
    firstNameErrorMsg.style.color = 'lime';
    return true;
  }else {
    firstNameErrorMsg.innerHTML = 'Prénom Non Valide';
    firstNameErrorMsg.style.color = '#fbbcbc';
    return false;
  }
};

// *************** Ecouter La modification Nom ***************
form.lastName.addEventListener('change', function() {
  validLastName(this);
});

// ************ Validation Nom ***************
const validLastName = function(verif) {
  // RegExp pour Nom  ----------
  let firstRegExp = /^[a-zA-ZÅåÄàäÖöØøÆæçÉéÈèùÜüÊêÛûÎî-\s]+$/;

  let  testLastName = firstRegExp.test(verif.value);

  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
 
  if (testLastName == true) {
    lastNameErrorMsg.innerHTML = 'Nom Valide';
    lastNameErrorMsg.style.color = 'lime';
    return true;
  }else {
    lastNameErrorMsg.innerHTML = 'Nom Non Valide';
    lastNameErrorMsg.style.color = '#fbbcbc';
    return false;
  }
};

// ************* Ecouter et Envoyer le formulaire ***************
form.addEventListener('submit', function(e) {
   // Créé objet contact
   const contact = {
    prenom : document.querySelector("#firstName").value,

    nom : document.querySelector("#lastName").value,
 
    adresse : document.querySelector("#address").value,
 
    city : document.querySelector("#city").value,
 
    mail : document.querySelector("#email").value,
  }
    
  // ---------------------------------------
  
  /** */

  if(validFirstName(form.firstName) && (form.lastName)){
    localStorage.setItem("contact",JSON.stringify(contact));
    form.submit();
  }
  
});


// =================================================================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page cart.html */

function init() {
    basket();
}

