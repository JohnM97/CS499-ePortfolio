// ====== Required Dependencies ======
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const handlebars = require('hbs');
require('dotenv').config(); // Load environment variables

// ====== Custom Middleware ======
const corsMiddleware = require('./middleware/cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// ====== Config & Auth ======
require('./app_api/config/passport');     // Auth strategy setup
require('./app_api/models/db');           // MongoDB connection

const app = express();

// ====== View Engine Setup ======
app.set('views', path.join(__dirname, 'app_server', 'views'));
handlebars.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));
app.set('view engine', 'hbs');

// ====== Middleware =======
app.use(logger); // Custom file-based logging via Morgan
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(corsMiddleware); // Handles CORS using CLIENT_URL from .env

// ====== Route Handlers ======
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

// ====== Route Mounting ======
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// ====== Error Handling ======
app.use(errorHandler.handleUnauthorized);
app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleGeneralError);

module.exports = app;
