/** dataRes est la clé stockée dans localStorage
 * Récupérée est assignée dans la variable responseId
 */
let responseId = JSON.parse(localStorage.getItem("dataRes"));
// ===========================================================
/** Fonction pour afficher le numéro de commande 
 * orderId est une variable qui a pour valeur le numéro de commande
 * order a pour valeur l'id du paragraphe pour afficher le numéro
 * textcontent est méthode d'affichage
*/
function confirm () {
    let orderId = responseId.orderId;
    let order = document.getElementById("orderId");
    order.textContent = orderId;
  }

// = Fonction pour supprimer toutes les clés dans localStorage =======
  function clearLocalStrorage() {
    localStorage.clear();
  } 

  // =================================================================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page confirmation.html */

function init() {
    confirm();
    clearLocalStrorage()
}
