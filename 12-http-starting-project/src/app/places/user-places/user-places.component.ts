import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  places = signal<Place[] | undefined>([]);
  isFetching = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/user-places', {
        headers: {
          'Content-Type': 'application/json',
        },
        // observe: 'response',
        // observe: 'events',
      })
      .pipe(
        map((resData) => {
          return resData.places;
        }),
        catchError((error, obs) => {
          // Send to analytics
          if (error.status === 500) {
            return throwError(() => {
              return new Error('A customized error occurred! ' + error.message);
            });
          }
          return throwError(() => {
            return new Error(
              'A different customized error occurred! ' + error.message
            );
          });
        })
      )
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        complete: () => {
          this.isFetching.set(false);
        },

        error: (err) => {
          console.error(err);
          this.isFetching.set(false);
          this.error.set(err?.message || 'An unknown error occurred!');
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
