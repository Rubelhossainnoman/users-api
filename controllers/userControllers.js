import User from "../models/User.js";
import expressHandler from 'express-async-handler';
import bcrypt from 'bcrypt';


// create user controllser
/**
 * @desc Get and export all users
 * @method GET
 * @route /api/v1/users
 * @access public
 */
export const getAllUsers = expressHandler( async (req,res)=>{
    // Get all user from collections
    const users = await User.getAllUsers().populate('hobbie');
    // res.render('index');
    res.status(200).json({users, message : "All users get successfull"})
})

/**
 * @desc create/ post and export single user
 * @method POST
 * @route /api/v1/users/create
 * @access public
 */
export const createUser = expressHandler(async (req,res)=>{
    // get data form from body
    const {name,email,password} = req.body;
    
    // check valication now
    if (!name || !email || !password) {
        return res.status(400).json({message : "All filds are required!"});
    }

    // Check existing user by same email
    let existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({message : "This email already used. Please use different email for create your account"});
    }

    // make has password
    let hassPassword = await bcrypt.hash(password, 10);

    // create user now
    const newUser = await User.create({name,email,password : hassPassword});

    res.status(201).json({user : newUser , message : "User create successfull"});
});

/**
 * @desc Get and export single user
 * @method GET
 * @route /api/v1/users/:id
 * @access public
 */
export const getSingleUser = expressHandler(async (req,res) =>{
    // get user id
    const {id} = req.params;
    // Get single user form collection
    const user = await User.getSingleUser(id);

    // check valid user
    if (!user) {
       return res.status(400).json({user, message : "User not found!"});
    }
    res.status(200).json({user : user, message : "User get successfull"});
});

/**
 * @desc delete and export single user
 * @method DELETE
 * @route /api/v1/users/:id
 * @access public
 */
export const deleteSingelUser = expressHandler(async (req,res)=>{
    // get user id
    const {id} = req.params;

    // delete user now
    const deleteUser = await User.deleteSingelUser(id);

    // check validation
    if (!deleteUser) {
        return res.status(400).json({user : deleteUser, message : "User not found"});
    }

    res.status(200).json({user : deleteUser, message : "User delete successfull"});
});

/**
 * @desc update and export single user
 * @method PATCH
 * @route /api/v1/users/edit/:id
 * @access public
 */
export const updateSingleUser = expressHandler(async (req,res)=>{
    // get user id
    const {id} = req.params;

    let user = await User.getSingleUser(id);

    // get data form from body
    const {name,userName,about,phone,gender,age,location,hobbie} = req.body;

    // check axisting
    if (!user) {
        return res.status(400).json({user, message : "User not found"});
    }

    if (await User.findOne({userName}) && !userName == '') {
        return res.status(400).json({message : "Allready used this user name. Please use another one"});
    }
    if (await User.findOne({phone}) && !phone == '') {
        return res.status(400).json({message : "Allready used this phone number. Please use another one"});
    }
    
    // Check valication now
    const updateUser = await User.findByIdAndUpdate(id,{name,userName,about,phone,gender,age,location, $push : {hobbie : hobbie}},{new : true});

    res.status(202).json({user : updateUser,message : "User udpate successfull"});
})