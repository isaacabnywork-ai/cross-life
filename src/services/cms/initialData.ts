import type {
  Page,
  PageSection,
  GlobalSettings,
  CMSNavItem,
  MediaItem,
  Speaker,
  Partner,
  FAQItem
} from '../../types/cms';

export const initialGlobalSettings: GlobalSettings = {
  siteName: "CrossLife",
  tagline: "ONE LIFE. ONE DESIRE. ONE PURPOSE.",
  organiserName: "Equip Indian Churches",
  organiserUrl: "https://equipindianchurches.com",
  domain: "https://crosslife.in",
  logoUrl: "/images/crosslife-logo.webp",
  email: "contact@crosslife.in",
  phones: ["+91 98867 69948", "+91 99368 44317"],
  venueName: "Ashirwad Global Learning Centre",
  venueAddress: "Ashirwad Global Learning Centre, Hyderabad, Telangana",
  announcementBar: {
    enabled: true,
    badgeText: "Early Bird",
    text: "Save ₹500 with code",
    promoCode: "AIPC2026",
    discountAmount: 500,
    datesNotice: "14 – 16 Sept 2027 • Hyderabad",
    targetHref: "/conference#pricing"
  },
  socials: {
    instagram: "https://www.instagram.com/crosslife.in/",
    whatsapp: "https://whatsapp.com/channel/0029VakdM3o8fewqOG56qx35",
    youtube: "https://www.youtube.com/@CrossLife25"
  },
  footer: {
    aboutText: "CrossLife is a young people’s conference organised by Equip Indian Churches to inspire and equip young people to live for Christ, glorify Christ, and proclaim His Gospel.",
    copyrightText: "© 2026 - All Rights Reserved Powered by ABNY Web",
    poweredByText: "ABNY Web",
    poweredByUrl: "http://abnyweb.in"
  },
  registration: {
    isOpen: true,
    directUrl: "",
    regularPrice: 3000,
    earlyBirdPrice: 2000,
    promoCode: "AIPC2026",
    discount: 500,
    dates: "14 – 16 Sept 2027"
  },
  seo: {
    defaultTitle: "CrossLife | A Conference for Young People — Equip Indian Churches",
    defaultDescription: "CrossLife is a young people's conference organised by Equip Indian Churches to inspire and equip young people to live for Christ, glorify Christ, and proclaim His Gospel.",
    defaultOgImage: "/images/crosslife-logo.webp"
  }
};

export const initialNavigation: CMSNavItem[] = [
  {
    id: "nav-about",
    label: "About",
    sortOrder: 1,
    isVisible: true,
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
    id: "nav-conference",
    label: "Conference",
    sortOrder: 2,
    isVisible: true,
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
    id: "nav-speakers",
    label: "Speakers",
    href: "/speakers",
    sortOrder: 3,
    isVisible: true
  },
  {
    id: "nav-partners",
    label: "Partners",
    href: "/partners",
    sortOrder: 4,
    isVisible: true
  },
  {
    id: "nav-faq",
    label: "FAQ",
    href: "/faq",
    sortOrder: 5,
    isVisible: true
  },
  {
    id: "nav-contact",
    label: "Contact",
    href: "/contact",
    sortOrder: 6,
    isVisible: true
  }
];

