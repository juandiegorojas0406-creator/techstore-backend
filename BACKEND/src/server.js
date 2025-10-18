require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const routes = require("./routes/index");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("✅ Conectado correctamente a MongoDB");

    // Extraer nombre de base desde URI automáticamente
    const dbName = MONGO_URI.split("/").pop();
    const db = client.db(dbName);
    app.locals.db = db;

    const colecciones = await db.listCollections().toArray();
    console.log("📚 Colecciones encontradas:", colecciones.map(c => c.name));

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
  }
}

connectDB();
app.use("/api", routes);
