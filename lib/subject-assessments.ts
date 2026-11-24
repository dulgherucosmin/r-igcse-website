import type { Board, SubjectLevel } from "@/lib/drive";

export type AssessmentTrack = "IGCSE" | "AS" | "A-Level" | "IAS" | "IAL";

export type PaperAssessment = {
  name: string;
  code?: string;
  durationMinutes?: number;
  marks?: number;
  weightPercentage?: number;
  assessmentType: "written" | "practical" | "coursework" | "oral" | "speaking";
  externallyAssessed: boolean;
  description?: string;
};

export type AssessmentRoute = {
  name: "Core" | "Extended" | "Standard" | "Higher" | "General";
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
          "Candidates who take the Core Route take Paper 1, Paper 3, and a choice between Paper 5 (Practical) and Paper 6 (Alternative to Practical), covering the Core syllabus content.",
        papers: [
          {
            name: "Paper 1: Multiple Choice (Core)",
            code: "1",
            durationMinutes: 45,
            marks: 40,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Theoretical Assessment consisting of 40 four-option multiple choice questions to solve based on all sections of theory.",
          },
          {
            name: "Paper 3: Theory (Core)",
            code: "3",
            durationMinutes: 75,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Theoretical Assessment consisting of short-answer and structured (long-answer) questions based on all sections of theory.",
          },
          {
            name: "Paper 5: Practical Test",
            code: "5",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Practical Assessment in which you will conduct hands-on experiments in a science laboratory based on Experimental Skills in Section 4.",
          },
          {
            name: "Paper 6: Alternative to Practical",
            code: "6",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Theoretical Assessment in which you will conduct written experiments, take measurements, and perform calculations as opposed to hands-on experiments based on Experimental Skills in Section 4.",
          },
        ],
      },
      {
        name: "Extended",
        description:
          "Candidates who take the Extended Route take Paper 2, Paper 4, and a choice between Paper 5 (Practical) and Paper 6 (Alternative to Practical), covering both Core and Extended syllabus content.",
        papers: [
          {
            name: "Paper 2: Multiple Choice (Extended)",
            code: "2",
            durationMinutes: 45,
            marks: 40,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Theoretical Assessment consisting of 40 four-option multiple choice questions to solve based on all sections of theory.",
          },
          {
            name: "Paper 4: Theory (Extended)",
            code: "4",
            durationMinutes: 75,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Theoretical Assessment consisting of short-answer and structured (long-answer) questions based on all sections of theory.",
          },
          {
            name: "Paper 5: Practical Test",
            code: "5",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Practical Assessment in which you will conduct hands-on experiments in a science laboratory based on Experimental Skills in Section 4.",
          },
          {
            name: "Paper 6: Alternative to Practical",
            code: "6",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Theoretical Assessment in which you will conduct written experiments, take measurements, and perform calculations as opposed to hands-on experiments based on Experimental Skills in Section 4.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Accounting",
    track: "IGCSE",
    code: "0452",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Accounting syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates take Paper 1 and Paper 2. Candidates are assessed on their understanding and application of accounting principles, double-entry bookkeeping, and the preparation and interpretation of financial statements.",
        papers: [
          {
            name: "Paper 1: Multiple Choice",
            code: "1",
            durationMinutes: 75,
            marks: 35,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "A multiple-choice assessment consisting of 35 questions based on all areas of the syllabus.",
          },
          {
            name: "Paper 2: Structured Paper",
            code: "2",
            durationMinutes: 105,
            marks: 100,
            weightPercentage: 70,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "A structured question paper consisting of four to six compulsory questions covering the preparation, adjustment, and interpretation of financial statements and records.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Additional Mathematics",
    track: "IGCSE",
    code: "0606",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Mathematics - Additional syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates take Paper 1 and Paper 2. Both papers contain compulsory questions covering pure mathematics concepts such as functions, coordinate geometry, trigonometry, calculus, and vectors.",
        papers: [
          {
            name: "Paper 1",
            code: "1",
            durationMinutes: 120,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "A structured written paper consisting of approximately 10–12 questions of varying lengths.",
          },
          {
            name: "Paper 2",
            code: "2",
            durationMinutes: 120,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "A structured written paper consisting of approximately 10–12 questions of varying lengths covering the complete syllabus.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Biology",
    track: "IGCSE",
    code: "0610",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Biology syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "Core",
        description:
          "Candidates who take the Core Route take Paper 1, Paper 3, and a choice between Paper 5 (Practical) and Paper 6 (Alternative to Practical), covering the Core syllabus content.",
        papers: [
          {
            name: "Paper 1: Multiple Choice (Core)",
            code: "1",
            durationMinutes: 45,
            marks: 40,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Theoretical assessment consisting of 40 four-option multiple-choice questions based on core theory.",
          },
          {
            name: "Paper 3: Theory (Core)",
            code: "3",
            durationMinutes: 75,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Written paper consisting of short-answer and structured questions testing core biological concepts.",
          },
          {
            name: "Paper 5: Practical Test",
            code: "5",
            durationMinutes: 75,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Practical assessment evaluating laboratory techniques, experimental design, and data interpretation.",
          },
          {
            name: "Paper 6: Alternative to Practical",
            code: "6",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Written examination testing practical and experimental skills without physical lab execution.",
          },
        ],
      },
      {
        name: "Extended",
        description:
          "Candidates who take the Extended Route take Paper 2, Paper 4, and a choice between Paper 5 (Practical) and Paper 6 (Alternative to Practical), covering both Core and Extended syllabus content.",
        papers: [
          {
            name: "Paper 2: Multiple Choice (Extended)",
            code: "2",
            durationMinutes: 45,
            marks: 40,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Theoretical assessment consisting of 40 four-option multiple-choice questions based on extended theory.",
          },
          {
            name: "Paper 4: Theory (Extended)",
            code: "4",
            durationMinutes: 75,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Written paper consisting of short-answer and structured questions testing extended biological concepts.",
          },
          {
            name: "Paper 5: Practical Test",
            code: "5",
            durationMinutes: 75,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Practical assessment evaluating laboratory techniques, experimental design, and data interpretation.",
          },
          {
            name: "Paper 6: Alternative to Practical",
            code: "6",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Written examination testing practical and experimental skills without physical lab execution.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Business Studies",
    track: "IGCSE",
    code: "0450",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Business Studies syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates take Paper 1 and Paper 2, covering business concepts, marketing, operations, human resources, and financial decision-making.",
        papers: [
          {
            name: "Paper 1: Short Answer and Data Response",
            code: "1",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Four compulsory questions requiring a mixture of short answers and structured data responses based on stimulus material.",
          },
          {
            name: "Paper 2: Case Study",
            code: "2",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Four compulsory questions based on a single case study scenario of a real or realistic business.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Chemistry",
    track: "IGCSE",
    code: "0620",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Chemistry syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "Core",
        description:
          "Candidates who take the Core Route take Paper 1, Paper 3, and a choice between Paper 5 (Practical) and Paper 6 (Alternative to Practical), covering the Core syllabus content.",
        papers: [
          {
            name: "Paper 1: Multiple Choice (Core)",
            code: "1",
            durationMinutes: 45,
            marks: 40,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Theoretical assessment consisting of 40 multiple-choice questions based on Core content.",
          },
          {
            name: "Paper 3: Theory (Core)",
            code: "3",
            durationMinutes: 75,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Written paper consisting of short-answer and structured questions on Core chemistry topics.",
          },
          {
            name: "Paper 5: Practical Test",
            code: "5",
            durationMinutes: 75,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Hands-on practical examination testing experimental and analytical techniques in a lab setting.",
          },
          {
            name: "Paper 6: Alternative to Practical",
            code: "6",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Written examination evaluating knowledge of experimental techniques, data presentation, and lab safety.",
          },
        ],
      },
      {
        name: "Extended",
        description:
          "Candidates who take the Extended Route take Paper 2, Paper 4, and a choice between Paper 5 (Practical) and Paper 6 (Alternative to Practical), covering both Core and Extended syllabus content.",
        papers: [
          {
            name: "Paper 2: Multiple Choice (Extended)",
            code: "2",
            durationMinutes: 45,
            marks: 40,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Theoretical assessment consisting of 40 multiple-choice questions based on Extended content.",
          },
          {
            name: "Paper 4: Theory (Extended)",
            code: "4",
            durationMinutes: 75,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Written paper consisting of short-answer and structured questions on Extended chemistry topics.",
          },
          {
            name: "Paper 5: Practical Test",
            code: "5",
            durationMinutes: 75,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Hands-on practical examination testing experimental and analytical techniques in a lab setting.",
          },
          {
            name: "Paper 6: Alternative to Practical",
            code: "6",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Written examination evaluating knowledge of experimental techniques, data presentation, and lab safety.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Chinese",
    track: "IGCSE",
    code: "0509",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Chinese - First Language syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "Candidates for First Language Chinese take Paper 1 and Paper 2, assessing reading comprehension, summary, classical prose, and argumentative or creative writing.",
        papers: [
          {
            name: "Paper 1: Reading, Directed Writing and Classical Chinese",
            code: "1",
            durationMinutes: 120,
            marks: 60,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Comprehension and summary writing questions based on unseen passages, including classical Chinese text comprehension.",
          },
          {
            name: "Paper 2: Writing",
            code: "2",
            durationMinutes: 120,
            marks: 50,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Composition paper where candidates complete two writing tasks choosing from argumentative, discursive, descriptive, or narrative titles.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Computer Science",
    track: "IGCSE",
    code: "0478",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Computer Science syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates take Paper 1 and Paper 2, covering computer hardware, networking, cybersecurity, pseudocode, flowchart logic, and programming concepts.",
        papers: [
          {
            name: "Paper 1: Computer Systems",
            code: "1",
            durationMinutes: 105,
            marks: 75,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Short-answer and structured questions testing hardware, software, data representation, databases, and network security.",
          },
          {
            name: "Paper 2: Algorithms, Programming and Logic",
            code: "2",
            durationMinutes: 105,
            marks: 75,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Short-answer, structured, and scenario-based questions evaluating algorithm design, logic gates, arrays, pseudocode, and trace tables.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Design and Technology",
    track: "IGCSE",
    code: "0445",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Design & Technology syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates complete Paper 1 (Product Design), one specialist theory option (Paper 2, 3, or 4), and Component 5 (School-based Project).",
        papers: [
          {
            name: "Paper 1: Product Design",
            code: "1",
            durationMinutes: 75,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Design skills paper requiring candidates to generate conceptual sketches and technical solutions to design problems.",
          },
          {
            name: "Paper 2 / 3 / 4: Specialist Option Paper",
            code: "2",
            durationMinutes: 60,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Structured paper testing technical knowledge in one specialist pathway: Resistant Materials (P2), Systems & Control (P3), or Graphic Products (P4).",
          },
          {
            name: "Component 5: Project",
            code: "5",
            durationMinutes: 0,
            marks: 100,
            weightPercentage: 50,
            assessmentType: "coursework",
            externallyAssessed: false,
            description:
              "School-based design portfolio and physical prototype project internally assessed and externally moderated.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Economics",
    track: "IGCSE",
    code: "0455",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Economics syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates sit Paper 1 and Paper 2, assessing microeconomic and macroeconomic theories, market equilibrium, government policy, and international trade.",
        papers: [
          {
            name: "Paper 1: Multiple Choice",
            code: "1",
            durationMinutes: 45,
            marks: 30,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "30 multiple-choice questions covering basic economic ideas, microeconomics, and macroeconomics.",
          },
          {
            name: "Paper 2: Structured Questions",
            code: "2",
            durationMinutes: 135,
            marks: 90,
            weightPercentage: 70,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "One compulsory data-response question followed by three structured essay-style questions from a selection of options.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "English as a Second Language",
    track: "IGCSE",
    code: "0510 / 0511",
    syllabus: {
      current: {
        label: "Cambridge IGCSE English as a Second Language syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "Candidates take Paper 1 (Reading & Writing), Paper 2 (Listening), and Paper 3 (Speaking exam).",
        papers: [
          {
            name: "Paper 1: Reading and Writing",
            code: "1",
            durationMinutes: 120,
            marks: 60,
            weightPercentage: 70,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Reading comprehension tasks, note-taking, summary writing, and two extended writing tasks.",
          },
          {
            name: "Paper 2: Listening",
            code: "2",
            durationMinutes: 50,
            marks: 40,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Audio-based multiple-choice, matching, and gap-fill listening comprehension exercises.",
          },
          {
            name: "Paper 3: Speaking",
            code: "3",
            durationMinutes: 15,
            marks: 40,
            weightPercentage: 0,
            assessmentType: "speaking",
            externallyAssessed: true,
            description:
              "Oral exam consisting of a warm-up conversation followed by a topic-based discussion using a prompt card.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "English Literature",
    track: "IGCSE",
    code: "0475",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Literature in English syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "Candidates take Paper 1 (Poetry and Prose) and Paper 2 (Drama), or Paper 1 along with Paper 3 (Drama Open Book) and Paper 4 (Unseen).",
        papers: [
          {
            name: "Paper 1: Poetry and Prose",
            code: "1",
            durationMinutes: 90,
            marks: 50,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Two essay questions answering on studied set texts (one poetry, one prose).",
          },
          {
            name: "Paper 2: Drama",
            code: "2",
            durationMinutes: 90,
            marks: 50,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Two essay questions answering on studied set drama texts.",
          },
          {
            name: "Paper 3: Drama (Open Book)",
            code: "3",
            durationMinutes: 45,
            marks: 25,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "One passage-based or essay question on a set drama text with clean set text allowed in the exam.",
          },
          {
            name: "Paper 4: Unseen",
            code: "4",
            durationMinutes: 75,
            marks: 25,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Critical literary analysis of an unseen poem or prose extract.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "French",
    track: "IGCSE",
    code: "0520",
    syllabus: {
      current: {
        label: "Cambridge IGCSE French - Foreign Language syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates take Papers 1, 2, 3, and 4 testing the four key language competencies: Listening, Reading, Speaking, and Writing.",
        papers: [
          {
            name: "Paper 1: Listening",
            code: "1",
            durationMinutes: 50,
            marks: 40,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Listening comprehension questions based on spoken recordings of everyday topics.",
          },
          {
            name: "Paper 2: Reading",
            code: "2",
            durationMinutes: 60,
            marks: 45,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Comprehension questions based on texts of varying lengths and styles.",
          },
          {
            name: "Paper 3: Speaking",
            code: "3",
            durationMinutes: 10,
            marks: 40,
            weightPercentage: 25,
            assessmentType: "speaking",
            externallyAssessed: true,
            description:
              "Individual practical speaking exam involving role-play situations and topic conversations.",
          },
          {
            name: "Paper 4: Writing",
            code: "4",
            durationMinutes: 60,
            marks: 45,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Short and extended writing tasks demonstrating grammatical control and vocabulary usage.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Global Perspectives",
    track: "IGCSE",
    code: "0457",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Global Perspectives syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "Candidates are assessed through a written exam, an individual research report, and a collaborative team project.",
        papers: [
          {
            name: "Component 1: Written Examination",
            code: "1",
            durationMinutes: 75,
            marks: 70,
            weightPercentage: 35,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Compulsory source-based paper evaluating critical thinking, reasoning, and perspective analysis.",
          },
          {
            name: "Component 2: Individual Report",
            code: "2",
            durationMinutes: 0,
            marks: 60,
            weightPercentage: 30,
            assessmentType: "coursework",
            externallyAssessed: true,
            description:
              "Research report (1500–2000 words) investigating a global issue from national, personal, and global angles.",
          },
          {
            name: "Component 3: Team Project",
            code: "3",
            durationMinutes: 0,
            marks: 70,
            weightPercentage: 35,
            assessmentType: "coursework",
            externallyAssessed: true,
            description:
              "Collaborative group project producing an outcome and individual reflective report.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "History",
    track: "IGCSE",
    code: "0470",
    syllabus: {
      current: {
        label: "Cambridge IGCSE History syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "Candidates sit Paper 1, Paper 2, and either Paper 3 (Coursework) or Paper 4 (Alternative to Coursework).",
        papers: [
          {
            name: "Paper 1: Structured Questions",
            code: "1",
            durationMinutes: 120,
            marks: 60,
            weightPercentage: 40,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Structured essay questions covering core 19th/20th-century historical content and depth studies.",
          },
          {
            name: "Paper 2: Document Questions",
            code: "2",
            durationMinutes: 120,
            marks: 50,
            weightPercentage: 33,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Source-evaluation paper based on primary and secondary historical evidence on a prescribed topic.",
          },
          {
            name: "Paper 4: Alternative to Coursework",
            code: "4",
            durationMinutes: 60,
            marks: 40,
            weightPercentage: 27,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Written paper consisting of a single extended depth study question.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Malay",
    track: "IGCSE",
    code: "0546",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Malay - Foreign Language syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates take Papers 1, 2, 3, and 4 testing Listening, Reading, Speaking, and Writing skills.",
        papers: [
          {
            name: "Paper 1: Listening",
            code: "1",
            durationMinutes: 50,
            marks: 40,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Listening comprehension tasks based on spoken recordings in Malay.",
          },
          {
            name: "Paper 2: Reading",
            code: "2",
            durationMinutes: 60,
            marks: 45,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Reading comprehension exercises based on authentic written Malay materials.",
          },
          {
            name: "Paper 3: Speaking",
            code: "3",
            durationMinutes: 10,
            marks: 40,
            weightPercentage: 25,
            assessmentType: "speaking",
            externallyAssessed: true,
            description:
              "Oral assessment involving role-play situations and conversations.",
          },
          {
            name: "Paper 4: Writing",
            code: "4",
            durationMinutes: 60,
            marks: 45,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Structured and extended writing tasks in standard modern Malay.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Music",
    track: "IGCSE",
    code: "0410",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Music syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "Candidates complete Component 1 (Listening exam), Component 2 (Performing), and Component 3 (Composing).",
        papers: [
          {
            name: "Component 1: Listening",
            code: "1",
            durationMinutes: 75,
            marks: 70,
            weightPercentage: 40,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Written examination based on audio extracts covering world music, set works, and Western classical styles.",
          },
          {
            name: "Component 2: Performing",
            code: "2",
            durationMinutes: 0,
            marks: 50,
            weightPercentage: 30,
            assessmentType: "practical",
            externallyAssessed: false,
            description:
              "Practical assessment of solo and ensemble musical performances recorded and submitted for moderation.",
          },
          {
            name: "Component 3: Composing",
            code: "3",
            durationMinutes: 0,
            marks: 100,
            weightPercentage: 30,
            assessmentType: "coursework",
            externallyAssessed: false,
            description:
              "Submission of two original musical compositions with scores and recordings.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Pakistan Studies",
    track: "IGCSE",
    code: "0448",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Pakistan Studies syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates take Paper 1 (History and Culture) and Paper 2 (Environment of Pakistan).",
        papers: [
          {
            name: "Paper 1: The History and Culture of Pakistan",
            code: "1",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Structured essay questions assessing knowledge of Pakistan's history, heritage, and political development.",
          },
          {
            name: "Paper 2: The Environment of Pakistan",
            code: "2",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Data response and analytical questions examining geography, natural resources, industry, and environmental issues.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Spanish",
    track: "IGCSE",
    code: "0530",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Spanish - Foreign Language syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates take Papers 1, 2, 3, and 4 testing Listening, Reading, Speaking, and Writing proficiency in Spanish.",
        papers: [
          {
            name: "Paper 1: Listening",
            code: "1",
            durationMinutes: 50,
            marks: 40,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Listening comprehension tasks based on spoken recordings in everyday Spanish.",
          },
          {
            name: "Paper 2: Reading",
            code: "2",
            durationMinutes: 60,
            marks: 45,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Reading comprehension exercises testing understanding of written Spanish text types.",
          },
          {
            name: "Paper 3: Speaking",
            code: "3",
            durationMinutes: 10,
            marks: 40,
            weightPercentage: 25,
            assessmentType: "speaking",
            externallyAssessed: true,
            description:
              "Oral speaking test comprising role-play activities and spontaneous conversations.",
          },
          {
            name: "Paper 4: Writing",
            code: "4",
            durationMinutes: 60,
            marks: 45,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Short and extended writing tasks evaluating grammar, vocabulary, and expression in Spanish.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Travel and Tourism",
    track: "IGCSE",
    code: "0471",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Travel & Tourism syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "All candidates take Paper 1 and Paper 2, covering tourism industries, destination marketing, and tour management.",
        papers: [
          {
            name: "Paper 1: Key Concepts and Skills",
            code: "1",
            durationMinutes: 120,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Short-answer and structured questions testing foundational travel and tourism concepts and customer service.",
          },
          {
            name: "Paper 2: Managing Tour Operations",
            code: "2",
            durationMinutes: 120,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Scenario-based structured questions evaluating marketing, product development, and tour management strategies.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Urdu as a Second Language",
    track: "IGCSE",
    code: "0539",
    syllabus: {
      current: {
        label: "Cambridge IGCSE Urdu as a Second Language syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/",
      },
    },
    routes: [
      {
        name: "General",
        description:
          "Candidates take Paper 1 (Reading & Writing) and Paper 2 (Listening), alongside optional speaking assessment.",
        papers: [
          {
            name: "Paper 1: Reading and Writing",
            code: "1",
            durationMinutes: 120,
            marks: 60,
            weightPercentage: 67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Reading comprehension, note-taking, form-filling, summary writing, and extended composition in Urdu.",
          },
          {
            name: "Paper 2: Listening",
            code: "2",
            durationMinutes: 45,
            marks: 30,
            weightPercentage: 33,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Audio comprehension tasks based on spoken dialogs and monologs in Urdu.",
          },
          {
            name: "Component 3: Speaking",
            code: "3",
            durationMinutes: 12,
            marks: 30,
            weightPercentage: 0,
            assessmentType: "speaking",
            externallyAssessed: true,
            description:
              "Optional speaking examination assessing spoken Urdu communication.",
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