import cors from 'cors';
import express from 'express';
// Types
import { Application } from 'express';

const app = express() as Application;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    credentials: true,
  })
);

// Routes
// app.use('/progress');
// app.use('/summary');

export default app;
