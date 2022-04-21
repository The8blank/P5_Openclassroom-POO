import  Products  from './manager/items.js'

async function loadProduct() {
    const promise = fetch('http://localhost:3000/api/products')
    const promiseJson = (await promise).json()

    const result =  await promiseJson


    for (const item of result) {
        const produit = new Products(item) 
        document.querySelector('#items').insertAdjacentHTML('beforeend',produit.toHtml())
    }
}

loadProduct()

