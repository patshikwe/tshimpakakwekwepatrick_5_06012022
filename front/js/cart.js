/** keyStorage est la clé stockée dans localStorage
 * Récupérée est assignée dans la variable item
 */
let item = JSON.parse(localStorage.getItem("keyStorage"));
// ========================================================
/** Affichage de la quantité totale et prix total quand le panier est null */
function quantityPriceNull() {
  if (item === null) {
    document.getElementById("totalQuantity").innerHTML = "0";
    document.getElementById("totalPrice").innerHTML = "0";
  }
}
quantityPriceNull();

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
            <input type="number" class="itemQuantity" data-id="${keyStorage._id}" data-color="${keyStorage.choiceColor}" name="itemQuantity" min="1" max="100" value="${keyStorage.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onclick="deleteProduct('${keyStorage._id}')" data-id="${keyStorage._id}">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
  ).join("");

// ---------------------------------------------------
//  Appel fonctions pour quantité totale et prix total
// ---------------------------------------------------
  getTotalPrice();
  getTotalQuantity();
// ---------------------------------------------------
// Appel fonction pour modifier la quantité ================
  changeQuantity();
}

// ================ Fonction pour Qauntité Totale et Prix Total =================
 // Quantité totale des produits(boucle)
  // ----------------------------------
  function getTotalQuantity() {
    let totalQuantity = 0;
    item;
    if(item !== null){
      for(let i = 0; i < item.length; i++){
        totalQuantity += item[i].quantity
      }
      document.getElementById("totalQuantity").innerHTML = `${totalQuantity}`;
    }
  }
   // Prix total des produits(boucle)
  // --------------------------------
  function getTotalPrice() {
    let totalPrice = 0;
    if (item !== null) {
      for(let i = 0; i < item.length; i++){
        totalPrice += item[i].price * item[i].quantity;
      }
      document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
    }
  }
//  ================= Function pour modifier quantité des produits =======
/**Ajouter quantity */
function changeQuantity(basket) {
  item;
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  itemQuantity.forEach((pos) => {
    pos.addEventListener("change", function() {
      console.log(pos);
      for (i = 0; i < item.length; i++) {
        if (item[i]._id === pos.dataset.id
          && item[i].choiceColor === pos.dataset.color) {
          return (
            item[i].quantity++,
            console.log(item[i].quantity),
            localStorage.setItem("keyStorage", JSON.stringify(item)),
            (document.querySelectorAll(".cart__item__content__settings__quantity > p")[i].
            textContent = item[i].quantity),
            window.location.href = "./cart.html"
          );
        }        
      }
    })
  });
}


// ******************* Supprimer Produit **********************************
//  Enreigistré panier dans localStorage ------
function saveBasket(item) {
  localStorage.setItem("keyStorage", JSON.stringify(item));
}

/** Suppression produit dans dans le panier et localStorage */
function deleteProduct(id) {
  console.log(id);
  item;
  item = item.filter(p => p._id != id);
  console.log(item);
  saveBasket(item);
  window.location.href = "./cart.html";
  if (item.length === 0) {
    deleteKey();
  }
}
console.log(item);

