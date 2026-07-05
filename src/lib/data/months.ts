import type { Month, MonthKey } from "@/lib/types";

export const MONTHS: Month[] = [
  { key: "jan", short: "Jan", label: "January" },
  { key: "feb", short: "Feb", label: "February" },
  { key: "mar", short: "Mar", label: "March" },
  { key: "apr", short: "Apr", label: "April" },
  { key: "may", short: "May", label: "May" },
  { key: "jun", short: "Jun", label: "June" },
  { key: "jul", short: "Jul", label: "July" },
  { key: "aug", short: "Aug", label: "August" },
  { key: "sep", short: "Sep", label: "September" },
  { key: "oct", short: "Oct", label: "October" },
  { key: "nov", short: "Nov", label: "November" },
  { key: "dec", short: "Dec", label: "December" },
];

export const MONTH_LABEL: Record<MonthKey, string> = MONTHS.reduce(
  (acc, m) => ({ ...acc, [m.key]: m.label }),
  {} as Record<MonthKey, string>,
);

export function monthByKey(key: MonthKey): Month {
  return MONTHS.find((m) => m.key === key) ?? MONTHS[0];
}
