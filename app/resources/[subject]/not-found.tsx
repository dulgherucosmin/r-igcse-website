import NotFoundView from "@/components/not-found-view";

export default function SubjectNotFound() {
  return (
    <NotFoundView
      title="Subject not found"
      description="We don't have resources for that subject yet. Browse the full list or check back soon."
      backHref="/resources"
      backLabel="All subjects"
    />
  );
}
