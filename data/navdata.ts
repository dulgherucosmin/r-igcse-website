export type NavItem = {
  id: number;
  name: string;
  href: string;
  external?: boolean;
};

export const navItems: NavItem[] = [
  {
    id: 2,
    name: "Resources",
    href: "/resources",
  },
  {
    id: 3,
    name: "About",
    href: "/about",
  },
  {
    id: 4,
    name: "Opportunities",
    href: "/opportunities",
  },
  {
    id: 5,
    name: "Sessions",
    href: "/sessions",
  },
  {
    id: 6,
    name: "Official Bot",
    href: "/official-bot",
  },
  {
    id: 7,
    name: "Partners",
    href: "/partners",
  },
];
