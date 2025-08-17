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
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  
  // ====== Component Properties ======
  trips!: Trip[];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  // ====== Button: Add Trip (Triggers Navigation) ======
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // ====== Fetch Data on Init (Main Logic) ======
  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: Trip[]) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          } else {
            this.message = 'There were no trips retrieved from the database.';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  // ====== Auth Check for UI Conditions ======
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // ====== Lifecycle Hook: Load Data on Component Init ======
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
