import Products from "./items.js";

export default class Panier {
  /**
   * Récupère le panier dans le localStorage
   * @returns {[object]}
   */
  static get() {
    let panier = localStorage.getItem("panier");
    return panier != null ? JSON.parse(panier) : [];
  }

  /**
   * ajoute un produit au local strorage
   * @param {object} product objet avec une id une quantité et une color
   */
  static add(product) {
    let panier = this.get();

    let produit = panier.find(
      (p) => p._id == product._id && p.color == product.color
    );
    if (produit != null) {
      produit.quantity = product.quantity;
    } else {
      panier.push(product);
    }
    this.save(panier);
  }

  /**
   * change la quantité de l'article dans le panier
   * @param {string} id besoin de l'id
   * @param {string} color de l'option
   * @param {int} value de la quantité voulu
   */
  static changeQuantity(id, color, value) {
    let panier = this.get();

    let product = panier.find((p) => p._id == id && p.color == color);

    if (value <= 0) {
      panier = panier.filter((p) => p._id != id || p.color != color);
    } else if (value >= 100) {
      product.quantity = 100;
    }else {
      product.quantity = value
    }

    this.save(panier);
  }

  /**
   *Retourne la quantité d'article dans le panier
   * @returns {int}
   */
  static totalQuantity() {
    let sum = 0;
    for (let p of this.get()) {
      sum += parseInt(p.quantity);
    }

    return sum;
  }

  /**
   * enregistre le panier au local storage
   * @param {[Product]} panier mettre le panier (objet comprenant un tableau)
   */
  static save(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
  }

  /**
   * Effectue une requete pour récupérer les prix des produit à l'api, les additiones et les renvoies
   * @returns {int}
   */
  static async totalPrice() {
    if (this.get().length >= 1) {
      let panier = this.get();
      let sum = 0;

      const data = Promise.all(
        panier.map((p) => {
          const reponse = fetch(`http://localhost:3000/api/products/${p._id}`)
            .then((r) => r.json())
            .then((r) => {
              let produit = Object.assign(r, p);
              return produit;
            });
          return reponse;
        })
      ).then((r) => r);

      for (let product of await data) {
        product = new Products(product);
        sum += product.getTotalPrice();
      }

      /* for (let p of panier) {
        const promise = fetch(`http://localhost:3000/api/products/${p._id}`)
        const resolveJson = (await promise).json()
        const resolve = await resolveJson
        
        let product = Object.assign(p, resolve)
        product = new Products (product)
        sum += product.getTotalPrice()
      } */

      return sum.toFixed(2);
    } else {
      return 0;
    }
  }

  /**
   * Supprime un article du panier grace à sont id et sa couleur 
   * @param {string} id 
   * @param {string} color 
   */
  static delete(id,color) {
    let panier = this.get()
    panier = panier.filter(p => p.id != id && p.color != color)
    this.save(panier)
  }
}
