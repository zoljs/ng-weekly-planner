import { Component, EventEmitter, Input, OnChanges, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarEvent } from '../../models/event.model';

@Component({
  selector: 'app-event-modal',
  imports: [FormsModule],
  templateUrl: './event-modal.html',
  styleUrl: './event-modal.scss',
})
export class EventModal implements OnChanges {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() date = '';
  @Output() eventCreated = new EventEmitter<CalendarEvent>();
  @Output() eventUpdated = new EventEmitter<CalendarEvent>();
  @Output() eventDeleted = new EventEmitter<string>();
  @Input() existingEvent: CalendarEvent | null = null;

  // input is not ready when the component is created, we must update it with onChanges
  ngOnChanges() {
    if (this.existingEvent) {
      this.event = { ...this.existingEvent };
    } else {
      this.event = {
        title: '',
        description: '',
        date: this.date,
        startTime: '08:00',
        endTime: '09:00',
        color: '#A8C8F9',
        recurrence: 'none',
      };
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.close();
    }
  }

  event: Omit<CalendarEvent, 'id'> = {
    title: '',
    description: '',
    date: this.date,
    startTime: '08:00',
    endTime: '09:00',
    color: '#A8C8F9',
    recurrence: 'none',
  };

  submit() {
    if (this.existingEvent) {
      this.eventUpdated.emit(this.event as CalendarEvent);
    } else {
      this.eventCreated.emit(this.event as CalendarEvent);
    }
    this.close();
  }

  close() {
    this.isOpenChange.emit(false);
  }

  delete() {
    if (!this.existingEvent) return;
    this.eventDeleted.emit(this.existingEvent.id);
    this.close();
  }
}
