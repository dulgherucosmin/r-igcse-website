type FooterLink = {
  name: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Resources",
    links: [
      { name: "Browse resources", href: "/resources" },
      { name: "Contribute a resource", href: "/opportunities" },
      { name: "Exam Sessions information", href: "/sessions" },
      { name: "Report a mistake", href: "mailto:igcseresources.1@gmail.com" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "About", href: "/about" },
      { name: "Opportunities", href: "/opportunities" },
      { name: "Partners", href: "/partners" },
      { name: "Official Bot", href: "/official-bot" },
    ],
  },
];

export const socials = {
  discord: "https://discord.gg/igcse",
  reddit: "https://www.reddit.com/r/IGCSE/",
  instagram: "https://www.instagram.com/r_igcse.official/",
  youtube: "https://www.youtube.com/@rIGCSEResources",
  email: "mailto:igcseresources.1@gmail.com",
};
