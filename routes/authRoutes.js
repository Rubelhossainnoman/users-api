// package init
import express from 'express';
import { logoutUser, userLogin } from '../controllers/authControllers.js';

// Creaet router
const router = express.Router();

// user login
router.post('/login', userLogin);

// user logout
router.get('/logout', logoutUser);

// Export router
export default router;