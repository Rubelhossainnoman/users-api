// package init
import express from 'express';
import color from 'colors';
import env from 'dotenv';
import expressLayouts from 'express-ejs-layouts';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './config/mongodb.js';
import { errorHandler } from './helpers/errorHandler.js';
import hobbieRoutes from './routes/hobbieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import { protectRoutes } from './middlewares/protectRoutes.js';

// config env file
env.config();

// get server port 
const port = process.env.PORT || 4040

// init express
const app = express();

// manage form data 
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

// use public folder
app.use(express.static('public'));

// set express engine
app.set('view engine', 'ejs');

// use express layouts
app.use(expressLayouts);

// set costom layout
app.set('layout', 'layouts/app');

// manage routing system from here..
app.use('/api/v1/auth', authRoutes);
// protect routes...
app.use(protectRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/hobbie', hobbieRoutes);

// manage error handler
app.use(errorHandler);

// create server 
app.listen(port, () =>{
    // connect mongodb 
    connectDB();
    // Check status
    console.log(`This server is runnin on port ${port}`.bgGreen.black);
})