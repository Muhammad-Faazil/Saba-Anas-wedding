/**
 * =======================================================================
 * WEDDING INVITATION CONFIGURATION TEMPLATE
 * =======================================================================
 * To customize this invitation for any couple, simply edit the fields below.
 * All components (cover curtain, hero, couple profile, single event,
 * countdown timer, calendar export, and map links) adapt automatically.
 * =======================================================================
 */

export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  mapButtonLabel?: string;
  calendarTitle?: string;
  calendarDescription?: string;
  calendarStartDateISO?: string; // e.g. "2026-12-27T16:30:00"
  calendarEndDateISO?: string;   // e.g. "2026-12-27T22:30:00"
}

export interface InvitationConfig {
  couple: {
    brideName: string;
    groomName: string;
    monogramInitials: string;
    openingGreeting: string; // e.g. "WITH THE BLESSINGS OF ALLAH"
    bismillahArabic?: string; // Optional Arabic calligraphy
    invitationIntroText: string;
    brideParents: string;
    groomParents: string;
  };
  dates: {
    primaryEventDateISO: string; // ISO string used for live countdown timer (e.g. "2026-12-27T16:30:00")
    gregorianDateDisplay: string; // e.g. "Sunday, 27 December 2026"
    coverDateDisplay: string;     // e.g. "27th December 2026"
    countdownSubtitle: string;    // e.g. "Sunday · 27 December 2026 · 4:30 PM"
    hijriDate?: string;           // Optional Islamic Hijri date (e.g. "17 Jumada al-Thani 1448 AH")
  };
  event: WeddingEvent; // Single primary wedding celebration event
  theme: {
    colors: {
      primary: string;         // Deep royal crimson
      primaryDark: string;     // Dark crimson accent
      primaryAccent: string;   // Vibrant crimson for buttons
      gold: string;            // Royal gold for decorative frames & borders
      goldDim: string;         // Translucent gold for subtle lines
      textDark: string;        // Deep brown-crimson typography
      background: string;      // Cream/parchment background
      nightBackground: string; // Deep night crimson for lower cards
      cardBackground: string;  // Glassmorphism card backdrop
      petalColors: string[];   // Randomized falling petal palette
    };
    media: {
      coverBackground: string;
      heroBackground: string;
      cardsBackground: string;
      backgroundMusicUrl: string;
      autoPlayOnOpen: boolean;
    };
  };
  features: {
    enableGetDirections: boolean;
    enableSaveToCalendar: boolean;
    enableCountdownTimer: boolean;
    enableAudioToggle: boolean;
  };
  seo: {
    pageTitle: string;
    metaDescription: string;
    themeColor: string;
    ogImageUrl: string;
  };
  footer: {
    coupleText: string;
    blessingText: string;
    creditText?: string;    // e.g. "Created with ♥ by"
    creditHandle?: string;  // e.g. "@shazneen_fathimaaaa"
    creditUrl?: string;     // e.g. "https://www.instagram.com/shazneen_fathimaaaa?mdxt=YnJ5NnZmMzIya3ht"
  };
}

export const invitationConfig: InvitationConfig = {
  // ---------------------------------------------------------------------
  // 1. COUPLE & FAMILY DETAILS
  // ---------------------------------------------------------------------
  couple: {
    brideName: "Saba Shaikh",
    groomName: "Anas Khan",
    monogramInitials: "S & A",
    openingGreeting: "WITH THE BLESSINGS OF ALLAH",
    bismillahArabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    invitationIntroText:
      "Together with our families, we invite you to share in the joy of a beautiful new beginning and make the occasion all the more special with your presence at the wedding of",
    brideParents: "Daughter of Mr. Mohammed Hanif & Mrs. Shaheena Hanif",
    groomParents: "Son of the late Mr. Anis Khan & the late Mrs. Farida Khan",
  },

  // ---------------------------------------------------------------------
  // 2. DATES & COUNTDOWN TARGET
  // ---------------------------------------------------------------------
  dates: {
    primaryEventDateISO: "2026-12-27T16:30:00",
    gregorianDateDisplay: "Sunday, 27 December 2026",
    coverDateDisplay: "27th December 2026",
    countdownSubtitle: "Sunday · 27 December 2026 · 4:30 PM",
  },

  // ---------------------------------------------------------------------
  // 3. SINGLE EVENT DETAILS
  // ---------------------------------------------------------------------
  event: {
    id: "nikah-wedding",
    title: "The Nikah & Wedding Celebration",
    date: "Sunday, 27 December 2026",
    time: "4:30 PM",
    venueName: "The Recreation Club",
    address:
      "Shastri Nagar Lane No. 1, near Lokhandwala Circle, Andheri West, Mumbai 400053",
    googleMapsUrl:
      "https://maps.google.com/?q=The+Recreation+Club+Andheri+West+Mumbai",
    mapButtonLabel: "Get Directions",
    calendarTitle: "Wedding of Saba Shaikh & Anas Khan",
    calendarDescription:
      "The Nikah & Wedding Celebration of Saba Shaikh & Anas Khan at The Recreation Club, Andheri West, Mumbai.",
    calendarStartDateISO: "2026-12-27T16:30:00",
    calendarEndDateISO: "2026-12-27T22:30:00",
  },

  // ---------------------------------------------------------------------
  // 4. THEME STYLING & MEDIA ASSETS
  // ---------------------------------------------------------------------
  theme: {
    colors: {
      primary: "#861019",
      primaryDark: "#5C0A10",
      primaryAccent: "#A51222",
      gold: "#c9a060",
      goldDim: "rgba(201, 160, 96, 0.44)",
      textDark: "#3d0a10",
      background: "#fdf5ea",
      nightBackground: "#1e0408",
      cardBackground: "rgba(253, 245, 234, 0.88)",
      petalColors: ["#861019", "#5C0A10", "#A51222", "#720D16", "#9e1420"],
    },
    media: {
      coverBackground: "/images/crimson-scroll-bg.webp",
      heroBackground: "/images/ninal-frame-bg.jpg",
      cardsBackground: "/images/crimson-bg.jpg",
      backgroundMusicUrl: "/audio/music.mp3",
      autoPlayOnOpen: true,
    },
  },

  // ---------------------------------------------------------------------
  // 5. ACTIVE FEATURES
  // ---------------------------------------------------------------------
  features: {
    enableGetDirections: true,
    enableSaveToCalendar: true,
    enableCountdownTimer: true,
    enableAudioToggle: true,
  },

  // ---------------------------------------------------------------------
  // 6. SEO & BROWSER METADATA
  // ---------------------------------------------------------------------
  seo: {
    pageTitle: "Saba Shaikh & Anas Khan — Wedding Invitation",
    metaDescription:
      "With the blessings of Allah, Saba Shaikh & Anas Khan invite you to celebrate their wedding on Sunday, 27 December 2026 at 4:30 PM at The Recreation Club, Andheri West, Mumbai.",
    themeColor: "#861019",
    ogImageUrl: "/images/crimson-scroll-bg.webp",
  },

  // ---------------------------------------------------------------------
  // 7. FOOTER & CREDITS
  // ---------------------------------------------------------------------
  footer: {
    coupleText: "Saba Shaikh & Anas Khan",
    blessingText: "We look forward to celebrating with you!",
    creditText: "Created with love by",
    creditHandle: "@shazneen_fathimaaaa",
    creditUrl:
      "https://www.instagram.com/shazneen_fathimaaaa?mdxt=YnJ5NnZmMzIya3ht",
  },
};

export default invitationConfig;
