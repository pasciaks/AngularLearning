import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';

  currentInterval: any | null = null;

  ngOnInit() {
    console.log('ServerStatusComponent initialized');
    this.currentInterval = setInterval(() => {
      this.currentStatus = Math.random() > 0.5 ? 'online' : 'offline';
      if (Math.random() > 0.9) {
        this.currentStatus = 'unknown';
      }
    }, 1000);
  }

  ngOnDestroy() {
    console.log('ServerStatusComponent destroyed');
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
  }

  constructor() {
    console.log('ServerStatusComponent created');
  }
}
