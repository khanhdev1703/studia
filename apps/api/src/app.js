import express from 'express';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import env from './config/env.js';
import allowedOrigins from './config/cors.js';

import routes from './routes/index.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import { globalLimiter } from './middlewares/rateLimiter.js';

const app = express();

// ==========================================
// Security
// ==========================================

app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin",
        },
    })
);

app.set("trust proxy", 1);

// ==========================================
// CORS
// ==========================================

app.use(
    cors({
        origin: (origin, callback) => {
            // Cho phép request không có Origin
            // Ví dụ: Postman hoặc server-to-server
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
                return callback(null, true);
            }

            return callback(
                new Error('Not allowed by CORS')
            );
        },

        credentials: true,
    })
);

// ==========================================
// Logger
// ==========================================

app.use(morgan('dev'));

// ==========================================
// Body parser
// ==========================================

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// ==========================================
// Static files
// ==========================================

app.use(
    '/uploads',
    express.static(
        path.join(process.cwd(), 'uploads')
    )
);

// ==========================================
// Rate limit
// ==========================================

app.use(globalLimiter);

// ==========================================
// Routes
// ==========================================

app.use('/api', routes);

// ==========================================
// 404
// ==========================================

app.use(notFound);

// ==========================================
// Error handler
// ==========================================

app.use(errorHandler);

export default app;