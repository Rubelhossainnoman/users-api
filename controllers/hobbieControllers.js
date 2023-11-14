// package init
import expressHandler from 'express-async-handler';
import Hobbie from '../models/Hobbie.js';
// create hobbie controllers

/**
 * @desc get all hobbie
 * @method GET
 * @route /api/v1/hobbie
 * @access public
 */
export const getAllHobbie = expressHandler(async (req,res)=>{
    // Get all hobbie
    const hobbie = await Hobbie.find();
    res.status(200).json({hobbie : hobbie, message : "Get all hobbies successfull"})
})

/**
 * @desc create new hobbie
 * @method POST
 * @route /api/v1/hobbie/create
 * @access public
 */
export const createHobbie = expressHandler(async (req,res) =>{
    // Get data form body
    const {name} = req.body;

    // check valication
    if (!name) {
        return res.status(400).json({message : "Name fields are required."})
    }

    // check exiting
    let existingHobbie = await Hobbie.findOne({name});
    if (existingHobbie) {
        return res.status(400).json({message : "Already exist this hobbie."})
    }

    // Create hobbie
    const hobbie = await Hobbie.create({name});

    // Send response
    res.status(201).json({hobbie,message : "Hobbie create successfull."})
});

/**
 * @desc Get and export single hobbie
 * @method GET
 * @route /api/v1/hobbie/:id
 * @access public
 */
export const getSinglehobbie = expressHandler(async (req,res) =>{
    // get hobbie id
    const {id} = req.params;
    // Get single hobbie form collection
    const hobbie = await Hobbie.findById(id);

    // check valid hobbie
    if (!hobbie) {
       return res.status(400).json({hobbie, message : "hobbie not found!"});
    }
    res.status(200).json({hobbie : hobbie, message : "Hobbie get successfull"});
});