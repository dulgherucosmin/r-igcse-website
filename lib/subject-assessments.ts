import type { Board, SubjectLevel } from "@/lib/drive";

export type AssessmentTrack = "IGCSE" | "AS" | "A-Level" | "IAS" | "IAL";

export type PaperAssessment = {
  name: string;
  code?: string;
  durationMinutes?: number;
  marks?: number;
  weightPercentage?: number;
  assessmentType: "written" | "practical" | "coursework" | "oral";
  externallyAssessed: boolean;
  description?: string;
};

export type AssessmentRoute = {
  name: "Core" | "Extended" | "Standard" | "Higher";
  description?: string;
  papers: PaperAssessment[];
};

export type SyllabusLink = {
  label: string;
  url: string;
  effectiveFrom?: string;
};

export type SubjectAssessment = {
  board: Board;
  subject: string;
  track: AssessmentTrack;
  code?: string;
  syllabus: {
    current?: SyllabusLink;
    new?: SyllabusLink;
  };
  routes?: AssessmentRoute[];
  units?: PaperAssessment[];
};

export const SUBJECT_ASSESSMENTS: SubjectAssessment[] = [
  {
    board: "CAIE",
    subject: "Physics",
    track: "IGCSE",
    code: "0625",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Physics syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/",
      },
    },
    routes: [
      {
        name: "Core",
        description:
          "Core candidates take Paper 1 and Paper 3. The questions are based on the Core subject content.",
        papers: [
          {
            name: "Paper 1: Multiple Choice (Core)",
            code: "1",
            durationMinutes: 45,
            marks: 40,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
          },
          {
            name: "Paper 3: Theory (Core)",
            code: "3",
            durationMinutes: 75,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
          },
          {
            name: "Paper 5: Practical Test",
            code: "5",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description: "Choose Paper 5 or Paper 6.",
          },
          {
            name: "Paper 6: Alternative to Practical",
            code: "6",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description: "Choose Paper 5 or Paper 6.",
          },
        ],
      },
      {
        name: "Extended",
        description:
          "Extended candidates take Paper 2 and Paper 4. The questions are based on the Core and Supplement subject content.",
        papers: [
          {
            name: "Paper 2: Multiple Choice (Extended)",
            code: "2",
            durationMinutes: 45,
            marks: 40,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
          },
          {
            name: "Paper 4: Theory (Extended)",
            code: "4",
            durationMinutes: 75,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
          },
          {
            name: "Paper 5: Practical Test",
            code: "5",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description: "Choose Paper 5 or Paper 6.",
          },
          {
            name: "Paper 6: Alternative to Practical",
            code: "6",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description: "Choose Paper 5 or Paper 6.",
          },
        ],
      },
    ],
  },
];

export function assessmentTrackForLevel(
  board: Board,
  level: SubjectLevel,
): AssessmentTrack {
  if (level === "IGCSE") return "IGCSE";
  if (board === "Edexcel") return level as AssessmentTrack;
  if (level === "AS") return "AS";
  return "A-Level";
}

export function findSubjectAssessment(
  board: Board,
  subject: string,
  level: SubjectLevel,
) {
  const track = assessmentTrackForLevel(board, level);
  return SUBJECT_ASSESSMENTS.find(
    (assessment) =>
      assessment.board === board &&
      assessment.subject === subject &&
      assessment.track === track,
  );
}
