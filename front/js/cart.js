/**
 * @returns {Promise}
 * fetch avec pour argument l'url, récupère l'ensemble de produits.
 * Ces données ne seront pas stockées au localStorage mais pour afficher le prix.
 */
const fetchData = async () =>
  await fetch("http://localhost:3000/api/products")
    .then((prom) => prom.json())
    .catch((error) => {
      let cartOfItems = document.querySelector("#cart__items");
      cartOfItems.insertAdjacentHTML(
        "beforebegin",
        "<p>Échec du chargement des données</p>"
      );
      let paragraph = document.querySelector(".cart > p");
      paragraph.style.fontSize = "1.3em";
      paragraph.style.color = "#fbbcbc";
      paragraph.style.textAlign = "center";
    });

/* keyStorage est la clé stockée dans localStorage. 
   Elle est récupérée, est assignée dans la variable item
 */
let item = JSON.parse(localStorage.getItem("keyStorage"));
// --- Tableau vide à utiliser pour contenir le prix de produit ---
let arrayOfProducts = [];
// ========================================================
// Affichage de la quantité totale et prix total quand le panier est vide
function quantityPriceNull() {
  if (item === null) {
    document.getElementById("totalQuantity").innerHTML = "0";
    document.getElementById("totalPrice").innerHTML = "0";
  }
}
quantityPriceNull();

