---
layout: page
title: Algorithms & Data Structures
permalink: /pages/artifact-algorithms.html
---

## Overview  

This artifact comes from the **Angular front end** of the *Travlr Getaways* full stack project in CS 465. The `trip-listing.component.ts` file is responsible for retrieving and displaying trip data to the user.  

In the original version, the component lacked strong data handling — all trips were displayed without filtering, and fields like `length` and `perPerson` were typed as strings. This made it difficult to process data effectively, perform calculations, or sort results reliably.  

The enhanced version applies **algorithms and data structure principles** by:  
- Filtering trips so only **upcoming trips** are displayed  
- Sorting trips **chronologically** by start date  
- Updating the `Trip` interface so fields like `length` and `perPerson` are typed as numbers instead of strings  

These changes improved both **usability** and **data reliability**, showing how algorithmic improvements can strengthen application behavior.  

---

## Why I Included It  

This artifact demonstrates my ability to:  
- Apply **sorting and filtering algorithms** in a real front-end application  
- Improve type safety and enforce consistency in TypeScript models  
- Enhance the user experience by displaying accurate and relevant data  

---

## Enhancement Focus  

- Added **filtering logic** → show only trips with a start date in the future  
- Added **sorting logic** → order upcoming trips chronologically  
- Strengthened the `Trip` interface → converted `length` and `perPerson` to numbers  
- Preserved existing UI functionality while enhancing correctness and maintainability  

---

## Before vs. After  

### Before (original `trip-listing.component.ts` excerpt)  

<details>
  <summary><strong>Show original excerpt</strong></summary>

{% highlight typescript %}
export interface Trip {
    _id: string,
    code: string,
    name: string,
    length: string,         // Weak typing
    start: Date,
    resort: string,
    perPerson: string,      // Weak typing
    image: string,
    description: string
}

ngOnInit(): void {
  this.tripDataService.getTrips().subscribe(trips => {
    this.trips = trips;     // No filtering or sorting
  });
}
{% endhighlight %}

</details>

**What’s wrong here?**  
- Trips are displayed in the order they’re retrieved → no logical sorting.  
- Past trips are shown even though they’re no longer relevant.  
- Weak typing (`string` instead of `number`) creates inconsistencies with the database.  

**View full file in repo:**  
- [Original `trip-listing.component.ts`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/algorithms/original/trip-listing.component.ts)  

---

### After (enhanced `trip-listing.component.ts` excerpt)  

<details>
  <summary><strong>Show enhanced excerpt</strong></summary>

{% highlight typescript %}
export interface Trip {
    _id: string,
    code: string,
    name: string,
    length: number,        // Strong typing
    start: Date,
    resort: string,
    perPerson: number,     // Strong typing
    image: string,
    description: string
}

ngOnInit(): void {
  this.tripDataService.getTrips().subscribe(trips => {
    this.trips = trips
      .filter(trip => new Date(trip.start) > new Date())   // Show only upcoming
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()); // Chronological order
  });
}
{% endhighlight %}

</details>

**How it’s better now:**  
- Trips are filtered so users only see relevant, **upcoming trips**.  
- Sorting ensures trips are displayed **in order of their start date**.  
- Strong typing prevents mismatches and enables numeric operations without conversion.  

**View full file in repo:**  
- [Enhanced `trip-listing.component.ts`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/algorithms/enhanced/trip-listing.component.ts)  

---

## Reflection  

Enhancing this component highlighted how **algorithms and data structures** impact user experience. Filtering and sorting improved how data is presented, while type safety made the code more reliable and easier to maintain.  

The challenge was ensuring that the UI updated correctly after applying filtering and sorting. I tested the changes by verifying that only future trips appeared and that they were listed in the correct order.  

This artifact demonstrates the practical application of algorithms to solve real-world problems in a web app.  

---

## Course Outcomes Demonstrated  

- Apply **algorithms and data structures** to improve functionality and performance in applications  
- Strengthen **data integrity and type safety** through consistent models  
- Show **problem-solving ability** by refactoring weak, unstructured logic into maintainable, scalable code  
