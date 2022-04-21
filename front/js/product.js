import  Products  from "./manager/items.js";
import Panier from "./manager/panier.js"

async function loadProduct() {
    // recherche l'id du produit 
    const id = (new URL(document.location).searchParams.get('id'))

    // Envoie une requette à l'api et attend le produit en reponse 
    const promise = fetch(`http://localhost:3000/api/products/${id}`)
    const reponseJson = (await promise).json()
    const reponse = await reponseJson

    // Définit la réponse dans la variable produit comme object Product
    const produit = new Products(reponse)
    
    const item = document.querySelector('.item')
    
    // Injecte le code Html
    item.querySelector('.item__img').insertAdjacentHTML('beforeend',`<img src="${produit.imageUrl}" alt="${produit.altTxt}">`)
    title.innerText = produit.name
    price.innerText = produit.price
    description.innerText = produit.description
    colors.insertAdjacentHTML('beforeend', produit.colors.map(color => `<option value="${color}">${color}</option>`))


    // Ecoute le click sur le bouton ajouter au panier 
    document.querySelector('#addToCart').addEventListener('click',(e) => {
        e.preventDefault();
        // Définit un article avec les valeurs id, color, et quantité 
        if (colors.value.length > 0 && quantity.value > 0 ) {
            let itemToShop = {
                color : colors.value,
                _id : produit._id,
                quantity : quantity.value
            }
            // Ajoute le produit au panier 
            Panier.add(itemToShop)
        }
    })
}

loadProduct()