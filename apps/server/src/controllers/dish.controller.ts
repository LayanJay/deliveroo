import { Request, Response } from 'express';
import db from '../../models';
import logger from '../logger';
import dishValidator from '../validators/dish.validator';

export class DishController {
  public static async getDishes(req: Request, res: Response) {
    try {
      if (!req.params.menuId) {
        logger.error('[400] Missing menu id');
        return res.status(400).json({ message: 'Missing menu id' });
      }
      logger.info('[200] Successfully found dishes');
      const dishes = await db.Dish.findAll({
        where: { menuId: req.params.menuId },
        include: { model: db.Rating, attributes: { exclude: [`MenuId`] } },
      });
      return res.status(200).json(dishes);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async getDish(req: Request, res: Response) {
    try {
      if (!req.params.menuId) {
        logger.error('[400] Missing menu id');
        return res.status(400).json({ message: 'Missing menu id' });
      }
      if (!req.params.id) {
        logger.error('[400] Missing dish id');
        return res.status(400).json({ message: 'Missing dish id' });
      }
      logger.info('[200] Successfully found dish');
      const dish = await db.Dish.findByPk(req.params.id, {
        where: { menuId: req.params.menuId },
        include: { model: db.Rating, attributes: { exclude: [`MenuId`] } },
      });
      return res.status(200).json(dish);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async createDish(req: Request, res: Response) {
    try {
      if (!req.params.menuId) {
        logger.error('[400] Missing menu id');
        return res.status(400).json({ message: 'Missing menu id' });
      }
      const isValid = dishValidator(req.body);
      if (!isValid) {
        logger.error('[400] Invalid dish');
        return res.status(400).json({ message: 'Invalid dish' });
      }
      logger.info('[201] Successfully created dish');
      const dish = await db.Dish.create({ ...req.body, MenuId: req.params.menuId });
      return res.status(200).json(dish);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async updateDish(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        logger.error('[400] Missing dish id');
        return res.status(400).json({ message: 'Missing dish id' });
      }
      logger.info('[200] Successfully updated dish');
      const dish = await db.Dish.update(req.body, {
        where: { id: req.params.id },
      });
      return res.status(200).json(dish);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async deleteDish(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        logger.error('[400] Missing dish id');
        return res.status(400).json({ message: 'Missing dish id' });
      }
      logger.info('[200] Successfully deleted dish');
      await db.Dish.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json({ message: 'Successfully deleted dish' });
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }
}
