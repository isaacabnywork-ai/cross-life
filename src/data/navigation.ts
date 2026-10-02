export interface MegaMenuColumn {
  title: string;
  items: {
    label: string;
    href: string;
    description?: string;
    badge?: string;
  }[];
}

export interface NavItem {
  label: string;
  href?: string;
  megaMenu?: {
    columns: MegaMenuColumn[];
    highlight?: {
      title: string;
      description: string;
      ctaText: string;
      ctaHref: string;
      image?: string;
    };
  };
}

export const navigationData: NavItem[] = [
  {
    label: "About",
    megaMenu: {
      columns: [
        {
          title: "The Vision",
          items: [
            { label: "About CrossLife", href: "/about#about", description: "Our foundational vision for youth discipleship" },
            { label: "Why CrossLife", href: "/about#why", description: "Navigating today's distractions with Gospel clarity" },
            { label: "Who Is It For?", href: "/about#who", description: "Men and women aged 18–25 seeking depth" }
          ]
        },
        {
          title: "Distinctives",
          items: [
            { label: "What's Unique", href: "/about#unique", description: "Substance over style, Truth over trend" },
            { label: "Hopes & Goals", href: "/about#goals", description: "5 clear intentional outcomes for attendees" },
            { label: "One Life • Desire • Purpose", href: "/about#pillars", description: "The heartbeat of the CrossLife movement" }
          ]
        },
        {
          title: "Leadership & Doctrine",
          items: [
            { label: "Equip Indian Churches", href: "/about#organiser", description: "Pastoral fellowship organising CrossLife" },
            { label: "Statement of Faith", href: "/statement-of-faith", description: "11 historic, orthodox theological convictions", badge: "Theology" },
            { label: "Ministry Partners", href: "/partners", description: "Collaborating for biblical church growth" }
          ]
        }
      ],
      highlight: {
        title: "Substance Over Style",
        description: "Not entertainment or hype, but serious, joyful engagement with the sufficient Word of God.",
        ctaText: "Read Distinctives",
        ctaHref: "/about#unique"
      }
    }
  },
  {
    label: "Conference",
    megaMenu: {
      columns: [
        {
          title: "Event Details",
          items: [
            { label: "Event Overview", href: "/conference#overview", description: "14–16 September 2027 in Hyderabad" },
            { label: "Dates & Schedule", href: "/conference#schedule", description: "Tuesday morning to Thursday afternoon" },
            { label: "Ashirwad Venue", href: "/conference#venue", description: "Learning centre campus and accommodations" },
            { label: "Registration & Rates", href: "/conference#pricing", description: "Early bird ₹2,000 / Regular ₹3,000" }
          ]
        },
        {
          title: "Program & Community",
          items: [
            { label: "Speakers", href: "/speakers", description: "Pastors and expositors from across India" },
            { label: "Preaching & Word", href: "/conference#sessions", description: "Systematic, verse-by-verse exposition" },
            { label: "Reverent Worship", href: "/conference#worship", description: "Theologically rich singing and adoration" },
            { label: "Fellowship & Dorms", href: "/conference#fellowship", description: "Shared meals and lasting brotherhood" }
          ]
        },
        {
          title: "Resources & Gifting",
          items: [
            { label: "Claim Free Book", href: "/conference#free-book", description: "“Don't Waste Your Life” by John Piper", badge: "Free Gift" },
            { label: "Dedicated Bookstore", href: "/conference#bookstore", description: "Gospel literature curated by For The Truth" },
            { label: "Register Attendee", href: "#register", description: "Secure your place with early bird rate" }
          ]
        }
      ],
      highlight: {
        title: "CrossLife 2027",
        description: "Early bird registration is now open with code AIPC2026 for a ₹500 discount.",
        ctaText: "View Conference Details",
        ctaHref: "/conference"
      }
    }
  },
  {
    label: "Speakers",
    href: "/speakers"
  },
  {
    label: "Partners",
    href: "/partners"
  },
  {
    label: "FAQ",
    href: "/faq"
  },
  {
    label: "Contact",
    href: "/contact"
  }
];
