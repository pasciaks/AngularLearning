import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  private zone = inject(NgZone);
  ngOnInit(): void {
    setTimeout(() => {
      this.count.update((prevCount) => 0);
    }, 1000);

    // NOTE: avoiding zone pollution
    // NOTE: opting out of Angular change detection
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('timer expired');
      }, 5000);
    });

    //throw new Error('Method not implemented.');
  }
  count = signal(0);

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
