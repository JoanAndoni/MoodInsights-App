//routes/router.js
'use strict'
import express from 'express';
import passport from 'passport';
// Helpers
import errorHelper from '../helpers/error.helper';

// Middlewares 
import {
  isAuth
} from '../middlewares/auth.middleware';
import validation from '../middlewares/validator.middleware';

// Controllers
import {
  initPath,
  health,
  wrongHealth,
  wrongPath,
} from '../controllers/global.controller';

import {
  authenticate,
  getUsers,
  registerUser,
  editUser,
  deleteUser,
  getAnalysis,
} from '../controllers/user.controller';

// Services
import {
  link,
  unlink,
  getP
} from '../services/facebook';
import {
  callback,
  disconnect,
  connect,
  getAccessToken,
  getS
} from '../services/spotify';

const router = express.Router();

module.exports = (() => {
  // Auth =========================================================
  // Autetifica usuarios
  router.post('/authenticate', validation.authenticate, authenticate);
  router.post('/register', validation.register, registerUser);

  // Users =========================================================
  //Obtener todos los usuarios
  router.get('/users', isAuth,getUsers);
  router.put('/users', isAuth, editUser); //Handle empty id put request
  router.put('/users/:id', validation.editUser, isAuth, editUser);
  router.delete('/users', isAuth, deleteUser); //Handle empty id delete request
  router.delete('/users/:id', isAuth, deleteUser);

  // Analysis data
  router.get(
    '/users/analysis',
    passport.authenticate('jwt', {
      session: false
    }),
    getAnalysis
  );

  // Services =========================================================
  // Facebook
  router.post(
    '/facebook/connect',
    validation.connectFB,
    passport.authenticate('jwt', {
      session: false
    }),
    link
  );

  router.get(
    '/facebook/disconnect',
    passport.authenticate('jwt', {
      session: false
    }),
    unlink
  );

  // Spotify
  router.get(
    '/spotify/connect',
    passport.authenticate('jwt', {
      session: false
    }),
    connect
  );

  router.get('/spotify/callback', getAccessToken, callback);

  router.get(
    '/spotify/disconnect',
    passport.authenticate('jwt', {
      session: false
    }),
    disconnect
  );

  // TESTING
  router.get('/spotify/songs/:id', getS);
  router.get('/facebook/posts/:id', getP);

  // General =========================================================
  //Maneja /
  router.get('/', initPath);
  router.post('/', initPath);
  router.put('/', initPath);
  router.delete('/', initPath);

  // Health =========================================================
  //Revisa que el api funcione
  router.get('/health', health);
  //Maneja Health incorrecto
  router.post('/health', wrongHealth);
  router.put('/health', wrongHealth);
  router.delete('/health', wrongHealth);

  // Not Found =========================================================
  //Maneja las rutas no definidas
  router.all('*', wrongPath);
  /**
   *@throws
   */
  //Manejo de errores
  router.use(function (err, req, res, next) {
    if (err.name == 'movedPermanently') {
      errorHelper.permanentRedirect(err, req, res)
    } else if (err.name == 'seeOther') {
      errorHelper.seeOther(err, req, res)
    } else if (err.name == 'notModified') {
      errorHelper.notModified(err, req, res)
    } else if (err.name == 'temporaryRedirect') {
      errorHelper.temporaryRedirect(err, req, res)
    } else if (err.name == 'permanentRedirect') {
      errorHelper.permanentRedirect(err, req, res)
    } else if (err.name == 'badRequest') {
      errorHelper.badRequest(err, req, res)
    } else if (err.name == 'unautorized') {
      errorHelper.unautorized(err, req, res)
    } else if (err.name == 'forbidden') {
      errorHelper.forbidden(err, req, res)
    } else if (err.name == 'notFound') {
      errorHelper.notFound(err, req, res)
    } else if (err.name == 'methodNotAllowed') {
      errorHelper.methodNotAllowed(err, req, res)
    } else if (err.name == 'conflict') {
      errorHelper.conflict(err, req, res)
    } else if (err.name == 'unsupportedMediaType') {
      errorHelper.unsupportedMediaType(err, req, res)
    } else if (err.name == 'imATeapot') {
      errorHelper.imATeapot(err, req, res)
    } else if (err.name == 'internal') {
      errorHelper.internal(err, req, res)
    } else if (err.name == 'notImplemented') {
      errorHelper.notImplemented(err, req, res)
    } else if (err.name == 'badGateway') {
      errorHelper.badGateway(err, req, res)
    } else if (err.name == 'serviceUnavailable') {
      errorHelper.serviceUnavailable(err, req, res)
    } else if (err.name == 'gatewayTimeout') {
      errorHelper.gatewayTimeout(err, req, res)
    } else {
      errorHelper.internal(err, req, res)
    }
  });
  return router
})()