import express from 'express'
import data from './data.js';

const app = express();

app.get('/api/products',(req,res)=>{
    res.send(data.products)
})

app.get('/',(req,res)=>{
    res.send('server is running')
})
const port =process.env.PORT || 6000;
app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`);
})