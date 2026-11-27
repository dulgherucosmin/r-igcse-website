import Countdowns from "@/components/Countdowns";
import { JsonLd } from "@/components/json-ld";
import { examBoards } from "@/data/events";
import { pageMetadata } from "@/lib/metadata";
import { sessionsJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata("/sessions");

export default function SessionsPage() {
  return (
    <main className="page-container pt-12 pb-4 md:pt-20">
      <JsonLd data={sessionsJsonLd(examBoards)} />
      <header className="max-w-3xl">
        <h1 className="text-4xl leading-tight font-black tracking-tight underline decoration-primary decoration-3 underline-offset-10 md:text-6xl">
          Exam Sessions
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Exam sessions and results days for CAIE and Edexcel, all in one place.
          When a session is underway we&rsquo;ll say so, and once it&rsquo;s
          over the countdown switches to results day. We will update this page regularly with
          confirmed dates every session.
        </p>
      </header>

      <div className="mt-14">
        <Countdowns boards={examBoards} />
      </div>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Dates come from the published key dates of Cambridge and Pearson and can
        change. Your exam timetable and results time depend on your country and
        centre, so always check with your school or exam centre.
      </p>
    </main>
  );
}