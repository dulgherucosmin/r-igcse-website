import { BackgroundArt, pageClassName } from "@/components/resources-shared";
import { SubjectBackLink } from "@/components/SubjectResources";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const COVER_SKELETONS = Array.from(
  { length: 5 },
  (_, index) => `cover-skeleton-${index}`,
);

export function SubjectSkeleton() {
  return (
    <main className={pageClassName}>
      <BackgroundArt />
      <SubjectBackLink />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Skeleton className="size-20 shrink-0 rounded-2xl" />
          <div className="grid gap-3">
            <Skeleton className="h-11 w-96 max-w-full md:h-15" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-4xl" />
              <Skeleton className="h-5 w-12 rounded-4xl" />
              <Skeleton className="h-5 w-24 rounded-4xl" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 lg:mt-3.5">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-36" />
        </div>
      </div>
      <Skeleton className="mt-8 h-6 w-80 max-w-full" />
      <Separator className="my-10" />
      <Skeleton className="mb-5 h-7 w-24" />
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {COVER_SKELETONS.map((key) => (
          <div key={key}>
            <Skeleton className="aspect-[1024/1448] rounded-lg" />
            <Skeleton className="mt-3 h-5 w-4/5" />
            <Skeleton className="mt-1.5 h-4 w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}
