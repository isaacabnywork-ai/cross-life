export interface Partner {
  id: string;
  name: string;
  role: 'Organiser' | 'Partner' | 'Bookstore Sponsor';
  logo?: string;
  website?: string;
  description: string;
}

export const partnerData: Partner[] = [
  {
    id: "eic",
    name: "Equip Indian Churches",
    role: "Organiser",
    website: "https://equipindianchurches.com",
    description: "A collaborative fellowship of pastors working together to provide direction and momentum to the biblical growth of churches across India in the reformed evangelical tradition."
  },
  {
    id: "ftt",
    name: "For The Truth",
    role: "Bookstore Sponsor",
    logo: "/images/partner-ftt.png",
    website: "https://forthetruth.in",
    description: "An Indian Christian ministry dedicated to publishing, curating, and distributing sound, gospel-centered theological literature and biblical resources across the nation."
  },
  {
    id: "bible-project",
    name: "The Bible Project",
    role: "Partner",
    website: "https://bibleproject.com",
    description: "Helping people experience the Bible as a unified story that leads to Jesus through thoughtful visual exposition and accessible biblical theology."
  },
  {
    id: "svs",
    name: "SVS",
    role: "Partner",
    description: "Partnering in theological education and gospel resource distribution to strengthen church leadership throughout India."
  }
];

export const partnerOverview = {
  title: "Organiser & Partners",
  subtitle: "Partnering for Gospel Growth in India",
  description: "CrossLife is brought to you through faithful gospel partnerships between ministries committed to biblical orthodoxy, church health, and sound discipleship.",
  compositeGraphic: "/images/partners-org.webp"
};
