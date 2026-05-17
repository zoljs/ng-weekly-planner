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

  getTopPercent(): number {
    const [h, m] = this.event.startTime.split(':').map(Number);
    return ((h * 60 + m) / (24 * 60)) * 100;
  }

  getHeightPercent(): number {
    const [sh, sm] = this.event.startTime.split(':').map(Number);
    const [eh, em] = this.event.endTime.split(':').map(Number);
    const duration = eh * 60 + em - (sh * 60 + sm);
    return (duration / (24 * 60)) * 100;
  }
}
