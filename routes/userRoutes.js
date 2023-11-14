// init package
import express from 'express';
import { createUser, getAllUsers, getSingleUser, deleteSingelUser, updateSingleUser} from '../controllers/userControllers.js';
import { usersMulter } from '../utility/usersMulter.js';

// create router
const router = express.Router();

// get all users 
router.get('/', getAllUsers);

// create new user
router.post('/create', usersMulter, createUser);

// get single user
router.get('/:id', getSingleUser);

// delete single user
router.delete('/:id', deleteSingelUser);

// udpate single user
router.patch('/edit/:id', usersMulter, updateSingleUser);


// export router
export default router;