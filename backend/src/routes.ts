import { Router } from "express";
import { ProductController } from "./controllers/productController.js";


const routes = Router();
const productController = new ProductController();


routes.post('/products', productController.create);
routes.get('/products', productController.list);
routes.get('/products/:id', productController.detail);
routes.post('/products/:id/refresh', productController.refresh);
routes.delete('/products/:id', productController.delete);

export {routes};