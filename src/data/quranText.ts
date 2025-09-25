// Basic Quran Arabic text data for scrolling display
// This includes the most commonly recited surahs with their Arabic text

export interface QuranVerse {
  number: number;
  arabic: string;
  transliteration?: string;
}

export interface QuranSurahText {
  number: number;
  verses: QuranVerse[];
}

export const quranText: QuranSurahText[] = [
  {
    number: 1, // Al-Fatihah
    verses: [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
      { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ" },
      { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ" },
      { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ" },
      { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" },
      { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ" },
      { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ" }
    ]
  },
  {
    number: 112, // Al-Ikhlas
    verses: [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
      { number: 2, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ" },
      { number: 3, arabic: "اللَّهُ الصَّمَدُ" },
      { number: 4, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ" },
      { number: 5, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ" }
    ]
  },
  {
    number: 113, // Al-Falaq
    verses: [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
      { number: 2, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ" },
      { number: 3, arabic: "مِن شَرِّ مَا خَلَقَ" },
      { number: 4, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ" },
      { number: 5, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ" },
      { number: 6, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ" }
    ]
  },
  {
    number: 114, // An-Nas
    verses: [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
      { number: 2, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ" },
      { number: 3, arabic: "مَلِكِ النَّاسِ" },
      { number: 4, arabic: "إِلَٰهِ النَّاسِ" },
      { number: 5, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ" },
      { number: 6, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ" },
      { number: 7, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ" }
    ]
  }
];

// Default fallback text for surahs not in the database
export const getDefaultArabicText = (surahName: string) => {
  return [
    { number: 1, arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ" },
    { number: 2, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
    { number: 3, arabic: surahName }
  ];
};

export const getSurahText = (surahNumber: number): QuranVerse[] => {
  const surahText = quranText.find(s => s.number === surahNumber);
  return surahText?.verses || getDefaultArabicText(`سورة رقم ${surahNumber}`);
};