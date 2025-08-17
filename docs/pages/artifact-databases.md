
---
layout: page
title: Databases
permalink: /pages/artifact-databases.html
---

## Artifact Summary
This artifact is the `trip.js` schema from my CS 465 travel application, where trip data is stored in MongoDB using Mongoose. The schema defines fields such as trip code, name, length, start date, resort, price per person, image, and description.

## Why Included
I selected this artifact because it showcases my ability to design and refine database schemas. It highlights my growth in database management, data validation, and ensuring consistency between the application and persistent storage.

## Enhancement Focus
In the original schema, several fields were stored as strings even when numeric or date types were more appropriate (e.g., trip length and per-person cost). For the enhancement, I updated these fields to use appropriate data types, added indexing for faster search, and improved validation to ensure accurate and consistent data. These changes improved both performance and data integrity.

## Reflection
Enhancing this artifact emphasized the importance of designing databases that balance flexibility with accuracy. I learned how indexing can dramatically improve query performance and how proper data types reduce the risk of errors. A challenge I faced was updating the front end to handle stricter validation rules, which required changes to both the API and UI forms. Through this process, I reinforced the value of thinking end-to-end about how databases interact with the rest of the application.

## Course Outcomes Met
- Apply database design principles to create accurate, efficient schemas.
- Demonstrate the ability to validate and index data for integrity and performance.
- Integrate database design improvements into full stack applications.

