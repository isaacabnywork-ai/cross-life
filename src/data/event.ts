export interface EventConfig {
  title: string;
  badge: string;
  tagline: string;
  message: {
    line1: string;
    line2: string;
    line3: string;
  };
  audience: string;
  gender: string;
  schedule: string;
  dates: string;
  year: string;
  startDate: string; // ISO format for countdown
  endDate: string;
  startTime: string;
  earlyBirdPrice: number;
  earlyBirdDeadline: string;
  regularPrice: number;
  discount: number;
  promoCode: string;
  languageNotice: string;
  seatsNotice: string;
  venue: {
    name: string;
    city: string;
    state: string;
    fullAddress: string;
    mapUrl: string;
    description: string;
    images: string[];
  };
  freeBook: {
    title: string;
    author: string;
    subtitle: string;
    badge: string;
    image: string;
  };
  bookstore: {
    title: string;
    sponsor: string;
    description: string;
    images: string[];
    books: {
      title: string;
      author: string;
      image: string;
      description: string;
    }[];
  };
}

export const eventConfig: EventConfig = {
  title: "CrossLife",
  badge: "A Conference for Young People",
  tagline: "ONE LIFE. ONE DESIRE. ONE PURPOSE.",
  message: {
    line1: "ONE LIFE — To live for Christ.",
    line2: "ONE DESIRE — To glorify Christ.",
    line3: "ONE PURPOSE — To proclaim Christ."
  },
  audience: "18 to 25 Years old",
  gender: "Men and Women",
  schedule: "Tuesday – Thursday",
  dates: "14 – 16 Sept 2027",
  year: "2027",
  startDate: "2027-09-14T11:00:00+05:30",
  endDate: "2027-09-16T15:00:00+05:30",
  startTime: "11:00 AM",
  earlyBirdPrice: 2000,
  earlyBirdDeadline: "July 31st, 2027",
  regularPrice: 3000,
  discount: 500,
  promoCode: "AIPC2026",
  languageNotice: "Please Register Only If You Are Comfortable Communicating In English.",
  seatsNotice: "Seats are limited, register soon!",
  venue: {
    name: "Ashirwad Global Learning Centre",
    city: "Hyderabad",
    state: "Telangana",
    fullAddress: "Ashirwad Global Learning Centre, Hyderabad, Telangana",
    mapUrl: "https://maps.google.com/?q=Ashirwad+Global+Learning+Centre+Hyderabad",
    description: "Ashirwad Global Learning Centre provides a serene, peaceful campus setting designed for focused biblical study, intentional community, shared meals, and rich fellowship.",
    images: [
      "/images/venue-1.webp",
      "/images/venue-2.webp",
      "/images/venue-3.webp",
      "/images/venue-4.webp",
      "/images/venue-5.webp"
    ]
  },
  freeBook: {
    title: "Don't Waste Your Life",
    author: "John Piper",
    subtitle: "Register Now & Receive Your FREE Copy — A special gift for registered participants.",
    badge: "CLAIM YOUR FREE BOOK",
    image: "/images/book-dont-waste-your-life.jpg"
  },
  bookstore: {
    title: "Dedicated Bookstore",
    sponsor: "For The Truth",
    description: "The conference will feature a dedicated bookstore sponsored by For The Truth, designed to equip and inspire young believers. This space will feature a carefully selected collection of books on faith, discipleship, and Christian living—specifically curated with sound biblical doctrine.",
    images: [
      "/images/bookstore-1.webp",
      "/images/bookstore-2.webp",
      "/images/bookstore-3.webp",
      "/images/bookstore-4.webp"
    ],
    books: [
      {
        title: "Don't Waste Your Life",
        author: "John Piper",
        image: "/images/book-dont-waste-your-life.jpg",
        description: "A passionate plea to make your life count for eternity, grounded in the supremacy of Christ in all things."
      },
      {
        title: "Who is Jesus?",
        author: "Greg Gilbert",
        image: "/images/book-who-is-jesus.png",
        description: "A clear, compelling look at the central figure of history and the claims He makes on our lives."
      },
      {
        title: "Why Trust the Bible?",
        author: "Greg Gilbert",
        image: "/images/book-why-trust-the-bible.jpeg",
        description: "A brief, thoughtful defense of the reliability, authority, and historical truth of the Scriptures."
      },
      {
        title: "Truth for Life: Volume 2",
        author: "Alistair Begg",
        image: "/images/book-truth-for-life.jpg",
        description: "Daily gospel-centered devotions to strengthen faith and deepen understanding of God's Word."
      },
      {
        title: "What Is the Gospel?",
        author: "Greg Gilbert",
        image: "/images/book-what-is-the-gospel.webp",
        description: "A concise, biblically faithful examination of the greatest news the world has ever heard."
      }
    ]
  }
};
