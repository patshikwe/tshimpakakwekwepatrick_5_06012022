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
            <p>${obj.price.toString().replace(/00/,"")} €</p>
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
       );
    //=======================================================
        // Prix total des produits
       document.getElementById("totalPrice").innerHTML = addItem.map((obj) => 
       `${obj.quantity * obj.price.toString().replace(/00/,"")}`
       );

        // Quantité totale des produits
       document.getElementById("totalQuantity").innerHTML = addItem.map((obj) => 
       `${obj.quantity}`
       );
}


// ============================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page cart.html */

function init() {
    basket();
}