import fs from 'fs';
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js"


const ProductAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json";
    }

    async readCarts ()  {
        let carts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(carts);
        };

    async writeCarts(carts) {
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    };

    async existCart(id) {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id)
    }

    async addCarts() {
        let cartsOld = await this.readCarts();
        let id = nanoid(4)
        let cartsConcat = [{id :id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "car successfully added !"
    };

    async getCartById(id) {
        let cartById = await this.existCart(id);
        if (!cartById) return `cart with id:${id} not exist`
            return cartById
    };

    async addProductInCart(cartId, productId) {
        let cartById = await this.existCart(cartId)
        if(!cartById) return `Cart does not exist with id: ${cartId}`

        let productById = await ProductAll.existProduct(productId)
        if(!productById) return `Product does not exist with id: ${productId}`

        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter((cart) => cart.id != cartId)

        if(cartById.products.some((prod) => prod.id === productId)){
        let oneMoreProductInCart = cartById.products.find((prod) => prod.id === productId);
        oneMoreProductInCart.quantity++
        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat);
        return "one more product added to the cart successfully !!"
        }

        cartById.products.push({id: productById.id, quantity:1})


        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Product added to cart successfully!"

    };

}

export default CartManager