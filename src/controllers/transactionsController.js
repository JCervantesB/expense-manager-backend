import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
  try {
    const { userId } = req.params;
    // Consultar todas las transacciones del usuario ordenadas por fecha
    const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;

    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error al obtener las transacciones", error);
    res.status(500).json({ message: "Error Interno del Servidor" });
  }
}

export async function createTransaction(req, res) {
  try {
    const { user_id, title, amount, category } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!title || !user_id || !amount || !category === undefined) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Insertar nueva transacción en la base de datos
    const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;

    console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creando la transacción", error);
    res.status(500).json({ message: "Error al crear la transacción" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    // Validar que el ID sea un número válido
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "ID de transacción inválido" });
    }

    // Eliminar la transacción de la base de datos
    const result = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

    // Verificar si se encontró y eliminó la transacción
    if (result.length === 0) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }

    res.status(200).json({ message: "Transacción eliminada correctamente" });
  } catch (error) {
    console.log("Error al eliminar la transacción", error);
    res.status(500).json({ message: "Error Interno del Servidor" });
  }
}

export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;

    // Calcular balance total (suma de todos los montos)
    const balanceResult = await sql`
            SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id  = ${userId}
        `;

    // Calcular total de ingresos (montos positivos)
    const incomeResult = await sql`
            SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id  = ${userId} AND amount > 0
        `;

    // Calcular total de gastos (montos negativos)
    const expensesResult = await sql`
            SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id  = ${userId} AND amount < 0
        `;

    // Retornar resumen financiero
    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Error al obtener el resumen", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
