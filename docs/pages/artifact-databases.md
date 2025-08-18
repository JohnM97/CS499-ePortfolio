---
layout: page
title: Database Management
permalink: /pages/artifact-databases.html
---

## Overview  

This artifact comes from the **back-end of the Travlr Getaways** project in CS 465. The file `travlr.js` connects the Express server to MongoDB and defines how data is structured, stored, and validated.  

In the original implementation, the schema was loosely defined: some fields were stored as strings even when they should have been numeric, and there was little enforcement of data integrity. This could lead to errors, inefficiencies, and inconsistent data.  

The enhanced version strengthens the **Mongoose schema**, improves validation rules, and adds indexing for performance. These improvements ensure that the database enforces correct data formats and provides faster queries.  

---

## Why I Included It  

This artifact demonstrates my ability to:  
- Design **robust database schemas** with Mongoose  
- Apply **validation rules** to protect data integrity  
- Use **indexes** to improve query performance  
- Align database structure with front-end and API requirements  

---

## Enhancement Focus  

- Converted `length` and `perPerson` from **string** to **Number**  
- Added `required: true` validation for key fields  
- Added indexes on `code` and `name` for faster lookups  
- Centralized schema logic in a single model for maintainability  

---

## Before vs. After  

### Before (original `travlr.js` excerpt)  

<details>
  <summary><strong>Show original excerpt</strong></summary>

{% highlight javascript %}
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: String,
  name: String,
  length: String,          // Weak typing
  start: Date,
  resort: String,
  perPerson: String,       // Weak typing
  image: String,
  description: String
});

const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
{% endhighlight %}
</details>

**What’s wrong here?**  
- `length` and `perPerson` are strings → cannot calculate or sort efficiently.  
- No validation → bad or missing data could be saved to the database.  
- No indexing → queries could become slower as the database grows.  

**View full file in repo:**  
- [Original `travlr.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/databases/original/travlr.js)  

---

### After (enhanced `travlr.js` excerpt)  

<details>
  <summary><strong>Show enhanced excerpt</strong></summary>

{% highlight javascript %}
const mongoose = require('mongoose');

// ====== Schema Definition ======
const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },       // Unique trip code
  name: { type: String, required: true, index: true },       // Trip name
  length: { type: Number, required: true },                  // Duration in days
  start: { type: Date, required: true },                     // Start date
  resort: { type: String, required: true },                  // Resort/location
  perPerson: { type: Number, required: true },               // Price per person
  image: { type: String, required: true },                   // Image path
  description: { type: String, required: true }              // Trip description
});

// ====== Model Export ======
const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
{% endhighlight %}
</details>

**How it’s better now:**  
- Strong typing (`Number` instead of `String`) ensures consistent, usable data.  
- Required fields prevent incomplete records.  
- Indexes improve query performance for `code` and `name`.  
- Database now enforces structure, reducing bugs across the stack.  

**View full file in repo:**  
- [Enhanced `travlr.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/databases/enhanced/travlr.js)  

---

## Reflection  

Improving this schema taught me how critical **database design** is for overall application quality. By applying validation rules and proper data types, I eliminated mismatches that caused problems in the front end. Adding indexes also made the app scale better by improving query performance.  

The main challenge was balancing stricter validation with flexibility — I tested by inserting trips with valid and invalid data to confirm that Mongoose blocked bad input.  

---

## Course Outcomes Demonstrated  

- Apply **database management principles** to design reliable schemas  
- Enforce **data integrity and consistency** with validation rules  
- Optimize **query performance** through indexing and structured design  
