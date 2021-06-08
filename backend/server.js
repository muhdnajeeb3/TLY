import express from 'express'
import data from './data.js';

const app = express();

app.get('/api/products/:id',(req,res)=>{
    const product = data.products.find((x) =>x._id === req.params.id);
    if(product){
       res.send(product);
    //    console.log('okkk');
    }else{
        res.status(404).send({message:"product n not found"})
        // console.log("noooo");
    }
})

app.get('/api/products',(req,res)=>{
    res.send(data.products)
    // console.log("heyyyy");
})


app.get('/',(req,res)=>{
    res.send('server is running')
})
const port =process.env.PORT || 6000;
app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`);
})