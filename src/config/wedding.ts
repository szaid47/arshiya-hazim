export interface WeddingDetails {
  arabicHeader: string;
  openingLine: string;
  openingLineItalic: string;
  mainTitle: string;
  bride: {
    name: string;
    parents: string;
  };
  groom: {
    name: string;
    parents: string;
  };
  date: string;
  time: string;
  venue: string;
  closingMessage: string;
  countdownTarget: string; // ISO string with offset for countdown
  mapsQuery: string;
  mapsLink: string;
  audioSrc: string;
  gcalLink: string;
  icsCalendar: {
    title: string;
    description: string;
    location: string;
    startTime: string; // YYYYMMDDTHHMMSS in UTC or local with Z/offset
    durationMinutes: number;
  };
}

export const weddingDetails: WeddingDetails = {
  arabicHeader: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
  openingLine: "TOGETHER WITH YOUR FAMILY",
  openingLineItalic: "you are cordially invited to the",
  mainTitle: "Nikkah",
  bride: {
    name: "Arshiya S Banu",
    parents: "Daughter of Late Syed Asif Ali & Tanveer Kausar",
  },
  groom: {
    name: "Hazim Rahman",
    parents: "Son of Mohammed Shareef Nangarath & Raseena Thekke Koleth",
  },
  date: "Saturday, 26th December 2026",
  time: "Nikkah Time — 11:00 AM",
  venue: "MTP Convention Centre, Trikaripur, Kasargod, Kerala",
  closingMessage: "Your gracious presence will make our celebration more meaningful",
  countdownTarget: "2026-12-26T11:00:00+05:30", // IST
  mapsQuery: "MTP Convention Centre, Trikaripur, Kasargod, Kerala",
  mapsLink: "https://share.google/ObErdmOPbMdCPGg68P",
  audioSrc: "/alfaaz%20(instrumental).mp3",
  // Google Calendar Link generator is simpler but we can pre-generate or generate on-the-fly.
  // This is a static reference but let's make a function in App to generate it dynamically!
  gcalLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nikkah+of+Arshiya+%26+Hazim&dates=20261226T110000+0530/20261226T150000+0530&details=You+are+cordially+invited+to+the+Nikkah+of+Arshiya+S+Banu+and+Hazim+Rahman+at+MTP+Convention+Center,+Trikaripur.&location=MTP+Convention+Center,+Trikaripur,+Kasargod,+Kerala&sf=true&output=xml",
  icsCalendar: {
    title: "Nikkah of Arshiya & Hazim",
    description: "You are cordially invited to the Nikkah of Arshiya S Banu and Hazim Rahman.",
    location: "MTP Convention Centre, Trikaripur, Kasargod, Kerala",
    startTime: "20261226T110000",
    durationMinutes: 240,
  }
};
