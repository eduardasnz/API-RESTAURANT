import { Router } from "express";
import { ProductController } from "../controllers/products-controller";

const productRoute = Router();
const productController = new ProductController();

productRoute.get('/', productController.index)
productRoute.post('/', productController.create)
productRoute.put('/:id', productController.update)
productRoute.delete('/:id', productController.remove)


export { productRoute }