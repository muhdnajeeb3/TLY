import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();


// sending list of products to forntend
productRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.send(products);
    // console.log(products);
}));


productRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
    // await Product.remove({})
    const products = await Product.find({});
    console.log(products,'ogk');
    const createdProducts = await Product.insertMany(data.products);
   
    res.send({createdProducts});

}));

// returning details of the product to frontend
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
         res.send(product)
         console.log("setttt");
    }else{
         res.status(404).send({message:"Product not found"})
         console.log('okk');
    }
   
}));

export default productRouter;