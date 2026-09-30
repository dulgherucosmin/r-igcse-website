export type CountdownEvent = {
  // Small label shown above the title. Set to "" to hide it.
  label: string;
  // Main heading, e.g. "October/November 2026 Session".
  title: string;
  description: string;
  // Exact date the countdown ends, written as DD/MM/YYYY.
  date: string;
  // Time of day the countdown ends, 24-hour "HH:MM" or "HH:MM:SS".
  time: string;
  /**
   * UTC offset that `date` and `time` are written in, e.g. "+01:00", "-05:00"
   * or "Z" for UTC. This makes the countdown end at the same moment for
   * everyone, wherever they are.
   */
  utcOffset: string;
  // message shown after countdown is
  endedMessage: string;
};

// Edit this object to change the countdown shown on the home page.
// NOTE: the date and time below are placeholders - replace them with the real ones.
export const countdownEvent: CountdownEvent = {
  label: "Next Exam Session",
  title: "October/November 2026 Session",
  description:
    "Countdown to the start of the October/November 2026 exam session. Make the most of the time left with our free resources.",
  date: "15/10/2026",
  time: "08:00",
  utcOffset: "+01:00",
  endedMessage:
    "The session is now underway. Good luck to everyone sitting exams!",
};