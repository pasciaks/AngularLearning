import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  private httpClient = inject(HttpClient);

  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces(): Observable<Place[]> {
    let url = 'http://localhost:3000/places';
    return this.fetchPlaces(url, 'Could not fetch available places!');
  }

  loadUserPlaces(): Observable<Place[]> {
    let url = 'http://localhost:3000/user-places';
    return this.fetchPlaces(url, 'Could not fetch user places!').pipe(
      tap({
        next: (places) => {
          this.userPlaces.set(places);
        },
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    // // Below is an Optimistic that adds
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    } else {
      return throwError(() => {
        this.errorService.showError('Place already added!');
        return new Error('Place already added!');
      });
    }

    // if (prevPlaces.some((p) => p.id === place.id)) {
    //   return throwError(() => {
    //     this.errorService.showError('Place already added!');
    //     return new Error('Place already added!');
    //   });
    // }

    this.userPlaces.set([...prevPlaces, place]);
    // // Below is an Optimistic updating that adds without the response from the next http call
    // this.userPlaces.update((places) => {
    //   return places.concat(place);
    // });
    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          this.errorService.showError('Could not add place to your places!');
          this.userPlaces.set(prevPlaces);
          return throwError(() => {
            return new Error('Could not add place to your places!');
          });
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    // optimistic remove/delete
    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          this.errorService.showError('Could not remove favorite place!');
          this.userPlaces.set(prevPlaces);
          return throwError(() => {
            return new Error('Could not remove favorite place!');
          });
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url, {
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
              return new Error(errorMessage);
            });
          }
          return throwError(() => {
            return new Error(errorMessage || 'An unknown error occurred!');
          });
        })
      );
  }
}
