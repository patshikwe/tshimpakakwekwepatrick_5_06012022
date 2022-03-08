
let responseId = JSON.parse(localStorage.getItem("dataRes"));
console.log(responseId);

function confirm () {
    let orderId = responseId.orderId;
    let order = document.getElementById("orderId");
    order.textContent = orderId;
  }

  // =================================================================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page confirmation.html */

function init() {
    confirm();
}
