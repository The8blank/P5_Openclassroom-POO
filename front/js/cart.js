// Importe les ressource necessaire
import Panier from "./manager/panier.js";
import Products from "./manager/items.js";
import Validation from "./manager/Validation.js";

// Fonction poour charger la page
async function loadProduct() {

  // boucle sur le panier 
  for (const e of Panier.get()) {
    const id = e._id;
    
    // requette grâce à l'id du produit 
    const promise = fetch(`http://localhost:3000/api/products/${id}`);
    const reponseJson = (await promise).json();
    const reponse = await reponseJson;

    // création du produit grâce à la réponse
    let produit = reponse;
    produit.quantity = e.quantity;
    produit.color = e.color;

    // Injection du code HTML
    produit = new Products(reponse);
    cart__items.insertAdjacentHTML("beforeend", produit.toHtmlPanier());
  }

  // affiche le prix et la quantité 
  displayTotal();

  // Ecoute du bouton changer la quantité
  document.querySelectorAll(".itemQuantity").forEach((button) => {
    button.addEventListener("change", (e) => {
      let id = e.target.closest(".cart__item").dataset.id;
      let color = e.target.closest(".cart__item").dataset.color;
      let value = e.target.value;

      // changement de la quantité du produit 
      Panier.changeQuantity(id, color, value);

      // Supprime l'article si l'input et < 100 et définit la quantité à 100 si l'input est > 100
      if (value <= 0) {
        e.target.closest(".cart__item").remove();
      } else if (value >= 100) {
        e.target.value = 100;
      }

      // affiche la quantité et le prix 
      displayTotal();
    });
  });

  // écoute du bouton supprimer 
  document.querySelectorAll(".deleteItem").forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.closest(".cart__item").dataset.id;
      let color = e.target.closest(".cart__item").dataset.color;

      // supprime l'article du panier 
      Panier.delete(id, color);

      // suprime le code html de l'article
      e.target.closest(".cart__item").remove();

      // recalcule les prix et quantité 
      displayTotal();
    });
  });
}

// Fonction pour afficher la quantité et les prix 
async function displayTotal() {
  totalQuantity.innerText = Panier.totalQuantity();
  totalPrice.innerText = await Panier.totalPrice();
}

// fonction écoute du formulaire et envoie
async function checkOut() {

  document.querySelector(".cart__order form").addEventListener("submit", (e) => {
    e.preventDefault();
    // si les champs retourne true
    if (
      Validation.firstName(e.target.firstName.value) &&
      Validation.lastName(e.target.lastName.value) &&
      Validation.adresse(e.target.address.value) &&
      Validation.city(e.target.city.value) &&
      Validation.email(e.target.email.value)
    ) {
      // si la taille du panier est > 0
      if (Panier.get().length > 0) {
        // recupère les id du panier
        const panier = Panier.get().map((p) => p._id);

        // crée l'objet order
        const order = {
          contact: {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            address: e.target.address.value,
            city: e.target.city.value,
            email: e.target.email.value,
          },
          products: panier,
        };
        // crée l'option de la requete
        const options = {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        // envoie la commande attend la réponse, envoie l'id de la commande dans l'url et nous redirige sur la page de comfirmation
        fetch("http://localhost:3000/api/products/order", options)
          .then((response) => response.json())
          .then((data) => {
            localStorage.clear();
  
            document.location.href = `confirmation.html?orderId=${data.orderId}`;
          })
          .catch((err) => {
            alert("Problème avec fetch : " + err.message);
          });
      }else {
        // si la taille du panier est < 0 
          alert('panier vide')
      }
    }
  });
}

loadProduct();
checkOut();
