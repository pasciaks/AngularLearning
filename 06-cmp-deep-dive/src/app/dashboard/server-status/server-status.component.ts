import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  // Part of an alternative to ngOnDestroy in newer Angular versions
  constructor() {
    console.log('ServerStatusComponent created');

    effect(() => {
      // creates a subscription to the signal
      console.log('ServerStatusComponent currentStatus:', this.currentStatus);
      // creates a subscription to the signal
      console.log(this.currentStatusSignal());
    });

    // When working with Signal effects,
    // you sometimes might need to perform some
    // cleanup work before the effect
    // function runs again
    // (e.g., to clear some timer or something like that).
    effect((onCleanup) => {
      this.currentStatusSignal();
      // (signal that is subscribed to)
      const timer = setTimeout(() => {
        console.log(`Current number of tasks: ${this.currentStatusSignal()}`);
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      });
    });
  }

  private destroyRef = inject(DestroyRef);

  currentStatus: 'online' | 'offline' | 'unknown' = 'online';

  currentStatusSignal = signal<'offline' | 'online' | 'unknown'>('offline');

  // currentInterval: NodeJS.Timeout | undefined;
  // currentInterval: ReturnType<typeof setInterval> | undefined;

  ngOnInit() {
    console.log('ServerStatusComponent initialized');

    // this.currentInterval = setInterval(() => {
    //   this.currentStatus = Math.random() > 0.5 ? 'online' : 'offline';
    //   if (Math.random() > 0.9) {
    //     this.currentStatus = 'unknown';
    //   }
    // }, 1000);

    // Part of an alternative to ngOnDestroy in newer Angular versions
    const interval = setInterval(() => {
      this.currentStatus = Math.random() > 0.5 ? 'online' : 'offline';
      if (Math.random() > 0.9) {
        this.currentStatus = 'unknown';
      }
      this.currentStatusSignal.set(this.currentStatus);
    }, 1000);

    // Part of an alternative to ngOnDestroy in newer Angular versions
    this.destroyRef.onDestroy(() => {
      console.log('ServerStatusComponent destroyed');
      clearInterval(interval);
    });
  }

  // ngOnDestroy() {
  //   console.log('ServerStatusComponent destroyed');
  //   if (this.currentInterval) {
  //     clearInterval(this.currentInterval);
  //   }
  // }
}
