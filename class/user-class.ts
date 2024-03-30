import { Response, Request } from "express";
const mongoose = require("mongoose");
import bcrypt from "bcrypt";

import userModel from "../models/user-model";
import { userDB } from "../interfaces/user-interface";

export class UserClass {
  async nuevoUsuario(req: any, resp: Response): Promise<any> {
    try {
      const nombre: string = req.body.nombre;
      const apellido: string = req.body.apellido;
      const telefono: string = req.body.telefono;
      const correo: string = req.body.correo;
      const estado: boolean = req.body.estado;
      const role: any = new mongoose.Types.ObjectId(req.body.role);
      const avatar: string = req.body.avatar;

      const password: string = bcrypt.hashSync("12345678", 10);

      const crearUser = new userModel({
        nombre,
        apellido,
        telefono,
        correo,
        estado,
        role,
        avatar,
        password,
      });

      const userDB = await crearUser.save();

      if (userDB) {
        return resp.json({
          ok: true,
          userDB,
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al crear usuario",
        });
      }
    } catch (error) {
      return resp.json({
        ok: false,
        mensaje: "Error al crear usuario",
        error,
      });
    }
  }

  async obtenerUsuario(req: any, resp: Response): Promise<any> {
    try {
      const _id: any = new mongoose.Types.ObjectId(req.get("_id"));

      const userDB = await userModel.aggregate([
        {
          $match: { _id },
        },
        {
          $lookup: {
            from: "rols",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: { path: "$role", preserveNullAndEmptyArrays: true },
        },
        {
          $unset: "password",
        },
      ]);

      if (userDB) {
        return resp.json({
          ok: true,
          userDB: userDB[0],
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al obtener usuario",
        });
      }
    } catch (error) {
      //   console.log(error);

      return resp.json({
        ok: false,
        mensaje: "Error al obtener usuario",
        error,
      });
    }
  }

  async obtenerUsuarios(req: any, resp: Response): Promise<any> {
    try {
      const usersDB = await userModel.aggregate([
        {
          $lookup: {
            from: "rols",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unset: "password",
        },
        {
          $unwind: { path: "$role", preserveNullAndEmptyArrays: true },
        },
      ]);

      if (usersDB) {
        return resp.json({
          ok: true,
          usersDB,
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al obtener los usuarios",
        });
      }
    } catch (error) {
      return resp.json({
        ok: false,
        mensaje: "Error al obtener los usuarios",
        error,
      });
    }
  }

  async editarUsuario(req: any, resp: Response): Promise<any> {
    try {
      const _id: any = req.body._id;
      const nombre: string = req.body.nombre;
      const apellido: string = req.body.apellido;
      const telefono: string = req.body.telefono;
      // const correo: string = req.body.correo;
      const estado: boolean = req.body.estado;
      let role: any = req.body.role;
      const avatar: string = req.body.avatar;
      const password: string = req.body.password;
      //   const password: string = bcrypt.hashSync(req.body.password, 10);

      if (role) {
        role = new mongoose.Types.ObjectId(req.body.role);
      }

      const query = {
        nombre,
        apellido,
        telefono,
        // correo,
        estado,
        role,
        avatar,
        password,
      };

      if (password) {
        query.password = bcrypt.hashSync(req.body.password, 10);
      }

      const userDB: userDB | null = await userModel.findByIdAndUpdate(
        { _id },
        query,
        {
          new: true,
        }
      );

      if (userDB) {
        userDB.password = ":)";

        return resp.json({
          ok: true,
          userDB,
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al actualizar usuario",
        });
      }
    } catch (error) {
      //   console.log(error);

      return resp.json({
        ok: false,
        mensaje: "Error al actualizar usuario",
        error,
      });
    }
  }

  async eliminarUsuario(req: any, resp: Response): Promise<any> {
    try {
      const _id: any = new mongoose.Types.ObjectId(req.get("_id"));

      const userDB: userDB | null = await userModel.findByIdAndDelete({ _id });

      if (userDB) {
        userDB.password = ":)";

        return resp.json({
          ok: true,
          userDB,
        });
      } else {
        return resp.json({
          ok: false,
          mensaje: "Error al eliminar usuario",
        });
      }
    } catch (error) {
      return resp.json({
        ok: false,
        mensaje: "Error al eliminar usuario",
        error,
      });
    }
  }

  async loguearUsuario(req: any, resp: Response): Promise<any> {
    try {
      const correo: string = req.get("correo");
      const password: string = req.get("password");

      const userDB: userDB | null = await userModel
        .findOne<userDB>({ correo })
        .exec();

      if (!userDB) {
        return resp.json({
          ok: false,
          mensaje: "Correo o contraseña incorrectos",
        });
      } else {
        const existePass: boolean = bcrypt.compareSync(
          password,
          userDB.password
        );

        if (!existePass) {
          return resp.json({
            ok: false,
            mensaje: "Correo o contraseña incorrectos",
          });
        } else {
          const userDBFinded: userDB | null = await userModel
            .findById<userDB | null>(userDB._id)
            .exec();

          if (userDBFinded) {
            userDBFinded.password = ":)";

            return resp.json({
              ok: true,
              userDB: userDBFinded,
            });
          } else {
            return resp.json({
              ok: false,
              mensaje: "Error al buscar usuario",
            });
          }
        }
      }
    } catch (error) {
      return resp.json({
        ok: false,
        mensaje: "Error al buscar usuario",
        error,
      });
    }
  }
}
