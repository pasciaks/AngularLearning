import { Component } from '@angular/core';

@Component({
  // Select buttons with attribute appButton
  selector: 'button[appButton], a[appButton]',
  // selector: '.button',
  // selector: 'button.button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  constructor() {}
}
