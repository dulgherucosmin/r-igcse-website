export interface Link {
  label: string;
  url: string;
}

export interface SubjectMeta {
  code?: string;
  links?: Link[];
}

/** Subject codes and optional links, keyed by the exact Drive folder name. */
export const SUBJECT_META: Record<string, SubjectMeta> = {
  "Computer Science": {
    code: "0478",
    links: [
      { label: "Liam McQuay (YouTube)", url: "https://www.youtube.com/" },
      {
        label: "Python online compiler",
        url: "https://www.online-python.com/",
      },
    ],
  },
  Physics: { code: "0625" },
  Chemistry: { code: "0620" },
  Biology: { code: "0610" },
  Maths: { code: "0580" },
  "Additional Mathematics": { code: "0606" },
  "Physics (A Level)": { code: "9702" },
  "Chemistry (A Level)": { code: "9701" },
  "Biology (A Level)": { code: "9700" },
  "Maths (A Level)": { code: "9709" },
};

export const GLOBAL_LINKS: Link[] = [
  {
    label: "Cambridge International past papers",
    url: "https://www.cambridgeinternational.org/",
  },
];
