import { Component, computed, inject, signal } from '@angular/core';
import { EventService } from '../../services/event.service';
import { DatePipe, NgClass } from '@angular/common';
import { EventChip } from '../event-chip/event-chip.component';

@Component({
  selector: 'app-week-view',
  imports: [DatePipe, EventChip],
  templateUrl: './week-view.component.html',
  styleUrl: './week-view.component.scss',
})
export class WeekView {
  private eventService = inject(EventService);

  currentDate = signal(new Date());

  isToday(date: Date): boolean {
    return date.toDateString() === this.currentDate().toDateString();
  }

  weekDays = computed(() => {
    const date = this.currentDate();
    const monday = new Date(date);
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    monday.setDate(date.getDate() + diff);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  });

  // index is really useful as 23:00 should be the last label
  hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  toDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getEvents(date: Date) {
    return this.eventService.getEventsForDate(this.toDateString(date));
  }

  prevWeek() {
    const d = new Date(this.currentDate());
    d.setDate(d.getDate() - 7);
    this.currentDate.set(d);
  }

  nextWeek() {
    const d = new Date(this.currentDate());
    d.setDate(d.getDate() + 7);
    this.currentDate.set(d);
  }
}
