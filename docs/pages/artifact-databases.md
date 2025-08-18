---
layout: page
title: Databases
permalink: /pages/artifact-databases.html
---

## Overview  

This artifact also comes from the **Travlr Getaways** full stack application in CS 465. The back end used MongoDB with Mongoose to store trip information, and the Express API exposed these trips to the Angular front end.  

In the original implementation, the database interaction logic in `travlr.js` was limited in flexibility and stored some values (like `length` and `perPerson`) as strings. This created inefficiencies when querying or aggregating data.  

The enhanced version improves the Mongoose schema and updates `travlr.js` to ensure **numeric types** for fields like `length` and `perPerson`. This allows more efficient sorting, filtering, and querying directly in the database.  

---

## Why I Included It  

This artifact highlights my ability to:  
- Design and maintain efficient **database schemas**  
- Strengthen data integrity by enforcing proper types at the schema level  
- Write database interaction logic that is scalable and production-ready  
- Show how back-end improvements impact the reliability of a full stack application  

---

## Enhancement Focus  

- Changed `length` and `perPerson` in the Mongoose schema from `string` → **Number**  
- Updated queries in `travlr.js` to work with numeric fields  
- Improved database consistency with the Angular `Trip` model in the front end  
- Preserved existing functionality while improving efficiency for calculations and sorting  

---

## Before vs. After  

### Before (original `travlr.js` excerpt)  

<details>
  <summary><strong>Show original excerpt</strong></summary>

{% highlight javascript %}
// Example schema from original
const tripSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  length: { type: String, required: true },      // stored as string
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: String, required: true },   // stored as string
  image: { type: String, required: true },
  description: { type: String, required: true }
});
{% endhighlight %}

</details>

**What’s wrong here?**  
- `length` and `perPerson` were strings → inefficient for math, sorting, or aggregations.  
- Schema did not enforce numeric data integrity.  
- Added overhead when sending data to the Angular front end.  

**View full file in repo:**  
- [Original `travlr.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/databases/original/travlr.js)  

---

### After (enhanced `travlr.js` excerpt)  

<details>
  <summary><strong>Show enhanced excerpt</strong></summary>

{% highlight javascript %}
// Updated schema
const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  length: { type: Number, required: true },      // now a number
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: Number, required: true },   // now a number
  image: { type: String, required: true },
  description: { type: String, required: true }
});
{% endhighlight %}

</details>

**How it’s better now:**  
- Strong typing at the schema level improves reliability.  
- Numeric values enable sorting and calculations in MongoDB queries.  
- Front end (Angular) models and back end are aligned.  
- Easier to scale and maintain.  

**View full file in repo:**  
- [Enhanced `travlr.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/databases/enhanced/travlr.js)  

---

## Reflection  

Enhancing `travlr.js` emphasized how important it is to get **data modeling right at the database layer**. By enforcing numeric types for fields like `length` and `perPerson`, I reduced the risk of inconsistencies and improved query performance.  

The challenge was ensuring compatibility across the stack after updating the schema. I validated by re-running the Express API and verifying that Angular’s `Trip` component rendered data correctly, including numeric sorting.  

---

## Course Outcomes Demonstrated  

- Apply **database management principles** to strengthen integrity and efficiency  
- Align schemas with front-end data models for reliable, scalable applications  
- Demonstrate **problem-solving skills** by refactoring weak schema design into a robust structure  
