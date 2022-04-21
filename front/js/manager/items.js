export default class Products {
  /**
   * construit un objet Procut à partir d'un objet anonyme
   * @param {object} products
   */

  constructor(products) {
    this && Object.assign(this, products);
  }

  /**
   * converti un prodruit en chaine html pour affichache
   * @returns {string} html du produit
   */
  toHtml() {
    return `
        <a href="product.html?id=${this._id}">
            <article>
                <img src="${this.imageUrl}" alt="Photographie d'un canapé Kanap ${this.name}">
                <h3>${this.name}</h3>
                <p>${this.description}</p>
            </article>
        </a>
        `;
  }

  /**
   * renvoie le code html pour le panier
   * @returns {string}
   */
  toHtmlPanier() {
    return `
        <article class="cart__item" data-id="${this._id}" data-color="${
      this.color
    }">
        <div class="cart__item__img">
            <img src="${this.imageUrl}" alt="Photographie d'un canapé ${
      this.name
    }">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${this.name}</h2>
                <p>${this.price.toFixed(2)} €</p>
                <p>${this.color}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                      this.quantity
                    }">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>
        `;
  }

  /**
   * retourne le prix total d'un article
   * @returns {int}
   */
  getTotalPrice(){
    return (this.price * this.quantity)
  }

  /**
   * renvoie l'id d'un produit
   * @returns {string}
   */
  getId() {
    return console.log(this._id), this._id;
  }
  
}
