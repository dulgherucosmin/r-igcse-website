import type { ReactNode } from "react";
import { TextLink } from "@/components/text-link";
import { socials } from "@/data/footer";

export type FAQ = {
  question: string;
  answer: ReactNode;
  category: FAQCategory;
};

export type FAQCategory =
  | "General"
  | "Resources"
  | "Exam Information"
  | "AS & A Level"
  | "Community";

export const faqCategories: FAQCategory[] = [
  "Resources",
  "Exam Information",
  "Community",
];

export const faqs: FAQ[] = [
  {
    question: "Are r/IGCSE resources free?",
    answer:
      "Yes. The r/IGCSE resource repository is free to use, and all resources are shared to help students prepare for their exams.",
    category: "Resources",
  },
  {
    question: "Who creates the study resources?",
    answer:
      "Resources are created and shared by volunteer students and alumni who have studied for or sat the relevant IGCSE, O Level or AS/A Level exams and have applied to become Resource Creators in our community.",
    category: "Community",
  },
  {
    question: "How do I apply to be a helper or resource creator?",
    category: "Community",
    answer: (
      <>
        Applications for Helpers and Resource Creators are open year-round. You
        can find the details and application process on our{" "}
        <TextLink href="/opportunities">Opportunities page</TextLink>.
      </>
    ),
  },
  {
    question: "How do I join the r/IGCSE Discord server?",
    category: "Community",
    answer: (
      <>
        The r/IGCSE Discord Server is free to join by following our invite:{" "}
        <TextLink href={socials.discord}>discord.gg/igcse</TextLink>.
      </>
    ),
  },
  {
    question: "Are resources verified for syllabus accuracy?",
    category: "Resources",
    answer:
      "Yes. All of our resources are verified by multiple staff members and subject helpers, and we make sure that we only upload the highest quality resources to our repository.",
  },
  {
    question: "What variant/zone am I in?",
    category: "Exam Information",
    answer: (
      <>
        There are six administrative zones (each containing a country or region
        of the world) and multiple variants depending on the subject and the
        component within it, for example practicals can have up to 6 variants at
        AS level (CIE) while subjects such as IGCSE Hindi as a Second Language
        can have just 1. You can find out about your zone and relevant variants
        through{" "}
        <TextLink href="https://www.cambridgeinternational.org/exam-administration/cambridge-exams-officers-guide/phase-1-preparation/timetabling-exams/administrative-zone/">
          here
        </TextLink>
        .
      </>
    ),
  },
  {
    question: "Where can I find Grade Thresholds?",
    category: "Exam Information",
    answer: (
      <>
        Cambridge and Edexcel releases grade thresholds on (or slightly before)
        the results day of each exam series. You can find each of them listed
        below:{" "}
        <TextLink href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-advanced/cambridge-international-as-and-a-levels/grade-threshold-tables/">
          CAIE A Level Thresholds
        </TextLink>{" "}
        <br />
        <TextLink href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/grade-threshold-tables/">
          CAIE IGCSE/O Level Thresholds
        </TextLink>{" "}
        <br /> <br />
        <TextLink href="https://qualifications.pearson.com/en/support/support-topics/results-certification/grade-boundaries.html?Qualification-Family=International-GCSE">
          Edexcel IGCSE Thresholds
        </TextLink>{" "}
        <br />
        <TextLink href="https://qualifications.pearson.com/en/support/support-topics/results-certification/grade-boundaries.html?Qualification-Family=AS-and-A-level">
          Edexcel IAS/IAL Thresholds
        </TextLink>{" "}
        <br />
      </>
    ),
  },
  {
    question: "How do grade thresholds work? (CIE)",
    category: "Exam Information",
    answer: (
      <>
        Grade thresholds (or boundaries) are the minimum mark achievable, either
        in that specific paper/component or the entire syllabus, that you can
        obtain for that grade. For example, if a grade threshold for IGCSE First
        Language English is set at 124/160 for an A*, this means any mark
        greater than or equal to 124 achieves an A* for the syllabus.
        <br />
        <br />
        Grade A* does not exist for an individual component – only the whole
        syllabus.
        <br />
        <br />
        Grade thresholds are set by the awarding body to take into account the
        performance of candidates within that specific component/syllabus and
        hence adjust the threshold for it depending on multiple factors – most
        of the time, a lower grade threshold indicates a more difficult
        component, but this may not always be necessary. This means that you may
        not always require the same raw percentage to get a certain grade.
        <br />
        <br />
        Thresholds are set after the marking period. They also dictate your
        percentage uniform mark (PUM) for countries that receive them. Grade
        thresholds vary by variant so you should make sure to be knowing of the
        specific component and variant you’re looking for!
      </>
    ),
  },
  {
    question: "Where can I find syllabus information?",
    category: "Exam Information",
    answer: (
      <>
        Syllabus are updated every few years and you can find them on the
        Cambridge website or search on the internet the component code and year
        e.g. “0625 syllabus 2027”
      </>
    ),
  },
  {
    question:
      "What do the numbers/letters within the exam paper mean e.g. 0620/42/M/J/24? (CIE)",
    category: "Exam Information",
    answer: (
      <>
        The first four digits are your syllabus code – 0620 is Cambridge IGCSE
        Chemistry. M/J (or O/ N or F/M) represent the series – in this case the
        May/June series and the two digits following represent the year – 2024
        in this example. Finally, the digit following your syllabus code is your
        component and variant. 42 is paper 4, variant 2.
      </>
    ),
  },
  {
    question: "Do all the variants have the same questions?",
    category: "Exam Information",
    answer: (
      <>
        Usually not – they are reserved for different zones. Although in some
        cases two variants can be the same, such as variants 1 and 3 in some CIE
        AS and A Level sciences.
      </>
    ),
  },
  {
    question: "Can I get my raw marks?",
    category: "Exam Information",
    answer: (
      <>
        Yes. Raw marks are released to you, usually by your centre, on or after
        results day. Contact your centre if you wish to receive them. You can
        alternatively send out a{" "}
        <TextLink href="https://www.cambridgeinternational.org/privacy-and-legal/subject-access-requests/">
          subject access request{" "}
        </TextLink>{" "}
        to directly request them from Cambridge (in case of issues within your
        centre or being a private candidate).
      </>
    ),
  },
  {
    question: "How do IAS/IAL Mathemataics Assessment routes work? (Edexcel)",
    category: "Exam Information",
    answer: (
      <>
        A Level subjects consist of a set of papers, some belong to IAS (AS) and
        some belong to IAL (AL). It may be either fixed or has a room of wiggle
        where you have obligatory components, both in AS and AL, and other
        components where you must take a set amount of them, regardless whether
        it is in AS or AL.
        <br />
        <br />
        <span className="text-white font-bold">
          IAL Mathematics (6 Papers Total)
        </span>
        <br />
        In Mathematics, the following obligatory units are Pure Mathematics 1,
        2,3 & 4 and the optional units are Mechanics 1, 2, Statistics 1, 2 or
        Decision Maths 1. For AS you are obliged to take Pure 1 & 2 + optional
        component which is either S1, M1, or D1. For A2, you are obliged to take
        Pure 3 & 4 + optional component which depends on what you took in AS;
        There is an option to either continue the optional component you started
        with in AS and take its second paper or take a different optional
        compontent. For example, if one took M1 in AS they may choose M2 in A2
        or decide to take either S1 or D1.
        <br />
        <br />
        <span className="text-white font-bold">
          IAL Further Mathematics (12 Papers Total)
        </span>
        <br />
        In Further Mathematics, there is a compulsory unit FP1 and a semi
        compulsory would be FP2 or FP3 as you’d need to take one of them or
        both. The new units available would be S3 & M3 with remaining access to
        the other optional units in A-Level Mathematics. An example to a route
        would be if one took S1 and M1 in AL Maths, they could take in further:
        FP1,FP2,FP3, M2,M3 & S2. It is really flexible and taking one over the
        other wont put you at any disadvantage.
        <br />
        <br />
        <span className="text-white font-bold">IAL Sciences</span>
        <br />
        Format of sciences is fixed across the 3 sciences (Biology, Chemistry &
        Physics) AS consists of 3 Units; 1,2 & 3 and A2 consists of also 3
        Units; 4,5 & 6. Units 1,2,4,5 follow a modular approach which means that
        certain topics appear in these components while U3 & U6 are written
        practicals which mean that they focus on the practical side of the
        concepts.
      </>
    ),
  },
  {
    question: "How do AS/A Level Assessment routes work? (CIE)",
    category: "Exam Information",
    answer: (
      <>
        This usually varies by subject, but there are usually a set of papers
        that are restricted to AS levels and others to A level, with some papers
        that can be taken in either year.
        <br />
        <br />
        For example, Cambridge AS and A Level Mathematics offers a total of 6
        components – Pure Mathematics 1, 2 and 3, Statistics 1 and 2, and
        Mechanics 1. Pure Mathematics 1 and 2 are reserved for AS level
        candidates and Pure Mathematics 3 and Statistics 2 for A level
        candidates. Statistics 1 can either be chosen in the AS or A level, and
        likewise for Mechanics 1. It is not possible to take Statistics 2 at A
        level without having taken Statistics 1 at AS level. There is also an
        important distinction between the pure mathematics papers – only AS
        level candidates take Pure 2. This means candidates planning to take
        mathematics only up till the AS level and not continue the A level can
        take Pure Mathematics 2 but candidates taking the full A level would
        need to study Pure Mathematics 3, which also contains the Pure 2
        syllabus content.
        <br />
        <br />
        In summary, you could either take:
        <br />
        <br />
        <span className="font-bold font-white">AS Level </span>
        <br />
        Pure Math 1, 2 and Statistics 1 OR Mechanics 1<br />
        OR <br />
        <span className="font-bold font-white">A Level </span>
        <br />
        At AS: Pure Math 1 , Statistics 1 (S1) OR Mechanics 1 (M1)
        <br />
        At A2: Pure Math 3, Mechanics 1 OR Statistics 1 OR Statistics 2 (S2){" "}
        <br />
        <br />
        Note that you cannot take M1 and then continue with S2 or the A level.
        The only combinations are M1 followed by S1, S1 followed by M1, or S1
        followed by S2.
        <br />
        <br />
        There are syllabuses that do not have optional components. For example,
        a science like Physics or Biology has a total of five components across
        the a A level which are all mandatory: At AS level: Paper 1 Multiple
        Choice, Paper 2 AS Level Structured Questions and Paper 3 Advanced
        Practical Skills If you choose not to continue with the A level after
        having done AS, you are not needed to take the following two components.
        At A2 Level: Paper 4 A Level Structured Questions and Paper 5 Planning,
        Analysis and Evaluation. For subjects such as this you cannot change the
        order of components; for example you cannot replace Paper 3 at AS for
        Paper 5.
      </>
    ),
  },
  {
    question: "Are some variants harder/easier?",
    category: "Exam Information",
    answer: (
      <>
        There is no variant that is always harder/easier than other variants.
        Although variants in the same series may have differing difficulty and
        the grade boundaries will adjust accordingly.
      </>
    ),
  },
  {
    question: "What's a paper and what's a component?",
    category: "Exam Information",
    answer: (
      <>
        In each subject, there are a set of papers, varying in amount, that you
        need to sit. A component usually refers to the papers that may have
        different titles/names. For example, in 0580 Maths, there are 2
        components that you must give, either Paper 2 and Paper 4 (Extended) or
        Paper 1 and Paper 3 (Core).
      </>
    ),
  },
  {
    question:
      "What are weightage factors and how do they determine a syllabus mark?",
    category: "Exam Information",
    answer: (
      <>
        The weightage factors are used to calculate the final marks of a
        compontent by assigning a lighter or heavier importance to each
        component based on its contribution to the overall grade. For example,
        if the raw marks for a component were 40 and the final weighted mark
        were 60 then the weightage factor is 1.5x. This allows papers to be
        added up to different totals that are easier to work with.
        <br />
        <br />
        For example, IGCSE Physics 0625 has the following papers:
        <br />
        Paper 1/2 (40 Marks), Weighing Factor: 1.5
        <br />
        Paper 3/4: (80 Marks), Weighing Factor: 1.25
        <br />
        Paper 5/6 (40 Marks), Weighing Factor: 1.0
        <br />
        <br />
        This allows the total to be added up as{" "}
        <span className="text-white">
          {" "}
          (40*1.5) + (80*1.25) + (40*1.0) = 200
        </span>
        , which is much easier than 160.
      </>
    ),
  },
  {
    question: "How do I join a study session or catch up on missed ones?",
    category: "Community",
    answer: (
      <>
        Study sessions are hosted on our Discord Server by subject helpers in
        our community stage channel. You can catch up on sessions that were
        recorded on our{" "}
        <TextLink href={socials.youtube}>YouTube Channel</TextLink>.
      </>
    ),
  },
  {
    question: "Can I advertise tutoring, revision services or other resources?",
    category: "Community",
    answer: (
      <>
        You cannot advertise tutoring or revision services without moderator
        approval. Reach out to staff on the{" "}
        <TextLink href={socials.discord}>Discord Server</TextLink> to request
        approval. You are allowed to share other resources with students in the
        server channels.
      </>
    ),
  },
  {
    question: "Can I redistribute or share downloaded resources?",
    category: "Resources",
    answer: (
      <>
        Our resources are protected under the{" "}
        <TextLink href="https://creativecommons.org/licenses/by-nc/4.0/">
          Creative Commons Attribution-NonCommercial licence (CC BY-NC 4.0)
        </TextLink>
        . You may share and redistribute them with attribution to r/IGCSE and
        the original creator. Commercial use is not permitted.
      </>
    ),
  },
];
