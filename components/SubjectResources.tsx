import { ArrowLeftIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ResourceGrid } from "@/components/resource-grid";
import {
  BackgroundArt,
  EmptyState,
  pageClassName,
} from "@/components/resources-shared";
import { TextLink } from "@/components/text-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CategoryIcon,
  SUBJECT_COLOR_CLASSES,
  subjectColorOf,
} from "@/lib/categories";
import type { DriveResource, DriveSubject, SubjectLevel } from "@/lib/drive";
import { LEVEL_NAMES } from "@/lib/drive-urls";
import { GLOBAL_LINKS, SUBJECT_META } from "@/lib/subject-meta";
import { cn } from "@/lib/utils";

const LEVEL_ORDER: SubjectLevel[] = ["IGCSE", "AS", "IAS", "AL", "IAL"];

function groupByLevel(resources: DriveResource[]) {
  return LEVEL_ORDER.map((level) => ({
    level,
    resources: resources.filter((resource) => resource.level === level),
  })).filter((group) => group.resources.length > 0);
}

export const subjectTitle = (subject: DriveSubject) =>
  `${subject.levels.map((level) => LEVEL_NAMES[level] ?? level).join(" / ")} ${subject.name}`;

export function SubjectBackLink() {
  return (
    <Link
      href="/resources"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "mb-8 -ml-2.5 text-muted-foreground",
      )}
    >
      <ArrowLeftIcon />
      All subjects
    </Link>
  );
}

export function SubjectDetails({
  subject,
  resources,
  title,
}: {
  subject: DriveSubject;
  resources: DriveResource[];
  title: ReactNode;
}) {
  const metadata = SUBJECT_META[subject.name];
  const links = [...(metadata?.links ?? []), ...GLOBAL_LINKS];
  const groups = groupByLevel(resources);

  return (
    <>
      <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-center">
          <div
            className={cn(
              "grid size-20 shrink-0 place-items-center rounded-2xl",
              SUBJECT_COLOR_CLASSES[subjectColorOf(subject.name)],
            )}
          >
            <CategoryIcon category={subject.category} size={40} />
          </div>
          <div className="min-w-0">
            {title}
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary">
                {metadata?.code ?? subject.codes.join(" / ")}
              </Badge>
              <Badge variant="secondary">{subject.board}</Badge>
              <Badge variant="outline">
                {resources.length}{" "}
                {resources.length === 1 ? "resource" : "resources"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 lg:mt-3.5">
          <Link href="/opportunities" className={buttonVariants()}>
            Contribute a resource
          </Link>
          <a
            href="mailto:igcseresources.1@gmail.com"
            className={buttonVariants({ variant: "outline" })}
          >
            <EnvelopeSimpleIcon />
            Report a mistake
          </a>
        </div>
      </header>

      <p className="mt-8 text-muted-foreground">
        Every resource is written by volunteer students who sat the exam.
      </p>

      <Separator className="my-10" />

      {groups.length === 0 ? (
        <EmptyState title="No resources for this subject yet." />
      ) : (
        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.level} aria-labelledby={`level-${group.level}`}>
              <h2
                id={`level-${group.level}`}
                className="mb-5 text-xl font-bold tracking-tight"
              >
                {LEVEL_NAMES[group.level] ?? group.level}
              </h2>
              <ResourceGrid subject={subject} resources={group.resources} />
            </section>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <>
          <Separator className="my-10" />
          <section aria-labelledby="study-tools">
            <h2
              id="study-tools"
              className="mb-3 text-xl font-bold tracking-tight"
            >
              Study tools
            </h2>
            <p className="max-w-3xl leading-relaxed text-muted-foreground">
              Explore these study tools and websites:{" "}
              {links.map((link, index) => (
                <Fragment key={`${link.url}${link.label}`}>
                  {index > 0 && (index === links.length - 1 ? ", and " : ", ")}
                  <TextLink href={link.url}>{link.label}</TextLink>
                </Fragment>
              ))}
              .
            </p>
          </section>
        </>
      )}
    </>
  );
}

export const subjectTitleClassName =
  "text-4xl leading-tight font-black tracking-tight md:text-5xl";

export default function SubjectResources({
  subject,
  resources,
}: {
  subject: DriveSubject;
  resources: DriveResource[];
}) {
  return (
    <main className={pageClassName}>
      <BackgroundArt />
      <SubjectBackLink />
      <SubjectDetails
        subject={subject}
        resources={resources}
        title={
          <h1 className={subjectTitleClassName}>{subjectTitle(subject)}</h1>
        }
      />
    </main>
  );
}
