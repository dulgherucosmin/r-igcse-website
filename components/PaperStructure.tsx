import { buttonVariants } from "@/components/ui/button";
import type {
  PaperAssessment,
  SubjectAssessment,
  SyllabusLink,
} from "@/lib/subject-assessments";
import { cn } from "@/lib/utils";

function durationLabel(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes} minutes`;
  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return `${hours} ${hours === 1 ? "hour" : "hours"} ${remainingMinutes} minutes`;
}

function PaperDetails({ paper }: { paper: PaperAssessment }) {
  return (
    <article className="rounded-xl border border-border/70 bg-background/30 p-4">
      <h4 className="font-bold">{paper.name}</h4>
      {paper.description && (
        <p className="mt-1.5 text-sm text-foreground">{paper.description}</p>
      )}
      {paper.durationMinutes !== undefined && (
        <p className="mt-1.5 text-sm text-muted-foreground">
          Duration: {durationLabel(paper.durationMinutes)}
        </p>
      )}
      {paper.marks !== undefined && paper.weightPercentage !== undefined && (
        <p className="mt-1.5 text-sm text-muted-foreground">
          {paper.marks} Marks | {paper.weightPercentage}% Weightage
        </p>
      )}
    </article>
  );
}

function SyllabusLinks({
  syllabus,
}: {
  syllabus: SubjectAssessment["syllabus"];
}) {
  const links = [syllabus.current, syllabus.new].filter(
    (link): link is SyllabusLink => Boolean(link),
  );

  if (links.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ size: "lg" }), "gap-2")}
        >
          Syllabus Information
        </a>
      ))}
    </div>
  );
}

export default function PaperStructure({
  assessment,
  id = "papers-info",
}: {
  assessment: SubjectAssessment;
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby="paper-structure-heading"
      tabIndex={-1}
      className="my-10 scroll-mt-[calc(var(--site-header-height)+1.5rem)] rounded-xl outline-none"
    >
      <h2
        id="paper-structure-heading"
        className="mb-4 text-xl font-bold tracking-tight"
      >
        Exam Papers Information & Weightage
      </h2>

      <SyllabusLinks syllabus={assessment.syllabus} />

      {assessment.routes?.map((route) => (
        <section
          key={route.name}
          id={`${assessment.track}-${route.name}`.toLowerCase()}
          className="mt-6 scroll-mt-[calc(var(--site-header-height)+1.5rem)]"
          aria-labelledby={`${assessment.track}-${route.name}-heading`.toLowerCase()}
        >
          <h3
            id={`${assessment.track}-${route.name}-heading`.toLowerCase()}
            className="mb-1 text-lg font-bold text-primary"
          >
            {route.name} Route
          </h3>
          {route.description && (
            <p className="mb-4 max-w-3xl leading-relaxed text-muted-foreground">
              {route.description}
            </p>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            {route.papers.map((paper) => (
              <PaperDetails
                key={`${paper.code}-${paper.name}-${paper.assessmentType}`}
                paper={paper}
              />
            ))}
          </div>
        </section>
      ))}

      {assessment.units && (
        <div className="grid gap-3 md:grid-cols-2">
          {assessment.units.map((unit) => (
            <PaperDetails
              key={`${unit.code}-${unit.name}-${unit.assessmentType}`}
              paper={unit}
            />
          ))}
        </div>
      )}
    </section>
  );
}
