export interface Speaker {
  id: string;
  name: string;
  role: string;
  ministry: string;
  bio: string;
  photo?: string;
  socialLinks?: {
    twitter?: string;
    website?: string;
  };
}

export interface SpeakerSectionConfig {
  title: string;
  subtitle: string;
  description: string;
  announcementText: string;
  speakers: Speaker[];
}

// In adherence to strict guidelines: NO fake speakers or invented names.
// Real speakers will be populated as announced by Equip Indian Churches.
export const speakerData: SpeakerSectionConfig = {
  title: "Speakers",
  subtitle: "Pastors from Across India",
  description: "CrossLife brings together seasoned pastors, church planters, and biblical expositors from evangelical and reformed traditions across India to preach God's sufficient Word.",
  announcementText: "The full speaker and session lineup for CrossLife 2027 will be announced soon. Attendees can look forward to faithful, expository preaching and pastoral breakout sessions.",
  speakers: [] // Kept strictly empty until officially confirmed
};
