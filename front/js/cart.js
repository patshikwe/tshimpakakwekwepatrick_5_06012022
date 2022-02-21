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
// Récupérer le formulaire par sa classe =====
let form = document.querySelector(".cart__order__form");

/** Validation du formulaire
 * N°1 Regex(firstRegExp) autorise les lettres minuscules, majuscules et avec accents, tiret et espace
 * pour les champs prénom et nom.  
 * N°2 RegExp(secondRegExp) pour adresse, autorise les chiffres de 0 à 9 une ou plusieurs fois, les lettres 
 * minuscules, majuscules et avec accents, point, underscore, tiret et espace.
 * N°3 Regex(emailRegExp) pour email est composé en 3 parties, autorise: 1ère: lettres de a à z minuscules et 
 * majuscules, chiffres de 0 à 9, point, underscore et tiret;
 * 2ème: @ une fois, lettres de a à z minuscules et majuscules, chiffres de 0 à 9, point, underscore et tiret 
 * 3ème: point une fois, lettres minuscules de a à z nombre minimum 2 et maximum 10. 
 */
 let firstRegExp = /^[a-zA-ZÅåÄàäôÖöØøÆæçÉéÈèùÜüÊêÛûÎî-\s]+$/;
 let secondRegExp = /^[0-9]+[a-zA-ZÅåÄàäôÖöØøÆæçÉéÈèùÜüÊêÛûÎî._-\s]+$/;
 let thirdRegExp = /^[a-zA-ZÅåÄàäÖöØøÆæçÉéÈèùÜüÊêÛûÎî]+$/;
 let emailRegExp = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$/;

// ********** Ecouter La modification Pénom *****************
form.firstName.addEventListener('change', function() {
  validFirstName(this);
});

// ************ Validation Prénom ***************************
const validFirstName = function(verif) {
  let  testFirstName = firstRegExp.test(verif.value);
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

// *************** Ecouter La modification Adresse ***************
form.address.addEventListener('change', function() {
  validAdress(this);
});

// ************ Validation Adresse ***************
const validAdress = function(verif) {
  let  testAdress = secondRegExp.test(verif.value);
  let addressErrorMsg = document.getElementById("addressErrorMsg");
 
  if (testAdress == true) {
    addressErrorMsg.innerHTML = 'Adresse Valide';
    addressErrorMsg.style.color = 'lime';
    return true;
  }else {
    addressErrorMsg.innerHTML = 'Exemple: 3 Rue Paul';
    addressErrorMsg.style.color = '#fbbcbc';
    return false;
  }
};

// *************** Ecouter La modification Ville ***************
form.city.addEventListener('change', function() {
  validCity(this);
});

// ************ Validation Ville ***************
const validCity = function(verif) {
  let  testCity = thirdRegExp.test(verif.value);
  let cityErrorMsg = document.getElementById("cityErrorMsg");
 
  if (testCity == true) {
    cityErrorMsg.innerHTML = 'Ville Valide';
    cityErrorMsg.style.color = 'lime';
    return true;
  }else {
    cityErrorMsg.innerHTML = 'Ce Champ Accepte Uniquement Le Nom De La Ville';
    cityErrorMsg.style.color = '#fbbcbc';
    return false;
  }
};
// *************** Ecouter La modification Email ***************
form.email.addEventListener('change', function() {
  validEmail(this);
});

// ************ Validation Email ***************
const validEmail = function(verif) {
  let  testEmail = emailRegExp.test(verif.value);
  let emailErrorMsg = document.getElementById("emailErrorMsg");
 
  if (testEmail == true) {
    emailErrorMsg.innerHTML = 'Email Valide';
    emailErrorMsg.style.color = 'lime';
    return true;
  }else {
    emailErrorMsg.innerHTML = 'Email Non Valide';
    emailErrorMsg.style.color = '#fbbcbc';
    return false;
  }
};

// ************* Ecouter et Envoyer le formulaire ***************
form.addEventListener('submit', function(e) {
 
   // Créé objet contact ==========
   const contact = {
    prenom : document.querySelector("#firstName").value,

    nom : document.querySelector("#lastName").value,
 
    adresse : document.querySelector("#address").value,
 
    city : document.querySelector("#city").value,
 
    mail : document.querySelector("#email").value,
  }
  
  /** Soumission aux conditions de validation
   * Si les fonctions de validation sont fausses, pas d'envoi du formulaire
   * Sinon envoi au localeStorage
   */

  if(validFirstName(form.firstName) == false){
    e.preventDefault();
  }else if(validLastName(form.lastName) == false){
    e.preventDefault();
  }else if(validAdress(form.address) == false){
    e.preventDefault();
  }else if(validCity(form.city) == false){
    e.preventDefault();
  }else if(validEmail(form.email) == false){
    e.preventDefault();
  }
  else {
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

