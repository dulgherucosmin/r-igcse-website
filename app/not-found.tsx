import type { Metadata } from "next";
import NotFoundView from "@/components/not-found-view";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <NotFoundView
      title="This page took a wrong turn"
      description="We couldn't find the page you were looking for. It may have moved, or the link might be mistyped."
    />
  );
}
