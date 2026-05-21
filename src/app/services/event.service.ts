import { Injectable, signal } from '@angular/core';
import { CalendarEvent } from '../models/event.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly STORAGE_KEY = 'weekly_planner_events';

  // subject - notifies when events change
  private eventsChanged = new Subject<void>();
  eventsChanged$ = this.eventsChanged.asObservable(); // we dont want next!

  events = signal<CalendarEvent[]>(this.loadFromStorage());

  private loadFromStorage(): CalendarEvent[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  }

  private save(): void {
    // signal
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events()));
    this.eventsChanged.next();
  }

  getEventsForDate(date: string): CalendarEvent[] {
    return this.events().filter((e) => this.matchesDate(e, date));
  }

  private matchesDate(event: CalendarEvent, date: string): boolean {
    if (event.date === date) return true;

    const eventDate = new Date(event.date);
    const targetDate = new Date(date);

    if (targetDate < eventDate) return false;

    switch (event.recurrence) {
      case 'weekly':
        return eventDate.getDay() === targetDate.getDay();
      case 'biweekly': {
        const diffDays = Math.round(
          (targetDate.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        return eventDate.getDay() === targetDate.getDay() && diffDays % 14 === 0;
      }
      case 'monthly':
        return eventDate.getDate() === targetDate.getDate();
      default:
        return false;
    }
  }

  // new event should be passed withouth id, as the app will generate one
  addEvent(event: Omit<CalendarEvent, 'id'>): void {
    const newEvent: CalendarEvent = {
      // spread the event and add the new field
      ...event,
      id: crypto.randomUUID(),
    };
    // signals are immutable so we update it by spreading it and creating a new array
    this.events.update((events) => [...events, newEvent]);
    this.save();
  }

  updateEvent(updated: CalendarEvent): void {
    this.events.update((events) => events.map((e) => (e.id === updated.id ? updated : e)));
    this.save();
  }

  deleteEvent(id: string): void {
    this.events.update((events) => events.filter((e) => e.id !== id));
    this.save();
  }
}
