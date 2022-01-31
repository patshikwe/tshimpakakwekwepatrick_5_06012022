/** La fonction fetchData permet d'aller chercher les données de l'API(tous les prodits);
 * async permet d'utiliser les données de manière asynchrone(retourne une promesse);
 * data est la variable où sera stockée les données (data est un tableau vide);
 * await permet de mettre en pause l'exécution du code jusqu'au chargement de la reponse;
 * la méthode fetch() a pour argument l'URL de l'API(back end);
 * la promesse renvoie une reponse qui est transformée en Json;
 * la response transformée est res2 qui est stockée dans la variable data.
 */

async function fetchData() {
    let data = [];
    await fetch("http://localhost:3000/api/products")
        // .then((res) => res.json())
        .then((res2) => {
            data = res2.json()
            console.log(data);
        });
    return data
}

// =====================================
/** */

const createLink = async () => {
   const data = await fetchData();

document.getElementById("items").innerHTML = data.map((product)=> 
`<a href="./product.html?id=${product._id}">
<article>
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  <h3 class="productName">${product.name}</h3>
  <p class="productDescription">${product.description}</p>
</article>
</a>`
).join("");

}

// =================================================
/** La fonction init regroupe tous les appels de fonctions.
 * Cette fontion est appelée à partir du body de la page index.html */

function init() {
    console.log(init);
    createLink();
}