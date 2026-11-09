let landingPath: string | null = null;
let navigatedWithinSite = false;

export function trackPath(path: string) {
  if (typeof window === "undefined") return;
  if (landingPath === null) landingPath = path;
  else if (path !== landingPath) navigatedWithinSite = true;
}

export const isDirectLanding = () => !navigatedWithinSite;