export const initialPages: Page[] = [
  {
    id: "page-home",
    slug: "/",
    title: "Home",
    status: "published",
    seo: {
      title: "CrossLife | A Conference for Young People — Equip Indian Churches",
      description: "CrossLife is a young people's conference organised by Equip Indian Churches to inspire and equip young people to live for Christ, glorify Christ, and proclaim His Gospel.",
      ogImage: "/images/crosslife-logo.webp"
    },
    sectionIds: [
      "sec-home-hero",
      "sec-home-pillars",
      "sec-home-who",
      "sec-home-unique",
      "sec-home-venue",
      "sec-home-book",
      "sec-home-faq",
      "sec-home-partners"
    ],
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z"
  },
  {
    id: "page-about",
    slug: "/about",
    title: "About CrossLife",
    status: "published",
    seo: {
      title: "About CrossLife | Mission, Vision & Biblical Foundations",
      description: "Learn about the mission, five hopes & goals, and biblical foundations behind CrossLife young people's conference.",
      ogImage: "/images/crosslife-logo.webp"
    },
    sectionIds: [
      "sec-about-intro",
      "sec-about-why",
      "sec-about-who",
      "sec-about-unique",
      "sec-about-goals",
      "sec-about-pillars",
      "sec-about-organiser"
    ],
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z"
  },
  {
    id: "page-conference",
    slug: "/conference",
    title: "Conference 2027",
    status: "published",
    seo: {
      title: "Conference 2027 | Dates, Venue, Schedule & Registration",
      description: "Everything you need to know about CrossLife 2027: September 14–16 at Ashirwad Global Learning Centre, Hyderabad.",
      ogImage: "/images/crosslife-logo.webp"
    },
    sectionIds: [
      "sec-conf-overview",
      "sec-conf-venue",
      "sec-conf-book",
      "sec-conf-cta"
    ],
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z"
  },
  {
    id: "page-speakers",
    slug: "/speakers",
    title: "Speakers",
    status: "published",
    seo: {
      title: "Speakers | CrossLife 2027",
      description: "Meet the pastors, teachers, and expositors speaking at CrossLife 2027.",
      ogImage: "/images/crosslife-logo.webp"
    },
    sectionIds: [],
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z"
  },
  {
    id: "page-partners",
    slug: "/partners",
    title: "Partners & Organisers",
    status: "published",
    seo: {
      title: "Partners & Organisers | CrossLife 2027",
      description: "CrossLife is brought to you by Equip Indian Churches and gospel-centered ministry partners across India.",
      ogImage: "/images/crosslife-logo.webp"
    },
    sectionIds: [],
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z"
  },
  {
    id: "page-faq",
    slug: "/faq",
    title: "Frequently Asked Questions",
    status: "published",
    seo: {
      title: "FAQ | CrossLife 2027",
      description: "Got questions about registration, accommodation, meals, or travel for CrossLife 2027? Find answers here.",
      ogImage: "/images/crosslife-logo.webp"
    },
    sectionIds: [],
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z"
  },
  {
    id: "page-contact",
    slug: "/contact",
    title: "Contact Us",
    status: "published",
    seo: {
      title: "Contact Us | CrossLife 2027",
      description: "Get in touch with the CrossLife organising team for assistance with registration, questions, or partnerships.",
      ogImage: "/images/crosslife-logo.webp"
    },
    sectionIds: [],
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z"
  },
  {
    id: "page-statement-of-faith",
    slug: "/statement-of-faith",
    title: "Statement of Faith",
    status: "published",
    seo: {
      title: "Statement of Faith | CrossLife Theological Convictions",
      description: "Read the 11 historic theological convictions that undergird Equip Indian Churches and CrossLife.",
      ogImage: "/images/crosslife-logo.webp"
    },
    sectionIds: [],
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-10-03T10:00:00.000Z"
  }
];

