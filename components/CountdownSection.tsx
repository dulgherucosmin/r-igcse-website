import { cacheLife } from "next/cache";
import Countdown from "@/components/Countdown";
import { examBoards } from "@/data/events";
import { pickNearestEvent } from "@/lib/exam-sessions";

export default async function CountdownSection() {
  "use cache";
  cacheLife("hours");
  return (
    <Countdown
      boards={examBoards}
      initial={pickNearestEvent(examBoards, Date.now())}
    />
  );
}
