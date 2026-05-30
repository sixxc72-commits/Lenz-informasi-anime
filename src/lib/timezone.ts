import { format, formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { id as localeID } from 'date-fns/locale';

export type TZ = 'Asia/Jakarta' | 'Asia/Makassar' | 'Asia/Jayapura';
export const TZ_LABEL: Record<TZ, string> = {
  'Asia/Jakarta': 'WIB',
  'Asia/Makassar': 'WITA',
  'Asia/Jayapura': 'WIT',
};

export const TZ_OPTIONS: { value: TZ; label: string; utc: string }[] = [
  { value: 'Asia/Jakarta', label: 'WIB', utc: 'UTC+7' },
  { value: 'Asia/Makassar', label: 'WITA', utc: 'UTC+8' },
  { value: 'Asia/Jayapura', label: 'WIT', utc: 'UTC+9' },
];

export function formatLocal(date: Date | string | number, tz: TZ, pattern = "EEEE, dd MMMM yyyy 'pukul' HH:mm") {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return formatInTimeZone(d, tz, pattern, { locale: localeID }) + ` ${TZ_LABEL[tz]}`;
}

export function formatTime(date: Date | string | number, tz: TZ) {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return formatInTimeZone(d, tz, 'HH:mm', { locale: localeID });
}

export function dayNameID(date: Date | string, tz: TZ) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatInTimeZone(d, tz, 'EEEE', { locale: localeID });
}

// Hitung selisih countdown
export function diff(target: Date, now: Date = new Date()) {
  let ms = target.getTime() - now.getTime();
  const past = ms < 0;
  ms = Math.abs(ms);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds, past };
}
