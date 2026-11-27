export type SessionResult = {
  label: string;
  at?: string;
  exactTime?: boolean;
};

export type Session = {
  title: string;
  short: string;
  start: string;
  end: string;
  note?: string;
  results: SessionResult[];
};

export type Board = {
  id: string;
  name: string;
  fullName: string;
  blurb: string;
  timetablesUrl: string;
  gradesUrl: string;
  sessions: Session[];
};

/* -------------------------------------------------------------------------- */
/*  DATES: edit here when boards announce or change anything.                 */
/*                                                                            */
/*  - `start` / `end` are ISO timestamps WITH an offset. Use +00:00 from late  */
/*    October to late March (GMT) and +01:00 from late March to late October   */
/*    (BST). `end` is the end of the last exam day.                            */
/*  - Results: leave out `at` if the date isn't announced yet. Add             */
/*    `exactTime: true` only if the official release time is published.        */
/*  - Keep sessions in date order.                                             */
/* -------------------------------------------------------------------------- */
export const examBoards: Board[] = [
  {
    id: "caie",
    name: "CAIE",
    fullName: "Cambridge International Education",
    blurb: "IGCSE, O Level and AS/A Level.",
    timetablesUrl: "https://www.cambridgeinternational.org/timetables",
    gradesUrl:
      "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-secondary-2/cambridge-igcse/grade-threshold-tables",
    sessions: [
      {
        title: "October/November 2026",
        short: "O/N 2026",
        start: "2026-10-15T08:00:00+01:00",
        end: "2026-11-13T23:59:59+00:00",
        results: [
          {
            label: "AS & A Level",
            at: "2027-01-07T06:00:00+00:00",
            exactTime: true,
          },
          {
            label: "IGCSE & O Level",
            at: "2027-01-14T06:00:00+00:00",
            exactTime: true,
          },
        ],
      },
      {
        title: "February/March 2027",
        short: "F/M 2027",
        start: "2027-02-03T08:00:00+00:00",
        end: "2027-03-04T23:59:59+00:00",
        note: "The February/March series is only offered to schools in certain countries, such as India.",
        results: [
          { label: "All qualifications", at: "2027-05-13T00:00:00+00:00" },
        ],
      },
      {
        title: "May/June 2027",
        short: "M/J 2027",
        start: "2027-04-26T08:00:00+01:00",
        end: "2027-06-16T23:59:59+01:00",
        results: [
          { label: "AS & A Level", at: "2027-07-28T00:00:00+00:00" },
          { label: "IGCSE & O Level" },
        ],
      },
      {
        title: "October/November 2027",
        short: "O/N 2027",
        start: "2027-10-04T08:00:00+01:00",
        end: "2027-11-12T23:59:59+00:00",
        results: [{ label: "All qualifications" }],
      },
    ],
  },
  {
    id: "edexcel",
    name: "Edexcel",
    fullName: "Pearson Edexcel",
    blurb: "International GCSE and International A Level.",
    timetablesUrl:
      "https://qualifications.pearson.com/en/support/support-topics/exams/exam-timetables.html",
    gradesUrl:
      "https://qualifications.pearson.com/en/support/support-topics/results-certification/grade-boundaries.html",
    sessions: [
      {
        title: "January 2027",
        short: "JAN 2027",
        start: "2027-01-08T08:00:00+00:00",
        end: "2027-01-25T23:59:59+00:00",
        note: "The January series is for International A Level only. There is no January International GCSE series.",
        results: [
          { label: "International A Level", at: "2027-03-04T00:00:00+00:00" },
        ],
      },
      {
        title: "May/June 2027",
        short: "M/J 2027",
        start: "2027-05-10T08:00:00+01:00",
        end: "2027-06-18T23:59:59+01:00",
        note: "Start and end dates are for the International GCSE exam window. International A Level units may differ.",
        results: [
          { label: "International A Level", at: "2027-08-12T00:00:00+00:00" },
          { label: "International GCSE", at: "2027-08-19T00:00:00+00:00" },
        ],
      },
    ],
  },
];
