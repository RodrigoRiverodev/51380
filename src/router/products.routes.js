import { Router } from "express"; 
import ProductManager from "../components/ProductManager.js";



const ProductRouter = Router()
const product = new ProductManager();

ProductRouter.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (! limit) 
        return res.json({
            status: "success",
            msg:"list of all products",
            data:await product.getProducts()})
    
    let allProducts = await product.getProducts();
    let productLimit = allProducts.slice(0, limit)

    res.send(productLimit)
});

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    let allProducts = await product.readProducts();
    let getProductById = allProducts.find(product => product.id === id)
    if (getProductById) {
        return res.status(200).json({
            status: "success",
            msg: "product obtained by id: " + id,
            data:await product.getProductById(id),
        })
    } else {
        return res.status(400).json({
            status: "error",
            msg: "error:  could not find id: " + id,
            data:{},
        });
    }
});

ProductRouter.post("/", async (req, res) => {
let newProduct = req.body;
    res.status(201).json({
            status: "success",
            msg:await product.addProducts(newProduct)
        })
})

ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.status(200).json({
            status:"success",
            msg:await product.deleteProduct(id)})
})

ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id;
    let updateProducts = req.body;
    res.send( await product.updateProducts(id, updateProducts));
        
})

export default ProductRouter