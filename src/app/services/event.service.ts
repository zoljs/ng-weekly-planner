import { Injectable, signal } from '@angular/core';
import { CalendarEvent, RecurrenceType } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly STORAGE_KEY = 'weekly_planner_events';
  events = signal<CalendarEvent[]>(this.loadFromStorage());

  private loadFromStorage(): CalendarEvent[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return [
      {
        id: '1',
        title: 'Teszt esemény',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:30',
        color: '#A8C8F9',
        recurrence: 'none',
      },
    ];

    //return raw ? JSON.parse(raw) : [];
  }

  private save(): void {
    // signal
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events()));
  }

  getEventsForDate(date: string): CalendarEvent[] {
    return this.events().filter((e) => e.date === date);
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
