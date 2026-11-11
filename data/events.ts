export type ExamSession = {
  title: string;
  date: string;
  time: string;
  utcOffset: string;
  endDate: string;
};

export const examSessions: ExamSession[] = [
  {
    title: "October/November 2026",
    date: "15/10/2026",
    time: "08:00",
    utcOffset: "+01:00",
    endDate: "13/11/2026",
  },
  {
    title: "May/June 2027",
    date: "26/04/2027",
    time: "08:00",
    utcOffset: "+01:00",
    endDate: "16/06/2027",
  },
  {
    title: "October/November 2027",
    date: "04/10/2027",
    time: "08:00",
    utcOffset: "+01:00",
    endDate: "12/11/2027",
  },
];
