import 'dotenv/config';

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',

    PORT: Number(process.env.PORT) || 5000,

    DATABASE_URL: process.env.DATABASE_URL,

    JWT_SECRET: process.env.JWT_SECRET || "studia_secret",
};

if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env');
}

if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
}

export default env;