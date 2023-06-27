import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import authRoutes from './routes/auth.routes';
import dishRoutes from './routes/dish.routes';
import menuRoutes from './routes/menu.routes';
import ratingRoutes from './routes/rating.routes';
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
app.get('/health', (req, res) => {
  res.send('OK');
});
app.get('/version', (req, res) => {
  res.send('1.0.0');
});

app.use('/restaurants', restaurantRoutes);
app.use('/menus', menuRoutes);
app.use('/dishes', dishRoutes);
app.use('/ratings', ratingRoutes);

// Auth Routes
app.use('/auth', authRoutes);

export default app;
