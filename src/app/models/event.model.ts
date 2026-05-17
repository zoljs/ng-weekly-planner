export type RecurrenceType = 'none' | 'weekly' | 'biweekly' | 'monthly';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string; // hex
  recurrence: RecurrenceType;
}
