export interface SiteConfig {
  name: string;
  tagline: string;
  organiser: string;
  domain: string;
  email: string;
  phones: string[];
  socials: {
    instagram: string;
    whatsapp: string;
    youtube: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "CrossLife",
  tagline: "One Life. One Desire. One Purpose.",
  organiser: "Equip Indian Churches",
  domain: import.meta.env.VITE_SITE_URL || "https://crosslife.in",
  email: "contact@crosslife.in",
  phones: [
    "+919886769948",
    "+919936844317"
  ],
  socials: {
    instagram: "https://www.instagram.com/crosslife.in/",
    whatsapp: "https://whatsapp.com/channel/0029VakdM3o8fewqOG56qx35",
    youtube: "https://www.youtube.com/@CrossLife25"
  },
  seo: {
    title: "CrossLife | A Conference for Young People — Equip Indian Churches",
    description: "CrossLife is a young people's conference organised by Equip Indian Churches to inspire and equip young people to live for Christ, glorify Christ, and proclaim His Gospel.",
    ogImage: "/images/crosslife-logo.webp"
  }
};

export interface RegistrationConfig {
  registrationUrl: string; // If set, buttons redirect here; if empty, open modal
  isOpen: boolean;
}

export const registrationConfig: RegistrationConfig = {
  registrationUrl: import.meta.env.VITE_REGISTRATION_URL || "",
  isOpen: true
};

export interface ContactConfig {
  email: string;
  phones: string[];
  venue: string;
  formEndpoint: string;
}

export const contactConfig: ContactConfig = {
  email: siteConfig.email,
  phones: siteConfig.phones,
  venue: "Ashirwad Global Learning Centre, Hyderabad, Telangana",
  formEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || ""
};
