import { Request, Response } from 'express';
import db from '../../models';
import logger from '../logger';
import ratingValidator from '../validators/rating.validator';

export class RatingController {
  public static async getRatings(req: Request, res: Response) {
    try {
      if (!req.params.dishId) {
        logger.error('[400] Missing dish id');
        return res.status(400).json({ message: 'Missing dish id' });
      }
      logger.info('[200] Successfully found ratings');
      const ratings = await db.Rating.findAll({
        where: { dishId: req.params.dishId },
        attributes: { exclude: [`DishId`] },
      });
      return res.status(200).json(ratings);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async getRating(req: Request, res: Response) {
    try {
      if (!req.params.dishId) {
        logger.error('[400] Missing dish id');
        return res.status(400).json({ message: 'Missing dish id' });
      }
      if (!req.params.id) {
        logger.error('[400] Missing rating id');
        return res.status(400).json({ message: 'Missing rating id' });
      }
      logger.info('[200] Successfully found rating');
      const rating = await db.Rating.findByPk(req.params.id, {
        where: { dishId: req.params.dishId },
        attributes: { exclude: [`DishId`] },
      });
      return res.status(200).json(rating);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async createRating(req: Request, res: Response) {
    try {
      if (!req.params.dishId) {
        logger.error('[400] Missing dish id');
        return res.status(400).json({ message: 'Missing dish id' });
      }
      const isValid = ratingValidator(req.body);
      if (isValid) {
        logger.error('[400] Invalid rating');
        return res.status(400).json({ message: 'Invalid rating' });
      }
      logger.info('[201] Successfully created rating');
      const rating = await db.Rating.create({ ...req.body, DishId: req.params.dishId });
      return res.status(201).json(rating);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async updateRating(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        logger.error('[400] Missing rating id');
        return res.status(400).json({ message: 'Missing rating id' });
      }
      logger.info('[200] Successfully updated rating');
      const rating = await db.Rating.update(req.body, {
        where: { id: req.params.id },
      });
      return res.status(200).json(rating);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async deleteRating(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        logger.error('[400] Missing rating id');
        return res.status(400).json({ message: 'Missing rating id' });
      }
      logger.info('[200] Successfully deleted rating');
      await db.Rating.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json({ message: 'Successfully deleted rating' });
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }
}
