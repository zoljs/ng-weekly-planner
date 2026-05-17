import { Component, signal } from '@angular/core';
import { WeekView } from './components/week-view/week-view.component';

@Component({
  selector: 'app-root',
  imports: [WeekView],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('weekly-planner');
}
