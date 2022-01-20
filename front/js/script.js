/* Create element(a) child of element id= "items"
crée l'élément(a) enfant de l'élément id= "items"*/
function createLink(){
    const link = document.createElement("a");
    const continent = document.getElementById("items");
    continent.appendChild(link);

    continent.innerHTML = '<a href="./product.html?id=42"></a>';
}

createLink();
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
let article = 0;
function createArticle(){
     article = document.createElement("article");
    document.querySelector("section > a").appendChild(article);
    
    article.innerHTML;
}

createArticle();
// createArticle();
// createArticle();
// createArticle();
// createArticle();
// createArticle();
// createArticle();
// createArticle();
// ===================================================
/* Create element(img) child of element(article)
crée l'élément(img) enfant de l'élément(article)*/
function createImage(){
    const image = document.createElement("img");
    document.querySelector("article").appendChild(image);
    
    article.innerHTML = '<img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"></img>';
}

createImage();
// createImage();
// createImage();
// createImage();
// createImage();
// createImage();
// createImage();
// createImage();

// fetch('http://localhost:3000/images/kanap01.jpeg')
//     // .then(res => res.json())
//     .then(data => Image.src = data[0].url)