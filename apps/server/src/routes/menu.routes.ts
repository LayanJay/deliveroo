import express, { type Router } from 'express';
import { MenuController } from '../controllers/menu.controller';
import { authenticateToken } from '../middlewares/authenticateToken';

const router: Router = express.Router();

router.get('/:restaurantId', authenticateToken, MenuController.getMenus);
router.get('/:restaurantId/:id', authenticateToken, MenuController.getMenu);
router.post('/:restaurantId', MenuController.createMenu);
router.put('/:restaurantId/:id', MenuController.updateMenu);
router.delete('/:restaurantId/:id', MenuController.deleteMenu);

export default router;
