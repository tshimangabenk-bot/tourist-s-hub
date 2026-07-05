import type { LanguageLesson } from "@/lib/types";

/**
 * Zambia has 70+ languages; English is official. These are four of the most
 * widely spoken, with practical traveller phrases. Pronunciations are simplified
 * English-friendly approximations.
 */
export const LANGUAGES: LanguageLesson[] = [
  {
    id: "bemba",
    language: "Bemba",
    nativeName: "Ichibemba",
    speakers: "~5 million (lingua franca of the north & Copperbelt)",
    regions: ["Copperbelt", "Northern", "Luapula", "Muchinga"],
    greeting: "Muli shani?",
    about:
      "Bemba is the most widely spoken indigenous language and dominates the Copperbelt and northern Zambia. Knowing a few words goes a long way in markets and on buses.",
    phrases: [
      { english: "Hello / How are you?", local: "Muli shani?", pronunciation: "moo-lee SHAH-nee" },
      { english: "I'm fine", local: "Ndi bwino", pronunciation: "n-dee BWEE-noh" },
      { english: "Thank you", local: "Natotela", pronunciation: "nah-toh-TEH-lah" },
      { english: "Please", local: "Napapata", pronunciation: "nah-pah-PAH-tah" },
      { english: "Yes / No", local: "Ee / Awe", pronunciation: "EH-eh / AH-weh" },
      { english: "How much?", local: "Nishani?", pronunciation: "nee-SHAH-nee" },
      { english: "Goodbye", local: "Shalenipo", pronunciation: "shah-leh-NEE-poh" },
      { english: "Water", local: "Amenshi", pronunciation: "ah-MEN-shee" },
    ],
  },
  {
    id: "nyanja",
    language: "Nyanja / Chewa",
    nativeName: "Chinyanja",
    speakers: "~2 million+ (lingua franca of Lusaka & the east)",
    regions: ["Lusaka", "Eastern"],
    greeting: "Muli bwanji?",
    about:
      "Nyanja (Chichewa) is the everyday language of the capital, Lusaka, and the east. It's the most useful language for tourists passing through the city.",
    phrases: [
      { english: "Hello / How are you?", local: "Muli bwanji?", pronunciation: "moo-lee BWAN-jee" },
      { english: "I'm fine", local: "Ndili bwino", pronunciation: "n-DEE-lee BWEE-noh" },
      { english: "Thank you (very much)", local: "Zikomo (kwambiri)", pronunciation: "zee-KOH-moh kwam-BEE-ree" },
      { english: "Please", local: "Chonde", pronunciation: "CHON-deh" },
      { english: "Yes / No", local: "Inde / Ayi", pronunciation: "EEN-deh / AH-yee" },
      { english: "How much?", local: "Ndi zingati?", pronunciation: "n-dee zin-GAH-tee" },
      { english: "Goodbye", local: "Tsalani bwino", pronunciation: "tsah-LAH-nee BWEE-noh" },
      { english: "Food", local: "Chakudya", pronunciation: "chah-KOO-jah" },
    ],
  },
  {
    id: "tonga",
    language: "Tonga",
    nativeName: "Chitonga",
    speakers: "~1.5 million (southern Zambia)",
    regions: ["Southern"],
    greeting: "Mwabuka buti?",
    about:
      "Tonga is spoken across the south, including around Livingstone and Victoria Falls — the region most tourists visit first.",
    phrases: [
      { english: "Good morning", local: "Mwabuka buti?", pronunciation: "mwah-BOO-kah BOO-tee" },
      { english: "I'm fine", local: "Ndakabota", pronunciation: "n-dah-kah-BOH-tah" },
      { english: "Thank you", local: "Twalumba", pronunciation: "twah-LOOM-bah" },
      { english: "Please", local: "Ndalomba", pronunciation: "n-dah-LOM-bah" },
      { english: "Yes / No", local: "Ee / Peepe", pronunciation: "EH-eh / PEH-peh" },
      { english: "How much?", local: "Nzyongaye?", pronunciation: "n-zyon-GAH-yeh" },
      { english: "Goodbye", local: "Mukkale kabotu", pronunciation: "moo-KAH-leh kah-BOH-too" },
      { english: "Water", local: "Maanzi", pronunciation: "MAAN-zee" },
    ],
  },
  {
    id: "lozi",
    language: "Lozi",
    nativeName: "Silozi",
    speakers: "~750,000 (western Zambia / Barotseland)",
    regions: ["Western"],
    greeting: "Mu zuhile cwañi?",
    about:
      "Lozi is the language of Barotseland in the west — the region of the Liuwa Plain and the famous Kuomboka ceremony.",
    phrases: [
      { english: "Good morning", local: "Mu zuhile cwañi?", pronunciation: "moo zoo-HEE-leh CHWAN-yee" },
      { english: "I'm fine", local: "Ni pilile hande", pronunciation: "nee pee-LEE-leh HAN-deh" },
      { english: "Thank you", local: "Ni itumezi", pronunciation: "nee ee-too-MEH-zee" },
      { english: "Please", local: "Sha", pronunciation: "shah" },
      { english: "Yes / No", local: "Eni / Batili", pronunciation: "EH-nee / bah-TEE-lee" },
      { english: "How much?", local: "Ki bukai?", pronunciation: "kee boo-KAH-ee" },
      { english: "Goodbye", local: "Mu siyale hande", pronunciation: "moo see-YAH-leh HAN-deh" },
      { english: "Water", local: "Mezi", pronunciation: "MEH-zee" },
    ],
  },
];
