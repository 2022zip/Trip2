import dayjs from 'dayjs';
import type { OutworkRecord } from '@/types/outwork';

export const isBetweenDates = (date: string, startDate: string, endDate: string) => {
  const d = dayjs(date);
  return (d.isAfter(startDate, 'day') || d.isSame(startDate, 'day')) && (d.isBefore(endDate, 'day') || d.isSame(endDate, 'day'));
};

export const groupRecordsByDate = (records: OutworkRecord[]) => {
  const map: Record<string, OutworkRecord[]> = {};
  records.forEach((r) => {
    if (!map[r.date]) map[r.date] = [];
    map[r.date].push(r);
  });
  const dates = Object.keys(map).sort((a, b) => (dayjs(a).isAfter(b) ? -1 : 1));
  return dates.map((date) => ({
    date,
    records: map[date].sort((a, b) => (dayjs(`${a.date} ${a.time}`).isAfter(`${b.date} ${b.time}`) ? 1 : -1))
  }));
};

