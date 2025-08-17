
---
layout: page
title: Software Design & Engineering
permalink: /pages/artifact-software.html
---

## Artifact Summary
This artifact is the `app.js` file from my full stack CS 465 travel application project. Originally, it contained all server logic in a single file, including routes, error handling, logging, and middleware setup.

## Why Included
I selected this artifact because it highlights my growth in applying software engineering principles such as modularity, maintainability, and scalability. Refactoring the `app.js` into modular components demonstrates my ability to improve code quality and follow professional standards.

## Enhancement Focus
Originally, `app.js` was a monolithic file that mixed routing, middleware, and configuration logic. For the enhancement, I refactored the file to use modular middleware, moved configurations to environment variables (`.env`), and created dedicated files for CORS, logging, and error handling. This improved maintainability, readability, and security by separating concerns and making the application easier to extend.

## Reflection
Enhancing this artifact reinforced the importance of writing maintainable backend code. I learned how modular design simplifies debugging and collaboration and makes the application more adaptable to new features. One challenge was ensuring the refactored code did not break existing routes; I addressed this by writing and running tests to confirm expected behavior. Feedback emphasized clarity and maintainability, which I incorporated by documenting middleware modules.

## Course Outcomes Met
- Apply software engineering and development principles to improve design and maintainability.
- Demonstrate the ability to create scalable and modular backend systems.
- Show security awareness by externalizing sensitive configurations.


