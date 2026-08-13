import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import routes from './routes/index.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import { globalLimiter } from './middlewares/rateLimiter.js';

const app = express();

// Security
app.use(helmet());

// Logger
app.use(morgan('dev'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global rate limit
app.use(globalLimiter);

// Routes
app.use('/api', routes);

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;