// api/server.js
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

// Export the app for Vercel to handle as a serverless function
export default app;
