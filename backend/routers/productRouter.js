import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from "../util.js";

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

productRouter.post('/',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
   const product = new Product({
    name:'sample name'+Date.now(),
    category:'sample categry',
    brand:'sample brand',
    image:'../images/p1.jpg',
    price:0,
    countInStock:0,
    rating:0,
    numReviews:0,
    description:"sample description"
   })
   const createdProduct = await product.save();
   res.send({ message: 'Product Created', product: createdProduct });
}))

productRouter.put('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const product= await Product.findById(productId);
    if(product){
        product.name= req.body.name || product.name;
        product.price= req.body.price || product.price;
        product.image= req.body.image || product.image;
        product.category= req.body.category || product.category;
        product.brand= req.body.brand || product.brand;
        product.countInStock= req.body.countInStock || product.countInStock;
        product.description= req.body.description || product.description;

       const updatedProduct =await product.save();
       res.send({message:"Product Updated",product:updatedProduct})

    }else{
        res.status(404).send({message:'Product not Found'})
    }

}))
productRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const product =await Product.findById(req.params.id);
    if(product){
        const deleteProducts = await product.remove();
        res.send({message:'Product Deleted',product:deleteProducts});
    }else{
        res.status(404).send({message:'Product not Found'})

    }
}))

export default productRouter;