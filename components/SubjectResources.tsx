import { ArrowLeftIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Fragment } from "react";
import { ResourceThumbnail } from "@/components/resource-thumbnail";
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

export default function SubjectResources({
  subject,
  resources,
}: {
  subject: DriveSubject;
  resources: DriveResource[];
}) {
  const metadata = SUBJECT_META[subject.name];
  const links = [...(metadata?.links ?? []), ...GLOBAL_LINKS];
  const groups = groupByLevel(resources);

  return (
    <main className={pageClassName}>
      <BackgroundArt />
      <SubjectBackLink />

      <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div
          className={cn(
            "grid size-20 shrink-0 place-items-center rounded-2xl",
            SUBJECT_COLOR_CLASSES[subjectColorOf(subject.name)],
          )}
        >
          <CategoryIcon category={subject.category} size={40} />
        </div>
        <div className="min-w-0">
          <h1 className="text-4xl leading-tight font-black tracking-tight md:text-5xl">
            {subjectTitle(subject)}
          </h1>
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
      </header>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">
          Every resource is written by volunteer students who sat the exam.
        </p>
        <div className="flex flex-wrap gap-2">
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
      </div>

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
              <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {group.resources.map((resource) => (
                  <li key={resource.id}>
                    <Link
                      href={`/resources/${subject.id}/${resource.id}`}
                      scroll={false}
                      className="group block rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <div className="aspect-[1024/1448] overflow-hidden rounded-lg bg-card shadow-lg shadow-black/40 ring-1 ring-border transition-transform duration-300 group-hover:-translate-y-1 group-hover:ring-primary/60">
                        <ResourceThumbnail
                          id={resource.id}
                          subjectName={subject.name}
                          category={subject.category}
                          className="size-full"
                        />
                      </div>
                      <p className="mt-3 line-clamp-2 font-semibold leading-snug group-hover:text-brand">
                        {resource.resourceName}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {resource.author || "Author not listed"}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
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
    </main>
  );
}
