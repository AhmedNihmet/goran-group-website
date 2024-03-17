export const NAVIGATION_LINKS = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/companies",
    title: "Companies",
    sub_children_key: "/company",
  },
  {
    to: "/contact-us",
    title: "Contact",
  },
  {
    to: "/about-us",
    title: "About Us",
    isSubLink: false,
  },
];

export const MOBILE_NAVIGATION_LINKS = [
  ...NAVIGATION_LINKS,
  {
    isSubLink: true,
    subLinkHash: "#vision",
    to: "/about-us#vision",
    title: "Vision",
  },
  {
    isSubLink: true,
    subLinkHash: "#mission",
    to: "/about-us#mission",
    title: "Mission",
  },
];

export const LANGUAGES = [
  {
    abbreviation: "ku",
    title: "Kurdish",
    image_src: "/images/flags/ku.png",
    image_alt: "Kurdish language picker icon",
  },
  {
    abbreviation: "en",
    title: "English",
    image_src: "/images/flags/en.png",
    image_alt: "English language picker icon",
  },
  {
    abbreviation: "ar",
    title: "Arabic",
    image_src: "/images/flags/ar.png",
    image_alt: "Arabic language picker icon",
  },
];
