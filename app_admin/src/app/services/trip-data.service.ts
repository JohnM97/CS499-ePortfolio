import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip'; // Make sure this path is correct

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private url: string = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    const tripUrl = `${this.url}/${tripCode}`;
    return this.http.get<Trip[]>(tripUrl);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    const tripUrl = `${this.url}/${formData.code}`;
    return this.http.put<Trip>(tripUrl, formData);
  }
}
