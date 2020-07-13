//controllers/user.controller.js
'use strict';
// load up the user model
import User from '../db/models/user';
import jwt from 'jsonwebtoken';
const JWT_duration = 30; // Minutes

export function registerUser(req, res, next) {
  let newUser = new User({ ...req.body });

  if (newUser.mail == null || newUser.mail == undefined || newUser.name == null || newUser.name == undefined || newUser.password == null || newUser.password == undefined) {
    let e = new Error('Se debe ingresar los campos requeridos (mail, name, password)');
    e.name = "badRequest";
    return next(e);
  }

  User.getUserByMail(newUser.mail, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.status(403).json({
        success: false,
        msg: `The user with mail '${newUser.mail}' already exist`
      });
    }
    newUser.createdAt = Date.now();
    newUser.role = "user";
    User.addUser(newUser, (err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          msg: `The user could not be registered`
        });
      } else if (user) {
        res.status(201).json({
          success: true,
          msg: `User registered`,
          userId: user._id
        });
      }
    });
  });
}

export const authenticate = (req, res, next) => {

  const mail = req.body.mail;
  const password = req.body.password;

  User.getUserByMail(mail, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: `There is no user with mail '${mail}'`
      });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const userToEncode = { userId: user._id, userMail: user.mail };
        const token = jwt.sign(userToEncode, process.env.SECRET, {
          expiresIn: JWT_duration * 60
        });
        const {
          _id,
          mail,
          name,
          connectedAccounts,
          createdAt,
          role
        } = user;
        res.status(202).json({
          status: 202,
          success: true,
          user: {
            _id,
            mail,
            name,
            connectedAccounts,
            createdAt,
            role,
            token: 'JWT ' + token,
          },
        });
        // res.status(202).json({
        //   success: true,
        //   access_token: 'JWT ' + token,
        //   user: {
        //     id: user._id,
        //     username: user.username
        //   }
        // });
      } else {
        return res.status(401).json({
          success: false,
          msg: 'Wrong Password'
        });
      }
    });
  });

  // const mail = req.body.mail;
  // const password = req.body.password;

  // if (mail == null || mail == null || password == null || password == null) {
  //   let e = new Error('Se debe ingresar los campos requeridos (mail, password)');
  //   e.name = "badRequest";
  //   return next(e);
  // }

  // User.getUserByMail(mail, (err, user) => {
  //   if (err) {
  //     const e = new Error('Error en el servidor: ' + err);
  //     e.name = 'internal'
  //     return next(e);
  //   }
  //   if (!user) {
  //     const e = new Error(`No hay un usuario con el correo '${mail}'`);
  //     e.name = 'notFound'
  //     return next(e);
  //   }
  //   User.comparePassword(password, user.password, (err, isMatch) => {
  //     if (err) {
  //       const e = new Error('Error en el servidor: ' + err);
  //       e.name = 'internal'
  //       return next(e);
  //     }
  //     if (isMatch) {
  //       const token = jwt.sign(user.toJSON(), process.env.SECRET, {
  //         expiresIn: JWT_duration * 60
  //       });
  //       const {
  //         _id,
  //         mail,
  //         name,
  //         connectedAccounts,
  //         createdAt,
  //         role
  //       } = user;
  //       res.status(202).json({
  //         status: 202,
  //         success: true,
  //         user: {
  //           _id,
  //           mail,
  //           name,
  //           connectedAccounts,
  //           createdAt,
  //           role,
  //           token: 'JWT ' + token,
  //         },
  //       });
  //     } else {
  //       const e = new Error('Usuario o contraseña incorrecta');
  //       e.name = 'badRequest';
  //       return next(e);
  //     }
  //   });
  // });
};


