import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

// Observable / rxjs concepts // values over time
import { interval, map, BehaviorSubject, Subscription, Observable } from 'rxjs';

// NOTE: using a signal instead of observable // signal is value container
// NOTE: Signals have a start value and don't need a subscription to start
// NOTE: SIGNALS are good for application state
// NOTE: OBSERVABLES are good for async values
// NOTE: SIGNALS are synchronous and OBSERVABLES are asynchronous

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  clickCount = signal(0);

  private subscription: Subscription | undefined;
  private subscriptionC: Subscription | undefined;
  private subscriptionD: Subscription | undefined;

  clickCount$ = toObservable(this.clickCount);

  interval$ = interval(1000); // note: no subscription yet

  // will auto clean up the subscription that is created
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  customInterval$ = new Observable<{}>((subscriber) => {
    let timesExecuted = 0;

    // let intervalId: NodeJS.Timeout ;
    let intervalId: ReturnType<typeof setInterval>;

    intervalId = setInterval(() => {
      timesExecuted++;
      subscriber.next({ message: 'New Value', value: timesExecuted });
      if (timesExecuted === 5) {
        clearInterval(intervalId);
        subscriber.complete();
        return;
      }
    }, 1000);

    // subscriber.complete();
    // subscriber.error('Error');
  });

  constructor() {
    // Avoid putting complex logic in the constructor
    // effect(() => {
    //   console.log('Click count:', this.clickCount());
    // });
    // toObservable(this.clickCount).subscribe({
    //   next: (value) => {
    //     console.log('Click count observable:', value);
    //   },
    // });
  }

  ngOnInit() {
    this.subscriptionD = this.customInterval$.subscribe({
      next: (value) => {
        console.log('Custom interval value:', value);
      },
      error: (error) => {
        console.error('Custom interval error:', error);
      },
      complete: () => {
        console.log('Custom interval complete');
      },
    });

    // Create an interval observable that emits values every second
    const source$ = interval(1000);

    this.subscriptionC = this.clickCount$.subscribe({
      next: (value) => {
        console.log('clickCount$ observable:', value);
      },
    });

    // Subscribe to the interval observable using object syntax
    this.subscription = source$.pipe(map((value) => value * 2)).subscribe({
      next: (value) => {
        console.log('Interval value:', value);
      },
      error: (error) => {
        console.error('Interval error:', error);
      },
      complete: () => {
        console.log('Interval complete');
      },
    });
  }

  ngOnDestroy() {
    // Unsubscribe to clean up the interval observable
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Unsubscribed from interval');
    }
    if (this.subscriptionC) {
      this.subscriptionC.unsubscribe();
      console.log('Unsubscribed from interval');
    }
    if (this.subscriptionD) {
      this.subscriptionD.unsubscribe();
      console.log('Unsubscribed from interval');
    }
  }

  onClick() {
    console.log('Button clicked');
    this.clickCount.update((count) => count + 1);
  }
}
