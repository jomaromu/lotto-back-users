import mongoose from "mongoose";
import { User } from "../interfaces/user-interface";

// Crear esquema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: { type: String },
  apellido: { type: String },
  telefono: { type: String },
  correo: { type: String, unique: true, required: true },
  estado: { type: Boolean, default: true },
  role: { type: Schema.Types.ObjectId, ref: "rols" },
  avatar: { type: String },
  password: { type: String },
});

export = mongoose.model<User>("user", userSchema);
