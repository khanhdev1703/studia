import 'dotenv/config';

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',

    PORT: Number(process.env.PORT) || 5000,

    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/studia',

    JWT_SECRET: process.env.JWT_SECRET || "studia_secret",
};

export default env;