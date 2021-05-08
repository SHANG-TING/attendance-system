export interface WeekDay {
  date: Date;
  year: number;
  month: number;
  day: number;
  weekDay: number;
  dateString: string;
  isToday: boolean;
}

export type WeekDays = WeekDay[];
