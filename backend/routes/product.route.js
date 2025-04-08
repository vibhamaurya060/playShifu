const express=require("express");
const { addProducts, getAllProduct } = require("../controllers/product.controller");

const productRouter=express.Router();

productRouter.post("/add-product", addProducts);
productRouter.get("/", getAllProduct);

module.exports=productRouter;