import {config} from 'dotenv';
config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES = process.env.JWT_EXPIRES;
export const MONGO_URI = process.env.MONGO_URI;