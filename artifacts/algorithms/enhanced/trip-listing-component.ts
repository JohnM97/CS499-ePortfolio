// ===== Enhanced Angular Component: trip-listing.component.ts =====
// Goal: Demonstrate clear algorithmic improvements & stronger data handling
// - Filter to upcoming trips
// - Stable chronological sort (O(n log n))
// - Search (name/code/resort) with debounced input
// - Toggleable sort direction
// - Derived view model (immutable transforms)
// - Safe error handling + loading state
// - Observable pipeline suitable for async pipe (no manual unsubscribe)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  of
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap
} from 'rxjs/operators';

import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Trip } from '../models/trip';

// A focused view model for rendering (keeps UI logic out of templates)
interface TripView {
  id: string;
  code: string;
  name: string;
  resort: string;
  start: Date;
  lengthDays: number;
  pricePerPerson: number;
  daysUntil: number;       // Derived: difference from "now"
  startISO: string;        // For stable display/sorting
}

// ---------- Pure helpers (testable, reusable) ----------
function toDate(d: unknown): Date {
  // Accept either Date or string; fallback to epoch to avoid NaN
  return d instanceof Date ? d : new Date(String(d ?? 0));
}

function isUpcoming(trip: Trip, now = new Date()): boolean {
  return toDate(trip.start).getTime() > now.getTime();
}

function compareByStartAsc(a: TripView, b: TripView): number {
  return a.start.getTime() - b.start.getTime();
}

function toTripView(trip: Trip, now = new Date()): TripView {
  const start = toDate(trip.start);
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysUntil = Math.ceil((start.getTime() - now.getTime()) / msPerDay);

  // Assume numeric typing has been strengthened in the model
  // (length, perPerson use number in enhanced schema & interface)
  const lengthDays = Number((trip as any).length ?? 0);
  const pricePerPerson = Number((trip as any).perPerson ?? 0);

  return {
    id: (trip as any)._id ?? '',
    code: trip.code,
    name: trip.name,
    resort: trip.resort,
    start,
    lengthDays,
    pricePerPerson,
    daysUntil,
    startISO: start.toISOString()
  };
}

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
  // ---------- UI state ----------
  public loading = true;
  public errorMsg = '';

  // Inputs to the algorithmic pipeline
  private readonly search$ = new BehaviorSubject<string>('');
  private readonly sortAsc$ = new BehaviorSubject<boolean>(true);

  // Final list to render with async pipe in template
  public readonly upcomingTrips$: Observable<TripView[]>;

  // Simple metrics for the header (count, next start)
  public readonly metrics$: Observable<{ count: number; nextStart?: string }>;

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    // Base stream: fetch once, transform immutably, surface errors
    const base$ = this.tripDataService.getTrips().pipe(
      map(trips => trips.filter(t => isUpcoming(t))),           // Filter
      map(trips => trips.map(t => toTripView(t))),              // Map to VM
      map(vms => [...vms].sort(compareByStartAsc)),            // Stable sort ASC
      tap(() => (this.loading = false)),
      catchError(err => {
        this.loading = false;
        this.errorMsg = 'Failed to load trips.';
        console.error(err);
        return of([] as TripView[]);
      })
    );

    // Combine with search & sort controls
    const searchFiltered$ = combineLatest([
      base$,
      this.search$.pipe(debounceTime(150), distinctUntilChanged(), startWith(''))
    ]).pipe(
      map(([trips, query]) => {
        const q = query.trim().toLowerCase();
        if (!q) return trips;
        return trips.filter(t =>
          t.name.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.resort.toLowerCase().includes(q)
        );
      })
    );

    this.upcomingTrips$ = combineLatest([searchFiltered$, this.sortAsc$]).pipe(
      map(([trips, asc]) => (asc ? trips : [...trips].reverse()))
    );

    this.metrics$ = base$.pipe(
      map(list => ({
        count: list.length,
        nextStart: list[0]?.startISO
      }))
    );
  }

  // ---------- Template event hooks ----------
  public setSearch(query: string): void {
    this.search$.next(query);
  }

  public toggleSort(): void {
    this.sortAsc$.next(!this.sortAsc$.value);
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  ngOnInit(): void {
    // All work is handled by observable pipelines; template should use | async
  }
}
