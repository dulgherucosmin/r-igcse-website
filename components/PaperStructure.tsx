import { TextLink } from "@/components/text-link";
import type {
  PaperAssessment,
  SubjectAssessment,
  SyllabusLink,
} from "@/lib/subject-assessments";

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
      {paper.durationMinutes !== undefined && (
        <p className="mt-1.5 text-sm">{durationLabel(paper.durationMinutes)}</p>
      )}
      {paper.marks !== undefined && (
        <p className="text-sm">
          {paper.marks} marks
          {paper.weightPercentage !== undefined && (
            <span className="float-right font-medium text-muted-foreground">
              {paper.weightPercentage}%
            </span>
          )}
        </p>
      )}
      {paper.description && (
        <p className="mt-1.5 text-sm text-muted-foreground">
          {paper.description}
        </p>
      )}
      <p className="mt-1.5 text-sm text-muted-foreground">
        {paper.assessmentType === "practical"
          ? "Practical assessment"
          : paper.assessmentType === "coursework"
            ? "Coursework"
            : paper.assessmentType === "oral"
              ? "Oral assessment"
              : "Written assessment"}
        {paper.externallyAssessed ? " · Externally assessed" : ""}
      </p>
    </article>
  );
}

function SyllabusLinks({
  syllabus,
}: {
  syllabus: SubjectAssessment["syllabus"];
}) {
  const links = [
    syllabus.current && { ...syllabus.current, kind: "Current syllabus" },
    syllabus.new && { ...syllabus.new, kind: "New syllabus" },
  ].filter(
    (
      link,
    ): link is SyllabusLink & {
      kind: "Current syllabus" | "New syllabus";
    } => Boolean(link),
  );

  if (links.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {links.map((link) => (
        <TextLink key={`${link.kind}-${link.url}`} href={link.url}>
          {link.kind}: {link.label}
          {link.effectiveFrom ? ` (${link.effectiveFrom})` : ""}
        </TextLink>
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
      className="my-10 scroll-mt-[calc(var(--site-header-height)+1.5rem)]"
    >
      <h2
        id="paper-structure-heading"
        className="mb-4 text-xl font-bold tracking-tight"
      >
        Paper structure and grade weightage
      </h2>

      <SyllabusLinks syllabus={assessment.syllabus} />

      {assessment.routes && assessment.routes.length > 1 && (
        <nav
          aria-label={`${assessment.track} paper routes`}
          className="mb-6 flex flex-wrap gap-2"
        >
          {assessment.routes.map((route) => (
            <a
              key={route.name}
              href={`#${assessment.track}-${route.name}`.toLowerCase()}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-semibold no-underline hover:border-primary"
            >
              {route.name}
            </a>
          ))}
        </nav>
      )}

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
            {route.name} assessment
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
