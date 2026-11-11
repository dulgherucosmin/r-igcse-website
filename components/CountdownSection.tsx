import { cacheLife } from "next/cache";
import Countdown from "@/components/Countdown";
import { examSessions } from "@/data/events";
import { pickSessions } from "@/lib/exam-sessions";

export default async function CountdownSection() {
  "use cache";
  cacheLife("hours");
  return (
    <Countdown
      sessions={examSessions}
      initial={pickSessions(examSessions, Date.now())}
    />
  );
}
