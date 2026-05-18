import { Component, Input } from '@angular/core';
import { CalendarEvent } from '../../models/event.model';

@Component({
  selector: 'app-event-chip',
  imports: [],
  templateUrl: './event-chip.component.html',
  styleUrl: './event-chip.component.scss',
})
export class EventChip {
  @Input() event!: CalendarEvent;

  private readonly START_HOUR = 7;
  private readonly HOUR_COUNT = 12;

  getTopPercent(): number {
    const [h, m] = this.event.startTime.split(':').map(Number);
    const minutesFromStart = h * 60 + m - this.START_HOUR * 60;
    return (minutesFromStart / (this.HOUR_COUNT * 60)) * 100;
  }

  getHeightPercent(): number {
    const [sh, sm] = this.event.startTime.split(':').map(Number);
    const [eh, em] = this.event.endTime.split(':').map(Number);
    const duration = eh * 60 + em - (sh * 60 + sm);
    return (duration / (this.HOUR_COUNT * 60)) * 100;
  }
}
