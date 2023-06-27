import express, { type Router } from 'express';
import { DishController } from '../controllers/dish.controller';

const router: Router = express.Router();

router.get('/:menuId', DishController.getDishes);
router.get('/:menuId/:id', DishController.getDish);
router.post('/:menuId', DishController.createDish);
router.put('/:id', DishController.updateDish);
router.delete('/:id', DishController.deleteDish);

export default router;
