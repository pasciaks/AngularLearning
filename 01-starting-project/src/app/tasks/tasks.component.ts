import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  // @Input() name?: string;
  // NOTE: Union type feature
  @Input() user: { id: string; name: string; avatar: string } | undefined;
}
