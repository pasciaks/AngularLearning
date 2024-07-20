import { Component, input, Input } from '@angular/core';
@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
})
export class ControlComponent {
  // @Input() label: string;
  label = input.required<string>();
}