export const initialSections: Record<string, PageSection[]> = {
  "page-home": [
    {
      id: "sec-home-hero",
      pageId: "page-home",
      type: "hero",
      title: "Hero Section",
      sortOrder: 1,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        eyebrow: "A Conference for Young People",
        headline: "ONE LIFE. ONE DESIRE. ONE PURPOSE.",
        subheadline: "Equipping young people to live for Christ, glorify Christ, and proclaim His Gospel.",
        datesText: "14 – 16 Sept 2027",
        venueText: "Ashirwad Global Learning Centre, Hyderabad",
        primaryCtaText: "REGISTER NOW",
        primaryCtaAction: "modal",
        secondaryCtaText: "VIEW CONFERENCE",
        secondaryCtaHref: "/conference",
        quoteText: "Let no one despise you for your youth, but set the believers an example in speech, in conduct, in love, in faith, in purity.",
        quoteAuthor: "1 Timothy 4:12",
        bgImageUrl: "/images/venue-1.webp",
        earlyBirdNotice: "Early bird ₹2,000 with code AIPC2026",
        showCountdown: true,
        targetDate: "2027-09-14T11:00:00+05:30"
      }
    },
    {
      id: "sec-home-pillars",
      pageId: "page-home",
      type: "three_pillars",
      title: "The Three Pillars",
      sortOrder: 2,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "OUR FOUNDATIONAL CALLING",
        heading: "ONE LIFE. ONE DESIRE. ONE PURPOSE.",
        subtitle: "The heartbeat of CrossLife, challenging every young believer to wholehearted devotion.",
        pillars: [
          {
            id: "p1",
            number: "01",
            title: "ONE LIFE",
            subtitle: "LIVE FOR CHRIST",
            meaning: "To live for Christ.",
            scripture: "For to me to live is Christ, and to die is gain.",
            reference: "Philippians 1:21",
            description: "One brief earthly life redeemed by the grace of God, surrendered wholly to the lordship of Jesus Christ."
          },
          {
            id: "p2",
            number: "02",
            title: "ONE DESIRE",
            subtitle: "GLORIFY CHRIST",
            meaning: "To glorify Christ.",
            scripture: "Whatever you do, do all to the glory of God.",
            reference: "1 Corinthians 10:31",
            description: "A single, burning passion that exalts the beauty and worth of Christ above every worldly treasure and distraction."
          },
          {
            id: "p3",
            number: "03",
            title: "ONE PURPOSE",
            subtitle: "PROCLAIM CHRIST",
            meaning: "To proclaim Christ.",
            scripture: "Him we proclaim, warning everyone and teaching everyone with all wisdom.",
            reference: "Colossians 1:28",
            description: "An unwavering commitment to declare the Gospel of Jesus Christ to our generation, our cities, and the nations."
          }
        ]
      }
    },
    {
      id: "sec-home-who",
      pageId: "page-home",
      type: "who_is_it_for",
      title: "Who Is It For?",
      sortOrder: 3,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "WHO IS CROSSLIFE FOR?",
        heading: "Crafted for Men & Women Aged 18–25",
        subtitle: "Whether you are a university student, early career believer, or aspiring church servant, this gathering is for you.",
        cards: [
          {
            id: "w1",
            title: "Young Adults (18–25)",
            subtitle: "College Students & Young Professionals",
            description: "Navigating career choices, campus pressures, and adulthood with deep theological convictions.",
            tag: "Age 18–25"
          },
          {
            id: "w2",
            title: "Seeking Biblical Depth",
            subtitle: "Tired of Surface-Level Faith",
            description: "Longing to understand the Scriptures systematically, verse-by-verse, with intellectual and pastoral rigor.",
            tag: "Biblical Depth"
          },
          {
            id: "w3",
            title: "Rooted in the Local Church",
            subtitle: "Committed Church Members",
            description: "Believers eager to serve their local congregation faithfully under the mentorship of pastoral elders.",
            tag: "Church Centred"
          },
          {
            id: "w4",
            title: "Kingdom-Minded Disciple-Makers",
            subtitle: "Future Church Servants",
            description: "Equipped to proclaim the Gospel clearly in families, campuses, workplaces, and unreached communities.",
            tag: "Disciple Makers"
          }
        ]
      }
    },
    {
      id: "sec-home-unique",
      pageId: "page-home",
      type: "whats_unique",
      title: "What's Unique",
      sortOrder: 4,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "CONFERENCE DISTINCTIVES",
        heading: "Substance Over Style. Truth Over Trend.",
        subtitle: "In a world of noise, CrossLife stands apart as an anchor of biblical clarity and reverent worship.",
        showFullText: false,
        items: [
          {
            id: "u1",
            number: "01",
            title: "Expository Preaching",
            subheadline: "Faithful Verse-by-Verse Scripture",
            description: "Not motivational hype or emotionalism, but careful exposition of God's Word that convicts the heart and renews the mind.",
            highlightText: "Substance Over Style"
          },
          {
            id: "u2",
            number: "02",
            title: "Theologically Rich Singing",
            subheadline: "Reverent, Christ-Exalting Praise",
            description: "Singing that feeds the soul with sound doctrine, combining majestic historic hymns with contemporary biblical psalmody.",
            highlightText: "Truth Over Trend"
          },
          {
            id: "u3",
            number: "03",
            title: "Pastoral Mentorship",
            subheadline: "Seasoned Elders & Breakouts",
            description: "Direct interaction with faithful pastors from across India in breakout sessions and informal campus discussions.",
            highlightText: "Gospel Fellowship"
          },
          {
            id: "u4",
            number: "04",
            title: "Dormitory Fellowship",
            subheadline: "Living Together in Community",
            description: "3 days of communal dining, shared dorms, and late-night gospel conversations forging lifelong brotherhood.",
            highlightText: "Shared Life"
          }
        ]
      }
    },
    {
      id: "sec-home-venue",
      pageId: "page-home",
      type: "venue",
      title: "Venue & Campus",
      sortOrder: 5,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "CAMPUS & ACCOMMODATIONS",
        heading: "Ashirwad Global Learning Centre",
        subtitle: "A peaceful, enclosed campus in Hyderabad designed for quiet study, worship, and intentional community.",
        venueName: "Ashirwad Global Learning Centre",
        address: "Ashirwad Global Learning Centre",
        city: "Hyderabad",
        state: "Telangana",
        fullAddress: "Ashirwad Global Learning Centre, Hyderabad, Telangana",
        description: "Set away from city rush, Ashirwad provides air-conditioned auditorium facilities, dormitory accommodations, green lawns, and full dining services included in your registration.",
        features: [
          "Dormitory Accommodations Included",
          "All Meals & Tea Breaks Included (14th Lunch to 16th Lunch)",
          "Air-Conditioned Main Auditorium & Breakout Rooms",
          "Dedicated Christian Bookstore by For The Truth",
          "Lush Green Walking Grounds for Fellowship"
        ],
        directionsUrl: "https://maps.google.com/?q=Ashirwad+Global+Learning+Centre+Hyderabad",
        imageUrl: "/images/venue-1.webp"
      }
    },
    {
      id: "sec-home-book",
      pageId: "page-home",
      type: "book_promotion",
      title: "Free Book Promotion",
      sortOrder: 6,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "SPECIAL CONFERENCE GIFT",
        heading: "Every Registered Attendee Receives a Free Copy",
        subtitle: "Equip your mind and inflame your affections with this modern Christian classic.",
        bookTitle: "Don't Waste Your Life",
        author: "John Piper",
        bookSubtitle: "A passionate plea to make your life count for Christ and eternity.",
        description: "God created you to live with a single, all-satisfying passion for Him. In this foundational book, John Piper passionately warns against the tragedy of living a comfortable, trivial, and wasted life.",
        perks: [
          "Complimentary physical copy given at check-in",
          "Essential reading for the CrossLife movement",
          "Free for all registered participants aged 18–25"
        ],
        buttonText: "CLAIM YOUR COPY — REGISTER NOW",
        retailPrice: "₹499",
        conferencePrice: "FREE with registration",
        coverImageUrl: "/images/book-dont-waste-your-life.jpg"
      }
    },
    {
      id: "sec-home-faq",
      pageId: "page-home",
      type: "faq",
      title: "Essential FAQs",
      sortOrder: 7,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "QUESTIONS & ANSWERS",
        heading: "Essential Frequently Asked Questions",
        subtitle: "Quick answers to help you plan your conference trip to Hyderabad.",
        isCompact: true,
        maxItems: 4,
        viewAllText: "VIEW ALL FREQUENTLY ASKED QUESTIONS",
        viewAllHref: "/faq"
      }
    },
    {
      id: "sec-home-partners",
      pageId: "page-home",
      type: "organiser_partners",
      title: "Organiser & Strategic Partners",
      sortOrder: 8,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "ORGANISER & STRATEGIC PARTNERS",
        heading: "Equip Indian Churches & Strategic Ministry Partners",
        subtitle: "United across evangelical and reformed traditions to equip the next generation.",
        isCompact: true,
        showOrganiser: true,
        showPartners: true,
        ctaText: "VIEW ALL PARTNERS",
        ctaHref: "/partners"
      }
    }
  ],
  "page-about": [
    {
      id: "sec-about-intro",
      pageId: "page-about",
      type: "rich_text",
      title: "About CrossLife Intro",
      sortOrder: 1,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "ABOUT THE MOVEMENT",
        heading: "Inspiring & Equipping a Generation for Christ",
        subtitle: "Organised by Equip Indian Churches for young adults across India.",
        content: "CrossLife is a young people’s conference organised by Equip Indian Churches to inspire and equip young people to live out One Life for Christ, with One Desire to glorify Him, and to fulfill One Purpose—to proclaim His Gospel.\n\nCrossLife fosters spiritual growth, biblical understanding, and passionate commitment to the Gospel, empowering the next generation of believers to be rooted in the local church and to make a lasting impact for Christ in their families, churches, workplaces, communities, and the world."
      }
    },
    {
      id: "sec-about-why",
      pageId: "page-about",
      type: "why_crosslife",
      title: "Why CrossLife?",
      sortOrder: 2,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "WHY CROSSLIFE?",
        heading: "A Beacon Calling Young People to Gospel Faithfulness",
        subtitle: "Navigating today's distractions with biblical clarity and conviction.",
        paragraphs: [
          "In a world filled with distractions and conflicting messages, CrossLife stands as a beacon, calling young people to Gospel faithfulness. It challenges them to embrace their identity in Christ and equips them with biblical wisdom to navigate life’s complexities with clarity and purpose.",
          "CrossLife provides an opportunity for spiritual growth, deepens their understanding of God’s Word, and strengthens their commitment to glorify Christ in every area of life. It fosters a space to connect with a community of like-minded believers, be mentored by faithful leaders, and discover practical ways to impact their families, churches, and communities for the Gospel.",
          "CrossLife uniquely combines Gospel-centered teaching, meaningful fellowship, and practical equipping, all rooted in the local church. With its focus on One Life, One Desire, and One Purpose, it challenges young people to live intentionally for Christ, glorify Him, and proclaim His Gospel in a way that is both inspiring and transformative."
        ],
        quote: "Let no one despise you for your youth, but set the believers an example in speech, in conduct, in love, in faith, in purity.",
        quoteAuthor: "1 Timothy 4:12"
      }
    },
    {
      id: "sec-about-who",
      pageId: "page-about",
      type: "who_is_it_for",
      title: "Who Is It For?",
      sortOrder: 3,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "WHO IS CROSSLIFE FOR?",
        heading: "Who Is CrossLife For?",
        subtitle: "Men and women aged 18–25 seeking depth, clarity, and Christian community.",
        cards: [
          {
            id: "aw1",
            title: "Young Adults (18–25)",
            subtitle: "College Students & Early Professionals",
            description: "Navigating career choices, campus pressures, and adulthood with deep theological convictions.",
            tag: "Age 18–25"
          },
          {
            id: "aw2",
            title: "Seeking Biblical Depth",
            subtitle: "Tired of Surface-Level Faith",
            description: "Longing to understand the Scriptures systematically, verse-by-verse, with intellectual and pastoral rigor.",
            tag: "Biblical Depth"
          },
          {
            id: "aw3",
            title: "Rooted in the Local Church",
            subtitle: "Committed Church Members",
            description: "Believers eager to serve their local congregation faithfully under the mentorship of pastoral elders.",
            tag: "Church Centred"
          },
          {
            id: "aw4",
            title: "Kingdom-Minded Disciple-Makers",
            subtitle: "Future Church Servants",
            description: "Equipped to proclaim the Gospel clearly in families, campuses, workplaces, and unreached communities.",
            tag: "Disciple Makers"
          }
        ]
      }
    },
    {
      id: "sec-about-unique",
      pageId: "page-about",
      type: "whats_unique",
      title: "What's Unique",
      sortOrder: 4,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "WHAT'S UNIQUE ABOUT CROSSLIFE?",
        heading: "Substance Over Style. Truth Over Trend.",
        subtitle: "A serious, thoughtful, and joyful engagement with the sufficient Word of God.",
        showFullText: true,
        items: [
          {
            id: "au1",
            number: "01",
            title: "Expository Preaching",
            subheadline: "Authoritative & Sufficient Word",
            description: "Not motivational talks or flashy entertainment, but faithful biblical exposition that feeds the soul.",
            highlightText: "Substance Over Style"
          },
          {
            id: "au2",
            number: "02",
            title: "Reverent Worship",
            subheadline: "Christ-Exalting Praise",
            description: "Worshipping with reverence and joy, grounded in the majestic truths of God's sovereign grace.",
            highlightText: "Truth Over Trend"
          },
          {
            id: "au3",
            number: "03",
            title: "Local Church Centered",
            subheadline: "Rooted in the Body",
            description: "Encouraging young people to love, serve, and submit to their local churches across India.",
            highlightText: "Church Centred"
          },
          {
            id: "au4",
            number: "04",
            title: "Authentic Fellowship",
            subheadline: "Gospel Friendships",
            description: "Deep, meaningful connections with peers who share the same passion for Christ and His Kingdom.",
            highlightText: "Like-Minded"
          }
        ]
      }
    },
    {
      id: "sec-about-goals",
      pageId: "page-about",
      type: "goals",
      title: "Five Hopes & Goals",
      sortOrder: 5,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "HOPES & GOALS",
        heading: "Five Intentional Outcomes",
        subtitle: "What we pray God accomplishes in the lives of every attendee at CrossLife.",
        goals: [
          {
            id: "g1",
            number: "01",
            title: "Gospel Alignment",
            description: "To encourage young people to live faithfully, aligning their lives with the Gospel."
          },
          {
            id: "g2",
            number: "02",
            title: "Intentional Discipleship",
            description: "To challenge young people to live intentionally for Christ in every area of their lives."
          },
          {
            id: "g3",
            number: "03",
            title: "Spiritual Growth",
            description: "To foster deep spiritual growth, encouraging them to grow in their faith and understanding of God’s Word."
          },
          {
            id: "g4",
            number: "04",
            title: "Biblical Wisdom",
            description: "To equip young people with biblical wisdom and practical tools for navigating life’s challenges."
          },
          {
            id: "g5",
            number: "05",
            title: "Fellowship & Mentorship",
            description: "To provide opportunities for mentorship, fellowship, and discipleship through engagement with faithful leaders and like-minded believers."
          }
        ]
      }
    },
    {
      id: "sec-about-pillars",
      pageId: "page-about",
      type: "three_pillars",
      title: "Three Pillars",
      sortOrder: 6,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "OUR THREE PILLARS",
        heading: "ONE LIFE. ONE DESIRE. ONE PURPOSE.",
        subtitle: "The driving theological heartbeat behind everything we do.",
        pillars: [
          {
            id: "ap1",
            number: "01",
            title: "ONE LIFE",
            subtitle: "LIVE FOR CHRIST",
            meaning: "To live for Christ.",
            scripture: "For to me to live is Christ, and to die is gain.",
            reference: "Philippians 1:21",
            description: "One brief earthly life redeemed by the grace of God, surrendered wholly to the lordship of Jesus Christ."
          },
          {
            id: "ap2",
            number: "02",
            title: "ONE DESIRE",
            subtitle: "GLORIFY CHRIST",
            meaning: "To glorify Christ.",
            scripture: "Whatever you do, do all to the glory of God.",
            reference: "1 Corinthians 10:31",
            description: "A single, burning passion that exalts the beauty and worth of Christ above every worldly treasure and distraction."
          },
          {
            id: "ap3",
            number: "03",
            title: "ONE PURPOSE",
            subtitle: "PROCLAIM CHRIST",
            meaning: "To proclaim Christ.",
            scripture: "Him we proclaim, warning everyone and teaching everyone with all wisdom.",
            reference: "Colossians 1:28",
            description: "An unwavering commitment to declare the Gospel of Jesus Christ to our generation, our cities, and the nations."
          }
        ]
      }
    },
    {
      id: "sec-about-organiser",
      pageId: "page-about",
      type: "organiser_partners",
      title: "Organiser & Partners",
      sortOrder: 7,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "ORGANISER",
        heading: "Equip Indian Churches",
        subtitle: "Providing direction and momentum to the biblical growth of churches across India.",
        isCompact: false,
        showOrganiser: true,
        showPartners: false
      }
    }
  ],
  "page-conference": [
    {
      id: "sec-conf-overview",
      pageId: "page-conference",
      type: "rich_text",
      title: "Conference Overview",
      sortOrder: 1,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "EVENT OVERVIEW",
        heading: "Three Days in Hyderabad Under God's Word",
        subtitle: "14 – 16 September 2027 • Tuesday 11:00 AM to Thursday 3:00 PM",
        content: "CrossLife 2027 brings together young adults from across India for three unforgettable days of systematic Bible exposition, reverent singing, pastoral breakout sessions, communal dining, and lasting fellowship. Lodging and meals are fully covered in the registration rate."
      }
    },
    {
      id: "sec-conf-venue",
      pageId: "page-conference",
      type: "venue",
      title: "Ashirwad Campus",
      sortOrder: 2,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "ASHIRWAD LEARNING CENTRE",
        heading: "Ashirwad Global Learning Centre",
        subtitle: "A dedicated sanctuary campus designed for spiritual focus and fellowship.",
        venueName: "Ashirwad Global Learning Centre",
        address: "Ashirwad Global Learning Centre",
        city: "Hyderabad",
        state: "Telangana",
        fullAddress: "Ashirwad Global Learning Centre, Hyderabad, Telangana",
        description: "Ashirwad Global Learning Centre provides modern air-conditioned halls, dormitory accommodations, communal dining halls, and serene walking grounds.",
        features: [
          "Dormitory Accommodations Included",
          "All Meals Included (14th Lunch to 16th Lunch)",
          "Air-Conditioned Main Auditorium & Breakout Rooms",
          "Dedicated Christian Bookstore by For The Truth",
          "Campus Grounds for Walking & Fellowship"
        ],
        directionsUrl: "https://maps.google.com/?q=Ashirwad+Global+Learning+Centre+Hyderabad",
        imageUrl: "/images/venue-1.webp"
      }
    },
    {
      id: "sec-conf-book",
      pageId: "page-conference",
      type: "book_promotion",
      title: "Free Book Promotion",
      sortOrder: 3,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "FREE BOOK FOR ATTENDEES",
        heading: "Claim Your Copy of “Don't Waste Your Life”",
        subtitle: "Gifted to all registered participants at conference check-in.",
        bookTitle: "Don't Waste Your Life",
        author: "John Piper",
        bookSubtitle: "A passionate call to make your one life count for eternity.",
        description: "In this classic work, John Piper warns against the danger of coasting through life and calls us to a singular passion for Jesus Christ.",
        perks: [
          "Complimentary copy for every attendee",
          "Includes study discussion guide",
          "Collected upon arrival at registration desk"
        ],
        buttonText: "REGISTER NOW & CLAIM YOUR BOOK",
        retailPrice: "₹499",
        conferencePrice: "FREE with registration",
        coverImageUrl: "/images/book-dont-waste-your-life.jpg"
      }
    },
    {
      id: "sec-conf-cta",
      pageId: "page-conference",
      type: "cta_banner",
      title: "Registration CTA",
      sortOrder: 4,
      isVisible: true,
      updatedAt: "2026-10-03T10:00:00.000Z",
      data: {
        badge: "LIMITED REGISTRATION",
        heading: "Secure Your Seat at CrossLife 2027",
        subtitle: "Dormitory space is limited. Early bird pricing ends soon.",
        primaryButtonText: "REGISTER NOW",
        primaryButtonAction: "modal",
        secondaryButtonText: "FREQUENTLY ASKED QUESTIONS",
        secondaryButtonHref: "/faq",
        earlyBirdNotice: "Use promo code AIPC2026 to save ₹500"
      }
    }
  ]
};

