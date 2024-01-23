import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';



dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGODB_URL|| 'mongodb+srv://amazona:1234@tly.nu8g3re.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    
})
// console.log('connected to databse');

app.use('/api/uploads',uploadRouter)
app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
});
const __dirname = path.resolve();
// Serve static files from the 'frontend/build' directory
// Serve static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, 'D:/TLY-RE-OPEN/mern-amazone/frontend/build')));

// Add the upload directory if needed
app.use('/upload', express.static(path.join(__dirname, 'D:/TLY-RE-OPEN/mern-amazone/upload')));

// Catch-all route to serve the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'D:/TLY-RE-OPEN/mern-amazone/frontend/build/index.html'));
});

app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message})
});

const port =process.env.PORT || 6000;
app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`);
    
})