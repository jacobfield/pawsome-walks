import app from "./app.js";

const PORT = import.meta.env.VITE_PORT ?? 9998;
const HOST = import.meta.env.VITE_HOSE ?? "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
