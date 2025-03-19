export const techTags = [
  "frontend",
  "backend",
  "mobile",
  "devops",
  "3rdparty",
] as const;
export type TechTag = (typeof techTags)[number];

export const content = {
  htmlMeta: {
    baseUrl: "https://tally.kraenz.eu",
    title: "MiMo's Tally",
    description: "",
    keywords: "",
  },
  // for emails, see sendEmail.ts
  heading: "MiMo Tally",
  logo: {
    alt: "Logo of Kraenz Software Development",
    src: "/Kraenz-Software-Development-trimmed.png",
  },
  nav: {
    home: { label: "Home", href: "/" },
    colorMode: {
      ariaLabel: "Toggle color mode",
    },
  },
  signIn: {
    label: "Sign In",
    href: "/sign-in",
    openApp: { label: "Open App", href: "/in" },
  },
  footer: {
    copyright: "Copyright © Mirco Kraenz 2025",
  },
  notFound: {
    backToHomeButton: "Back to Home",
    title: "404 Page Not Found",
  },
  meta: {
    homeCanonicalTag: "https://tally.kraenz.com/",
    keywords: "",
    description: "",
  },
};
