import express, { type Router } from 'express';
import { RestaurantController } from '../controllers/restaurant.controller';

const router: Router = express.Router();

router.get('/', RestaurantController.getRestaurants);
router.get('/:id', RestaurantController.getRestaurant);
router.post('/', RestaurantController.createRestaurant);
router.put('/:id', RestaurantController.updateRestaurant);
router.delete('/:id', RestaurantController.deleteRestaurant);

export default router;
