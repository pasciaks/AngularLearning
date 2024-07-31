import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
  // providers: [HttpClient],
})
export class AvailablePlacesComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);
  isFetching = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        console.log(places);
        this.places.set(places);
      },
      complete: () => {
        this.isFetching.set(false);
      },
      // next: (response) => {
      //   console.log(response);
      //   console.log(response.body?.places);
      // },
      // next: (event) => {
      //   console.log(event);
      // },
      error: (err) => {
        console.error(err);
        this.isFetching.set(false);
        this.error.set(err?.message || 'An unknown error occurred!');
        //this.error.set('An error occurred!');
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  places = signal<Place[] | undefined>(undefined);

  constructor() {}

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.error(err);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
