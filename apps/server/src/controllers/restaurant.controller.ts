import { Request, Response } from 'express';
import db from '../../models';
import logger from '../logger';
import restaurantValidator from '../validators/restaurant.validator';

export class RestaurantController {
  public static async getRestaurants(req: Request, res: Response) {
    try {
      logger.info('[200] Successfully found restaurants');
      const restaurants = await db.Restaurant.findAll({ include: db.Menu });
      return res.status(200).json(restaurants);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async getRestaurant(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        logger.error('[400] Missing restaurant id');
        return res.status(400).json({ message: 'Missing restaurant id' });
      }
      logger.info('[200] Successfully found restaurant');
      const restaurant = await db.Restaurant.findByPk(req.params.id, { include: db.Menu });
      return res.status(200).json(restaurant);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async createRestaurant(req: Request, res: Response) {
    try {
      const isValid = restaurantValidator(req.body);
      if (!isValid) {
        logger.error('[400] Invalid restaurant');
        return res.status(400).json({ message: 'Invalid restaurant' });
      }
      logger.info('[201] Successfully created restaurant');
      const restaurant = await db.Restaurant.create(req.body);
      return res.status(201).json(restaurant);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async updateRestaurant(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        logger.error('[400] Missing restaurant id');
        return res.status(400).json({ message: 'Missing restaurant id' });
      }
      logger.info('[200] Successfully updated restaurant');
      const restaurant = await db.Restaurant.update(req.body, {
        where: { id: req.params.id },
      });
      return res.status(200).json(restaurant);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async deleteRestaurant(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        logger.error('[400] Missing restaurant id');
        return res.status(400).json({ message: 'Missing restaurant id' });
      }
      logger.info('[200] Successfully deleted restaurant');
      const restaurant = await db.Restaurant.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json(restaurant);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }
}
