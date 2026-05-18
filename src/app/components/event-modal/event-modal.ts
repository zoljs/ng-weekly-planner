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

  // input is not ready when the component is created, we must update it with onChanges
  ngOnChanges() {
    this.event.date = this.date;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.close();
    }
  }

  event = {
    title: '',
    description: '',
    date: this.date,
    startTime: '08:00',
    endTime: '09:00',
    color: '#A8C8F9',
    recurrence: 'none',
  };

  submit() {
    this.eventCreated.emit(this.event as CalendarEvent);
    this.close();
  }

  close() {
    this.isOpenChange.emit(false);
  }
}
