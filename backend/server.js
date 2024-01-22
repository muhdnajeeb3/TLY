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

async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('Connected to database');
    } catch (error) {
      console.error('Error connecting to database:', error);
      process.exit(1);
    }
  }
  
  (async () => {
    await connectToDatabase();
    // ... Other code that relies on the database connection ...
  })();
// console.log('connected to databse');

app.use('/api/uploads',uploadRouter)
app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
});
const __dirname = path.resolve();
app.use('/upload', express.static(path.join(__dirname, '/upload')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')));
// app.get('/',(req,res)=>{
//     res.send('server is running')
// });

app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message})
});

const port =process.env.PORT || 6000;
app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`);
    
})