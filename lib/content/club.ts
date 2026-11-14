/**
 * 6am Club mornings. Empty until dates are confirmed: then the 6am Club page shows an
 * "Upcoming mornings" list and Event schema for each one, with nothing else to change.
 *
 * Example:
 * { city: "Mumbai", venue: "Carter Road Promenade, Bandra", address: "Carter Road, Bandra West, Mumbai",
 *   date: "2026-12-06", start: "06:00", end: "07:15", activity: "Run and coffee" }
 */
export type ClubMorning = {
  city: string;
  venue: string;
  /** Street address for Google; the venue name is shown on the page. */
  address: string;
  /** YYYY-MM-DD */
  date: string;
  /** 24-hour HH:MM, India time */
  start: string;
  end: string;
  activity: string;
};

export const CLUB_MORNINGS: ClubMorning[] = [];

/** Only mornings that haven't happened yet (by date, India time). */
export const upcomingMornings = (now = new Date()) => {
  const today = new Date(now.getTime() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
  return CLUB_MORNINGS.filter((m) => m.date >= today).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
};
