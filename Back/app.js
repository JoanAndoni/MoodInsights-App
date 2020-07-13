//app.js
'use strict'
// Variables / Imports ==================================================
//Imports
const debug = require('debug')('dev');
import passportFunction from './config/passport';
import { urlencoded, json } from 'body-parser';
import compression from 'compression';
import passport from 'passport';
import mongoose from 'mongoose';
import express from 'express';
import helmet from 'helmet';
import morgan from "morgan";
import cors from 'cors';

require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

//Archivos
import router from './routes/router';

// importar CRON para las peticiones periodicamente
import runCronTask from './services/cron';

// Configuración ===================================================
const app = express();
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(urlencoded({
    extended: false
}));
app.use(json());
app.use(compression()); //Hace el api más ligera y más rápida
app.use(helmet()); // Añade seguridad a las cabezaras http
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passportFunction(passport);

// Rutas =========================================================
app.use('/', router);

// Listen ========================================================
const port = process.env.PORT || 3500
app.listen(port, async () => {
    await runCronTask;
    debug('Analizapp: http://127.0.0.1:' + port);
});