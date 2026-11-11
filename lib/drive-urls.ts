export const LEVEL_NAMES: Record<string, string> = {
  IGCSE: "IGCSE",
  AS: "AS Level",
  AL: "A Level",
  IAS: "IAS",
  IAL: "IAL",
};

export const driveThumbnail = (id: string, width = 600) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

export const driveView = (id: string) =>
  `https://drive.google.com/file/d/${id}/view`;