// ======================================================
// Données panier, implémentation de la carte ===========
async function basket() {
  await item;
  arrayOfProducts = await fetchData();

  if (item !== null) {
    document.getElementById("cart__items").innerHTML = item
      .map(
        (keyStorage) =>
          ` <article class="cart__item" data-id="${keyStorage._id}" data-color="${keyStorage.choiceColor}">
        <div class="cart__item__img">
          <img src="${keyStorage.imageUrl}" alt="${keyStorage.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${keyStorage.name}</h2>
            <p>${keyStorage.choiceColor}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${keyStorage.quantity} </p>
              <input type="number" class="itemQuantity" data-id="${keyStorage._id}" data-color="${keyStorage.choiceColor}" name="itemQuantity" min="1" max="100" value="${keyStorage.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem" onclick="deleteProduct('${keyStorage._id}','${keyStorage.choiceColor}')" data-id="${keyStorage._id}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
      )
      .join("");

    // Implémentaion du prix des produits *************************
    if (item._id === arrayOfProducts._id) {
      for (i = 0; i < item.length; i++) {
        let cartDescription = document.querySelectorAll(
          ".cart__item__content__description"
        );
        let paragraphPrice = document.createElement("p");
        cartDescription[i].appendChild(paragraphPrice);
        paragraphPrice.innerHTML = arrayOfProducts[i].price;
      }
    }
  }

  // ---------------------------------------------------
  //  Appel fonctions pour quantité totale et prix total
  // ---------------------------------------------------
  getTotalPrice(arrayOfProducts);
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
  if (item !== null) {
    for (let i = 0; i < item.length; i++) {
      totalQuantity += item[i].quantity;
    }
    document.getElementById("totalQuantity").innerHTML = `${totalQuantity}`;
  }
}
// Prix total des produits(boucle)
// --------------------------------
function getTotalPrice(arrayOfProducts) {
  let totalPrice = 0;
  if (item !== null) {
    if (item._id === arrayOfProducts._id) {
      for (let i = 0; i < item.length; i++) {
        totalPrice += arrayOfProducts[i].price * item[i].quantity;
      }
      document.getElementById("totalPrice").innerHTML = `${totalPrice}`;
    }
  }
}
//  ================= Function pour modifier la quantité des produits =======
/**
 * @param {function(basket)}
 * @param {Object[]} item
 * if pour la quantité plus;
 * compare l'id et couleur dans item et ceux de dataset sont-ils identiques
 * et la quantité dans item est inférieure à celle saisie par l'utilisateur.
 * else if pour quantité moins;
 * fait la même comparaison de couleur et id,
 * et la quantité dans item est supérieure à celle saisie par l'utilisateur.
 */
function changeQuantity(basket) {
  item;
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  let input = document.querySelectorAll(".itemQuantity");
  itemQuantity.forEach((el) => {
    el.addEventListener("change", function () {
      for (i = 0; i < item.length; i++) {
        if (
          item[i]._id === el.dataset.id &&
          item[i].choiceColor === el.dataset.color &&
          item[i].quantity < input[i].value && 
          (input[i].value > 0 && input[i].value < 101)
        ) {
          return (
            item[i].quantity++,
            localStorage.setItem("keyStorage", JSON.stringify(item)),
            (document.querySelectorAll(
              ".cart__item__content__settings__quantity > p"
            )[i].textContent = item[i].quantity),
            getTotalQuantity(),
            getTotalPrice(arrayOfProducts)
          );
        } else if (
          item[i]._id === el.dataset.id &&
          item[i].choiceColor === el.dataset.color &&
          item[i].quantity > input[i].value && 
          (input[i].value > 0 && input[i].value < 101)
        ) {
          return (
            item[i].quantity--,
            localStorage.setItem("keyStorage", JSON.stringify(item)),
            (document.querySelectorAll(
              ".cart__item__content__settings__quantity > p"
            )[i].textContent = item[i].quantity),
            getTotalQuantity(),
            getTotalPrice(arrayOfProducts)
          );
        }
      }
    });
  });
}

// ******************* Supprimer Produit **********************************
//  Enreigistré panier dans localStorage, cette fonction prend pour paramettre item------
function saveBasket(item) {
  localStorage.setItem("keyStorage", JSON.stringify(item));
}

/**
 * Suppression produit dans le panier et localStorage
 * @param {string} id
 * @param {string} color
 */
function deleteProduct(id, color) {
  item = item.filter((el) => el._id !== id || el.choiceColor !== color);
  saveBasket(item);
  window.location.href = "./cart.html";
  if (item.length === 0) {
    deleteKey();
  }
}


// Supprimer la clé keyStorage dans localStorage -------
function deleteKey(item) {
  localStorage.removeItem("keyStorage");
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Formulaire Utilisateur ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Ne pas afficher le formulaire quand le panier est vide
function displayForm() {
  let divForm = document.querySelector(".cart__order");
  if (item === null) {
    divForm.style.display = "none";
  }
}

// Récuperé le formulaire par sa classe, assigné à la variable form
let form = document.querySelector(".cart__order__form");

/*
 * Validation du formulaire
 * N°1 Regex(firstRegExp) pour les champs prénom et nom, autorise les lettres minuscules, majuscules et avec accents, tiret et espace.
 * N°2 RegExp(secondRegExp) pour adresse, autorise les chiffres de 0 à 9 une ou plusieurs fois, les lettres
 * minuscules, majuscules et avec accents,apostrophe, point, underscore, tiret et espace.
 * N°3 Regex(thirdRegExp) pour ville, autorise les lettres minuscules, majuscules et avec accents et apostrophe.
 * N°4 Regex(emailRegExp) pour email est composé en 3 parties, autorise: 1ère: lettres de a à z minuscules et
 * majuscules, chiffres de 0 à 9, point, underscore et tiret;
 * 2ème: @ une fois, lettres de a à z minuscules et majuscules, chiffres de 0 à 9, point, underscore et tiret
 * 3ème: point une fois, lettres minuscules de a à z nombre minimum 2 et maximum 10.
 */
let firstRegExp = /^[a-zA-ZÅåÄàäôÖöØøÆæçÉéÈèùÜüÊêÛûÎî-\s]+$/;
let secondRegExp = /^[a-zA-Z0-9ÅåÄàäôÖöØøÆæçÉéÈèùÜüÊêÛûÎî'._-\s]+$/;
let thirdRegExp = /^[a-zA-ZÅåÄàäÖöØøÆæçÉéÈèùÜüÊêÛûÎî']+$/;
let emailRegExp = /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$/;

// ********** Ecouter La modification Pénom *****************
form.firstName.addEventListener("change", function () {
  validFirstName(this);
});

// ************ Validation Prénom ***************************
/**
 * validFirstName est une fonction
 * testFirstName contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * firstNameErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false
 */
function validFirstName(verif) {
  let testFirstName = firstRegExp.test(verif.value);
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

  if (testFirstName === true) {
    firstNameErrorMsg.innerHTML = "Prénom Valide";
    firstNameErrorMsg.style.color = "lime";
    return true;
  } else {
    firstNameErrorMsg.innerHTML = "Prénom Non Valide";
    firstNameErrorMsg.style.color = "#fbbcbc";
    return false;
  }
}

// *************** Ecouter La modification Nom ***************
form.lastName.addEventListener("change", function () {
  validLastName(this);
});

// ************ Validation Nom ***************
/**
 * validLastName est une fonction
 * testLastName contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * lastNameErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false
 */
function validLastName(verif) {
  let testLastName = firstRegExp.test(verif.value);
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

  if (testLastName === true) {
    lastNameErrorMsg.innerHTML = "Nom Valide";
    lastNameErrorMsg.style.color = "lime";
    return true;
  } else {
    lastNameErrorMsg.innerHTML = "Nom Non Valide";
    lastNameErrorMsg.style.color = "#fbbcbc";
    return false;
  }
}

// *************** Ecouter La modification Adresse ***************
form.address.addEventListener("change", function () {
  validAdress(this);
});

// ************ Validation Adresse ***************
/**
 * validAdress est une fonction
 * testAdress contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * addressErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false
 */
function validAdress(verif) {
  let testAdress = secondRegExp.test(verif.value);
  let addressErrorMsg = document.getElementById("addressErrorMsg");

  if (testAdress === true) {
    addressErrorMsg.innerHTML = "Adresse Valide";
    addressErrorMsg.style.color = "lime";
    return true;
  } else {
    addressErrorMsg.innerHTML = "Exemple: 3 Rue Paul";
    addressErrorMsg.style.color = "#fbbcbc";
    return false;
  }
}

// *************** Ecouter La modification Ville ***************
form.city.addEventListener("change", function () {
  validCity(this);
});

// ************ Validation Ville ***************
/**
 * validCity est une fonction
 * testCity contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * cityErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false
 */
function validCity(verif) {
  let testCity = thirdRegExp.test(verif.value);
  let cityErrorMsg = document.getElementById("cityErrorMsg");

  if (testCity === true) {
    cityErrorMsg.innerHTML = "Ville Valide";
    cityErrorMsg.style.color = "lime";
    return true;
  } else {
    cityErrorMsg.innerHTML = "Ce Champ Accepte Uniquement Le Nom De La Ville";
    cityErrorMsg.style.color = "#fbbcbc";
    return false;
  }
}
// *************** Ecouter La modification Email ***************
form.email.addEventListener("change", function () {
  validEmail(this);
});

// ************ Validation Email ***************
/**
 * validEmail est une fonction
 * testEmail contient la variable RegExp avec la méthode test() qui renvoie true ou false
 * emailErrorMsg correspond au paragraphe de message d'erreur
 * if vérifie si le RegExp est vrai et else affiche le message d'erreur lorsque celui-ci est false
 */
function validEmail(verif) {
  let testEmail = emailRegExp.test(verif.value);
  let emailErrorMsg = document.getElementById("emailErrorMsg");

  if (testEmail === true) {
    emailErrorMsg.innerHTML = "Email Valide";
    emailErrorMsg.style.color = "lime";
    return true;
  } else {
    emailErrorMsg.innerHTML = "Email Non Valide";
    emailErrorMsg.style.color = "#fbbcbc";
    return false;
  }
}

// ************* Ecouter et Envoyer le formulaire dans localStorage ***************
form.addEventListener("submit", function (e) {
  e.preventDefault();

  /**
   * const contact est un objet
   * chaque clé appelle une méthode qui récupère son id
   * value correpond à la saisie du champ de formulaire par l'utilisateur
   */
  const contact = {
    firstName: document.querySelector("#firstName").value,

    lastName: document.querySelector("#lastName").value,

    address: document.querySelector("#address").value,

    city: document.querySelector("#city").value,

    email: document.querySelector("#email").value,
  };

  /**
   * Soumission aux conditions de validation
   * Si les fonctions de validation sont vraies et item est différent de null,
   * envoi du formulaire(dans localStorage)
   * appel fonction fetchOrder pour envoyer dans l'API
   */
  if (
    validFirstName(form.firstName) === true &&
    validLastName(form.lastName) === true &&
    validAdress(form.address) === true &&
    validCity(form.city) === true &&
    validEmail(form.email) === true &&
    item !== null
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));
    fetchOrder(contact);
  }
});
// ===========================================================
// --------------- Envoyer vers API --------------------------
async function fetchOrder(contact) {
  /* contact est un objet contenant les valeurs des champs du formulaire*/
  contact;

  // Crée un tableau uniquement avec l'id par la méthode map ---
  let products = item.map((el) => {
    return el._id;
  });

  // ---------------------------------------------
  // send est un objet contenant un objet et un tableau *******
  const send = {
    contact,
    products,
  };

  // ------- Tableau vide ------
  let responseId = [];

  /**
   * @returns {Promise}
   */
  await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(send),
  })
    .then((res) => res.json())
    .then(function (data) {
      responseId = data;
      window.location.replace(
        `./confirmation.html?orderId=${responseId.orderId}`
      );
      return responseId;
    })
    .catch((error) => {
      alert("Échec du chargement, veuillez nous excuser pour ce désagrément!");
    });
}

// =================================================================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page cart.html
 */
function init() {
  basket();
  displayForm();
}
