---
layout: page
title: Database Management
permalink: /pages/artifact-databases.html
---
![Databases Banner]({{ site.baseurl }}/assets/images/database_banner.png)
## Overview

This artifact comes from the **back end** of *Travlr Getaways*. The `travlr.js` file defines the MongoDB/Mongoose model that powers trip data across the app.

Originally, the schema stored numeric values like `length` and `perPerson` as **strings**, and lacked stronger validation and indexing. This created risk for data inconsistencies and slower queries at scale. The first enhancement corrected the types, added validators, and enabled timestamps. The **new enhanced** version below goes further by adding **compound and text indexes**, **custom validators**, **virtuals**, and a **clean JSON transform**, a robust design suitable for production APIs.  


---

## Why I Included It

This artifact demonstrates that I can:
- Design **robust Mongoose schemas** with strong typing and validation
- Use **indexes** (compound, text) to support common query patterns
- Improve **API ergonomics** with virtuals and JSON transforms
- Align the data layer with front-end and API requirements for integrity and performance

---

## Before vs. After

### Before (original `travlr.js` excerpt)

<details>
  <summary><strong>Show original excerpt</strong></summary>

{% highlight javascript %}
const mongoose = require('mongoose');

// ====== Schema Definition ======
// Defines the shape of a Trip document in MongoDB
const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  length: { type: String, required: true },      // string (inefficient)
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: String, required: true },   // string (inefficient)
  image: { type: String, required: true },
  description: { type: String, required: true }
});

const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
{% endhighlight %}

</details>

**Issues:**  
- Numeric fields stored as **strings** → painful for calculations & sorting  
- Minimal validation; limited indexing beyond single-field lookups  

**View full file in repo:**  
- [Original `travlr.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/databases/original/travlr.js)

---

### First Enhancement (baseline enhancement)

<details>
  <summary><strong>Show prior enhanced excerpt</strong></summary>

{% highlight javascript %}
const tripSchema = new mongoose.Schema({
  code: { type: String, required: [true, 'Trip code is required'], index: true, trim: true },
  name: { type: String, required: [true, 'Trip name is required'], index: true, trim: true },
  length: { type: Number, required: [true, 'Trip length is required'], min: [1, 'Trip length must be at least 1 day'] },
  start: { type: Date, required: [true, 'Start date is required'] },
  resort: { type: String, required: [true, 'Resort name is required'], trim: true },
  perPerson: { type: Number, required: [true, 'Price per person is required'], min: [0, 'Price must be a positive number'] },
  image: { type: String, required: [true, 'Image path is required'], trim: true, default: 'default-trip.jpg' },
  description: { type: String, required: [true, 'Trip description is required'], trim: true }
}, { timestamps: true });
{% endhighlight %}

</details>

**Improvements at this stage:**  
- Fixed numeric types; added validators & `timestamps`  
- Still missing uniqueness, compound/text indexes, virtuals, and JSON normalization

---

### New Enhanced Version

<details>
  <summary><strong>Show new enhanced excerpt</strong></summary>

{% highlight javascript %}
// Uniqueness, compound & text indexes, custom validators, virtuals & JSON transform
tripSchema.index({ start: 1, perPerson: 1 });
tripSchema.index({ name: 'text', description: 'text', resort: 'text' });

tripSchema.virtual('end').get(function () {
  if (!this.start || !this.length) return undefined;
  const end = new Date(this.start);
  end.setDate(end.getDate() + Number(this.length));
  return end;
});

tripSchema.virtual('isUpcoming').get(function () {
  return this.start && this.start.getTime() > Date.now();
});

const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
{% endhighlight %}

</details>

**Why this is better now:**  
- **Integrity**: unique `code`, stricter numeric/date validation  
- **Performance**: `{ start, perPerson }` compound index for “upcoming & sort by price” queries; full-text search across name/description/resort  
- **API ergonomics**: `end` and `isUpcoming` virtuals; `toJSON` normalization adds `id` and hides raw `_id`

**View full file in repo:**  
- [Enhanced `travlr.js`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/databases/enhanced/travlr.js)

---

## Reflection

Upgrading this schema reinforced how much **database design** impacts application quality. Strong types and validation prevent bad data; indexes make the most common queries fast; and small ergonomics (virtuals, clean JSON) reduce boilerplate in APIs and the front end. I validated the changes by seeding with edge-case data, running common list/detail queries, and confirming that the Angular app continued to render trips correctly with numeric sorting. These improvements directly match my Databases narrative and course outcomes.

---

## Course Outcomes Demonstrated

- Apply **database management principles** to design reliable schemas  
- Enforce **data integrity and consistency** via validation and typing  
- Optimize **query performance** using the right indexes for access patterns  
- Produce **maintainable back-end code** aligned with real application needs
