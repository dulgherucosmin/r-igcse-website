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
    id: 8,
    name: "Team",
    href: "/team",
  },
];
