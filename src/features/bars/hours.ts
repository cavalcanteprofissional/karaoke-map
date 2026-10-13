export const DEFAULT_BAR_TIMEZONE = "America/Fortaleza";

export interface HourInterval {
  /** 0 = domingo … 6 = sábado */
  weekday: number;
  /** "HH:MM" no fuso do bar */
  opensAt: string;
  /** "HH:MM" no fuso do bar; se <= opensAt, fecha no dia seguinte */
  closesAt: string;
}

export interface ZonedNow {
  weekday: number;
  minutes: number;
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** Obtém dia da semana e minutos do dia no fuso informado (sem libs). */
export function getZonedNow(
  date: Date,
  timeZone: string = DEFAULT_BAR_TIMEZONE,
): ZonedNow {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const map: Record<string, string> = {};
  for (const part of parts) {
    map[part.type] = part.value;
  }

  let hour = Number(map.hour);
  if (hour === 24) {
    hour = 0;
  }

  return {
    weekday: WEEKDAY_INDEX[map.weekday] ?? 0,
    minutes: hour * 60 + Number(map.minute),
  };
}

/**
 * Retorna true se algum intervalo cobre o instante `now`
 * (considerando o fuso do bar e horários que cruzam a meia-noite).
 */
export function isOpenAt(
  now: Date,
  intervals: HourInterval[],
  timeZone: string = DEFAULT_BAR_TIMEZONE,
): boolean {
  const { weekday, minutes } = getZonedNow(now, timeZone);

  return intervals.some((interval) => {
    const opens = toMinutes(interval.opensAt);
    const closes = toMinutes(interval.closesAt);

    if (opens < closes) {
      return interval.weekday === weekday && minutes >= opens && minutes < closes;
    }

    if (opens > closes) {
      const startsToday =
        interval.weekday === weekday && minutes >= opens;
      const nextWeekday = (interval.weekday + 1) % 7;
      const endsTomorrow = nextWeekday === weekday && minutes < closes;
      return startsToday || endsTomorrow;
    }

    // opens === closes: considerar 24h aberto neste dia
    return interval.weekday === weekday;
  });
}
