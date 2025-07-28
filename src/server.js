import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";

import job from "./config/cron.js"

dotenv.config();

// Crear instancia de la aplicación Express
const app = express();

if(process.env.NODE_ENV === "production") job.start();

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

app.get("/api/health", (req, res) => {
  res.status(200).json({status:"ok"});
});

// Inicializar la base de datos y luego iniciar el servidor
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto:${PORT}`);
  });
});
