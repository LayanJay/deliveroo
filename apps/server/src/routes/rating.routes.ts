import express, { type Router } from 'express';
import { RatingController } from '../controllers/rating.controller';

const router: Router = express.Router();

router.get('/:dishId', RatingController.getRatings);
router.get('/:dishId/:id', RatingController.getRating);
router.post('/:dishId', RatingController.createRating);
router.put('/:id', RatingController.updateRating);
router.delete('/:id', RatingController.deleteRating);

export default router;
