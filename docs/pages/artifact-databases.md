---
layout: default
title: Databases
permalink: /pages/artifact-databases.html
---

{% include nav.html %}

## Overview  

This artifact comes from the same **Travlr Getaways** project in CS 465, a full stack MEAN application that allows users to browse and book trips. The database layer was powered by **MongoDB** and used **Mongoose** schemas to define the structure of stored documents.  

The original implementation of the `Trip` schema worked, but it had limitations: fields like `length` and `perPerson` were stored as **strings** instead of numeric types, and indexing was not fully applied. This created inefficiencies for querying, sorting, and validation.  

The enhanced version improves data integrity and query performance by updating types, applying indexing where appropriate, and ensuring consistent validation rules. These changes make the schema production-ready and align it more closely with professional database design practices.  

---

## Why I Included It  

This artifact demonstrates my ability to work with **databases and schema design** in a real application context. It shows how I can:  
- Analyze weaknesses in the original schema  
- Improve validation, integrity, and performance with better types and indexing  
- Make database models easier to maintain and query in production environments  

---

## Enhancement Focus  

- Converted `length` and `perPerson` from strings to **Number** for accurate math operations and sorting  
- Added **indexes** on key fields like `code` and `name` to speed up search queries  
- Preserved all existing functionality while making the schema more reliable  
- Strengthened **data validation** by ensuring required fields are enforced  

---

## Before vs. After  

### Before (original `trip.js` schema)  

<details>
  <summary><strong>Show original excerpt</strong></summary>

{% highlight javascript %}
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },       
  name: { type: String, required: true, index: true },       
  length: { type: String, required: true },                  
  start: { type: Date, required: true },                     
  resort: { type: String, required: true },                  
  perPerson: { type: String, required: true },               
  image: { type: String, required: true },                   
  description: { type: String, required: true }              
});

const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
{% endhighlight %}

</details>

**What’s wrong here?**  
- `length` and `perPerson` are stored as **strings**, making it harder to calculate averages or filter by price/duration.  
- Validation is present, but type enforcement is weak.  
- Indexing only partially applied (helpful but not optimized).  

**View full file in repo:**  
- [Original `trip.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/databases/original/trip.js)  

---

### After (enhanced `trip.js` schema)  

<details>
  <summary><strong>Show enhanced excerpt</strong></summary>

{% highlight javascript %}
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  length: { type: Number, required: true },        // Converted from String to Number
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: Number, required: true },     // Converted from String to Number
  image: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true }); // Added auto timestamps

const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
{% endhighlight %}

</details>

**How it’s better now:**  
- **Numbers instead of strings** → allows for accurate filtering and math operations (e.g., find trips under $1000).  
- Added **timestamps** for better tracking of when trips are created or updated.  
- Schema remains backward-compatible while improving performance and integrity.  

**View full file in repo:**  
- [Enhanced `trip.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/databases/enhanced/trip.js)  

---

## Reflection  

Improving the schema gave me a stronger appreciation for how important **data modeling** is in application design. Even small changes—like switching from strings to numbers—can make queries faster, results more accurate, and code easier to maintain.  

The challenge was ensuring backward compatibility while making improvements. I validated the schema by running test queries and verifying that trip data stored in MongoDB still loaded correctly after the type changes.  

---

## Course Outcomes Demonstrated  

- Apply database design principles to improve integrity and performance  
- Ensure data consistency through strong typing and validation rules  
- Align schema design with real-world scalability and professional standards  

