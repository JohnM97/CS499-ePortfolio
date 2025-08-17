
---
layout: page
title: Software Design & Engineering
permalink: /pages/artifact-software.html
---

Software Design and Engineering
Artifact Summary

This artifact is the Express server entry point for my CS 465 full stack project. The original app.js contained routing, configuration, and error handling in one file. The enhanced version refactors the server into smaller modules and centralizes configuration.

Why I Included It

This artifact shows my ability to improve maintainability, readability, and security in a real codebase. It demonstrates modular middleware, separation of concerns, and production friendly logging and error handling.

Enhancement Focus

Broke the monolithic app.js into focused modules

Moved CORS, logging, and error handling to dedicated middleware

Kept sensitive or environment specific settings in .env

Preserved routes and behavior while reducing coupling

Before vs After
Before: artifacts/software/original/app.js (excerpt)
<details> <summary>Show code</summary>
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

var handlebars = require('hbs');
var passport = require('passport');
require('./app_api/config/passport');
require('./app_api/models/db');

// ... middleware and routes all configured here ...
// ... error handlers also live in this file ...
</details>

View full file in repo:

Original app.js: https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/original/app.js

After: artifacts/software/enhanced/app.js (excerpt)
<details> <summary>Show code</summary>

// ====== Required Dependencies ======
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// ====== Custom Middleware ======
const logger = require('./middleware/logger');
const cors = require('./middleware/cors');
const { handleUnauthorized, handleNotFound, handleGeneralError } = require('./middleware/errorHandler');

// ====== Routers ======
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

const app = express();

// Core middleware
app.use(logger);
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// Errors
app.use(handleUnauthorized);
app.use(handleNotFound);
app.use(handleGeneralError);

module.exports = app;
</details>

View full files in repo:

Enhanced app.js: https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/app.js

Logger: https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/middleware/logger.js

CORS: https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/middleware/cors.js

Error handler: https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/middleware/errorHandler.js

Key Middleware Excerpts
middleware/logger.js (excerpt)
<details> <summary>Show code</summary>
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const logStream = fs.createWriteStream(
  path.join(__dirname, '../logs/access.log'),
  { flags: 'a' }
);

module.exports = morgan('combined', { stream: logStream });
</details>
middleware/cors.js (excerpt)
<details> <summary>Show code</summary>
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
};
const createError = require('http-errors');

function handleUnauthorized(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next(err);
}

function handleNotFound(req, res, next) {
  next(createError(404));
}

function handleGeneralError(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message || 'Server Error' });
}

module.exports = {
  handleUnauthorized,
  handleNotFound,
  handleGeneralError
};
</details>
Reflection

Refactoring into modules made the server easier to read and safer to extend. Centralizing CORS and logging improved clarity and ensured consistent behavior across routes. The biggest challenge was preserving behavior while moving logic into separate files. I validated changes by running the app locally, confirming route responses, and checking the access log and error responses. This work improved maintainability and aligns with professional standards for Express applications.

Course Outcomes Demonstrated

Apply software engineering and development principles for modular, maintainable design

Integrate security minded practices by externalizing environment specific settings and centralizing error handling

Produce clear, professional quality code with focused modules and consistent middleware patterns

