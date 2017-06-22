import express from 'express';
const router = express.Router();
import AuthCtrl from './controllers/authentication';
import passport from 'passport';
import passportService from './services/passport';

const requireLogin = passport.authenticate('local', { session: false });

router.post('/login', requireLogin, AuthCtrl.login);

router.post('/signup', AuthCtrl.signUp);

export default router;