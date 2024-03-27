export interface User {
  ok: boolean;
  mensaje: string;
  err: any;
  userDB: userDB;
  usersDB: Array<userDB>;
}

export interface userDB {
  _id: any;
  nombre: string;
  apellidio: string;
  telefono: string;
  correo: string;
  estado: boolean;
  role: any;
  avatar: string;
  password: string;
}
