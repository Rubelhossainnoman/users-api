// package init
import express from 'express';
import { getAllHobbie, createHobbie, getSinglehobbie } from '../controllers/hobbieControllers.js';

// create router
const router = express.Router();

// get all hobbie
router.get('/', getAllHobbie);

// create new hobbie
router.post('/create', createHobbie);

// Get single hobbie
router.get('/:id', getSinglehobbie)

// export router
export default router;
