import 'dotenv/config';

export const PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET;

export const dbConfig = {
	host: process.env.DATABASE_HOST,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DATABASE,
	port: parseInt(process.env.DATABASE_PORT),
};

export const ENDPOINT = {
	SERVER: 'localhost',
}