/****** Obtener todos los usuarios ******/
export async function getUsers(req, res, _next) {
  User.countDocuments({}, (err, count) => {
    if (err) {
      const e = new Error('Error en el servidor: ' + err);
      e.name = 'internal'
      return next(e);
    }
    User.find((err, users) => {
      if (err) {
        const e = new Error('Error en el servidor: ' + err);
        e.name = 'internal'
        return next(e);
      }
      res.status(200).send(
        {
          count,
          // Return users without password
          users: users.map(u => {
            const {
              _id,
              name,
              mail,
              imageURL,
              createdAt,
              role,
              connectedAccounts,
            } = u;
            return {
              _id,
              name,
              mail,
              imageURL,
              createdAt,
              role,
              connectedAccounts,
            };
          })
        }
      );
    })
      .skip(parseInt(req.query['skip']) || 0)
      .limit(parseInt(req.query['limit']) || 0)
      .sort(req.query['sort'] || 'name');
  });
}

/****** Editar usuario ******/
export async function editUser(req, res, next) {
  let updateUser = new User({ ...req.body }, { _id: false });
  if (req.params.id == null || req.params.id == undefined) {
    let e = new Error('Se debe ingresar un id como parámetro');
    e.name = "badRequest";
    return next(e);
  }
  /*
    if (updateUser.mail == null || updateUser.mail == undefined || updateUser.name == null || updateUser.name == undefined) {
      let e = new Error('Se debe ingresar los campos requeridos (mail, name)');
      e.name = "badRequest";
      return next(e);
    }
  */
  User.getUserById(req.params.id, (err, user) => {
    if (err) {
      const e = new Error('Error en el servidor: ' + err);
      e.name = 'internal'
      return next(e);
    }
    if (!user) {
      const e = new Error(`No existe usuario con el id '${req.params.id}'`);
      e.name = 'notFound';
      return next(e);
    }

    if (updateUser.name) user.name = updateUser.name;
    if (updateUser.mail) user.mail = updateUser.mail;
    if (updateUser.connectedAccounts) user.connectedAccounts = updateUser.connectedAccounts;
    if (updateUser.role) user.role = updateUser.role;
    if (updateUser.imageURL) user.imageURL = updateUser.imageURL;

    user.save(err => {
      if (err) {
        const e = new Error('Error al actualizar el usuario (' + err + ')');
        e.name = 'badRequest'
        return next(e);
      }
      res.status(202).json({
        status: 202,
        success: true,
        message: "Usuario actualizado"
      });
    });
  });
}

/****** Borrar usuario ******/
export async function deleteUser(req, res, next) {
  const userId = req.params.id;
  if (userId == null || userId == undefined) {
    let e = new Error('Se debe ingresar un id como parámetro');
    e.name = "badRequest";
    return next(e);
  }
  //TODO: 'req.user' es undefined
  /*
  if (userId === req.user.id) {
    const e = new Error('Un usuario no se puede borrar a si mismo');
    e.name = 'unautorized';
    console.error('Error: Un usuario no se puede borrar a si mismo');
    return next(e);
  }
  */
  User.deleteOne(
    {
      _id: userId,
    },
    (err, _user) => {
      if (err) {
        const e = new Error('No se pudo eliminar el usuario, ' + err);
        e.name = 'internal'
        return next(e);
      }
      console.log(`Usuario ${userId} borrado`);
      res.status(202).json({
        status: 202,
        success: true,
        message: `Usuario ${userId} borrado`
      });
    }
  );
}

export const getAnalysis = (req, res, next) => {
  if (!req.user) {
    const e = new Error('Usuario no definido');
    e.name = 'unautorized';
    return next(e);
  }
  User.getUserById(req.user._id, (err, user) => {
    if (err) {
      const e = new Error('Error en el servidor: ' + err);
      e.name = 'internal'
      return next(e);
    }
    if (!user) {
      const e = new Error(`No existe usuario con el id '${req.params.id}'`);
      e.name = 'notFound';
      return next(e);
    }
    console.log(`Regresando analysis data del usuario: ${user._id}`);
    res.status(202).json({
      status: 202,
      success: true,
      data: user.analysis.slice(-7),
    });
  });
}