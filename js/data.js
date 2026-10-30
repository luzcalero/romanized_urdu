// Song library and lyrics data
// Each line contains timestamps, Romanized Urdu lyrics, English translation,
// target blank word for test mode, and optional vocabulary notes.

const SONGS = [
  {
    id: "pasoori",
    title: "Pasoori",
    artist: "Ali Sethi x Shae Gill",
    album: "Coke Studio Season 14",
    youtubeId: "5Eqb_-j3FDA",
    thumbnail: "https://img.youtube.com/vi/5Eqb_-j3FDA/maxresdefault.jpg",
    difficulty: "Beginner - Intermediate",
    description: "The global hit blend of Punjabi & Urdu folk-pop exploring love, longings, and passionate defiance.",
    lines: [
      {
        id: 0,
        start: 24.5,
        end: 28.0,
        roman: "Agg lavan majboori nu",
        english: "Set fire to all compulsions and helplessness",
        urduScript: "اگ لاواں مجبوری نوں",
        blankWord: "majboori",
        singer: "Ali Sethi",
        vocab: [
          { word: "Agg", meaning: "Fire" },
          { word: "Lavan", meaning: "To set / apply" },
          { word: "Majboori", meaning: "Compulsion / helplessness" }
        ]
      },
      {
        id: 1,
        start: 28.0,
        end: 31.5,
        roman: "Aan jaan di pasoori nu",
        english: "To the hassle of coming and going",
        urduScript: "آن جان دی پسوری نوں",
        blankWord: "pasoori",
        singer: "Ali Sethi",
        vocab: [
          { word: "Aan jaan", meaning: "Coming and going" },
          { word: "Pasoori", meaning: "Conflict / hassle / predicament" }
        ]
      },
      {
        id: 2,
        start: 31.5,
        end: 34.5,
        roman: "Zehar bane haan teri",
        english: "Even if your love turns into poison",
        urduScript: "زہر بنے ہاں تیری",
        blankWord: "zehar",
        singer: "Ali Sethi",
        vocab: [
          { word: "Zehar", meaning: "Poison" },
          { word: "Bane", meaning: "Becomes" }
        ]
      },
      {
        id: 3,
        start: 34.5,
        end: 38.0,
        roman: "Pee jaavan main poori nu",
        english: "I will drink it all down completely",
        urduScript: "پی جاواں میں پوری نوں",
        blankWord: "poori",
        singer: "Ali Sethi",
        vocab: [
          { word: "Pee jaavan", meaning: "I would drink" },
          { word: "Poori", meaning: "Entire / complete" }
        ]
      },
      {
        id: 4,
        start: 38.0,
        end: 41.2,
        roman: "Aana si o nai aaya",
        english: "They were supposed to come, but never did",
        urduScript: "آنا سی او نئی آیا",
        blankWord: "aaya",
        singer: "Ali Sethi",
        vocab: [
          { word: "Aana si", meaning: "Was supposed to come" },
          { word: "Nai aaya", meaning: "Did not come" }
        ]
      },
      {
        id: 5,
        start: 41.2,
        end: 44.8,
        roman: "Dil baang baang mera takraya",
        english: "My heart pounded and clashed restlessly",
        urduScript: "دل بانگ بانگ میرا ٹکرایا",
        blankWord: "dil",
        singer: "Ali Sethi",
        vocab: [
          { word: "Dil", meaning: "Heart" },
          { word: "Takraya", meaning: "Collided / hammered" }
        ]
      },
      {
        id: 6,
        start: 44.8,
        end: 48.0,
        roman: "Kaga bol ke dus jaavein",
        english: "May the crow caw and bring me the news",
        urduScript: "کاگا بول کے دس جاویں",
        blankWord: "kaga",
        singer: "Ali Sethi",
        vocab: [
          { word: "Kaga", meaning: "Crow (harbinger of guests/news in folklore)" },
          { word: "Dus jaavein", meaning: "Tell me / inform" }
        ]
      },
      {
        id: 7,
        start: 48.0,
        end: 51.5,
        roman: "Paavan gheyo dee choori nu",
        english: "And I will prepare a sweet treat of clarified butter and bread",
        urduScript: "پاواں گھیو دی چوری نوں",
        blankWord: "choori",
        singer: "Ali Sethi",
        vocab: [
          { word: "Gheyo", meaning: "Ghee / clarified butter" },
          { word: "Choori", meaning: "Traditional sweet crushed bread" }
        ]
      },
      {
        id: 8,
        start: 51.5,
        end: 57.5,
        roman: "Raawaan ch baawan ch o nu lukawaan",
        english: "In my pathways and in my embrace I will hide my beloved",
        urduScript: "راواں چ باواں چ او نوں لکاواں",
        blankWord: "lukawaan",
        singer: "Ali Sethi",
        vocab: [
          { word: "Raawaan", meaning: "Paths / roads" },
          { word: "Baawan", meaning: "Arms / embrace" },
          { word: "Lukawaan", meaning: "I will hide" }
        ]
      },
      {
        id: 9,
        start: 57.5,
        end: 64.0,
        roman: "Koi mainu na roke",
        english: "Let nobody stop me now",
        urduScript: "کوئی مینوں نہ روکے",
        blankWord: "roke",
        singer: "Ali Sethi",
        vocab: [
          { word: "Mainu", meaning: "Me" },
          { word: "Roke", meaning: "Stop / prevent" }
        ]
      },
      {
        id: 10,
        start: 64.0,
        end: 70.0,
        roman: "Mere dhol judaiyaan di, tenu khabar kivein hove",
        english: "My beloved, how could you ever know the agony of our separation?",
        urduScript: "میرے ڈھول جدائیاں دی تینوں خبر کیویں ہووے",
        blankWord: "judaiyaan",
        singer: "Ali Sethi",
        vocab: [
          { word: "Dhol", meaning: "Beloved / sweetheart" },
          { word: "Judaiyaan", meaning: "Separations / parting" },
          { word: "Khabar", meaning: "News / awareness" }
        ]
      },
      {
        id: 11,
        start: 70.0,
        end: 76.5,
        roman: "Aa jaave dil tera, poora vi na hove",
        english: "May you fall in love, and may your yearning heart never be satiated",
        urduScript: "آ جاوے دل تیرا پورا وی نہ ہووے",
        blankWord: "tera",
        singer: "Ali Sethi",
        vocab: [
          { word: "Aa jaave dil", meaning: "Fall in love" },
          { word: "Poora na hove", meaning: "Never be fulfilled / healed" }
        ]
      },
      {
        id: 12,
        start: 76.5,
        end: 82.5,
        roman: "Haan baniyan banaiyaan di, gal baat kivein hove",
        english: "How can predetermined destinies be altered through mere talk?",
        urduScript: "ہاں بنیاں بنائیاں دی گل بات کیویں ہووے",
        blankWord: "baat",
        singer: "Ali Sethi",
        vocab: [
          { word: "Baniyan banaiyaan", meaning: "Pre-established fates / matters" },
          { word: "Gal baat", meaning: "Conversation / discussion" }
        ]
      },
      {
        id: 13,
        start: 82.5,
        end: 88.5,
        roman: "Aa jaave dil tera, poora vi na hove",
        english: "May you fall in love, and may your longing remain restless",
        urduScript: "آ جاوے دل تیرا پورا وی نہ ہووے",
        blankWord: "poora",
        singer: "Ali Sethi",
        vocab: [
          { word: "Dil tera", meaning: "Your heart" },
          { word: "Poora", meaning: "Complete / fulfilled" }
        ]
      },
      {
        id: 14,
        start: 88.5,
        end: 92.0,
        roman: "Bhul gayi majboori nu",
        english: "I forgot all about my helplessness",
        urduScript: "بھل گئی مجبوری نوں",
        blankWord: "bhul",
        singer: "Shae Gill",
        vocab: [
          { word: "Bhul gayi", meaning: "Forgot" },
          { word: "Majboori", meaning: "Compulsion / helplessness" }
        ]
      },
      {
        id: 15,
        start: 92.0,
        end: 95.0,
        roman: "Duniya di dastoori nu",
        english: "And all the rigid customs of the world",
        urduScript: "دنیا دی دستوری نوں",
        blankWord: "dastoori",
        singer: "Shae Gill",
        vocab: [
          { word: "Duniya", meaning: "World" },
          { word: "Dastoori", meaning: "Customs / traditions / protocol" }
        ]
      },
      {
        id: 16,
        start: 95.0,
        end: 98.5,
        roman: "Saath tera hai bathera",
        english: "Your companionship is more than enough for me",
        urduScript: "ساتھ تیرا ہے بتھیرا",
        blankWord: "saath",
        singer: "Shae Gill",
        vocab: [
          { word: "Saath", meaning: "Companionship / presence" },
          { word: "Bathera", meaning: "Plenty / more than enough" }
        ]
      },
      {
        id: 17,
        start: 98.5,
        end: 102.0,
        roman: "Poora kar zaroori nu",
        english: "Fulfill that which is truly essential",
        urduScript: "پورا کر ضروری نوں",
        blankWord: "zaroori",
        singer: "Shae Gill",
        vocab: [
          { word: "Poora kar", meaning: "Complete / fulfill" },
          { word: "Zaroori", meaning: "Essential / necessary" }
        ]
      },
      {
        id: 18,
        start: 102.0,
        end: 105.0,
        roman: "Aana si o nai aaya",
        english: "They promised to come, yet never arrived",
        urduScript: "آنا سی او نئی آیا",
        blankWord: "aana",
        singer: "Shae Gill",
        vocab: [
          { word: "Aana si", meaning: "Was supposed to come" },
          { word: "Nai aaya", meaning: "Did not come" }
        ]
      },
      {
        id: 19,
        start: 105.0,
        end: 108.5,
        roman: "Raasta na dikhlaaya",
        english: "Nor did they show me the way forward",
        urduScript: "راستہ نہ دکھلایا",
        blankWord: "raasta",
        singer: "Shae Gill",
        vocab: [
          { word: "Raasta", meaning: "Path / way" },
          { word: "Dikhlaaya", meaning: "Showed" }
        ]
      },
      {
        id: 20,
        start: 108.5,
        end: 112.0,
        roman: "Dil humara de sahara",
        english: "May this heart of ours provide comfort and solace",
        urduScript: "دل ہمارا دے سہارا",
        blankWord: "sahara",
        singer: "Shae Gill",
        vocab: [
          { word: "Humara", meaning: "Our" },
          { word: "Sahara", meaning: "Support / solace" }
        ]
      },
      {
        id: 21,
        start: 112.0,
        end: 115.5,
        roman: "Khaahishaat adhoori nu",
        english: "To these unfulfilled, aching desires",
        urduScript: "خواہشات ادھوری نوں",
        blankWord: "adhoori",
        singer: "Shae Gill",
        vocab: [
          { word: "Khaahishaat", meaning: "Desires / wishes" },
          { word: "Adhoori", meaning: "Incomplete / unfulfilled" }
        ]
      },
      {
        id: 22,
        start: 115.5,
        end: 121.5,
        roman: "Waari main jaavan, main tenu bulavaan",
        english: "I devote myself entirely, calling out your name",
        urduScript: "واری میں جاواں میں تینوں بلاواں",
        blankWord: "bulavaan",
        singer: "Shae Gill",
        vocab: [
          { word: "Waari jaavan", meaning: "To sacrifice / devote oneself" },
          { word: "Bulavaan", meaning: "I call out" }
        ]
      },
      {
        id: 23,
        start: 121.5,
        end: 127.0,
        roman: "Gal saari taan hove",
        english: "If only our unresolved story could be spoken fully",
        urduScript: "گل ساری تاں ہووے",
        blankWord: "saari",
        singer: "Shae Gill",
        vocab: [
          { word: "Gal", meaning: "Talk / story" },
          { word: "Saari", meaning: "All / complete" }
        ]
      },
      {
        id: 24,
        start: 127.0,
        end: 133.0,
        roman: "Mere dhol judaiyaan di, tenu khabar kivein hove",
        english: "My beloved, how could you ever know the agony of our separation?",
        urduScript: "میرے ڈھول جدائیاں دی تینوں خبر کیویں ہووے",
        blankWord: "dhol",
        singer: "Shae Gill",
        vocab: [
          { word: "Dhol", meaning: "Beloved" },
          { word: "Judaiyaan", meaning: "Separations" }
        ]
      },
      {
        id: 25,
        start: 133.0,
        end: 139.5,
        roman: "Aa jaave dil tera, poora vi na hove",
        english: "May love enter your heart, and may it never feel whole",
        urduScript: "آ جاوے دل تیرا پورا وی نہ ہووے",
        blankWord: "hove",
        singer: "Shae Gill",
        vocab: [
          { word: "Dil tera", meaning: "Your heart" },
          { word: "Hove", meaning: "Happens / becomes" }
        ]
      },
      {
        id: 26,
        start: 139.5,
        end: 145.5,
        roman: "Haan baniyan banaiyaan di, gal baat kivein hove",
        english: "How can predetermined destinies be altered through mere talk?",
        urduScript: "ہاں بنیاں بنائیاں دی گل بات کیویں ہووے",
        blankWord: "baniyan",
        singer: "Shae Gill",
        vocab: [
          { word: "Kivein", meaning: "How" }
        ]
      },
      {
        id: 27,
        start: 145.5,
        end: 152.0,
        roman: "Aa jaave dil tera, poora vi na hove",
        english: "May love strike you, leaving your heart forever yearning",
        urduScript: "آ جاوے دل تیرا پورا وی نہ ہووے",
        blankWord: "dil",
        singer: "Shae Gill",
        vocab: [
          { word: "Dil", meaning: "Heart" }
        ]
      },
      {
        id: 28,
        start: 152.0,
        end: 158.5,
        roman: "Mere dhol judaiyaan di sardaari na hove",
        english: "May separation from my beloved never rule our destiny",
        urduScript: "میرے ڈھول جدائیاں دی سرداری نہ ہووے",
        blankWord: "sardaari",
        singer: "Ali Sethi & Shae Gill",
        vocab: [
          { word: "Sardaari", meaning: "Dominance / rule / reign" }
        ]
      },
      {
        id: 29,
        start: 158.5,
        end: 165.0,
        roman: "Dildaaran di, sab yaaran di, aazaari na hove",
        english: "May compassionate lovers and friends never suffer such distress",
        urduScript: "دلداراں دی سب یاراں دی آزاری نہ ہووے",
        blankWord: "yaaran",
        singer: "Ali Sethi & Shae Gill",
        vocab: [
          { word: "Dildaaran", meaning: "Lovers / generous hearts" },
          { word: "Yaaran", meaning: "Friends / companions" },
          { word: "Aazaari", meaning: "Pain / affliction / ailment" }
        ]
      },
      {
        id: 30,
        start: 165.0,
        end: 171.0,
        roman: "Aa chalein le ke tujhe, hai jahaan silsilay",
        english: "Come, let me take you away to where connections flow free",
        urduScript: "آ چلیں لے کے تجھے ہے جہاں سلسلے",
        blankWord: "silsilay",
        singer: "Ali Sethi & Shae Gill",
        vocab: [
          { word: "Chalein", meaning: "Let us go" },
          { word: "Silsilay", meaning: "Connections / stories / unbroken chains" }
        ]
      },
      {
        id: 31,
        start: 171.0,
        end: 176.5,
        roman: "Tu hai wahi, hai teri kami",
        english: "You are the one, yet your absence is profoundly felt",
        urduScript: "تو ہے وہی ہے تیری کمی",
        blankWord: "kami",
        singer: "Ali Sethi & Shae Gill",
        vocab: [
          { word: "Wahi", meaning: "That very one" },
          { word: "Kami", meaning: "Shortage / absence / void" }
        ]
      },
      {
        id: 32,
        start: 176.5,
        end: 183.0,
        roman: "Bana de, saza de, panah de hume",
        english: "Shape us, discipline us, or give us sanctuary",
        urduScript: "بنا دے سزا دے پناہ دے ہمیں",
        blankWord: "panah",
        singer: "Ali Sethi & Shae Gill",
        vocab: [
          { word: "Bana de", meaning: "Create / form" },
          { word: "Saza de", meaning: "Punish / adorn" },
          { word: "Panah de", meaning: "Give shelter / asylum" }
        ]
      },
      {
        id: 33,
        start: 183.0,
        end: 196.0,
        roman: "Agg lavan majboori nu, aan jaan di pasoori nu",
        english: "Set fire to our helplessness, and to all the hassles of parting",
        urduScript: "اگ لاواں مجبوری نوں، آن جان دی پسوری نوں",
        blankWord: "pasoori",
        singer: "Ali Sethi & Shae Gill",
        vocab: [
          { word: "Majboori", meaning: "Helplessness" },
          { word: "Pasoori", meaning: "Hassle / turmoil" }
        ]
      },
      {
        id: 34,
        start: 196.0,
        end: 215.0,
        roman: "Aa jaave dil tera, poora vi na hove",
        english: "May love fill your heart, and may it ever remain insatiable",
        urduScript: "آ جاوے دل تیرا پورا وی نہ ہووے",
        blankWord: "poora",
        singer: "Ali Sethi & Shae Gill",
        vocab: [
          { word: "Poora na hove", meaning: "Never be completely settled" }
        ]
      }
    ]
  }
];

// Attach to window object for straightforward client-side access
if (typeof window !== "undefined") {
  window.SONGS = SONGS;
}
