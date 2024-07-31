import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';
import { ErrorService } from '../../shared/error.service';

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

  placesService = inject(PlacesService);

  // places = signal<Place[] | undefined>([]);

  places = this.placesService.loadedUserPlaces;

  isFetching = signal(false);

  error = signal<string | null>(null);

  errorService = inject(ErrorService);

  onRemovePlace(place: Place) {
    const subscription = this.placesService.removeUserPlace(place).subscribe({
      error: (err) => {
        this.errorService.showError(
          err?.message || 'An unknown remove favorite attempt error occurred!'
        );
        console.error(err);
        this.error.set(err?.message || 'An unknown error occurred!');
      },
      next: () => {
        // this.places.update((places) => {
        //   return places.filter((p) => p.id !== place.id);
        // });
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces().subscribe({
      // next: (places) => {
      //   this.places.set(places);
      // },
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