export const initialMedia: MediaItem[] = [
  {
    id: "med-1",
    name: "crosslife-logo.webp",
    url: "/images/crosslife-logo.webp",
    size: 24500,
    type: "image/webp",
    width: 600,
    height: 180,
    altText: "CrossLife Conference Logo",
    caption: "Official CrossLife Brand Logo",
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    id: "med-2",
    name: "book-dont-waste-your-life.jpg",
    url: "/images/book-dont-waste-your-life.jpg",
    size: 154000,
    type: "image/jpeg",
    width: 800,
    height: 1200,
    altText: "Don't Waste Your Life by John Piper",
    caption: "Free conference gift book cover",
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    id: "med-3",
    name: "venue-1.webp",
    url: "/images/venue-1.webp",
    size: 320000,
    type: "image/webp",
    width: 1920,
    height: 1080,
    altText: "Ashirwad Global Learning Centre Campus",
    caption: "Ashirwad Campus Exterior",
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    id: "med-4",
    name: "partners-org.webp",
    url: "/images/partners-org.webp",
    size: 185000,
    type: "image/webp",
    width: 1200,
    height: 600,
    altText: "Equip Indian Churches and Ministry Partners",
    caption: "Partnership banner graphic",
    createdAt: "2026-09-01T00:00:00.000Z"
  }
];

