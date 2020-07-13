import { validator } from '../helpers/validate.helper';

const register = (req, _res, next) => {
    const validationRule = {
        mail: 'required|email',
        name: 'required|string',
        password: 'required|string|min:4',
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            const e = new Error('Error en validaciones');
            e.errors = err;
            return next(e);
        } else {
            next();
        }
    });
};

const authenticate = (req, _res, next) => {
  const validationRule = {
      mail: 'required|email',
      password: 'required|string|min:4',
  }
  validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
          const e = new Error('Error en validaciones');
          e.errors = err;
          return next(e);
      } else {
          next();
      }
  });
};

const editUser = (req, _res, next) => {
  const validationRule = {
      mail: 'email',
      name: 'string',
      connectedAccounts: {
        facebook: {
            token: 'string',
            userID: 'string',
        },
        spotify: {
            token: {
                value: 'string',
                expires: 'integer',
            },
            refreshToken: 'string',
        },
    },
  }
  validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
          const e = new Error('Error en validaciones');
          e.errors = err;
          return next(e);
      } else {
          next();
      }
  });
};

const connectFB = (req, _res, next) => {
  const validationRule = {
    fbToken: 'required|string',
    userID: 'required|string',
  }
  validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
          const e = new Error('Error en validaciones');
          e.errors = err;
          return next(e);
      } else {
          next();
      }
  });
};

module.exports = {
  register,
  editUser,
  connectFB,
  authenticate
};
