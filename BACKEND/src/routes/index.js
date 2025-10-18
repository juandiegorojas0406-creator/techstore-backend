const express = require("express");
const router = express.Router();

// ======================================
// 📦 ENDPOINTS DE TODAS LAS COLECCIONES
// ======================================

// 🟢 Productos
router.get("/productos", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const productos = await db.collection("productos").find().toArray();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

// 🟢 Clientes
router.get("/clientes", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const clientes = await db.collection("clientes").find().toArray();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error });
  }
});

// 🟢 Ventas
router.get("/ventas", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ventas = await db.collection("ventas").find().toArray();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas", error });
  }
});

// 🟢 Proveedores
router.get("/proveedores", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const proveedores = await db.collection("proveedores").find().toArray();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proveedores", error });
  }
});

// 🟢 Servicios técnicos
router.get("/servicios", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const servicios = await db.collection("servicios_tecnicos").find().toArray();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener servicios técnicos", error });
  }
});

module.exports = router;
