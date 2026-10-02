export interface GoalItem {
  number: string;
  title: string;
  description: string;
}

export interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export const brandContent = {
  name: "CrossLife",
  organiserName: "Equip Indian Churches",
  focus: "Young people / young adults",
  audience: "Men and women aged 18–25",
  
  scriptureQuote: {
    verse: "1 Timothy 4:12",
    text: "Let no one despise you for your youth, but set the believers an example in speech, in conduct, in love, in faith, in purity."
  },

  threePillars: [
    {
      pillar: "ONE LIFE",
      subtitle: "LIVE FOR CHRIST",
      meaning: "To live for Christ.",
      description: "One brief earthly life redeemed by the grace of God, surrendered wholly to the lordship of Jesus Christ."
    },
    {
      pillar: "ONE DESIRE",
      subtitle: "GLORIFY CHRIST",
      meaning: "To glorify Christ.",
      description: "A single, burning passion that exalts the beauty and worth of Christ above every worldly treasure and distraction."
    },
    {
      pillar: "ONE PURPOSE",
      subtitle: "PROCLAIM CHRIST",
      meaning: "To proclaim Christ.",
      description: "An unwavering commitment to declare the Gospel of Jesus Christ to our generation, our cities, and the nations."
    }
  ],

  about: {
    title: "About CrossLife",
    lead: "CrossLife is a young people’s conference organised by Equip Indian Churches to inspire and equip young people to live out One Life for Christ, with One Desire to glorify Him, and to fulfill One Purpose—to proclaim His Gospel.",
    body: "CrossLife fosters spiritual growth, biblical understanding, and passionate commitment to the Gospel, empowering the next generation of believers to be rooted in the local church and to make a lasting impact for Christ in their families, churches, workplaces, communities, and the world."
  },

  whatIsCrossLife: {
    title: "What is CrossLife?",
    statement: "CrossLife is a conference designed to inspire and equip young people for one life—to live for Christ, with one desire—to glorify Christ, and to fulfill one purpose—to proclaim Christ."
  },

  whyCrossLife: {
    title: "Why CrossLife?",
    paragraphs: [
      "In a world filled with distractions and conflicting messages, CrossLife stands as a beacon, calling young people to Gospel faithfulness. It challenges them to embrace their identity in Christ and equips them with biblical wisdom to navigate life’s complexities with clarity and purpose.",
      "CrossLife provides an opportunity for spiritual growth, deepens their understanding of God’s Word, and strengthens their commitment to glorify Christ in every area of life. It fosters a space to connect with a community of like-minded believers, be mentored by faithful leaders, and discover practical ways to impact their families, churches, and communities for the Gospel.",
      "CrossLife uniquely combines Gospel-centered teaching, meaningful fellowship, and practical equipping, all rooted in the local church. With its focus on One Life, One Desire, and One Purpose, it challenges young people to live intentionally for Christ, glorify Him, and proclaim His Gospel in a way that is both inspiring and transformative."
    ]
  },

  whoIsItFor: {
    title: "Who Is CrossLife For?",
    paragraphs: [
      "CrossLife is for young people who desire to grow in their faith, deepen their relationship with Christ, seek to engage more meaningfully in the local church and learn how to live out the Gospel practically.",
      "Whether you’re a young believer looking to grow in your faith, a passionate disciple-maker, or someone seeking clarity on how to live out the Gospel in everyday life, CrossLife is for you. It’s a space where you can be inspired, equipped, and empowered to follow Christ wholeheartedly."
    ],
    audienceTags: [
      "Young adults aged 18–25",
      "Men and Women",
      "University students & early career professionals",
      "Believers seeking deeper biblical grounding",
      "Aspiring disciples & servant-leaders in the local church"
    ]
  },

  whatsUnique: {
    title: "What's Unique About CrossLife?",
    accent1: "SUBSTANCE OVER STYLE",
    accent2: "TRUTH OVER TREND",
    paragraphs: [
      "CrossLife is not just another youth event—it’s a call to wholehearted, gospel-centered discipleship for young people across India. At a time when many youth gatherings focus on entertainment, hype, and emotionalism, CrossLife stands apart by offering substance over style and truth over trend.",
      "Our goal is to encourage young people to become fully committed followers of the Lord Jesus Christ, deeply rooted in sound doctrine and actively invested in the life of their local churches. We believe that a serious, thoughtful, and joyful engagement with the Word of God is what our generation most desperately needs.",
      "Through faithful, intellectually rich, and pastorally warm biblical preaching, our desire is to challenge young men and women to live gospel-driven, Christ-exalting, and kingdom-minded lives.",
      "This is not a weekend of feel-good motivational talks or flashy entertainment. Instead, most of our time together is spent sitting under the authoritative and sufficient Word of God, worshipping with reverence, and fellowshipping meaningfully with like-minded believers.",
      "If you’re looking for something light and entertaining, this may not be for you. But if you’re longing to grow in your love for Christ, to think deeply about your faith, and to be equipped to live it out faithfully in your family, church, campus, and career—CrossLife is for you.",
      "Come ready to be challenged, sharpened, encouraged, and fed—not by trends, but by truth."
    ]
  },

  goals: [
    {
      number: "01",
      title: "Gospel Alignment",
      description: "To encourage young people to live faithfully, aligning their lives with the Gospel."
    },
    {
      number: "02",
      title: "Intentional Discipleship",
      description: "To challenge young people to live intentionally for Christ in every area of their lives."
    },
    {
      number: "03",
      title: "Spiritual Growth",
      description: "To foster deep spiritual growth, encouraging them to grow in their faith and understanding of God’s Word."
    },
    {
      number: "04",
      title: "Biblical Wisdom",
      description: "To equip young people with biblical wisdom and practical tools for navigating life’s challenges."
    },
    {
      number: "05",
      title: "Fellowship & Mentorship",
      description: "To provide opportunities for mentorship, fellowship, and discipleship through engagement with faithful leaders and like-minded believers."
    }
  ],

  conferenceFeatures: [
    {
      id: "preaching",
      title: "Gospel-Centred Preaching",
      subtitle: "Expository preaching that opens the Scriptures with depth, reverence, and pastoral warmth.",
      image: "/images/preaching.jpg"
    },
    {
      id: "singing",
      title: "Reverent Singing",
      subtitle: "Corporate worship grounded in rich theological truth, historic hymns, and Christ-exalting praise.",
      image: "/images/singing.jpg"
    },
    {
      id: "panel",
      title: "Panel Discussions",
      subtitle: "Pastors addressing pressing cultural questions, vocation, relationships, and Christian ethics.",
      image: "/images/panel.png"
    },
    {
      id: "fellowship",
      title: "Meaningful Fellowship",
      subtitle: "Shared dorms, communal tables, and lasting Gospel friendships with believers from across India.",
      image: "/images/bookstore-2.webp"
    }
  ],

  organiser: {
    name: "Equip Indian Churches",
    lead: "Equip Indian Churches is a ministry where several pastors have partnered together with a desire to help provide direction and momentum to the Biblical growth of churches. We hope to do this by creating a resource centre for Christians and churches. We also hope to see unity based on the truth among various streams of evangelical Christianity in the reformed tradition.",
    description: "The following two verses undergird this fellowship of Christians and churches:",
    verses: [
      {
        reference: "Psalm 133:1",
        quote: "Behold, how good and pleasant it is when brothers dwell in unity."
      },
      {
        reference: "Jude 3",
        quote: "Beloved...appealing to you to contend for the faith that was once for all delivered to the saints."
      }
    ]
  }
};
