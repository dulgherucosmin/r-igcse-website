"use client";

import Image from "next/image";
import { useState } from "react";
import {
  type Category,
  CategoryIcon,
  SUBJECT_COLOR_CLASSES,
  subjectColorOf,
} from "@/lib/categories";
import { driveThumbnail } from "@/lib/drive-urls";
import { cn } from "@/lib/utils";

export function ResourceThumbnail({
  id,
  subjectName,
  category,
  className,
}: {
  id: string;
  subjectName: string;
  category: Category;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "grid place-items-center",
          SUBJECT_COLOR_CLASSES[subjectColorOf(subjectName)],
          className,
        )}
      >
        <CategoryIcon category={category} size={40} />
      </div>
    );
  }

  return (
    <Image
      src={driveThumbnail(id)}
      alt=""
      width={600}
      height={848}
      sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
      onError={() => setFailed(true)}
      className={cn("object-cover object-top", className)}
    />
  );
}
