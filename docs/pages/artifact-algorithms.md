---
layout: page
title: Algorithms & Data Structures
permalink: /pages/artifact-algorithms.html
---

## Overview  

This artifact comes from the **Angular front end** of the *Travlr Getaways* project in CS 465. The `trip-listing.component.ts` component retrieves and displays trip data to the user.  

Originally, the component displayed trips without filtering or sorting and relied on weak typing for certain numeric fields (e.g., `length`, `perPerson`). The enhanced version applies **algorithmic improvements** and **stronger data structures** by filtering to **upcoming trips** and sorting them **chronologically**, while aligning the `Trip` interface with numeric types used in the database schema.

---

## Why I Included It  

This artifact demonstrates my ability to:  
- Apply **sorting and filtering algorithms** in a real UI component  
- Use **TypeScript data structures** (interfaces) to enforce correctness  
- Improve user experience by presenting **relevant, ordered** results

---

## Enhancement Focus  

- Added **filtering** for upcoming trips (based on `start` date)  
- Added **chronological sorting** by start date  
- Strengthened the `Trip` interface (in the Angular models) to use **number** for numeric fields  
- Preserved UI behavior while improving **correctness** and **maintainability**

---

## Before vs. After  

### Before (original `trip-listing.component.ts` excerpt)

<details>
  <summary><strong>Show original excerpt</strong></summary>

{% highlight typescript %}
// ====== Angular Core & Imports ======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
})
export class TripListingComponent implements OnInit {
  public trips: Trip[] = [];

  ngOnInit(): void {
    // Trips assigned as-is: no filtering or sorting
    this.tripDataService.getTrips().subscribe(trips => {
      this.trips = trips;
    });
  }
}
{% endhighlight %}

</details>

**What’s wrong here?**  
- No filtering: past trips are shown even when not relevant.  
- No sorting: order depends on API/DB return sequence.  
- Weak typing (pre-enhancement) required conversions for numeric operations.

**View full file in repo:**  
- [Original `trip-listing.component.ts`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/algorithms/original/trip-listing.component.ts)

---

### After (enhanced `trip-listing.component.ts` excerpt)

<details>
  <summary><strong>Show enhanced excerpt</strong></summary>

{% highlight typescript %}
export class TripListingComponent implements OnInit {
  public trips: Trip[] = [];

  ngOnInit(): void {
    this.tripDataService.getTrips().subscribe(trips => {
      const now = new Date();
      this.trips = trips
        // Show only upcoming trips
        .filter(t => new Date(t.start) > now)
        // Sort chronologically
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    });
  }
}
{% endhighlight %}

</details>

**How it’s better now:**  
- Users see **relevant, upcoming** trips only.  
- Trips are **chronologically ordered** for clarity.  
- Stronger typing (in the Angular `Trip` model) removes conversions and aligns the front end with the DB schema.

**View full file in repo:**  
- [Enhanced `trip-listing.component.ts`](https://github.com/JohnM97/CS499-ePortfolio/blob/main/artifacts/algorithms/enhanced/trip-listing.component.ts)

> Note: The `Trip` interface is defined in your Angular models (e.g., `src/app/models/trip.ts`). As part of this enhancement, numeric fields like `length` and `perPerson` are typed as **number** to support sorting/filters without conversion.

---

## Reflection  

This enhancement shows how **algorithms (filter/sort)** and **data structures (typed interfaces)** improve a real front-end workflow. By constraining the data with strong types and applying the right processing steps, the UI becomes both more useful and more reliable.  

I validated the behavior by confirming only future trips are rendered and that they appear in ascending date order. The improved typing also removed ad hoc conversions in the template/code.

---

## Course Outcomes Demonstrated  

- Apply **algorithms** (filtering, sorting) to improve functionality and UX  
- Use **TypeScript interfaces** to enforce data integrity and reduce bugs  
- Build **maintainable components** that align with back-end data contracts
