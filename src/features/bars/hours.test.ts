import { describe, expect, it } from "vitest";

import { getZonedNow, isOpenAt, type HourInterval } from "./hours";

const overnight: HourInterval[] = [
  { weekday: 3, opensAt: "22:00", closesAt: "04:00" },
];
const daytime: HourInterval[] = [
  { weekday: 3, opensAt: "10:00", closesAt: "18:00" },
];

// Fuso do bar: America/Fortaleza (UTC-3, sem horário de verão).

describe("getZonedNow", () => {
  it("converte UTC para o fuso do bar", () => {
    const now = getZonedNow(new Date("2026-10-15T02:30:00Z"));
    expect(now.weekday).toBe(3); // quarta-feira (23:30 local)
    expect(now.minutes).toBe(23 * 60 + 30);
  });
});

describe("isOpenAt — horário que cruza a meia-noite", () => {
  it("aberto na noite do dia do intervalo", () => {
    expect(isOpenAt(new Date("2026-10-15T02:30:00Z"), overnight)).toBe(true);
  });

  it("permanece aberto após a meia-noite", () => {
    expect(isOpenAt(new Date("2026-10-15T04:30:00Z"), overnight)).toBe(true);
  });

  it("fechado após o horário de fechamento", () => {
    expect(isOpenAt(new Date("2026-10-15T08:00:00Z"), overnight)).toBe(false);
  });
});

describe("isOpenAt — horário diurno", () => {
  it("fechado antes de abrir", () => {
    expect(isOpenAt(new Date("2026-10-14T12:00:00Z"), daytime)).toBe(false);
  });

  it("aberto dentro do horário", () => {
    expect(isOpenAt(new Date("2026-10-14T17:00:00Z"), daytime)).toBe(true);
  });

  it("fechado após o horário", () => {
    expect(isOpenAt(new Date("2026-10-14T22:00:00Z"), daytime)).toBe(false);
  });
});

describe("isOpenAt — múltiplos intervalos", () => {
  it("aberto se qualquer intervalo cobre o instante", () => {
    const both = [...daytime, ...overnight];
    expect(isOpenAt(new Date("2026-10-14T17:00:00Z"), both)).toBe(true);
  });
});