// Supprimer la clé keyStorage dans localStorage -------
function deleteKey(item) {
  item;
  console.log(item);
  localStorage.removeItem("keyStorage");
} 
console.log(item);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Formulaire Utilisateur ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/** Récuperé le formulaire par sa classe, assigné à la variable form */
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
 let secondRegExp = /^[a-zA-Z0-9ÅåÄàäôÖöØøÆæçÉéÈèùÜüÊêÛûÎî'._-\s]+$/;
 let thirdRegExp = /^[a-zA-ZÅåÄàäÖöØøÆæçÉéÈèùÜüÊêÛûÎî']+$/;
 let emailRegExp = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$/;

// ********** Ecouter La modification Pénom *****************
form.firstName.addEventListener('change', function() {
  validFirstName(this);
});

// ************ Validation Prénom ***************************
/** validFirstName est une fonction 
 * testFirstName contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * firstNameErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false   */
const validFirstName = function(verif) {
  let  testFirstName = firstRegExp.test(verif.value);
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
 
  if (testFirstName === true) {
    firstNameErrorMsg.innerHTML = 'Prénom Valide';
    firstNameErrorMsg.style.color = 'lime';
    return true;
  }
  else {
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
/** validLastName est une fonction 
 * testLastName contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * lastNameErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false   */
const validLastName = function(verif) {
  let  testLastName = firstRegExp.test(verif.value);
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
 
  if (testLastName === true) {
    lastNameErrorMsg.innerHTML = 'Nom Valide';
    lastNameErrorMsg.style.color = 'lime';
    return true;
  }
  else {
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
/** validAdress est une fonction 
 * testAdress contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * addressErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false   */
const validAdress = function(verif) {
  let  testAdress = secondRegExp.test(verif.value);
  let addressErrorMsg = document.getElementById("addressErrorMsg");
 
  if (testAdress === true) {
    addressErrorMsg.innerHTML = 'Adresse Valide';
    addressErrorMsg.style.color = 'lime';
    return true;
  }
  else {
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
/** valiCity est une fonction 
 * testCity contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * cityErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false   */
const validCity = function(verif) {
  let  testCity = thirdRegExp.test(verif.value);
  let cityErrorMsg = document.getElementById("cityErrorMsg");
 
  if (testCity === true) {
    cityErrorMsg.innerHTML = 'Ville Valide';
    cityErrorMsg.style.color = 'lime';
    return true;
  }
  else {
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
/** validEmail est une fonction 
 * testEmail contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * emailErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false   */
const validEmail = function(verif) {
  let  testEmail = emailRegExp.test(verif.value);
  let emailErrorMsg = document.getElementById("emailErrorMsg");
 
  if (testEmail === true) {
    emailErrorMsg.innerHTML = 'Email Valide';
    emailErrorMsg.style.color = 'lime';
    return true;
  }
  else {
    emailErrorMsg.innerHTML = 'Email Non Valide';
    emailErrorMsg.style.color = '#fbbcbc';
    return false;
  }
};

// ************* Ecouter et Envoyer le formulaire dans localStorage ***************
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  /** const contact est un objet
   * chaque clé appelle une méthode qui récupère son id
   * value correpond à la saisie du champ de formulaire par l'utilisateur
   */
   const contact = {
    firstName : document.querySelector("#firstName").value,

    lastName : document.querySelector("#lastName").value,
 
    address : document.querySelector("#address").value,
 
    city : document.querySelector("#city").value,
 
    email : document.querySelector("#email").value,
  }
  // ======================================
  /** Soumission aux conditions de validation
   * Si les fonctions de validation sont vraies et item est différent de null,
   * envoi du formulaire(dans localStorage)
   * appel fonction sendToApi pour envoyer dans l'API
  */
  item;
 console.log(item);
  if (validFirstName(form.firstName) === true 
      && validLastName(form.lastName ) === true
      && validAdress(form.address) === true
      && validCity(form.city) === true
      && validEmail(form.email) === true 
      && item !== null){
    localStorage.setItem("contact",JSON.stringify(contact));
    fetchOrder();
  }else {
    alert("Votre panier ne doit pas être vide et le formulaire complété");
  }
  
});
// ===========================================================
// --------------- Envoyer vers API --------------------------
async function fetchOrder () {
/** const contact est un objet
 * chaque clé appelle une méthode qui récupère son id
 * value correpond à la saisie du champ de formulaire par l'utilisateur
 */
 const contact = {
  firstName : document.querySelector("#firstName").value,
  
  lastName : document.querySelector("#lastName").value,
  
  address : document.querySelector("#address").value,
  
  city : document.querySelector("#city").value,
  
  email : document.querySelector("#email").value,
  }
   console.log(contact);
  // ---------------------------------------------------------------
  // Créeé un tableau uniquement avec les id par la méthode map ---
  let products = item.map(el => {
    return el._id
  })
  console.log(products); 
  // ---------------------------------------------
  //  
  const send = {
    contact,
    products
  }
    console.log(send);

  let responseId = [];
  await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(send)
  })
  .then((res) => res.json())
    .then(function (data) {
        responseId = data;
        console.log(responseId);
        localStorage.setItem("dataRes", JSON.stringify(responseId));
        deleteKey();
        window.location.replace("./confirmation.html");
        return responseId;
    });
}
   
// =================================================================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page cart.html */

function init() {
    basket();
}

