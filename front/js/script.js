/* Create element(a) child of element id= "items"
crée l'élément(a) enfant de l'élément id= "items"*/
function createLink(){
    const link = document.createElement("a");
    const continent = document.getElementById("items");
    continent.appendChild(link);

    continent.innerHTML = '<a href="./product.html?id=42"></a>';
}

// createLink();
// createLink();
// createLink();
// createLink();
// createLink();
// createLink();
// createLink();
// createLink();
// =====================================
/* Create element(article) child of element(a)
crée l'élément(article) enfant de l'élément(a)*/

function createArticle(){
    let article = document.createElement("article");
    document.querySelector("section > a").appendChild(article);
    
    
}

// createArticle();
// createArticle();
// createArticle();
// createArticle();
// createArticle();
// createArticle();
// createArticle();
// createArticle();
// ===================================================



async function fetchProduct() {
    let productData = [];
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((res2) => {
            productData = res2
            console.log(productData);
        });
    return productData
}


// =====================================

const createImage = async () => {
   const productData = await fetchProduct();

    document.querySelector("article").innerHTML =  `<img src=
    "${productData[0].imageUrl}" alt="${productData[0].altTxt}">`;
    
    
    

};

// createImage();
// createImage();
// createImage();
// createImage();
// createImage();
// createImage();
// createImage();
// createImage();
// ===============================================
/* Create element(img) child of element(article)
crée l'élément(img) enfant de l'élément(article)*/
/*function createTitleArticle(name){
    const titleArticle = document.createElement("h3");
    let article = document.querySelector("article").appendChild(titleArticle);
    
    article.innerHTML = `${name}`;
}*/

// createTitleArticle("Kanap Sinopé");
// createTitleArticle();
// createTitleArticle();
// createTitleArticle();
// createTitleArticle();
// createTitleArticle();
// createTitleArticle();
// createTitleArticle();
// ==============================================
/* Create element(img) child of element(article)
crée l'élément(img) enfant de l'élément(article)*/
function createParagraph(descrip){
    const paragraph = document.createElement("p");
    let article = document.querySelector("article").appendChild(paragraph);
    
    article.innerHTML = `${descrip}`;
}

createParagraph("Excepteur sint occaecat cupidatat non proident...");
// createParagraph();
// createParagraph();
// createParagraph();
// createParagraph();
// createParagraph();
// createParagraph();
// createParagraph();

// function createImage(source, alt){
//     fetch("http://localhost:3000/api/products")
//     .then(response => response.json())
//     .then(response2 => console.log(response2))
        
   
//  }

function init() {
    console.log("init")
    createLink()
    createArticle();
    
    createImage();
}