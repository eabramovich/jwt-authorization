import { Router } from 'express';
import { registration, login, logout, activate, refresh, getUsers } from '../controllers/user-controller.js';
import { body } from 'express-validator';
import authHandler from '../middlewares/authHandler.js';

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    registration
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/users', authHandler, getUsers);

export default router;