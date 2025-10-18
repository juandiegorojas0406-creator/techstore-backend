// ===========================================
// 🌐 RUTAS PRINCIPALES DEL BACKEND TECHSTORE
// ===========================================

const express = require("express");
const router = express.Router();

// ==============================
// 🧩 CLIENTES
// ==============================
router.get("/clientes", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const clientes = await db.collection("clientes").find().toArray();
    res.json(clientes);
  } catch (error) {
    console.error("❌ Error al obtener clientes:", error);
    res.status(500).json({ message: "Error al obtener clientes", error });
  }
});

// ==============================
// 📦 PRODUCTOS
// ==============================
router.get("/productos", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const productos = await db.collection("productos").find().toArray();
    res.json(productos);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

// ==============================
// 🏢 PROVEEDORES
// ==============================
router.get("/proveedores", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const proveedores = await db.collection("proveedores").find().toArray();
    res.json(proveedores);
  } catch (error) {
    console.error("❌ Error al obtener proveedores:", error);
    res.status(500).json({ message: "Error al obtener proveedores", error });
  }
});

// ==============================
// 🛠️ SERVICIOS TÉCNICOS
// ==============================
router.get("/servicios", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const servicios = await db.collection("servicios_tecnicos").find().toArray();
    res.json(servicios);
  } catch (error) {
    console.error("❌ Error al obtener servicios técnicos:", error);
    res.status(500).json({ message: "Error al obtener servicios técnicos", error });
  }
});

// ==============================
// 💰 VENTAS
// ==============================
router.get("/ventas", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ventas = await db.collection("ventas").find().toArray();
    res.json(ventas);
  } catch (error) {
    console.error("❌ Error al obtener ventas:", error);
    res.status(500).json({ message: "Error al obtener ventas", error });
  }
});

// ==============================
// 📋 OBTENER TODAS LAS COLECCIONES JUNTAS
// ==============================
router.get("/todo", async (req, res) => {
  try {
    const db = req.app.locals.db;

    // Obtener datos de cada colección
    const clientes = await db.collection("clientes").find().toArray();
    const productos = await db.collection("productos").find().toArray();
    const proveedores = await db.collection("proveedores").find().toArray();
    const servicios = await db.collection("servicios_tecnicos").find().toArray();
    const ventas = await db.collection("ventas").find().toArray();

    // Enviar todas las colecciones juntas en un JSON
    res.json({
      clientes,
      productos,
      proveedores,
      servicios_tecnicos: servicios,
      ventas
    });
  } catch (error) {
    console.error("❌ Error al obtener todas las colecciones:", error);
    res.status(500).json({ message: "Error al obtener datos", error });
  }
});

module.exports = router;
