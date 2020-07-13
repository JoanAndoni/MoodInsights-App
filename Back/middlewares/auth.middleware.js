// middlewares/auth.middleware.js
'use strict';
import passport from 'passport';

exports.isAuth = (req, res, next) => {
  //Revisa si 'authorization' esta en la cabezera
  if (!req.headers.authorization) {
    let e = new Error('No tienes permiso para acceder a este contenido, el token es nulo');
    e.name = "unautorized";
    return next(e);
  }

  passport.authenticate('jwt', {
    session: false
  }, function (err, user, info) {
    if (err) {
      const e = new Error('Error en el servidor al autenticar');
      e.name = 'internal'
      return next(e);
    }
    if (!user) {
      const e = new Error('El token expiró o es inválido');
      e.name = 'unautorized'
      return next(e);
    }
    next();
  })(req, res, next);
}