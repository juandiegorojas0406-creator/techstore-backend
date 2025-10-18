// =======================================================
// 🧩 Proyecto MongoDB + Node.js - TechStore Solutions
// =======================================================

// Importar el driver oficial de MongoDB
const { MongoClient } = require("mongodb");

// URL del servidor MongoDB local
const uri = "mongodb://localhost:27017";

// Nombre de la base de datos
const dbName = "techstore_db";

// Función principal asincrónica
async function main() {
  // Crear cliente de conexión
  const client = new MongoClient(uri);

  try {
    // Conectarse al servidor
    await client.connect();
    console.log("✅ Conectado correctamente a MongoDB");

    // Seleccionar base de datos
    const db = client.db(dbName);

    // Crear variables para las colecciones
    const proveedores = db.collection("proveedores");
    const productos = db.collection("productos");
    const clientes = db.collection("clientes");
    const ventas = db.collection("ventas");
    const servicios = db.collection("servicios_tecnicos");

    // ===============================
    // 🔍 CONSULTAS BÁSICAS
    // ===============================
    console.log("\n📦 Productos tipo 'Celulares':");
    console.log(await productos.find({ categoria: "Celulares" }).toArray());

    console.log("\n💰 Productos con precio > 1.000.000:");
    console.log(await productos.find({ precio: { $gt: 1000000 } }).toArray());

    console.log("\n🔤 Productos cuyo nombre contiene 'o':");
    console.log(await productos.find({ nombre: /o/i }).toArray());

    console.log("\n🧾 Mostrar nombre y precio sin _id:");
    console.log(
      await productos
        .find({}, { projection: { _id: 0, nombre: 1, precio: 1 } })
        .toArray()
    );

    console.log("\n⬆️ Ordenar productos por precio ascendente:");
    console.log(await productos.find().sort({ precio: 1 }).toArray());

    console.log("\n👥 Clientes de Bogotá o Cali:");
    console.log(await clientes.find({ ciudad: { $in: ["Bogotá", "Cali"] } }).toArray());

    console.log("\n⚙️ Servicios pendientes con costo > 200.000:");
    console.log(await servicios.find({ estado: "Pendiente", costo: { $gt: 200000 } }).toArray());

    console.log("\n🧮 Ventas con total > 2.000.000:");
    console.log(await ventas.find({ total: { $gt: 2000000 } }).toArray());

    console.log("\n📅 Ventas de octubre de 2025:");
    console.log(
      await ventas
        .find({
          fecha: {
            $gte: new Date("2025-10-01"),
            $lt: new Date("2025-11-01"),
          },
        })
        .toArray()
    );

    // ===============================
    // 🔗 RELACIONES CON $lookup
    // ===============================
    console.log("\n🧾 Ventas con clientes:");
    console.log(
      await ventas
        .aggregate([
          {
            $lookup: {
              from: "clientes",
              localField: "cliente_id",
              foreignField: "_id",
              as: "info_cliente",
            },
          },
        ])
        .toArray()
    );

    console.log("\n🧾 Ventas con productos:");
    console.log(
      await ventas
        .aggregate([
          { $unwind: "$productos" },
          {
            $lookup: {
              from: "productos",
              localField: "productos",
              foreignField: "_id",
              as: "detalle_producto",
            },
          },
          {
            $project: {
              _id: 1,
              cliente_id: 1,
              "detalle_producto.nombre": 1,
              "detalle_producto.precio": 1,
            },
          },
        ])
        .toArray()
    );

    console.log("\n📦 Productos con proveedores:");
    console.log(
      await productos
        .aggregate([
          {
            $lookup: {
              from: "proveedores",
              localField: "proveedor_id",
              foreignField: "_id",
              as: "datos_proveedor",
            },
          },
        ])
        .toArray()
    );

    console.log("\n🧰 Servicios técnicos con clientes:");
    console.log(
      await servicios
        .aggregate([
          {
            $lookup: {
              from: "clientes",
              localField: "cliente_id",
              foreignField: "_id",
              as: "cliente",
            },
          },
          {
            $project: {
              _id: 0,
              equipo: 1,
              costo: 1,
              estado: 1,
              "cliente.nombre": 1,
            },
          },
        ])
        .toArray()
    );

    // ===============================
    // ✏️ ACTUALIZACIONES Y ELIMINACIONES
    // ===============================
    console.log("\n🔼 Incrementando 10% precios de Portátiles...");
    await productos.updateMany(
      { categoria: "Portátiles" },
      [{ $set: { precio: { $multiply: ["$precio", 1.10] } } }]
    );

    console.log("\n🔁 Cambiando estado Pendiente → Completado...");
    await servicios.updateMany(
      { estado: "Pendiente" },
      { $set: { estado: "Completado" } }
    );

    console.log("\n❌ Eliminando productos con stock < 10...");
    await productos.deleteMany({ stock: { $lt: 10 } });

    console.log("\n🏷️ Renombrando campo 'precio' → 'valor_unitario'...");
    await productos.updateMany({}, { $rename: { precio: "valor_unitario" } });

    console.log("\n✅ Todas las operaciones se completaron exitosamente.");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    // Cerrar conexión
    await client.close();
    console.log("🔒 Conexión cerrada");
  }
}

// Ejecutar el programa principal
main();