export const initialSpeakers: Speaker[] = [];

export const initialPartners: Partner[] = [
  {
    id: "part-eic",
    name: "Equip Indian Churches",
    tagline: "A Pastoral Fellowship",
    role: "Organiser",
    description: "A collaborative fellowship of pastors working together to provide direction and momentum to the biblical growth of churches across India in the reformed evangelical tradition.",
    website: "https://equipindianchurches.com",
    sortOrder: 1,
    isActive: true
  },
  {
    id: "part-ftt",
    name: "For The Truth",
    tagline: "Christian Literature & Publishing",
    role: "Bookstore Sponsor",
    description: "An Indian Christian ministry dedicated to publishing, curating, and distributing sound, gospel-centered theological literature and biblical resources across the nation.",
    website: "https://forthetruth.in",
    logoUrl: "/images/partner-ftt.png",
    sortOrder: 2,
    isActive: true
  },
  {
    id: "part-tbp",
    name: "The Bible Project",
    tagline: "Visual Exposition & Biblical Theology",
    role: "Partner",
    description: "Helping people experience the Bible as a unified story that leads to Jesus through thoughtful visual exposition and accessible biblical theology.",
    website: "https://bibleproject.com",
    sortOrder: 3,
    isActive: true
  },
  {
    id: "part-svs",
    name: "SVS",
    tagline: "Theological Education",
    role: "Partner",
    description: "Partnering in theological education and gospel resource distribution to strengthen church leadership throughout India.",
    website: "",
    sortOrder: 4,
    isActive: true
  }
];

