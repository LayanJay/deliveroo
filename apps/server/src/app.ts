import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import authRoutes from './routes/auth.routes';
import menuRoutes from './routes/menu.routes';
import restaurantRoutes from './routes/restaurant.routes';

const app = express() as Application;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/restaurants', restaurantRoutes);
app.use('/menus', menuRoutes);

// Auth Routes
app.use('/auth', authRoutes);

export default app;
