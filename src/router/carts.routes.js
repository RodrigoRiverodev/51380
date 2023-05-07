import { Router } from "express";
import CartManager from "../components/CartManager.js";
import { async } from "rxjs";


const CartRouter = Router()
const carts = new CartManager

CartRouter.post("/", async (req, res) => {
    res.send(await carts.addCarts())
})

CartRouter.get("/", async (req, res) => {
    res.send(await carts.readCarts())
})

CartRouter.get("/:id", async (req, res) => {
    res.send(await carts.getCartById(req.params.id))
})

CartRouter.post("/:cid/products/:pid", async (req, res ) => {
    let carId = req.params.cid
    let productId = req.params.pid
    res.send(await carts.addProductInCart(carId, productId))
})

export default CartRouter