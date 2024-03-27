import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import Server from "./class/server";

// const server = new Server();
const server = Server.instance;

// rutas
import userRoutes from "./routes/user-routes";

// body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// file upload
server.app.use(fileUpload());

// cors
server.app.use(cors({ origin: true, credentials: true }));

// conexion db
const user = "lotto";
const pass = "l%40tt%40";
const dbURI = `mongodb://${user}:${pass}@127.0.0.1:27017/lotto`;
// const dbURI = `mongodb://127.0.0.1:27017/lotto`;

// Configuración de la conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const main = async () => {
  await mongoose.connect(dbURI, { autoIndex: true });
};

main().then((resp) =>
  console.log("Microservicio conectado a la base de datos")
);
main().catch((err) => console.log("Error en la base de datos:", err));

// usar las rutas
server.app.use("/user", userRoutes);

// correr servidor
server.start(() => {
  console.log(`Servidor corriendo en el puerto: ${server.port}`);
});
