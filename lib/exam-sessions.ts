import type { Board, Session, SessionResult } from "@/data/events";

export type BoardState = {
  ongoing: Session[];
  awaiting: Session[];
  next: Session | undefined;
};

export type NearestEvent =
  | {
      type: "ongoing";
      board: Board;
      session: Session;
      target: number;
    }
  | {
      type: "results";
      board: Board;
      session: Session;
      result: SessionResult & { at: string };
      target: number;
    }
  | {
      type: "session";
      board: Board;
      session: Session;
      target: number;
    };

const timestamp = (date: string) => new Date(date).getTime();

export const isoDay = (date: string) => new Date(date).toISOString().slice(0, 10);

export function deriveBoard(board: Board, now: number): BoardState {
  const ongoing = board.sessions.filter(
    (session) =>
      timestamp(session.start) <= now && now <= timestamp(session.end),
  );
  const awaiting = board.sessions.filter(
    (session) =>
      timestamp(session.end) < now &&
      session.results.some(
        (result) => result.at && timestamp(result.at) > now,
      ),
  );
  const next = board.sessions.find((session) => timestamp(session.start) > now);
  return { ongoing, awaiting, next };
}

export function pickNearestEvent(
  boards: Board[],
  now: number,
): NearestEvent | null {
  const ongoing: NearestEvent[] = [];
  const upcoming: NearestEvent[] = [];

  for (const board of boards) {
    const state = deriveBoard(board, now);

    for (const session of state.ongoing) {
      ongoing.push({
        type: "ongoing",
        board,
        session,
        target: timestamp(session.end),
      });
    }

    for (const session of state.awaiting) {
      for (const result of session.results) {
        const at = result.at;
        if (!at) continue;
        const target = timestamp(at);
        if (target <= now) continue;
        upcoming.push({
          type: "results",
          board,
          session,
          result: { ...result, at },
          target,
        });
      }
    }

    if (state.next) {
      upcoming.push({
        type: "session",
        board,
        session: state.next,
        target: timestamp(state.next.start),
      });
    }
  }

  if (ongoing.length > 0) {
    return ongoing.sort((left, right) => left.target - right.target)[0];
  }

  return (
    upcoming.sort((left, right) => left.target - right.target)[0] ?? null
  );
}
