// package init
import expressHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Create auth controllers

/**
 * @desc login and export user
 * @method POST 
 * @route /api/v1/auth/login
 * @access public
 */
export const userLogin = expressHandler(async (req,res)=>{
    // Get all data from req.body
    const {email,password} = req.body;
    
    // Check valication
    if (!email || !password) {
        return res.status(400).json({message : "All fields are required."})
    }

    // Get user
    const user = await User.findOne({email});

    if (!user) { // Check email
        return res.status(400).json({message : "Invalid email address."});
    }

    // Password decode now
    let decodePass = await bcrypt.compare(password, user.password);

    if (!decodePass) { // Check password
        return res.status(400).json({message : "Wrong Password!"});
    }

    const accessToken = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn : "365d"});

    res.cookie("accessToken", accessToken, {
        sameSite : "strict",
        secure : process.env.APP_ENV === "Development" ? false : true,
        httpOnly : true,
        path : '/',
        maxAge : 1 * 24 * 60 * 60 * 1000 // for one day
        // maxAge :  60 * 1000 // for one minute day
    });

    res.status(200).json({message : "okay", accessToken});
})

/**
 * @desc logout user
 * @method POST 
 * @route /api/v1/auth/logout
 * @access public
 */
export const logoutUser = expressHandler(async (req,res)=>{
    // Clear access token
    res.clearCookie("accessToken");

    res.status(200).json({message : "You are logout successfull."});
})