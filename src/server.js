import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

// Crear instancia de la aplicación Express
const app = express();

// Middleware para parsear JSON en las peticiones
app.use(rateLimiter);
app.use(express.json());

// Puerto del servidor (desde variable de entorno o 5001 por defecto)
const PORT = process.env.PORT || 5001;

// Ruta de prueba para verificar que el servidor funciona
app.get("/health", (req, res) => {
  res.send("Funcionando correctamente");
});

app.use('/api/transactions', transactionsRoute);

// Inicializar la base de datos y luego iniciar el servidor
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto:${PORT}`);
  });
});
