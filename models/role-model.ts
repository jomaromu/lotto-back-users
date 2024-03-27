import mongoose from "mongoose";
import { Restricciones, Role } from "../interfaces/role-interface";

const restricciones: Restricciones = {
  sidebar: {
    dashboard: false,
    listas: false,
    matrices: false,
    productos: false,
    roles: false,
    usuarios: false,
  },
  listas: {
    crearListas: false,
    eliminarListas: false,
    verFiltros: false,
    verListas: false,
    verPropias: false,
  },
};

// crear esquema
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  nombre: { type: String },
  estado: { type: Boolean, default: true },
  vendedor: { type: Boolean, default: false },
  restricciones: { type: Object, default: restricciones },
});

export = mongoose.model<Role>("rols", roleSchema);
