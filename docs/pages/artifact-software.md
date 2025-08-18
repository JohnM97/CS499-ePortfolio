---
layout: page
title: Software Design & Engineering
permalink: /pages/artifact-software.html
---

## Overview  

This artifact comes from the **Travlr Getaways** full stack application in CS 465. The application’s back end is built with **Node.js and Express**, serving data from MongoDB to the Angular front end.  

Originally, the server’s `app.js` file contained **all routing, configuration, logging, and error handling in one file**. While functional, this monolithic approach made the server hard to maintain and extend.  

The enhanced version demonstrates **software engineering best practices** by refactoring the Express server into **modular middleware**, centralizing configuration, and improving error handling. This ensures a cleaner structure, better maintainability, and production readiness.  

---

## Why I Included It  

This artifact highlights my ability to:  
- Apply **modular software design principles** for maintainability  
- Use **separation of concerns** to reduce coupling in a codebase  
- Add **operational improvements** such as logging, CORS enforcement, and error handling  
- Prepare a real application for **scalable, production-level deployment**  

---

## Enhancement Focus  

- Extracted cross-cutting concerns into a dedicated `middleware/` directory  
- Standardized error handling with `handleUnauthorized`, `handleNotFound`, and `handleGeneralError`  
- Centralized configuration (CORS origin, log path, error responses) instead of hardcoding values  
- Preserved route functionality while making the server easier to test, monitor, and extend  

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

**What’s wrong here?**  
- All middleware and error handling live in one file, making `app.js` hard to maintain.  
- Logging was inline with no dedicated configuration.  
- Error handling was scattered and inconsistent.  
- No centralized CORS handling or environment-driven configuration.  

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

**How it’s better now:**  
- `app.js` is now a clean composition of middleware and routes.  
- Cross-cutting concerns live in dedicated modules (`logger.js`, `cors.js`, `errorHandler.js`).  
- Errors are consistently handled in a unified flow (401 → 404 → 500).  
- Environment variables (`.env`) control sensitive settings like allowed origins.  

**View full files in repo:**  
- [Enhanced `app.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/app.js)  
- [middleware/logger.js](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/middleware/logger.js)  
- [middleware/cors.js](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/middleware/cors.js)  
- [middleware/errorHandler.js](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/software/enhanced/middleware/errorHandler.js)  

---

## Key Middleware Excerpts  

<details>
  <summary><strong>logger.js</strong></summary>

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

<details>
  <summary><strong>cors.js</strong></summary>

{% highlight javascript %}
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
};
{% endhighlight %}

</details>

<details>
  <summary><strong>errorHandler.js</strong></summary>

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

---

## Reflection  

Refactoring the Express server reinforced the value of **separation of concerns**. By pulling out middleware for logging, CORS, and error handling, I made the application more maintainable and production-ready.  

The biggest challenge was ensuring the refactor didn’t break existing routes. I validated changes by running the app locally, testing all API endpoints, and checking both the logs and error responses.  

This process improved **maintainability, observability, and reliability** of the server—qualities that are essential in professional software engineering.  

---

## Course Outcomes Demonstrated  

- Apply **software engineering principles** for modular and maintainable design  
- Integrate **security and configuration best practices** in server architecture  
- Deliver **production-quality code** through modularization, logging, and error handling  