export const initialFaqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "When will CrossLife 2027 take place?",
    answer: "CrossLife 2027 will be held from Tuesday, 14th to Thursday, 16th September 2027.",
    category: "General",
    sortOrder: 1,
    isPublished: true
  },
  {
    id: "faq-2",
    question: "Where will CrossLife 2027 take place?",
    answer: "The venue for CrossLife 2027 is Ashirwad Global Learning Centre, Hyderabad, Telangana.",
    category: "General",
    sortOrder: 2,
    isPublished: true
  },
  {
    id: "faq-3",
    question: "When will the conference begin on the 14th?",
    answer: "The conference will begin promptly at 11:00 AM on 14th September 2027.",
    category: "General",
    sortOrder: 3,
    isPublished: true
  },
  {
    id: "faq-4",
    question: "Can both men and women attend CrossLife 2027?",
    answer: "Yes, CrossLife 2027 is open to both men and women aged 18 to 25.",
    category: "Registration",
    sortOrder: 4,
    isPublished: true
  },
  {
    id: "faq-5",
    question: "Is it important for participants to know English?",
    answer: "All sessions will be conducted in English, so a good understanding of English is necessary to fully participate in the conference.",
    category: "Registration",
    sortOrder: 5,
    isPublished: true
  },
  {
    id: "faq-6",
    question: "What are the accommodation options?",
    answer: "Accommodation will be provided in dormitory-style arrangements. Lodging and meals are included in the registration fee.",
    category: "Accommodation & Travel",
    sortOrder: 6,
    isPublished: true
  },
  {
    id: "faq-7",
    question: "Can I stay outside and only attend the sessions?",
    answer: "Yes, you can stay off-campus and attend all the sessions. Note that the registration fee remains the same.",
    category: "Accommodation & Travel",
    sortOrder: 7,
    isPublished: true
  },
  {
    id: "faq-8",
    question: "What about food during the conference?",
    answer: "Meals are included in the registration fee for all participants (from lunch on 14th September to lunch on 16th September).",
    category: "Accommodation & Travel",
    sortOrder: 8,
    isPublished: true
  },
  {
    id: "faq-9",
    question: "How do I get to Ashirwad Global Learning Centre?",
    answer: "You can search for 'Ashirwad Global Learning Centre' on any map service to find directions. It is easily accessible from Hyderabad’s major transport hubs (Secunderabad/Hyderabad Railway Stations and Rajiv Gandhi International Airport).",
    category: "Accommodation & Travel",
    sortOrder: 9,
    isPublished: true
  },
  {
    id: "faq-10",
    question: "How can I donate or sponsor a student for CrossLife 2027?",
    answer: "Donations are warmly welcome! You can contribute during registration by entering an amount higher than the registration fee, or by reaching out to us directly at contact@crosslife.in.",
    category: "Registration",
    sortOrder: 10,
    isPublished: true
  }
];
