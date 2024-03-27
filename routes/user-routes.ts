import { Router, Request, Response } from "express";
import { UserClass } from "../class/user-class";

// instanciar el router
const userRoutes = Router();

// Crear usuario
userRoutes.post("/new-user", (req: Request, resp: Response) => {
  const nuevoUsuario = new UserClass();
  nuevoUsuario.nuevoUsuario(req, resp);
});

// Obtener usuario
userRoutes.get("/get-user", (req: Request, resp: Response) => {
  const obtenerUsuario = new UserClass();
  obtenerUsuario.obtenerUsuario(req, resp);
});

// Obtener usuarios
userRoutes.get("/get-users", (req: Request, resp: Response) => {
  const obtenerUsuarios = new UserClass();
  obtenerUsuarios.obtenerUsuarios(req, resp);
});

// Editar usuario
userRoutes.put("/edit-user", (req: Request, resp: Response) => {
  const editarUsuario = new UserClass();
  editarUsuario.editarUsuario(req, resp);
});

// Eliminar usuario
userRoutes.delete("/delete-user", (req: Request, resp: Response) => {
  const eliminarUsuario = new UserClass();
  eliminarUsuario.eliminarUsuario(req, resp);
});

// Loguear usuario
userRoutes.get("/login-user", (req: Request, resp: Response) => {
    const loguearUsuario = new UserClass();
    loguearUsuario.loguearUsuario(req, resp);
  });
export default userRoutes;
