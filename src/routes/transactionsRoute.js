import express from "express";
import { getTransactionsByUserId, createTransaction, deleteTransaction, getSummaryByUserId } from "../controllers/transactionsController.js";

const router = express.Router()


/**
 * Endpoint GET para obtener todas las transacciones de un usuario específico
 * @param {string} userId - ID del usuario
 * @returns {Array} Lista de transacciones ordenadas por fecha descendente
 */
router.get("/:userId", getTransactionsByUserId);

/**
 * Endpoint POST para crear una nueva transacción
 * @param {Object} req.body - Datos de la transacción (user_id, title, amount, category)
 * @returns {Object} Transacción creada
 */
router.post("/", createTransaction);

/**
 * Endpoint DELETE para eliminar una transacción específica
 * @param {string} id - ID de la transacción a eliminar
 * @returns {Object} Mensaje de confirmación
 */
router.delete("/:id", deleteTransaction);

/**
 * Endpoint GET para obtener el resumen financiero de un usuario
 * Calcula el balance total, ingresos y gastos
 * @param {string} userId - ID del usuario
 * @returns {Object} Resumen con balance, ingresos y gastos
 */
router.get('/summary/:userId', getSummaryByUserId)


export default router;