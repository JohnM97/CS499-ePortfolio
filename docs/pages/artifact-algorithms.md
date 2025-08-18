---
layout: page
title: Algorithms & Data Structures
permalink: /pages/artifact-algorithms.html
---

## Overview

This artifact comes from the **Angular front end** of *Travlr Getaways*. The `trip-listing.component.ts` is responsible for retrieving and presenting trips.  
The enhanced version demonstrates **algorithmic processing** and **stronger data structures** by filtering to **upcoming trips**, performing a **stable chronological sort**, and introducing a **search** control with debouncing. The component now exposes an **observable pipeline** suitable for the async pipe, backed by pure utility functions and an immutable view model.

These changes reflect the goals described in my narrative (filter to upcoming trips; sort chronologically; enforce proper types for numeric fields).

---

## Why I Included It

This artifact shows that I can:
- Apply **sorting and filtering algorithms** to real UI data flows
- Use **TypeScript interfaces** and view models to enforce correctness and simplify templates
- Build **observable pipelines** that are testable, maintainable, and resilient to errors

---

## Enhancement Focus

- **Filter**: only trips with a start date in the future are shown  
- **Sort**: stable ascending sort by start date (O(n log n))  
- **Search**: debounced, case-insensitive filtering by name/code/resort  
- **View model**: immutable `TripView` adds `daysUntil`, `startISO` for clean UI  
- **Error & loading states**: the stream surfaces errors and sets loading flags  
- **Cleaner lifecycle**: the async pipe replaces manual subscription/unsubscription

These decisions also satisfy the guideline to **make it easy to see both the original and enhanced work** within the ePortfolio. 

---

## Before vs. After

### Before (original `trip-listing-component.ts` excerpt)

<details>
  <summary><strong>Show original excerpt</strong></summary>

{% highlight typescript %}
// No filtering or sorting; manual subscription
ngOnInit(): void {
  this.tripDataService.getTrips().subscribe(trips => {
    this.trips = trips;
  });
}
{% endhighlight %}

</details>

**Issues:**  
- Past trips are shown; results are not ordered  
- Manual subscription and ad hoc state updates  
- Weak numeric typing (pre-enhancement) required conversions elsewhere

**View full file in repo:**  
- [Original `trip-listing-component.ts`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/algorithms/original/trip-listing-component.ts)

---

### After (enhanced `trip-listing-component.ts` excerpt)

<details>
  <summary><strong>Show enhanced excerpt</strong></summary>

{% highlight typescript %}
// Build an observable pipeline: filter upcoming, sort by date, then search
this.upcomingTrips$ = combineLatest([
  this.tripDataService.getTrips().pipe(
    map(trips => trips.filter(t => new Date(t.start) > new Date())),
    map(trips => trips.map(t => toTripView(t))),
    map(vms => [...vms].sort((a, b) => a.start.getTime() - b.start.getTime())),
    catchError(() => of([]))
  ),
  this.search$.pipe(debounceTime(150), distinctUntilChanged(), startWith(''))
]).pipe(
  map(([trips, q]) => !q ? trips :
    trips.filter(t =>
      t.name.toLowerCase().includes(q.toLowerCase()) ||
      t.code.toLowerCase().includes(q.toLowerCase()) ||
      t.resort.toLowerCase().includes(q.toLowerCase())
    )
  )
);
{% endhighlight %}

</details>

**Why this is better:**  
- **Relevant**: shows only upcoming trips  
- **Predictable**: stable chronological ordering  
- **Usable**: debounced search improves UX on larger lists  
- **Maintainable**: pure helpers + immutable transforms support testing and future changes

**View full file in repo:**  
- [Enhanced `trip-listing-component.ts`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/algorithms/enhanced/trip-listing-component.ts)

---

## Reflection

This enhancement demonstrates how **algorithms (filter/sort/search)** and **data structures (typed interfaces and view models)** improve both code quality and user experience. I validated correctness by confirming only future trips render, the order is ascending by date, and search behaves as expected. These changes directly align with the intent of the Algorithms & Data Structures milestone. 

---

## Course Outcomes Demonstrated

- Apply **algorithmic principles** to design and evaluate computing solutions in real applications  
- Strengthen **data integrity and type safety** through structured models and view models  
- Deliver **maintainable, testable** front-end code using observable pipelines

