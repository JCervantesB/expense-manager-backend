import {neon} from '@neondatabase/serverless';

import 'dotenv/config';

// Crea la conexión a la base de datos con neon
export const sql = neon(process.env.DATABASE_URL);

/**
 * Función para inicializar la base de datos
 * Crea la tabla 'transactions' si no existe
 */
export async function initDB() {
  try {
    // Crear tabla de transacciones con estructura definida
    await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

    console.log("Base de datos iniciada correctamente");
  } catch (error) {
    console.log("Error inicializando la base de datos", error);
    process.exit(1); // Código 1 para indicar error, 0 para éxito
  }
}