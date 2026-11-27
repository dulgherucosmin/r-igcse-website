import type { Board, SubjectLevel } from "@/lib/drive";
export type AssessmentTrack =
  | "IGCSE"
  | "AS Level"
  | "A Level"
  | "AS & A Level"
  | "IAS"
  | "IAL";

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
  name:
    | "Core"
    | "Extended"
    | "Standard"
    | "Foundation Tier"
    | "Higher Tier"
    | "Higher"
    | "General"
    | "A Level"
    | "AS Level"
    | "International GCSE"
    | "International Advanced Subsidiary (IAS)"
    | "International Advanced Level (IAL)";
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-accounting-0452/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-additional-0606/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-biology-0610/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-business-studies-0450/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-chemistry-0620/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-chinese-first-language-0509/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-computer-science-0478/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-design-and-technology-0445/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-economics-0455/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-english-second-language-oral-endorsement-0510/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/english-literature-0475/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-french-foreign-language-0520/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-global-perspectives-0457/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-history-0470/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-malay-foreign-language-0546/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-music-0410/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-pakistan-studies-0448/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-spanish-foreign-language-0530/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-travel-and-tourism-0471/",
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
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-urdu-as-a-second-language-0539/",
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
  {
    board: "CAIE",
    subject: "Biology",
    track: "AS & A Level",
    code: "9700",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level Biology syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-biology-9700/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Paper 1, Paper 2, and Paper 3. This covers core cell structure, biological molecules, enzymes, membranes, transport, and immunity.",
        papers: [
          {
            name: "Paper 1: Multiple Choice",
            code: "1",
            durationMinutes: 75,
            marks: 40,
            weightPercentage: 31,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Multiple choice question paper based on the AS Level syllabus content.",
          },
          {
            name: "Paper 2: AS Level Structured Questions",
            code: "2",
            durationMinutes: 75,
            marks: 60,
            weightPercentage: 46,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Structured question paper based on the AS Level syllabus content.",
          },
          {
            name: "Paper 3: Advanced Practical Skills",
            code: "3",
            durationMinutes: 120,
            marks: 40,
            weightPercentage: 23,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Practical work and structured questions evaluating laboratory skills.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take Paper 1, Paper 2, Paper 3, Paper 4, and Paper 5, combining AS core content with advanced A Level topics like respiration, photosynthesis, homeostasis, and genetics.",
        papers: [
          {
            name: "Paper 1: Multiple Choice",
            code: "1",
            durationMinutes: 75,
            marks: 40,
            weightPercentage: 15.5,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Multiple choice question paper based on AS Level content.",
          },
          {
            name: "Paper 2: AS Level Structured Questions",
            code: "2",
            durationMinutes: 75,
            marks: 60,
            weightPercentage: 23,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Structured question paper based on AS Level content.",
          },
          {
            name: "Paper 3: Advanced Practical Skills",
            code: "3",
            durationMinutes: 120,
            marks: 40,
            weightPercentage: 11.5,
            assessmentType: "practical",
            externallyAssessed: true,
            description: "Practical work and structured questions.",
          },
          {
            name: "Paper 4: A Level Structured Questions",
            code: "4",
            durationMinutes: 120,
            marks: 100,
            weightPercentage: 38.5,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Structured questions based on the A Level syllabus content, with required knowledge of AS material.",
          },
          {
            name: "Paper 5: Planning, Analysis and Evaluation",
            code: "5",
            durationMinutes: 75,
            marks: 30,
            weightPercentage: 11.5,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Questions based on experimental skills, planning, data analysis, and evaluation.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Business Studies",
    track: "AS & A Level",
    code: "9609",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level Business syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-business-9609/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Paper 1 and Paper 2, covering enterprise, marketing, human resources, operations, and finance.",
        papers: [
          {
            name: "Paper 1: Business Concepts 1",
            code: "1",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Short answer and essay questions based on AS Level business concepts.",
          },
          {
            name: "Paper 2: Business Concepts 2",
            code: "2",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Data response and structured questions based on a case study context.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take Papers 1, 2, 3, and 4, integrating advanced business strategy, international contexts, and decision-making.",
        papers: [
          {
            name: "Paper 1: Business Concepts 1",
            code: "1",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Short answer and essay questions based on AS content.",
          },
          {
            name: "Paper 2: Business Concepts 2",
            code: "2",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Data response and case-study questions based on AS content.",
          },
          {
            name: "Paper 3: Business Decision-Making",
            code: "3",
            durationMinutes: 135,
            marks: 80,
            weightPercentage: 40,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Complex case study covering advanced A Level business strategy and operations.",
          },
          {
            name: "Paper 4: Business Strategy",
            code: "4",
            durationMinutes: 75,
            marks: 40,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Two essay questions based on a strategic case study.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Computer Science",
    track: "AS & A Level",
    code: "9618",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level Computer Science syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Paper 1 and Paper 2, covering information representation, communication, hardware, processor fundamentals, and fundamental programming and algorithms.",
        papers: [
          {
            name: "Paper 1: Theory Fundamentals",
            code: "1",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Written paper assessing computer architecture, hardware, data representation, and networking.",
          },
          {
            name: "Paper 2: Fundamental Problem-solving and Programming Skills",
            code: "2",
            durationMinutes: 120,
            marks: 75,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Written paper assessing programming, algorithms, logic, and software development principles.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take all four papers, adding advanced data structures, software engineering, low-level programming, and practical coding assessments.",
        papers: [
          {
            name: "Paper 1: Theory Fundamentals",
            code: "1",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Theory paper on hardware, software, and data structures.",
          },
          {
            name: "Paper 2: Fundamental Problem-solving and Programming Skills",
            code: "2",
            durationMinutes: 120,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Problem-solving and programming paper.",
          },
          {
            name: "Paper 3: Advanced Theory",
            code: "3",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Advanced topics including networks, web technologies, data types, and artificial intelligence.",
          },
          {
            name: "Paper 4: Practical",
            code: "4",
            durationMinutes: 150,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "practical",
            externallyAssessed: true,
            description:
              "Computer-based programming test using Python, Java, or Visual Basic.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Economics",
    track: "AS & A Level",
    code: "9708",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level Economics syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-economics-9708/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Paper 1 and Paper 2, covering basic economic ideas, microeconomics, and macroeconomics.",
        papers: [
          {
            name: "Paper 1: AS Level Multiple Choice",
            code: "1",
            durationMinutes: 60,
            marks: 30,
            weightPercentage: 33,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Multiple choice questions based on AS content topics 1–6.",
          },
          {
            name: "Paper 2: AS Level Data Response and Essays",
            code: "2",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Data response and structured essay questions on microeconomics and macroeconomics.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take all four papers, combining AS foundation knowledge with advanced microeconomics, macroeconomics, and international trade.",
        papers: [
          {
            name: "Paper 1: AS Level Multiple Choice",
            code: "1",
            durationMinutes: 60,
            marks: 30,
            weightPercentage: 17,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Multiple choice questions based on AS content.",
          },
          {
            name: "Paper 2: AS Level Data Response and Essays",
            code: "2",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 33,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Data response and structured essays based on AS content.",
          },
          {
            name: "Paper 3: A Level Multiple Choice",
            code: "3",
            durationMinutes: 60,
            marks: 30,
            weightPercentage: 17,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Multiple choice questions focusing on A Level content.",
          },
          {
            name: "Paper 4: A Level Data Response and Essays",
            code: "4",
            durationMinutes: 135,
            marks: 60,
            weightPercentage: 33,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Data response and essay questions focusing on advanced micro and macro economic topics.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "English Language",
    track: "AS & A Level",
    code: "9093",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level English Language syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-english-language-9093/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Paper 1 and Paper 2, focusing on text analysis, linguistic features, and creative and persuasive writing.",
        papers: [
          {
            name: "Paper 1: Text Analysis",
            code: "1",
            durationMinutes: 135,
            marks: 50,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Analysis of unseen texts and application of linguistic concepts.",
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
              "Writing tasks requiring distinct styles, purposes, and audiences.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take all four papers, including advanced language analysis, language change, and child language acquisition.",
        papers: [
          {
            name: "Paper 1: Text Analysis",
            code: "1",
            durationMinutes: 135,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Analysis of unseen texts and writing evaluation.",
          },
          {
            name: "Paper 2: Writing",
            code: "2",
            durationMinutes: 120,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Targeted writing tasks for specified audiences.",
          },
          {
            name: "Paper 3: Language Analysis",
            code: "3",
            durationMinutes: 135,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Analysis of language change and child language acquisition.",
          },
          {
            name: "Paper 4: Language Topics",
            code: "4",
            durationMinutes: 135,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Extended exploration of specialized language topics, English as a global language, or language and the self.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Mathematics",
    track: "AS & A Level",
    code: "9709",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level Mathematics syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-mathematics-9709/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Pure Mathematics 1 (Paper 1) and choice of either Probability & Statistics 1 (Paper 5) or Mechanics (Paper 4).",
        papers: [
          {
            name: "Paper 1: Pure Mathematics 1",
            code: "1",
            durationMinutes: 110,
            marks: 75,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Topics include quadratics, functions, coordinate geometry, circular measure, trigonometry, series, and calculus.",
          },
          {
            name: "Paper 4: Mechanics or Paper 5: Probability & Statistics 1",
            code: "4 / 5",
            durationMinutes: 75,
            marks: 50,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Applied mathematics unit covering forces, kinematics, or probability distributions and statistical analysis.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take four papers: Pure Mathematics 1, Pure Mathematics 3, and two applied units (such as Statistics 1 and Mechanics, or Statistics 1 and Statistics 2).",
        papers: [
          {
            name: "Paper 1: Pure Mathematics 1",
            code: "1",
            durationMinutes: 110,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Core AS pure mathematics topics.",
          },
          {
            name: "Paper 3: Pure Mathematics 3",
            code: "3",
            durationMinutes: 120,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Advanced algebra, logarithmic/exponential functions, advanced trigonometry, calculus, numerical solution, and vectors.",
          },
          {
            name: "Paper 4: Mechanics",
            code: "4",
            durationMinutes: 75,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Forces, equilibrium, kinematics, momentum, and Newton's laws.",
          },
          {
            name: "Paper 5: Probability & Statistics 1",
            code: "5",
            durationMinutes: 75,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Representation of data, permutations, combinations, probability, and discrete random variables.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Further Mathematics",
    track: "AS & A Level",
    code: "9231",
    syllabus: {
      current: {
        label:
          "Cambridge International AS & A Level Further Mathematics syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-further-mathematics-9231/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Further Pure Mathematics 1 alongside either Further Mechanics or Further Statistics.",
        papers: [
          {
            name: "Paper 1: Further Pure Mathematics 1",
            code: "1",
            durationMinutes: 120,
            marks: 75,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Advanced algebra, matrices, complex numbers, series, vectors, and proof.",
          },
          {
            name: "Paper 2: Further Pure Mathematics 2 or Further Mechanics / Statistics",
            code: "2 / 3 / 4",
            durationMinutes: 90,
            marks: 50,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Specialized further mathematics component covering advanced mechanics, statistics, or further pure math.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take four papers covering comprehensive further pure mathematics, mechanics, and statistics.",
        papers: [
          {
            name: "Paper 1: Further Pure Mathematics 1",
            code: "1",
            durationMinutes: 120,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Core further pure mathematical concepts.",
          },
          {
            name: "Paper 2: Further Pure Mathematics 2",
            code: "2",
            durationMinutes: 120,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Hyperbolic functions, advanced calculus, differential equations, and complex numbers.",
          },
          {
            name: "Paper 3: Further Mechanics",
            code: "3",
            durationMinutes: 90,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Motion of projectiles, equilibrium of rigid bodies, circular motion, and hooke's law.",
          },
          {
            name: "Paper 4: Further Probability & Statistics",
            code: "4",
            durationMinutes: 90,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Continuous random variables, inference, chi-squared tests, and probability generating functions.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Law",
    track: "AS & A Level",
    code: "9084",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level Law syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-law-9084/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Paper 1 and Paper 2, covering the English Legal System and Criminal Law.",
        papers: [
          {
            name: "Paper 1: English Legal System",
            code: "1",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Structure of courts, law making sources, legal personnel, and machinery of justice.",
          },
          {
            name: "Paper 2: Criminal Law",
            code: "2",
            durationMinutes: 90,
            marks: 45,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Elements of criminal liability, fatal and non-fatal offenses against the person, and property offenses.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take all four papers, adding the Law of Contract and the Law of Tort.",
        papers: [
          {
            name: "Paper 1: English Legal System",
            code: "1",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "English legal system structure and principles.",
          },
          {
            name: "Paper 2: Criminal Law",
            code: "2",
            durationMinutes: 90,
            marks: 45,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Criminal offenses and sentencing principles.",
          },
          {
            name: "Paper 3: Law of Contract",
            code: "3",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Formation of contracts, terms, vitiating factors, and remedies.",
          },
          {
            name: "Paper 4: Law of Tort",
            code: "4",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Negligence, occupiers' liability, private nuisance, and general defenses.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Media Studies",
    track: "AS & A Level",
    code: "9607",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level Media Studies syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-media-studies-9607/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Component 1 (Foundation Portfolio coursework) and Component 2 (Media Texts and Contexts exam).",
        papers: [
          {
            name: "Component 1: Foundation Portfolio",
            code: "1",
            durationMinutes: 0,
            marks: 50,
            weightPercentage: 50,
            assessmentType: "coursework",
            externallyAssessed: true,
            description:
              "Practical media production work with a written critical reflection.",
          },
          {
            name: "Component 2: Media Texts and Contexts",
            code: "2",
            durationMinutes: 120,
            marks: 50,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Digital examination analyzing moving image extracts and media contexts.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take all four components, adding an Advanced Portfolio (Component 3) and Critical Perspectives exam (Component 4).",
        papers: [
          {
            name: "Component 1: Foundation Portfolio",
            code: "1",
            durationMinutes: 0,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "coursework",
            externallyAssessed: true,
            description: "Coursework production portfolio.",
          },
          {
            name: "Component 2: Media Texts and Contexts",
            code: "2",
            durationMinutes: 120,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Digital examination on media texts.",
          },
          {
            name: "Component 3: Advanced Portfolio",
            code: "3",
            durationMinutes: 0,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "coursework",
            externallyAssessed: true,
            description:
              "Advanced media campaign production and website/portfolio creation.",
          },
          {
            name: "Component 4: Critical Perspectives",
            code: "4",
            durationMinutes: 120,
            marks: 50,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Critical digital exam focusing on changing media environments, debates, and media theories.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Physics",
    track: "AS & A Level",
    code: "9702",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level Physics syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-physics-9702/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Paper 1, Paper 2, and Paper 3, covering kinematics, dynamics, forces, work, energy, waves, and electricity.",
        papers: [
          {
            name: "Paper 1: Multiple Choice",
            code: "1",
            durationMinutes: 75,
            marks: 40,
            weightPercentage: 31,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Multiple choice questions based on AS syllabus content.",
          },
          {
            name: "Paper 2: AS Level Structured Questions",
            code: "2",
            durationMinutes: 75,
            marks: 60,
            weightPercentage: 46,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Structured questions based on AS content.",
          },
          {
            name: "Paper 3: Advanced Practical Skills",
            code: "3",
            durationMinutes: 120,
            marks: 40,
            weightPercentage: 23,
            assessmentType: "practical",
            externallyAssessed: true,
            description: "Hands-on laboratory practical examination.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take all five papers, combining AS core work with advanced circular motion, fields, quantum physics, and nuclear physics.",
        papers: [
          {
            name: "Paper 1: Multiple Choice",
            code: "1",
            durationMinutes: 75,
            marks: 40,
            weightPercentage: 15.5,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Multiple choice exam on AS content.",
          },
          {
            name: "Paper 2: AS Level Structured Questions",
            code: "2",
            durationMinutes: 75,
            marks: 60,
            weightPercentage: 23,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Structured questions on AS content.",
          },
          {
            name: "Paper 3: Advanced Practical Skills",
            code: "3",
            durationMinutes: 120,
            marks: 40,
            weightPercentage: 11.5,
            assessmentType: "practical",
            externallyAssessed: true,
            description: "Practical skills assessment.",
          },
          {
            name: "Paper 4: A Level Structured Questions",
            code: "4",
            durationMinutes: 120,
            marks: 100,
            weightPercentage: 38.5,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Advanced theoretical questions covering full A Level syllabus content.",
          },
          {
            name: "Paper 5: Planning, Analysis and Evaluation",
            code: "5",
            durationMinutes: 75,
            marks: 30,
            weightPercentage: 11.5,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Experimental planning and data analysis paper.",
          },
        ],
      },
    ],
  },
  {
    board: "CAIE",
    subject: "Psychology",
    track: "AS & A Level",
    code: "9990",
    syllabus: {
      current: {
        label: "Cambridge International AS & A Level Psychology syllabus",
        url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-psychology-9990/",
      },
    },
    routes: [
      {
        name: "AS Level",
        description:
          "Candidates take Paper 1 and Paper 2, covering core psychological approaches, core studies, issues and debates, and research methods.",
        papers: [
          {
            name: "Paper 1: Approaches, Issues and Debates",
            code: "1",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Short answer and essay questions based on core studies and psychological approaches.",
          },
          {
            name: "Paper 2: Research Methods",
            code: "2",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Structured questions examining research methodology, design, and data analysis.",
          },
        ],
      },
      {
        name: "A Level",
        description:
          "Full A Level candidates take all four papers, incorporating AS foundations alongside two specialized options (such as Clinical, Health, or Organisational psychology).",
        papers: [
          {
            name: "Paper 1: Approaches, Issues and Debates",
            code: "1",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Core studies and approaches questions.",
          },
          {
            name: "Paper 2: Research Methods",
            code: "2",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Research methods and study design questions.",
          },
          {
            name: "Paper 3: Specialist Options: Approaches, Issues and Debates",
            code: "3",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description: "Theory and essays on two chosen specialist options.",
          },
          {
            name: "Paper 4: Specialist Options: Application and Research Methods",
            code: "4",
            durationMinutes: 90,
            marks: 60,
            weightPercentage: 25,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Applied case study analysis and research planning on chosen specialist options.",
          },
        ],
      },
    ],
  },
  {
    board: "Edexcel",
    subject: "Biology",
    track: "IAL",
    code: "YBI11",
    syllabus: {
      current: {
        label: "IAL Biology Specification",
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/biology-2018.html"
      },
    },
    routes: [
      {
        name: "International Advanced Subsidiary (IAS)",
        description: "The International Advanced Subsidiary (IAS) is the first half of the International Advanced Level (IAL) qualification and consists of three IAS units, Units 1, 2 and 3. This qualification may be taken on it's own or may contribute 50% towards the International Advanced Level (IAL) qualification.",
        papers: [
          {
            name: "Unit 1: Molecules, Diet, Transport and Health",
            code: "WBI11/01",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-open, open-response, calculations and extended-writing questions focusing on Molecules, Transport and Health, Membranes, Proteins, DNA and Gene Expression.",
          },
          {
            name: "Unit 2: Cells, Development, Biodiversity and Conservation",
            code: "WBI12/02",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-open, open-response, calculations and extended-writing questions focusing on Cells, Development, Biodiversity and Conservation Cell Structure, Reproduction and Development Plant Structure and Function, Biodiversity and Conservation.",
          },
          {
            name: "Unit 3: Practical Skills in Biology I",
            code: "WBI13/03",
            durationMinutes: 80,
            marks: 50,
            weightPercentage: 10,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include short-open, open-response and calculation questions focusing on experimental procedures and techniques learned in Units 1 and 2.",
          },
        ],
      },
      {
        name: "International Advanced Level (IAL)",
        description: "The International Advanced Level (IAL) consists of the three IAS units (Units 1, 2 and 3) plus three IA2 units (Units 4, 5 and 6). Candidates wishing to take the International Advanced Level must, therefore, complete all six units.",
        papers: [
          {
            name: "Unit 4: Energy, Environment, Microbiology and Immunity",
            code: "WBI14/04",
            durationMinutes: 105,
            marks: 90,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-open, open-response, calculations and extended-writing questions focusing on Energy Flow, Ecosystems and the Environment, Microbology, Immunity and Forensics.",
          },
          {
            name: "Unit 5: Respiration, Internal Environment, Coordination and Gene Technology",
            code: "WBI15/05",
            durationMinutes: 105,
            marks: 90,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-open, open-response, calculations and extended-writing questions focusing on Respiration, Muscles and the Internal Environment Coordination, Response and Gene Technology.",
          },
          {
            name: "Unit 6: Practical Skills in Biology II",
            code: "WBI16/06",
            durationMinutes: 80,
            marks: 50,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include short-open, open-response and calculation questions focusing on experimental procedures and techniques acquired in Units 1 and 2 by carrying out a range of practical experiments and investigations while they study Units 4 and 5.",
          },
        ],
      },
    ],
  },
  {
    board: "Edexcel",
    subject: "Chemistry",
    track: "IAL",
    code: "YCH11",
    syllabus: {
      current: {
        label: "IAL Chemistry Specification",
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/chemistry-2018.html"
      },
    },
    routes: [
      {
        name: "International Advanced Subsidiary (IAS)",
        description: "The International Advanced Subsidiary (IAS) is the first half of the International Advanced Level (IAL) qualification and consists of three IAS units, Units 1, 2 and 3. This qualification may be taken on it's own or may contribute 50% towards the International Advanced Level (IAL) qualification.",
        papers: [
          {
            name: "Unit 1: Structure, Bonding and Introduction to Organic Chemistry",
            code: "WCH11/01",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "This paper has two sections: (A) Multiple choice questions, (B) Mixture of short-open, open-response, and calculation questions focusing on Formulae, Equations and Amount of Substabce, Atomic Structure and the Periodic Table, Bonding and Structure, Introductory Organic Chemistry and Alkanes, Alkenes.",
          },
          {
            name: "Unit 2:  Energetics, Group Chemistry, Halogenoalkanes and Alcohol",
            code: "WCH12/02",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "This paper has three sections: (A) Multiple choice questions, (B) Mixture of short-open, open-response, and calculation questions, and (C) Contemporary context questions focusing on Energetics Intermolecular Forces Redox Chemistry and Groups 1, 2 and 7 Introduction to Kinetics and Equilibria Organic Chemistry: Alcohols, Halogenoalkanes and Spectra.",
          },
          {
            name: "Unit 3: Practical Skills in Chemistry I",
            code: "WCH13/03",
            durationMinutes: 90,
            marks: 50,
            weightPercentage: 10,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "This paper may include short-open, open-response and calculation questions focusing on experimental procedures and techniques learned in Units 1 and 2.",
          },
        ],
      },
      {
        name: "International Advanced Level (IAL)",
        description: "The International Advanced Level (IAL) consists of the three IAS units (Units 1, 2 and 3) plus three IA2 units (Units 4, 5 and 6). Candidates wishing to take the International Advanced Level must, therefore, complete all six units.",
        papers: [
          {
            name: "Unit 4: Rates, Equilibria and Further Organic Chemistry",
            code: "WCH14/04",
            durationMinutes: 105,
            marks: 90,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "This paper has three sections: (A) Multiple choice questions, (B) Mixture of short-open, open-response, calculations and extended-writing questions, and (C) Data or calculation questions focusing on Kinetics, Entropy and Energetics, Chemical Equilibria, Acid-base Equilibria, Organic Chemistry: Carbonyls, Carboxylic Acids and Chirality.",
          },
          {
            name: "Unit 5: Transition Metals and Organic Nitrogen Chemistry",
            code: "WCH15/05",
            durationMinutes: 105,
            marks: 90,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "This paper has two sections: (A) Multiple choice questions, (B) Mixture of short-open, open-response, and calculation questions focusing on Redox Equilibria, Transition Metals and their Chemistry, Organic Chemistry: Arenes, Organic Nitrogen Compounds, Organic Synthesis.",
          },
          {
            name: "Unit 6: Practical Skills in Chemistry II",
            code: "WCH16/06",
            durationMinutes: 80,
            marks: 50,
            weightPercentage: 10,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include short-open, open-response and calculation questions focusing on experimental procedures and techniques acquired in Units 1 and 2 by carrying out a range of practical experiments and investigations while they study Units 4 and 5.",
          },
        ],
      },
    ],
  },
  {
    board: "Edexcel",
    subject: "Physics",
    track: "IAL",
    code: "YPH11",
    syllabus: {
      current: {
        label: "IAL Physics Specification",
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/physics-2018.html"
      },
    },
    routes: [
      {
        name: "International Advanced Subsidiary (IAS)",
        description: "The International Advanced Subsidiary (IAS) is the first half of the International Advanced Level (IAL) qualification and consists of three IAS units, Units 1, 2 and 3. This qualification may be taken on it's own or may contribute 50% towards the International Advanced Level (IAL) qualification.",
        papers: [
          {
            name: "Unit 1: Mechanics and Materials",
            code: "WPH11/01",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-open, open-response, calculations and extended-writing questions focusing on Mechanics and Materials.",
          },
          {
            name: "Unit 2: Waves and Electricity",
            code: "WPH12/01",
            durationMinutes: 90,
            marks: 80,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-open, open-response, calculations and extended-writing questions focusing on Waves and Particle Nature of Light, and Electric Circuits.",
          },
          {
            name: "Unit 3: Practical Skills in Physics I",
            code: "WPH13/01",
            durationMinutes: 80,
            marks: 50,
            weightPercentage: 10,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include short-open, open-response, calculations and extended-writing questions focusing on experimental procedures and techniques learned in Units 1 and 2.",
          },
        ],
      },
      {
        name: "International Advanced Level (IAL)",
        description: "The International Advanced Level (IAL) consists of the three IAS units (Units 1, 2 and 3) plus three IA2 units (Units 4, 5 and 6). Candidates wishing to take the International Advanced Level must, therefore, complete all six units.",
        papers: [
          {
            name: "Unit 4: Further Mechanics, Fields and Particles",
            code: "WPH14/01",
            durationMinutes: 105,
            marks: 90,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-open, open-response, calculations and extended-writing questions focusing on Further Mechanics, Electric and Magnetic Fields, and Nuclear and Particle Physics.",
          },
          {
            name: "Unit 5: Thermodynamics, Radiation, Oscillations and Cosmology",
            code: "WPH15/01",
            durationMinutes: 105,
            marks: 90,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-open, open-response, calculations and extended-writing questions focusing on Thermodynamics, Nuclear Decay, Oscillations, and Astrophysics and Cosmology.",
          },
          {
            name: "Unit 6: Practical Skills in Physics II",
            code: "WPH16/01",
            durationMinutes: 80,
            marks: 50,
            weightPercentage: 10,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include short-open, open-response, calculations and extended-writing questions focusing on experimental procedures and techniques developed in Units 4 and 5.",
          },
        ],
      },
    ],
  },
  {
    board: "Edexcel",
    subject: "Psychology",
    track: "IAL",
    code: "YPS01",
    syllabus: {
      current: {
        label: "IAL Psychology Specification",
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/psychology-2015.html"
      },
    },
    routes: [
      {
        name: "International Advanced Subsidiary (IAS)",
        description: "The International Advanced Subsidiary (IAS) is the first half of the International Advanced Level (IAL) qualification and consists of two IAS units, Units 1 and 2. This qualification may be taken on it's own or may contribute 50% towards the International Advanced Level (IAL) qualification.",
        papers: [
          {
            name: "Unit 1: Social and Cognitive Psychology",
            code: "WPS01/01",
            durationMinutes: 90,
            marks: 64,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper has three sections: (A) Social psychology, (B) Cognitive psychology, and (C) one 12-mark extended open-response question on either social or cognitive psychology. Sections A and B each comprise short-answer questions and one eight-mark extended open-response question.",
          },
          {
            name: "Unit 2: Biological Psychology, Learning Theories and Development",
            code: "WPS02/01",
            durationMinutes: 120,
            marks: 96,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper has three sections: (A) Biological psychology, (B) Learning theories and development, and (C) one 12-mark and one 16-mark extended open-response question. Sections A and B each comprise short-answer questions and one eight-mark extended open-response question.",
          },
        ],
      },
      {
        name: "International Advanced Level (IAL)",
        description: "The International Advanced Level (IAL) consists of the two IAS units (Units 1 and 2) plus two IA2 units (Units 3 and 4). Candidates wishing to take the International Advanced Level must, therefore, complete all four units.",
        papers: [
          {
            name: "Unit 3: Applications of Psychology",
            code: "WPS03/01",
            durationMinutes: 90,
            marks: 64,
            weightPercentage: 20,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper has two sections: (A) Developmental psychology, and (B) a choice of either Criminological psychology or Health psychology. Each section totals 32 marks and comprises short-answer questions and two eight-mark extended open-response questions.",
          },
          {
            name: "Unit 4: Clinical Psychology and Psychological Skills",
            code: "WPS04/01",
            durationMinutes: 120,
            marks: 96,
            weightPercentage: 30,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper has five sections: (A) Clinical psychology short-answer questions, (B) one 16-mark extended open-response question on clinical psychology, (C) Psychological skills short-answer questions on research methods, (D) one eight-mark extended open-response question, and (E) one 20-mark synoptic question on issues and debates.",
          },
        ],
      },
    ],
  },
  {
    board: "Edexcel",
    subject: "Mathematics",
    track: "IAL",
    code: "YMA01",
    syllabus: {
      current: {
        label: "IAL Mathematics Specification",
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/mathematics-2018.html"
      },
    },
    routes: [
      {
        name: "International Advanced Subsidiary (IAS)",
        description: "The International Advanced Subsidiary (IAS) is the first half of the International Advanced Level (IAL) qualification and consists of three units: P1 and P2 (compulsory) plus one optional unit from M1, S1 or D1. This qualification may be taken on it's own or may contribute 50% towards the International Advanced Level (IAL) qualification.",
        papers: [
          {
            name: "P1: Pure Mathematics 1 (Compulsory)",
            code: "WMA11/01",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 16.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Compulsory unit. The paper covers Algebra and functions, Coordinate geometry in the (x, y) plane, Trigonometry, Differentiation and Integration.",
          },
          {
            name: "P2: Pure Mathematics 2 (Compulsory)",
            code: "WMA12/01",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 16.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Compulsory unit. The paper covers Proof, Algebra and functions, Coordinate geometry in the (x, y) plane, Sequences and series, Exponentials and logarithms, Trigonometry, Differentiation and Integration.",
          },
          {
            name: "M1: Mechanics 1 (Optional)",
            code: "WME01/01",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 16.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Optional unit. The paper covers Mathematical models in mechanics, Vectors in mechanics, Kinematics of a particle moving in a straight line, Dynamics of a particle moving in a straight line or plane, Statics of a particle and Moments.",
          },
          {
            name: "S1: Statistics 1 (Optional)",
            code: "WST01/01",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 16.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Optional unit. The paper covers Mathematical models in probability and statistics, Representation and summary of data, Probability, Correlation and regression, Discrete random variables, Discrete distributions and the Normal distribution.",
          },
          {
            name: "D1: Decision Mathematics 1 (Optional)",
            code: "WDM11/01",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 16.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Optional unit. The paper covers Algorithms, Algorithms on graphs, Algorithms on graphs II, Critical path analysis and Linear programming.",
          },
        ],
      },
      {
        name: "International Advanced Level (IAL)",
        description: "The International Advanced Level (IAL) consists of the IAS units P1 and P2 plus the IA2 units P3 and P4, together with two optional units: M1 and S1, M1 and D1, M1 and M2, S1 and D1, or S1 and S2. Candidates wishing to take the International Advanced Level must, therefore, complete all six units.",
        papers: [
          {
            name: "P3: Pure Mathematics 3 (Compulsory)",
            code: "WMA13/01",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 16.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Compulsory unit. The paper covers Algebra and functions, Trigonometry, Exponentials and logarithms, Differentiation, Integration and Numerical methods.",
          },
          {
            name: "P4: Pure Mathematics 4 (Compulsory)",
            code: "WMA14/01",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 16.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Compulsory unit. The paper covers Proof, Algebra and functions, Coordinate geometry in the (x, y) plane, Binomial expansion, Differentiation, Integration and Vectors.",
          },
          {
            name: "M2: Mechanics 2 (Optional)",
            code: "WME02/01",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 16.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Optional unit (taken with M1). The paper covers Kinematics of a particle moving in a straight line or plane, Centres of mass, Work and energy, Collisions and Statics of rigid bodies.",
          },
          {
            name: "S2: Statistics 2 (Optional)",
            code: "WST02/01",
            durationMinutes: 90,
            marks: 75,
            weightPercentage: 16.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "Optional unit (taken with S1). The paper covers the Binomial and Poisson distributions, Continuous random variables, Continuous distributions, Samples and Hypothesis tests.",
          },
        ],
      },
    ],
  },
  {
    board: "Edexcel",
    subject: "Mathematics",
    track: "IGCSE",
    code: "4MA1",
    syllabus: {
      current: {
        label: "IGCSE Mathematics A Specification",
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-mathematics-a-2016.html"
      },
    },
    routes: [
      {
        name: "Foundation Tier",
        description: "The Foundation Tier consists of two papers, 1F and 2F, targeted at grades 5-1. Both papers must be taken in the same series at the end of the course.",
        papers: [
          {
            name: "Paper 1F",
            code: "4MA1/1F",
            durationMinutes: 120,
            marks: 100,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper assesses the full range of Foundation Tier content, focusing on Number, Algebra, Geometry and Statistics.",
          },
          {
            name: "Paper 2F",
            code: "4MA1/2F",
            durationMinutes: 120,
            marks: 100,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper assesses the full range of Foundation Tier content, focusing on Number, Algebra, Geometry and Statistics.",
          },
        ],
      },
      {
        name: "Higher Tier",
        description: "The Higher Tier consists of two papers, 1H and 2H, targeted at grades 9-4 (with grade 3 allowed). Both papers must be taken in the same series at the end of the course.",
        papers: [
          {
            name: "Paper 1H",
            code: "4MA1/1H",
            durationMinutes: 120,
            marks: 100,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper assesses the full range of Higher Tier content, focusing on Number, Algebra, Geometry and Statistics. Questions assume knowledge of the Foundation Tier content.",
          },
          {
            name: "Paper 2H",
            code: "4MA1/2H",
            durationMinutes: 120,
            marks: 100,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper assesses the full range of Higher Tier content, focusing on Number, Algebra, Geometry and Statistics. Questions assume knowledge of the Foundation Tier content.",
          },
        ],
      },
    ],
  },
  {
    board: "Edexcel",
    subject: "Geography",
    track: "IGCSE",
    code: "4GE1",
    syllabus: {
      current: {
        label: "IGCSE Geography Specification",
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-geography-2017.html"
      },
    },
    routes: [
      {
        name: "International GCSE",
        description: "The International GCSE in Geography is a linear qualification consisting of two papers, both taken at the end of the course of study.",
        papers: [
          {
            name: "Paper 1: Physical Geography",
            code: "4GE1/01",
            durationMinutes: 70,
            marks: 70,
            weightPercentage: 40,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-answer, data-response and open-ended questions focusing on River Environments, Coastal Environments and Hazardous Environments, including fieldwork from one of these topics.",
          },
          {
            name: "Paper 2: Human Geography",
            code: "4GE1/02",
            durationMinutes: 105,
            marks: 105,
            weightPercentage: 60,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper may include multiple-choice, short-answer, data-response and open-ended questions focusing on Economic Activity and Energy, Rural Environments and Urban Environments (including fieldwork from one of these topics), and Global Issues: Fragile Environments and Climate Change, Globalisation and Migration, and Development and Human Welfare.",
          },
        ],
      },
    ],
  },
  {
    board: "Edexcel",
    subject: "Further Pure Mathematics",
    track: "IGCSE",
    code: "4PM1",
    syllabus: {
      current: {
        label: "IGCSE Further Pure Mathematics Specification",
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-further-pure-mathematics-2017.html"
      },
    },
    routes: [
      {
        name: "International GCSE",
        description: "The International GCSE in Further Pure Mathematics is a linear qualification offered at Higher Tier only (targeted at grades 9-4, with grade 3 allowed). Both papers must be taken in the same series at the end of the course.",
        papers: [
          {
            name: "Paper 1",
            code: "4PM1/01",
            durationMinutes: 120,
            marks: 100,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper contains around 11 questions drawn from any part of the specification, focusing on Number, Algebra and Calculus, and Geometry and Trigonometry.",
          },
          {
            name: "Paper 2",
            code: "4PM1/02",
            durationMinutes: 120,
            marks: 100,
            weightPercentage: 50,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper contains around 11 questions drawn from any part of the specification, focusing on Number, Algebra and Calculus, and Geometry and Trigonometry.",
          },
        ],
      },
    ],
  },
  {
    board: "Edexcel",
    subject: "Accounting",
    track: "IGCSE",
    code: "4AC1",
    syllabus: {
      current: {
        label: "IGCSE Accounting Specification",
        url: "https://qualifications.pearson.com/en/qualifications/edexcel-international-gcses/international-gcse-accounting-2017.html"
      },
    },
    routes: [
      {
        name: "International GCSE",
        description: "The International GCSE in Accounting is a linear qualification consisting of two papers, both taken at the end of the course of study.",
        papers: [
          {
            name: "Paper 1: Introduction to Bookkeeping and Accounting",
            code: "4AC1/01",
            durationMinutes: 120,
            marks: 100,
            weightPercentage: 66.67,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper includes multiple-choice, short-answer and long-answer questions focusing on The Accounting Environment, Introduction to Bookkeeping and Introduction to Control Processes.",
          },
          {
            name: "Paper 2: Financial Statements",
            code: "4AC1/02",
            durationMinutes: 75,
            marks: 50,
            weightPercentage: 33.33,
            assessmentType: "written",
            externallyAssessed: true,
            description:
              "The paper includes two multi-part questions focusing on The Preparation of Financial Statements and Accounting for End of Period Adjustments, and builds on the content of Paper 1.",
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
  if (level === "AS" || level === "AL") return "AS & A Level";
  return "AS & A Level";
}

export function findSubjectAssessment(
  board: Board,
  subject: string,
  level: SubjectLevel,
) {
  const track = assessmentTrackForLevel(board, level);
  const candidateTracks =
    board === "CAIE" && (level === "AS" || level === "AL")
      ? ["AS & A Level", "AS Level", "A Level"]
      : [track];
  return candidateTracks
    .map((candidateTrack) =>
      SUBJECT_ASSESSMENTS.find(
        (assessment) =>
          assessment.board === board &&
          assessment.subject === subject &&
          assessment.track === candidateTrack,
      ),
    )
    .find((assessment) => assessment !== undefined);
}
