import { Request, Response } from 'express';
import db from '../../models';
import logger from '../logger';
import menuValidator from '../validators/menu.validator';

export class MenuController {
  public static async getMenus(req: Request, res: Response) {
    try {
      if (!req.params.restaurantId) {
        logger.error('[400] Missing restaurant id');
        return res.status(400).json({ message: 'Missing restaurant id' });
      }
      logger.info('[200] Successfully found menus');
      const menus = await db.Menu.findAll({
        include: {
          model: db.Dish,
          attributes: { exclude: [`MenuId`] },
          include: { model: db.Rating, attributes: { exclude: [`DishId`] } },
        },
        attributes: { exclude: [`RestaurantId`] },
        where: { restaurantId: req.params.restaurantId },
      });
      return res.status(200).json(menus);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async getMenu(req: Request, res: Response) {
    try {
      if (!req.params.restaurantId) {
        logger.error('[400] Missing restaurant id');
        return res.status(400).json({ message: 'Missing restaurant id' });
      }
      if (!req.params.id) {
        logger.error('[400] Missing menu id');
        return res.status(400).json({ message: 'Missing menu id' });
      }
      logger.info('[200] Successfully found menu');
      const menu = await db.Menu.findByPk(req.params.id, {
        include: {
          model: db.Dish,
          attributes: { exclude: [`MenuId`] },
          include: { model: db.Rating, attributes: { exclude: [`DishId`] } },
        },
        attributes: { exclude: [`RestaurantId`] },
        where: { restaurantId: req.params.restaurantId },
      });
      return res.status(200).json(menu);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async createMenu(req: Request, res: Response) {
    try {
      if (!req.params.restaurantId) {
        logger.error('[400] Missing restaurant id');
        return res.status(400).json({ message: 'Missing restaurant id' });
      }
      const isValid = menuValidator(req.body);
      if (!isValid) {
        logger.error('[400] Invalid menu');
        return res.status(400).json({ message: 'Invalid menu' });
      }
      logger.info('[201] Successfully created menu');
      const menu = await db.Menu.create(req.body);
      return res.status(201).json(menu);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async updateMenu(req: Request, res: Response) {
    try {
      if (!req.params.restaurantId) {
        logger.error('[400] Missing restaurant id');
        return res.status(400).json({ message: 'Missing restaurant id' });
      }
      if (!req.params.id) {
        logger.error('[400] Missing menu id');
        return res.status(400).json({ message: 'Missing menu id' });
      }
      logger.info('[200] Successfully updated menu');
      const menu = await db.Menu.update(req.body, {
        where: { id: req.params.id, restaurantId: req.params.restaurantId },
      });
      return res.status(200).json(menu);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async deleteMenu(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        logger.error('[400] Missing menu id');
        return res.status(400).json({ message: 'Missing menu id' });
      }
      logger.info('[200] Successfully deleted menu');
      await db.Menu.destroy({
        where: { id: req.params.id, restaurantId: req.params.restaurantId },
      });
      return res.status(200).json({ message: 'Menu deleted' });
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }
}
