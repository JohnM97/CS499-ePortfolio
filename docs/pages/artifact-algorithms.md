---
layout: default
title: Algorithms & Data Structures
permalink: /pages/artifact-algorithms.html
---

{% include nav.html %}

## Overview  

This artifact also comes from the **Travlr Getaways** full stack application in CS 465. The Angular front-end consumed data from MongoDB through Express APIs, and trips were displayed dynamically to users.  

In the original implementation, the Angular `Trip` model defined fields inconsistently (e.g., storing `length` and `perPerson` as strings). This caused inefficiencies when displaying or sorting data.  

The enhanced version applies **stronger typing** to the `Trip` interface, ensuring consistency with the improved database schema. This creates a more reliable data flow from database → API → front-end and demonstrates how **data structures and algorithms** align across the stack.  

---

## Why I Included It  

This artifact highlights my ability to:  
- Design consistent **data structures** across multiple layers of a full stack app  
- Improve type safety and reduce bugs in the Angular front end  
- Align front-end models with back-end schemas for scalability and reliability  

---

## Enhancement Focus  

- Changed `length` and `perPerson` from `string` to **number** in the TypeScript interface  
- Matched the front-end interface with the updated Mongoose schema  
- Ensured consistent typing across the stack → database, server, and client  
- Preserved existing behavior while strengthening correctness and maintainability  

---

## Before vs. After  

### Before (original `trip.ts` interface)  

<details>
  <summary><strong>Show original excerpt</strong></summary>

{% highlight typescript %}
export interface Trip {
    _id: string,           
    code: string,
    name: string,
    length: string,         // Stored as string (inefficient)
    start: Date,
    resort: string,
    perPerson: string,      // Stored as string (inefficient)
    image: string,
    description: string
}
{% endhighlight %}

</details>

**What’s wrong here?**  
- `length` and `perPerson` are typed as `string` → cannot perform calculations or numeric sorting without conversion.  
- Causes inconsistency with the database schema.  
- Weak typing increases risk of errors when binding data in Angular templates.  

**View full file in repo:**  
- [Original `trip.ts`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/algorithms/original/trip.ts)  

---

### After (enhanced `trip.ts` interface)  

<details>
  <summary><strong>Show enhanced excerpt</strong></summary>

{% highlight typescript %}
export interface Trip {
    _id: string,           
    code: string,
    name: string,
    length: number,        // Now a number for calculations & sorting
    start: Date,
    resort: string,
    perPerson: number,     // Now a number for accurate math
    image: string,
    description: string
}
{% endhighlight %}

</details>

**How it’s better now:**  
- `length` and `perPerson` are strongly typed as **numbers**, enabling sorting, filtering, and calculations without conversion.  
- Matches the improved Mongoose schema in the database.  
- Reduces type mismatches across the stack, improving reliability and maintainability.  

**View full file in repo:**  
- [Enhanced `trip.ts`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/algorithms/enhanced/trip.ts)  

---

## Reflection  

Enhancing the `Trip` interface emphasized the importance of **consistent data modeling** between the client and server. By aligning the Angular front end with the improved MongoDB schema, I eliminated type mismatches that could have introduced runtime errors.  

The challenge was ensuring that UI components using the `Trip` model were not broken by the type change. I validated by re-running the Angular app and verifying that trip data displayed correctly and that sorting/filtering worked without type conversion.  

---

## Course Outcomes Demonstrated  

- Apply **algorithms and data structures** concepts to real-world full stack applications  
- Strengthen **data integrity** through consistent type enforcement across the stack  
- Demonstrate **problem-solving skills** by refactoring weak typing into maintainable, scalable code structures  

