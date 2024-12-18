import express from 'express';
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

export const app = express();

// Load environment variables
config({
    path: './data/config.env'
});

// CORS configuration
app.use(cors({
    origin:[process.env.FRONTEND_URL ], // Ensure FRONTEND_URL is correctly defined
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    preflightContinue: false
}));

// Middleware for preflight requests (OPTIONS)
app.options('*', cors());

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Error-handling middleware (must be after other middleware)
app.use(errorMiddleware);
