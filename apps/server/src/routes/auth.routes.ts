import express, { type Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh-token', AuthController.token);
router.get('/google', AuthController.googleOAuth);
router.get('/google/login-failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failed',
  });
});
router.post('/logout', AuthController.logout);

export default router;
