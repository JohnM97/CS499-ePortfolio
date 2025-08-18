---
layout: default
title: Software Design & Engineering
permalink: /pages/artifact-software.html
---


## Overview

The artifact comes from my CS 465 full stack project, Travlr Getaways, a travel booking web application built using the MEAN stack (MongoDB, Express, Angular, Node.js). The goal of the project was to create a functional travel site where users could view available trips, explore details, and manage bookings through a modern web interface.

At the heart of this system was the Express server, specifically the `app.js` file, which acted as the entry point for routing, configuration, and middleware. In its original state, this file was monolithic: it contained routing logic, error handling, middleware setup, and environment configuration all in one place. While functional for a small demo project, this structure lacked scalability, clarity, and maintainability.

The enhanced version presented here refactors the server by separating concerns into dedicated modules for middleware, logging, error handling, and CORS. This improves maintainability, security, and readability while preserving the original project functionality.

## Why I Included It

This artifact shows my ability to improve maintainability, readability, and security in a real codebase. It demonstrates modular middleware, separation of concerns, and production-friendly logging and error handling.

## Enhancement Focus

- Broke the monolithic `app.js` into focused modules
- Moved CORS, logging, and error handling to dedicated middleware
- Kept sensitive or environment-specific settings in `.env`
- Preserved routes and behavior while reducing coupling

---

## Before vs. After

### Before (original `app.js` excerpt)

<details>
  <summary><strong>Show original excerpt</strong></summary>

{% highlight javascript %}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

// ... middleware, routes, and error handlers all configured here ...
{% endhighlight %}
</details>

**What this shows:**  
This original file mixed routing, configuration, middleware, and error handling in one place. It worked, but it was hard to maintain, insecure for production, and not modular.  

**View full file in repo:**  
- [Original `app.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/original/app.js)

---

### After (enhanced `app.js` excerpt)

<details>
  <summary><strong>Show enhanced excerpt</strong></summary>

{% highlight javascript %}
// Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// Custom middleware
const logger = require('./middleware/logger');
const cors = require('./middleware/cors');
const { handleUnauthorized, handleNotFound, handleGeneralError } =
  require('./middleware/errorHandler');

// Routers
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
{% endhighlight %}
</details>

**What’s better now:**  
The enhanced version separates concerns into different modules:  
- Middleware like logging, CORS, and error handling live in their own files  
- Routes are preserved but clearly separated  
- The server is easier to read, extend, and secure  

**View full files in repo:**  
- [Enhanced `app.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/app.js)  
- [middleware/logger.js](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/middleware/logger.js)  
- [middleware/cors.js](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/middleware/cors.js)  
- [middleware/errorHandler.js](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/middleware/errorHandler.js)

---

## Key Middleware Excerpts

Each middleware file demonstrates a specific improvement.

### logger.js  
<details>
  <summary><strong>Show code</strong></summary>

{% highlight javascript %}
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const logStream = fs.createWriteStream(
  path.join(__dirname, '../logs/access.log'),
  { flags: 'a' }
);

module.exports = morgan('combined', { stream: logStream });
{% endhighlight %}
</details>

**Why this matters:**  
Logs are now written to a file (`logs/access.log`) instead of only console output, which is production-ready and helps with debugging.

---

### cors.js  
<details>
  <summary><strong>Show code</strong></summary>

{% highlight javascript %}
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
};
{% endhighlight %}
</details>

**Why this matters:**  
Cross-Origin Resource Sharing is now configurable via environment variables, making the server safer for deployment.

---

### errorHandler.js  
<details>
  <summary><strong>Show code</strong></summary>

{% highlight javascript %}
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

module.exports = { handleUnauthorized, handleNotFound, handleGeneralError };
{% endhighlight %}
</details>

**Why this matters:**  
Errors are handled gracefully and consistently, returning structured JSON instead of vague messages, which improves security and debugging.

---

## Reflection

Refactoring into modules made the server easier to read and safer to extend. Centralizing CORS and logging improved clarity and ensured consistent behavior across routes. The biggest challenge was preserving behavior while moving logic into separate files. I validated changes by running the app locally, confirming route responses, and checking the access log and error responses. This work improved maintainability and aligns with professional standards for Express applications.

## Course Outcomes Demonstrated

- Apply software engineering and development principles for modular, maintainable design  
- Integrate security-minded practices by externalizing environment-specific settings and centralizing error handling  
- Produce clear, professional-quality code with focused modules and consistent middleware patterns
