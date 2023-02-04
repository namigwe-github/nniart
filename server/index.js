import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'; //cross origin resource sharing 

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import connectDB from './mongodb/connect.js';

dotenv.config(); //allows us to pull environment variables from dotenv file

//initialize express application
const app = express();

//add additional middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

//root route
app.get('/', async (req,res) => {
    res.send('Hello From DALL-E');
    console.log(req);
})




const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL); 
        app.listen(8080, () => {
        console.log('Server has started on port '+ process.env.HOST_NAME)})
    } catch (error) {
        console.log(error);
    }
    
}

startServer();