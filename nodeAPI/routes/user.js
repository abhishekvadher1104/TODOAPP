import express from 'express';
import { User } from "../models/user.js";
import { register, getMyProfile, login, logout } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();
// router no use etle thay ke jethi apde express ma router banaviye tene import export na karvi pade

router.post('/new', register)
router.post('/login', login)
router.get('/logout', logout)


router.get("/me", isAuthenticated, getMyProfile)

export default router;
