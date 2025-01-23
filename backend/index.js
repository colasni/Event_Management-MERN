import { PORT } from "./src/config/envConfig.js";
import app from "./app.js";
import connectDB from "./src/config/database.js";

connectDB();

const PUERTO = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PUERTO}`);
});