import express from 'express';
import { signupUser, loginUser } from '../controller/user-controller.js'
// import Login from '../../client/src/components/account/Login.js';

const router = express.Router();


router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/create', uploadFile);


export default router;