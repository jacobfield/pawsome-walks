/* eslint-disable no-undef */
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.VITE_PORT ?? 9998;
const HOST = process.env.VITE_HOSE ?? "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
