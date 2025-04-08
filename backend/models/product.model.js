const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    title: {type: String, required: true},
    disc: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String},

})

const productModel=mongoose.model('product', productSchema);

module.exports=productModel;
