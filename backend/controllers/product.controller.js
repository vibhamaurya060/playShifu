const productModel = require("../models/product.model");

const addProducts=async(req , res)=>{
    try {
        const {title, disc, price, image}=req.body;
        if(!title || !disc || !price || !image){
            return res.status(400).json({msg: "All fields are require"});
        }

        const newProduct=await productModel.create({title, disc, price, image});
        res.status(201).json({msg: "Product created", product: newProduct})
    } catch (error) {
        res.status(500).json({msg: "Server error"});
    }
}

const getAllProduct=async(req, res)=>{
    try {
        const products=await productModel.find();
        res.status(200).json({msg: "All products", products})
    } catch (error) {
        res.status(500).json({msg: "Server error"})
    }
}

module.exports={addProducts, getAllProduct}