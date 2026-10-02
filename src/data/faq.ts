export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItemData[];
}

export const faqData: FAQCategory[] = [
  {
    category: "Conference Overview",
    items: [
      {
        id: "overview-1",
        question: "When will CrossLife 2027 take place?",
        answer: "CrossLife 2027 will be held from Tuesday, 14th to Thursday, 16th September 2027."
      },
      {
        id: "overview-2",
        question: "Where will CrossLife 2027 take place?",
        answer: "The venue for CrossLife 2027 is Ashirwad Global Learning Centre, Hyderabad, Telangana."
      },
      {
        id: "overview-3",
        question: "When will the conference begin on the 14th?",
        answer: "The conference will begin promptly at 11:00 AM on 14th September 2027."
      }
    ]
  },
  {
    category: "Registration",
    items: [
      {
        id: "reg-1",
        question: "Is it important for participants to know English?",
        answer: "All sessions will be conducted in English, so a good understanding of English is necessary to fully participate in the conference."
      },
      {
        id: "reg-2",
        question: "Can both men and women attend CrossLife 2027?",
        answer: "Yes, CrossLife 2027 is open to both men and women aged 18 to 25."
      },
      {
        id: "reg-3",
        question: "Can I book for a group?",
        answer: "No, individual registrations are required so each attendee's details can be verified."
      },
      {
        id: "reg-4",
        question: "Can my registration be transferred to someone else?",
        answer: "No, registrations are non-transferable. Please ensure the registration is completed using the correct name."
      }
    ]
  },
  {
    category: "Accommodation",
    items: [
      {
        id: "acc-1",
        question: "What are the accommodation options?",
        answer: "Accommodation will be provided in dormitory-style arrangements. Lodging and meals are included in the registration fee."
      },
      {
        id: "acc-2",
        question: "Is there dormitory-style accommodation available?",
        answer: "Yes, accommodation will be in shared rooms. No single rooms are available."
      },
      {
        id: "acc-3",
        question: "How early can participants check in on the 14th?",
        answer: "Check-in is open at any time on 14th September 2027 before the sessions begin."
      },
      {
        id: "acc-4",
        question: "Can I stay outside and only attend the sessions?",
        answer: "Yes, you can stay off-campus and attend all the sessions."
      },
      {
        id: "acc-5",
        question: "Is there a different rate for participants who are staying off-campus?",
        answer: "No, the registration fee is the same for all participants, regardless of accommodation arrangements."
      }
    ]
  },
  {
    category: "Food",
    items: [
      {
        id: "food-1",
        question: "What about food during the conference?",
        answer: "Meals are included in the registration fee for all participants. Please note that we cannot cater to those who have special needs or allergies regarding food. They need to make their own arrangements."
      },
      {
        id: "food-2",
        question: "What is the first meal of the conference?",
        answer: "The first meal of the conference will be lunch on 14th September 2027."
      },
      {
        id: "food-3",
        question: "What is the last meal of the conference?",
        answer: "The last meal will be lunch on 16th September 2027 before the conference concludes."
      }
    ]
  },
  {
    category: "Travel",
    items: [
      {
        id: "travel-1",
        question: "How do I get to Ashirwad Global Learning Centre?",
        answer: "You can search for 'Ashirwad Global Learning Centre' on any map service to find directions. It is easily accessible from Hyderabad’s major transport hubs (Secunderabad/Hyderabad Railway Stations and Rajiv Gandhi International Airport)."
      },
      {
        id: "travel-2",
        question: "When should I plan my travel?",
        answer: "We encourage participants to plan their travel early. Train and flight bookings should be made in advance to secure good prices and ensure availability. Be sure to mark your calendars for June 2027 when Indian Railways train booking opens."
      }
    ]
  },
  {
    category: "Donations",
    items: [
      {
        id: "donations-1",
        question: "How can I donate or sponsor a student for CrossLife 2027?",
        answer: "Donations are warmly welcome! You can contribute during registration by entering an amount higher than the registration fee, or by reaching out to us directly at contact@crosslife.in."
      }
    ]
  }
];
