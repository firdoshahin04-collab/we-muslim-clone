export interface Dua {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  category: string;
}

export const DUAS: Dua[] = [
  { 
    id: 1, 
    title: "Dua for Protection", 
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", 
    transliteration: "Bismillahilladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim",
    meaning: "In the Name of Allah with Whose Name there is protection against every kind of harm in the earth or in the heaven, and He is the All-Hearing and All-Knowing.",
    category: "Protection"
  },
  { 
    id: 2, 
    title: "Dua for Forgiveness", 
    arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", 
    transliteration: "Rabbana-ghfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    meaning: "Our Lord! Forgive us our sins and our transgressions (in keeping our duties to You), establish our feet firmly, and give us victory over the disbelieving folk.",
    category: "Forgiveness"
  },
  { 
    id: 3, 
    title: "Dua for Knowledge", 
    arabic: "رَّبِّ زِدْنِي عِلْمًا", 
    transliteration: "Rabbi zidni 'ilma",
    meaning: "My Lord, increase me in knowledge.",
    category: "Knowledge"
  },
  {
    id: 4,
    title: "Dua for Parents",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbi-rhamhuma kama rabbayani saghira",
    meaning: "My Lord, have mercy upon them as they brought me up [when I was] small.",
    category: "Family"
  },
  {
    id: 5,
    title: "Dua for Patience",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    meaning: "Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.",
    category: "Patience"
  },
  {
    id: 6,
    title: "Dua for Anxiety",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani, wal-'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala'id-dayni, wa ghalabatir-rijal",
    meaning: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
    category: "Protection"
  },
  {
    id: 7,
    title: "Dua for Morning",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration: "Asbahna wa asbahal-mulku lillahi, wal-hamdu lillahi, la ilaha illallahu wahdahu la sharika lahu",
    meaning: "We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped but Allah alone.",
    category: "Daily"
  },
  {
    id: 8,
    title: "Dua for Evening",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration: "Amsayna wa amsayal-mulku lillahi, wal-hamdu lillahi, la ilaha illallahu wahdahu la sharika lahu",
    meaning: "We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah. None has the right to be worshipped but Allah alone.",
    category: "Daily"
  },
  {
    id: 9,
    title: "Dua for Traveling",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    transliteration: "Subhanalladhi sakh-khara lana hadha wa ma kunna lahu muqrinina wa inna ila Rabbina lamunqalibun",
    meaning: "Glory is to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning.",
    category: "Travel"
  },
  {
    id: 10,
    title: "Dua for Success",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    meaning: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    category: "Success"
  },
  {
    id: 11,
    title: "Dua for Health",
    arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَدَنِي",
    transliteration: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari",
    meaning: "O Allah, make me healthy in my body. O Allah, make me healthy in my hearing. O Allah, make me healthy in my sight.",
    category: "Health"
  },
  {
    id: 12,
    title: "Dua for Ease",
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahlan, wa Anta taj'alul-hazna idha shi'ta sahlan",
    meaning: "O Allah, there is no ease except in that which You have made easy, and You make the difficulty, if You wish, easy.",
    category: "Success"
  },
  {
    id: 13,
    title: "Dua for Guidance",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
    meaning: "O Allah, I ask You for guidance, piety, chastity and self-sufficiency.",
    category: "Knowledge"
  },
  {
    id: 14,
    title: "Dua for Entering Mosque",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahummaf-tah li abwaba rahmatik",
    meaning: "O Allah, open the gates of Your mercy for me.",
    category: "Daily"
  },
  {
    id: 15,
    title: "Dua for Leaving Mosque",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    transliteration: "Allahumma inni as'aluka min fadlik",
    meaning: "O Allah, I ask You from Your favor.",
    category: "Daily"
  },
  {
    id: 16,
    title: "Dua for Breaking Fast",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahabadh-dhama'u wabtallatil-'uruqu wa thabatal-ajru in sha' Allah",
    meaning: "The thirst is gone, the veins are moistened and the reward is confirmed, if Allah wills.",
    category: "Daily"
  },
  {
    id: 17,
    title: "Dua for Entering Home",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna",
    meaning: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.",
    category: "Daily"
  },
  {
    id: 18,
    title: "Dua for Leaving Home",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillahi, tawakkaltu 'alallahi, la hawla wa la quwwata illa billah",
    meaning: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
    category: "Daily"
  },
  {
    id: 19,
    title: "Dua for After Prayer",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    meaning: "O Allah, help me to remember You, to give thanks to You, and to worship You in the best manner.",
    category: "Daily"
  },
  {
    id: 20,
    title: "Dua for Relief from Debt",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    transliteration: "Allahumma-kfini bihalalika 'an haramika, wa aghnini bifadlika 'amman siwak",
    meaning: "O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.",
    category: "Success"
  },
  {
    id: 21,
    title: "Dua for Sleeping",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    meaning: "In Your name, O Allah, I die and I live.",
    category: "Daily"
  },
  {
    id: 22,
    title: "Dua for Waking Up",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    meaning: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    category: "Daily"
  },
  {
    id: 23,
    title: "Dua for Istikhara",
    arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ",
    transliteration: "Allahumma inni astakhiruka bi'ilmika wa astaqdiruka biqudratika wa as'aluka min fadlikal-'azim",
    meaning: "O Allah, I seek Your counsel through Your knowledge and I seek Your assistance through Your power and I ask You from Your immense favor.",
    category: "Success"
  },
  {
    id: 24,
    title: "Dua for Sickness (Shifa)",
    arabic: "أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفاؤُكَ",
    transliteration: "Adhhibil-bas Rabbin-nas, ishfi wa Antash-Shafi, la shifa'a illa shifa'uk",
    meaning: "Remove the harm, O Lord of the people! Heal, for You are the Healer. There is no healing but Your healing.",
    category: "Health"
  },
  {
    id: 25,
    title: "Dua for Children",
    arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ",
    transliteration: "Rabbi hab li mil-ladunka dhurriyyatan tayyibatan innaka Sami'ud-du'a",
    meaning: "My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.",
    category: "Family"
  },
  {
    id: 26,
    title: "Dua for Sustenance (Rizq)",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
    meaning: "O Allah, I ask You for knowledge that is of benefit, a good provision and deeds that will be accepted.",
    category: "Success"
  },
  {
    id: 27,
    title: "Dua for Anger",
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "A'udhu billahi minash-shaytanir-rajim",
    meaning: "I seek refuge in Allah from Satan the outcast.",
    category: "Protection"
  },
  {
    id: 28,
    title: "Dua for Wearing Clothes",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil-ladhi kasani hadha wa razaqanihi min ghayri hawlim-minni wa la quwwah",
    meaning: "All praise is for Allah who has clothed me with this garment and provided it for me, with no power nor might from myself.",
    category: "Daily"
  },
  {
    id: 29,
    title: "Dua for Looking in Mirror",
    arabic: "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    transliteration: "Allahumma Anta hassanta khalqi fahassin khuluqi",
    meaning: "O Allah, You have made my creation beautiful, so make my character beautiful.",
    category: "Daily"
  },
  {
    id: 30,
    title: "Dua for Laylatul Qadr",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'Afuwwun tuhibbul-'afwa fa'fu 'anni",
    meaning: "O Allah, You are Forgiving and You love forgiveness, so forgive me.",
    category: "Forgiveness"
  },
  {
    id: 31,
    title: "Dua for Parents (2)",
    arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    transliteration: "Rabbana-ghfir li wa liwalidayya wa lil-mu'minina yawma yaqumul-hisab",
    meaning: "Our Lord, forgive me and my parents and the believers the Day the account is established.",
    category: "Family"
  },
  {
    id: 32,
    title: "Dua for Good Character",
    arabic: "اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَعْمَالِ وَأَحْسَنِ الْأَخْلَاقِ لَا يَهْدِي لِأَحْسَنِهَا إِلَّا أَنْتَ",
    transliteration: "Allahummah-dini li-ahsanil-a'mali wa ahsanil-akhlaqi la yahdi li-ahsaniha illa Anta",
    meaning: "O Allah, guide me to the best of deeds and the best of manners, for none can guide to the best of them but You.",
    category: "Knowledge"
  },
  {
    id: 33,
    title: "Dua for Protection from Hell",
    arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا",
    transliteration: "Rabbanas-rif 'anna 'adhaba jahannama inna 'adhabaha kana gharama",
    meaning: "Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering.",
    category: "Protection"
  },
  {
    id: 34,
    title: "Dua for a Good Ending",
    arabic: "تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
    transliteration: "Tawaffani Musliman wa al-hiqni bis-salihin",
    meaning: "Cause me to die a Muslim and join me with the righteous.",
    category: "Success"
  },
  {
    id: 35,
    title: "Dua for Rain",
    arabic: "اللَّهُمَّ أَغِثْنَا، اللَّهُمَّ أَغِثْنَا، اللَّهُمَّ أَغِثْنَا",
    transliteration: "Allahumma aghithna, Allahumma aghithna, Allahumma aghithna",
    meaning: "O Allah, provide us with rain. O Allah, provide us with rain. O Allah, provide us with rain.",
    category: "Daily"
  },
  {
    id: 36,
    title: "Dua for Entering Market",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ",
    transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu, yuhyi wa yumitu, wa Huwa hayyun la yamutu",
    meaning: "None has the right to be worshipped but Allah alone, Who has no partner. His is the dominion and His is the praise. He brings life and He causes death, and He is living and does not die.",
    category: "Daily"
  },
  {
    id: 37,
    title: "Dua for Sneezing",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdu lillah",
    meaning: "All praise is for Allah.",
    category: "Daily"
  },
  {
    id: 38,
    title: "Dua for After Wudu",
    arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration: "Ashhadu an la ilaha illallahu wahdahu la sharika lahu wa ashhadu anna Muhammadan 'abduhu wa Rasuluhu",
    meaning: "I bear witness that none has the right to be worshipped but Allah alone, Who has no partner; and I bear witness that Muhammad is His slave and His Messenger.",
    category: "Daily"
  },
  {
    id: 39,
    title: "Dua for Protection from Evil Eye",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
    transliteration: "A'udhu bikalimatil-lahit-tammati min kulli shaytanin wa hammatin wa min kulli 'aynin lammah",
    meaning: "I seek refuge in the perfect words of Allah from every devil and every poisonous creature and from every evil eye.",
    category: "Protection"
  },
  {
    id: 40,
    title: "Dua for Forgiveness (Sayyidul Istighfar)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika ma-stata'tu",
    meaning: "O Allah, You are my Lord, none has the right to be worshipped but You. You created me and I am Your slave, and I am faithful to my covenant and my promise as much as I can.",
    category: "Forgiveness"
  },
  {
    id: 41,
    title: "Dua for Ease in Speech",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
    transliteration: "Rabbi-shrah li sadri wa yassir li amri wahlul 'uqdatam-mil-lisani yafqahu qawli",
    meaning: "My Lord, expand for me my breast and ease for me my task and untie the knot from my tongue that they may understand my speech.",
    category: "Knowledge"
  },
  {
    id: 42,
    title: "Dua for Protection from Dajjal",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِن عَذَابِ جَهَنَّمَ، وَمِن فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِن شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    transliteration: "Allahumma inni a'udhu bika min 'adhabil-qabri, wa min 'adhabi jahannama, wa min fitnatil-mahya wal-mamati, wa min sharri fitnatil-masihid-dajjal",
    meaning: "O Allah, I seek refuge in You from the punishment of the grave, and from the punishment of Hell, and from the trials of life and death, and from the evil of the trial of the False Messiah.",
    category: "Protection"
  },
  {
    id: 43,
    title: "Dua for Steadfastness",
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    transliteration: "Ya Muqallibal-qulubi thabbit qalbi 'ala dinik",
    meaning: "O Controller of the hearts, make my heart steadfast in Your religion.",
    category: "Patience"
  },
  {
    id: 44,
    title: "Dua for Gratitude",
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ",
    transliteration: "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya",
    meaning: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents.",
    category: "Family"
  },
  {
    id: 45,
    title: "Dua for a Good Spouse and Children",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
    meaning: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
    category: "Family"
  },
  {
    id: 46,
    title: "Dua for Protection from Debt and Oppression",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani, wal-'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala'id-dayni, wa ghalabatir-rijal",
    meaning: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
    category: "Success"
  },
  {
    id: 47,
    title: "Dua for Entering a City",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهَا",
    transliteration: "Allahumma barik lana fiha",
    meaning: "O Allah, bless us in it.",
    category: "Travel"
  },
  {
    id: 48,
    title: "Dua for Protection from Calamities",
    arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
    transliteration: "Allahummah-fazni min bayni yadayya, wa min khalfi, wa 'an yamini, wa 'an shimali, wa min fawqi, wa a'udhu bi'azamatika an ughtala min tahti",
    meaning: "O Allah, protect me from my front and my back, from my right and my left, and from above me, and I seek refuge in Your greatness from being swallowed up from beneath me.",
    category: "Protection"
  },
  {
    id: 49,
    title: "Dua for When in Difficulty",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal-wakil",
    meaning: "Allah is sufficient for us, and He is the best Disposer of affairs.",
    category: "Patience"
  },
  {
    id: 50,
    title: "Dua for Total Protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bikalimatil-lahit-tam-mati min sharri ma khalaq",
    meaning: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    category: "Protection"
  },
  {
    id: 51,
    title: "Dua for New Moon",
    arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ",
    transliteration: "Allahumma ahillahu 'alayna bil-amni wal-imani was-salamati wal-Islami",
    meaning: "O Allah, let this moon appear on us with security and faith; with safety and Islam.",
    category: "Daily"
  },
  {
    id: 52,
    title: "Dua for When it Thunders",
    arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ",
    transliteration: "Subhanalladhi yusabbihur-ra'du bihamdihi wal-mala'ikatu min khifatih",
    meaning: "Glory is to Him Whom the thunder glorifies with His praise and the angels from fear of Him.",
    category: "Daily"
  },
  {
    id: 53,
    title: "Dua for Visiting Graves",
    arabic: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ",
    transliteration: "Assalamu 'alaykum ahlad-diyari minal-mu'minina wal-muslimin",
    meaning: "Peace be upon you, O inhabitants of the dwellings, from the believers and the Muslims.",
    category: "Daily"
  },
  {
    id: 54,
    title: "Dua for Hardship (2)",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
    transliteration: "Ya Hayyu Ya Qayyumu birahmatika astaghith",
    meaning: "O Ever Living, O Self-Subsisting, by Your mercy I seek assistance.",
    category: "Patience"
  },
  {
    id: 55,
    title: "Dua for Protection from Laziness",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْهَرَمِ وَالْبُخْلِ",
    transliteration: "Allahumma inni a'udhu bika minal-'ajzi wal-kasali, wal-jubni wal-harami wal-bukhl",
    meaning: "O Allah, I seek refuge in You from helplessness, laziness, cowardice, senility, and miserliness.",
    category: "Protection"
  },
  {
    id: 56,
    title: "Dua for After Adhan",
    arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ",
    transliteration: "Allahumma Rabba hadhihid-da'watit-tammati was-salatil-qa'imati ati Muhammadanil-wasilata wal-fadhilah",
    meaning: "O Allah, Lord of this perfect call and the prayer to be offered, grant Muhammad the privilege and the excellence.",
    category: "Daily"
  },
  {
    id: 57,
    title: "Dua for Protection of Faith",
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً",
    transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana mil-ladunka rahmah",
    meaning: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy.",
    category: "Patience"
  },
  {
    id: 58,
    title: "Dua for Forgiveness (3)",
    arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma inni zalamtu nafsi zulman kathiran, wa la yaghfirudh-dhunuba illa Anta",
    meaning: "O Allah, I have wronged myself greatly, and none can forgive sins except You.",
    category: "Forgiveness"
  },
  {
    id: 59,
    title: "Dua for Success in Hereafter",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    meaning: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    category: "Success"
  },
  {
    id: 60,
    title: "Dua for Protection from Evil People",
    arabic: "اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ",
    transliteration: "Allahummak-finihim bima shi't",
    meaning: "O Allah, suffice me against them however You wish.",
    category: "Protection"
  },
  {
    id: 61,
    title: "Dua for When Entering the Mosque",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahummaf-tah li abwaba rahmatik",
    meaning: "O Allah, open the gates of Your mercy for me.",
    category: "Daily"
  },
  {
    id: 62,
    title: "Dua for When Leaving the Mosque",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    transliteration: "Allahumma inni as'aluka min fadlik",
    meaning: "O Allah, I ask You from Your favor.",
    category: "Daily"
  },
  {
    id: 63,
    title: "Dua for When it Rains",
    arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    transliteration: "Allahumma sayyiban nafi'an",
    meaning: "O Allah, may it be a beneficial rain.",
    category: "Daily"
  },
  {
    id: 64,
    title: "Dua for After it Rains",
    arabic: "مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ",
    transliteration: "Mutirna bifadlil-lahi wa rahmatih",
    meaning: "We have been given rain by the grace and mercy of Allah.",
    category: "Daily"
  },
  {
    id: 65,
    title: "Dua for When Wind Blows",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا",
    transliteration: "Allahumma inni as'aluka khayraha wa a'udhu bika min sharriha",
    meaning: "O Allah, I ask You for its goodness and seek refuge in You from its evil.",
    category: "Daily"
  },
  {
    id: 66,
    title: "Dua for When Someone Praises You",
    arabic: "اللَّهُمَّ لَا تُؤَاخِذْنِي بِمَا يَقُولُونَ، وَاغْفِرْ لِي مَا لَا يَعْلَمُونَ",
    transliteration: "Allahumma la tu'akhidhni bima yaqulun, waghfir li ma la ya'lamun",
    meaning: "O Allah, do not hold me responsible for what they say, and forgive me for what they do not know.",
    category: "Daily"
  },
  {
    id: 67,
    title: "Dua for When You Fear a Group",
    arabic: "اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ",
    transliteration: "Allahumma inna naj'aluka fi nuhurihim wa na'udhu bika min shururihim",
    meaning: "O Allah, we place You before them and seek refuge in You from their evil.",
    category: "Protection"
  },
  {
    id: 68,
    title: "Dua for When You Experience Doubt",
    arabic: "آمَنْتُ بِاللَّهِ وَرُسُلِهِ",
    transliteration: "Amantu billahi wa Rusulih",
    meaning: "I believe in Allah and His Messengers.",
    category: "Patience"
  },
  {
    id: 69,
    title: "Dua for Protection from Debt (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْمَأْثَمِ وَالْمَغْرَمِ",
    transliteration: "Allahumma inni a'udhu bika minal-ma'thami wal-maghram",
    meaning: "O Allah, I seek refuge in You from sin and debt.",
    category: "Success"
  },
  {
    id: 70,
    title: "Dua for When You Face an Enemy",
    arabic: "اللَّهُمَّ أَنْتَ عَضُدِي، وَأَنْتَ نَصِيرِي، بِكَ أَجُولُ، وَبِكَ أَصُولُ، وَبِكَ أُقَاتِلُ",
    transliteration: "Allahumma Anta 'adudi, wa Anta nasiri, bika ajulu, wa bika asulu, wa bika uqatil",
    meaning: "O Allah, You are my strength and You are my support. For Your sake I go forth and for Your sake I attack and for Your sake I fight.",
    category: "Protection"
  },
  {
    id: 71,
    title: "Dua for When You Fear a Ruler",
    arabic: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ، وَرَبَّ الْعَرْشِ الْعَظِيمِ، كُنْ لِي جَارًا",
    transliteration: "Allahumma Rabba-samawatis-sab'i, wa Rabbal-'arshil-'azim, kun li jaran",
    meaning: "O Allah, Lord of the seven heavens and Lord of the magnificent throne, be for me a protector.",
    category: "Protection"
  },
  {
    id: 72,
    title: "Dua for When You Suffer a Setback",
    arabic: "قَدَّرَ اللَّهُ وَمَا شَاءَ فَعَلَ",
    transliteration: "Qaddarallahu wa ma sha'a fa'al",
    meaning: "Allah has decreed and what He willed, He has done.",
    category: "Patience"
  },
  {
    id: 73,
    title: "Dua for Congratulating a New Parent",
    arabic: "بَارَكَ اللَّهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ",
    transliteration: "Barakallahu laka fil-mawhubi laka, wa shakartal-Wahiba, wa balagha ashuddahu, wa ruziqta birrah",
    meaning: "May Allah bless you in what He has given you, and may you be grateful to the Giver, and may the child reach maturity, and may you be granted his/her righteousness.",
    category: "Family"
  },
  {
    id: 74,
    title: "Dua for Placing a Child Under Allah's Protection",
    arabic: "أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
    transliteration: "U'idhukuma bikalimatil-lahit-tammati min kulli shaytanin wa hammatin wa min kulli 'aynin lammah",
    meaning: "I seek refuge for you both in the perfect words of Allah from every devil and every poisonous creature and from every evil eye.",
    category: "Family"
  },
  {
    id: 75,
    title: "Dua for Visiting the Sick",
    arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
    transliteration: "La ba'sa tahurun in sha' Allah",
    meaning: "No harm, it is a purification, if Allah wills.",
    category: "Health"
  },
  {
    id: 76,
    title: "Dua for When You Lose Hope in Life",
    arabic: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَأَلْحِقْنِي بِالرَّفِيقِ الْأَعْلَى",
    transliteration: "Allahummagh-fir li warhamni wa al-hiqni bir-rafiqil-a'la",
    meaning: "O Allah, forgive me and have mercy on me and join me with the highest companions.",
    category: "Patience"
  },
  {
    id: 77,
    title: "Dua for When You are Stricken by a Calamity",
    arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
    transliteration: "Inna lillahi wa inna ilayhi raji'un, Allahumma-jurni fi musibati wa akhlif li khayran minha",
    meaning: "Surely we belong to Allah and unto Him is our return. O Allah, reward me for my affliction and compensate me with something better than it.",
    category: "Patience"
  },
  {
    id: 78,
    title: "Dua for When You Settle a Debt",
    arabic: "بَارَكَ اللَّهُ لَكَ فِي أَهْلِكَ وَمَالِكَ",
    transliteration: "Barakallahu laka fi ahlika wa malik",
    meaning: "May Allah bless you in your family and your wealth.",
    category: "Success"
  },
  {
    id: 79,
    title: "Dua for When You Fear Shirk",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
    transliteration: "Allahumma inni a'udhu bika an ushrika bika wa ana a'lamu, wa astaghfiruka lima la a'lam",
    meaning: "O Allah, I seek refuge in You from knowingly associating anything with You, and I seek Your forgiveness for what I do not know.",
    category: "Protection"
  },
  {
    id: 80,
    title: "Dua for When You Receive Good News",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
    transliteration: "Alhamdu lillahil-ladhi bini'matihi tatimmus-salihat",
    meaning: "All praise is for Allah by Whose favor good things are accomplished.",
    category: "Success"
  },
  {
    id: 81,
    title: "Dua for When You Receive Bad News",
    arabic: "الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ",
    transliteration: "Alhamdu lillahi 'ala kulli hal",
    meaning: "All praise is for Allah in all circumstances.",
    category: "Patience"
  },
  {
    id: 82,
    title: "Dua for When You are Angry (2)",
    arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي وَأَذْهِبْ غَيْظَ قَلْبِي",
    transliteration: "Allahummagh-fir li dhanbi wa adh-hib ghayza qalbi",
    meaning: "O Allah, forgive my sin and remove the anger of my heart.",
    category: "Protection"
  },
  {
    id: 83,
    title: "Dua for When You See Someone in Affliction",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ وَفَضَّلَنِي عَلَى كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلًا",
    transliteration: "Alhamdu lillahil-ladhi 'afani mimma-btalaka bihi wa faddalani 'ala kathirim-mimman khalaqa tafdila",
    meaning: "All praise is for Allah who has saved me from that which He has afflicted you with and has favored me greatly over many of those whom He has created.",
    category: "Health"
  },
  {
    id: 84,
    title: "Dua for When You Enter a Meeting",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
    transliteration: "Subhanaka Allahumma wa bihamdika, ashhadu an la ilaha illa Anta, astaghfiruka wa atubu ilayk",
    meaning: "Glory is to You, O Allah, and praise. I bear witness that none has the right to be worshipped but You. I seek Your forgiveness and turn to You in repentance.",
    category: "Daily"
  },
  {
    id: 85,
    title: "Dua for When You are Happy",
    arabic: "مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Ma sha' Allah la quwwata illa billah",
    meaning: "What Allah willed [has occurred], there is no power except with Allah.",
    category: "Success"
  },
  {
    id: 86,
    title: "Dua for When You Start a Task",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    meaning: "In the name of Allah.",
    category: "Daily"
  },
  {
    id: 87,
    title: "Dua for When You Finish a Task",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdu lillah",
    meaning: "All praise is for Allah.",
    category: "Daily"
  },
  {
    id: 88,
    title: "Dua for When You are Confused",
    arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
    transliteration: "Allahummah-dini wa saddidni",
    meaning: "O Allah, guide me and keep me on the right path.",
    category: "Knowledge"
  },
  {
    id: 89,
    title: "Dua for When You are Scared",
    arabic: "اللَّهُمَّ اسْتُرْ عَوْرَاتِنَا وَآمِنْ رَوْعَاتِنَا",
    transliteration: "Allahummas-tur 'awratina wa amin raw'atina",
    meaning: "O Allah, conceal our faults and calm our fears.",
    category: "Protection"
  },
  {
    id: 90,
    title: "Dua for When You Want to Repent",
    arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha wa atubu ilayh",
    meaning: "I seek Allah's forgiveness and turn to Him in repentance.",
    category: "Forgiveness"
  },
  {
    id: 91,
    title: "Dua for When You Want to be Grateful",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    meaning: "O Allah, help me to remember You, to give thanks to You, and to worship You in the best manner.",
    category: "Daily"
  },
  {
    id: 92,
    title: "Dua for When You Want to be Patient",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
    transliteration: "Rabbana afrigh 'alayna sabran",
    meaning: "Our Lord, pour upon us patience.",
    category: "Patience"
  },
  {
    id: 93,
    title: "Dua for When You Want to be Successful",
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي",
    transliteration: "Rabbi-j'alni muqimas-salati wa min dhurriyyati",
    meaning: "My Lord, make me an establisher of prayer, and [many] from my descendants.",
    category: "Success"
  },
  {
    id: 94,
    title: "Dua for When You Want to be Healthy",
    arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي",
    transliteration: "Allahumma 'afini fi badani",
    meaning: "O Allah, make me healthy in my body.",
    category: "Health"
  },
  {
    id: 95,
    title: "Dua for When You Want to be Wise",
    arabic: "رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ",
    transliteration: "Rabbi hab li hukman wa al-hiqni bis-salihin",
    meaning: "My Lord, grant me wisdom and join me with the righteous.",
    category: "Knowledge"
  },
  {
    id: 96,
    title: "Dua for When You Want to be Protected",
    arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ",
    transliteration: "Allahummah-fazni min bayni yadayya",
    meaning: "O Allah, protect me from my front.",
    category: "Protection"
  },
  {
    id: 97,
    title: "Dua for When You Want to be Forgiven",
    arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ",
    transliteration: "Rabbigh-fir warham wa Anta khayrur-rahimin",
    meaning: "My Lord, forgive and have mercy, and You are the best of the merciful.",
    category: "Forgiveness"
  },
  {
    id: 98,
    title: "Dua for When You Want to be Guided",
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    transliteration: "Ihdinas-siratal-mustaqim",
    meaning: "Guide us to the straight path.",
    category: "Knowledge"
  },
  {
    id: 99,
    title: "Dua for When You Want to be Loved by Allah",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ",
    transliteration: "Allahumma inni as'aluka hubbaka wa hubba man yuhibbuk",
    meaning: "O Allah, I ask You for Your love and the love of those who love You.",
    category: "Success"
  },
  {
    id: 100,
    title: "Dua for When You Want to be in Paradise",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
    transliteration: "Allahumma inni as'alukal-Jannata wa a'udhu bika minan-nar",
    meaning: "O Allah, I ask You for Paradise and seek refuge in You from the Fire.",
    category: "Success"
  },
  {
    id: 101,
    title: "Dua for Seeking Goodness",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ",
    transliteration: "Allahumma inni as'aluka minal-khayri kullihi 'ajilihi wa ajilihi",
    meaning: "O Allah, I ask You for all goodness, both immediate and delayed.",
    category: "Success"
  },
  {
    id: 102,
    title: "Dua for Protection from Evil Character",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مُنْكَرَاتِ الْأَخْلَاقِ وَالْأَعْمَالِ وَالْأَهْوَاءِ",
    transliteration: "Allahumma inni a'udhu bika min munkaratil-akhlaqi wal-a'mali wal-ahwa'",
    meaning: "O Allah, I seek refuge in You from evil character, deeds, and desires.",
    category: "Protection"
  },
  {
    id: 103,
    title: "Dua for Ease in All Matters",
    arabic: "اللَّهُمَّ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    transliteration: "Allahumma aslih li sha'ni kullahu wa la takilni ila nafsi tarfata 'ayn",
    meaning: "O Allah, rectify all my affairs and do not leave me to myself even for the blink of an eye.",
    category: "Success"
  },
  {
    id: 104,
    title: "Dua for Protection from the Grave",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
    transliteration: "Allahumma inni a'udhu bika min 'adhabil-qabri",
    meaning: "O Allah, I seek refuge in You from the punishment of the grave.",
    category: "Protection"
  },
  {
    id: 105,
    title: "Dua for Sincere Repentance",
    arabic: "رَبِّ تُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Rabbi tub 'alayya innaka Antat-Tawwabur-Rahim",
    meaning: "My Lord, accept my repentance, for You are the Acceptor of Repentance, the Merciful.",
    category: "Forgiveness"
  },
  {
    id: 106,
    title: "Dua for Protection from Hellfire",
    arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
    transliteration: "Allahumma ajirni minan-nar",
    meaning: "O Allah, protect me from the Fire.",
    category: "Protection"
  },
  {
    id: 107,
    title: "Dua for When You are in Debt",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani, wal-'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala'id-dayni, wa ghalabatir-rijal",
    meaning: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
    category: "Success"
  },
  {
    id: 108,
    title: "Dua for When You are in Difficulty (2)",
    arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa Anta subhanaka inni kuntu minaz-zalimin",
    meaning: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    category: "Patience"
  },
  {
    id: 109,
    title: "Dua for When You are in Pain",
    arabic: "بِسْمِ اللَّهِ (ثَلَاثًا) أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (سَبْعَ مَرَّاتٍ)",
    transliteration: "Bismillahi (3 times) A'udhu billahi wa qudratihi min sharri ma ajidu wa uhadhiru (7 times)",
    meaning: "In the name of Allah (3 times). I seek refuge in Allah and His power from the evil of what I feel and what I fear (7 times).",
    category: "Health"
  },
  {
    id: 110,
    title: "Dua for When You are Scared (2)",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    transliteration: "Allahumma-kfini bihalalika 'an haramika, wa aghnini bifadlika 'amman siwak",
    meaning: "O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.",
    category: "Protection"
  },
  {
    id: 111,
    title: "Dua for When You are Worried",
    arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ",
    transliteration: "Allahumma rahmataka arju fala takilni ila nafsi tarfata 'ayn, wa aslih li sha'ni kullahu, la ilaha illa Anta",
    meaning: "O Allah, I hope for Your mercy. Do not leave me to myself even for the blink of an eye, and rectify all my affairs. There is no deity except You.",
    category: "Patience"
  },
  {
    id: 112,
    title: "Dua for When You are in Need",
    arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir",
    meaning: "My Lord, indeed I am, for whatever good You would send down to me, in need.",
    category: "Success"
  },
  {
    id: 113,
    title: "Dua for When You are in Fear of Someone",
    arabic: "اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ",
    transliteration: "Allahumma inna naj'aluka fi nuhurihim wa na'udhu bika min shururihim",
    meaning: "O Allah, we place You before them and seek refuge in You from their evil.",
    category: "Protection"
  },
  {
    id: 114,
    title: "Dua for When You are in Fear of Shirk (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
    transliteration: "Allahumma inni a'udhu bika an ushrika bika wa ana a'lamu, wa astaghfiruka lima la a'lam",
    meaning: "O Allah, I seek refuge in You from knowingly associating anything with You, and I seek Your forgiveness for what I do not know.",
    category: "Protection"
  },
  {
    id: 115,
    title: "Dua for When You are in Fear of the Grave (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
    transliteration: "Allahumma inni a'udhu bika min 'adhabil-qabri",
    meaning: "O Allah, I seek refuge in You from the punishment of the grave.",
    category: "Protection"
  },
  {
    id: 116,
    title: "Dua for When You are in Fear of the Fire (2)",
    arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
    transliteration: "Allahumma ajirni minan-nar",
    meaning: "O Allah, protect me from the Fire.",
    category: "Protection"
  },
  {
    id: 117,
    title: "Dua for When You are in Fear of the Dajjal (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-masihid-dajjal",
    meaning: "O Allah, I seek refuge in You from the trial of the False Messiah.",
    category: "Protection"
  },
  {
    id: 118,
    title: "Dua for When You are in Fear of the Trials of Life and Death",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-mahya wal-mamati",
    meaning: "O Allah, I seek refuge in You from the trials of life and death.",
    category: "Protection"
  },
  {
    id: 119,
    title: "Dua for When You are in Fear of the Trials of the Grave",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْقَبْرِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-qabri",
    meaning: "O Allah, I seek refuge in You from the trials of the grave.",
    category: "Protection"
  },
  {
    id: 120,
    title: "Dua for When You are in Fear of the Trials of the Day of Judgment",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ يَوْمِ الْقِيَامَةِ",
    transliteration: "Allahumma inni a'udhu bika min fitnati yawmil-qiyamah",
    meaning: "O Allah, I seek refuge in You from the trials of the Day of Judgment.",
    category: "Protection"
  },
  {
    id: 121,
    title: "Dua for When You are in Fear of the Trials of the Hellfire",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ النَّارِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatin-nar",
    meaning: "O Allah, I seek refuge in You from the trials of the Fire.",
    category: "Protection"
  },
  {
    id: 122,
    title: "Dua for When You are in Fear of the Trials of the World",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا",
    transliteration: "Allahumma inni a'udhu bika min fitnatid-dunya",
    meaning: "O Allah, I seek refuge in You from the trials of the world.",
    category: "Protection"
  },
  {
    id: 123,
    title: "Dua for When You are in Fear of the Trials of the Enemy",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْعَدُوِّ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-'aduww",
    meaning: "O Allah, I seek refuge in You from the trials of the enemy.",
    category: "Protection"
  },
  {
    id: 124,
    title: "Dua for When You are in Fear of the Trials of the Oppressor",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الظَّالِمِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatiz-zalim",
    meaning: "O Allah, I seek refuge in You from the trials of the oppressor.",
    category: "Protection"
  },
  {
    id: 125,
    title: "Dua for When You are in Fear of the Trials of the Evil One",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الشَّيْطَانِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatish-shaytan",
    meaning: "O Allah, I seek refuge in You from the trials of Satan.",
    category: "Protection"
  },
  {
    id: 126,
    title: "Dua for When You are in Fear of the Trials of the Jinn",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْجِنِّ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-jinn",
    meaning: "O Allah, I seek refuge in You from the trials of the Jinn.",
    category: "Protection"
  },
  {
    id: 127,
    title: "Dua for When You are in Fear of the Trials of the Human",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْإِنْسِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-ins",
    meaning: "O Allah, I seek refuge in You from the trials of humans.",
    category: "Protection"
  },
  {
    id: 128,
    title: "Dua for When You are in Fear of the Trials of the Self",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ النَّفْسِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatin-nafs",
    meaning: "O Allah, I seek refuge in You from the trials of the self.",
    category: "Protection"
  },
  {
    id: 129,
    title: "Dua for When You are in Fear of the Trials of the Heart",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْقَلْبِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-qalb",
    meaning: "O Allah, I seek refuge in You from the trials of the heart.",
    category: "Protection"
  },
  {
    id: 130,
    title: "Dua for When You are in Fear of the Trials of the Tongue",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ اللِّسَانِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-lisan",
    meaning: "O Allah, I seek refuge in You from the trials of the tongue.",
    category: "Protection"
  },
  {
    id: 131,
    title: "Dua for When You are in Fear of the Trials of the Ear",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ السَّمْعِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatis-sam'i",
    meaning: "O Allah, I seek refuge in You from the trials of the ear.",
    category: "Protection"
  },
  {
    id: 132,
    title: "Dua for When You are in Fear of the Trials of the Eye",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْبَصَرِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-basari",
    meaning: "O Allah, I seek refuge in You from the trials of the eye.",
    category: "Protection"
  },
  {
    id: 133,
    title: "Dua for When You are in Fear of the Trials of the Hand",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْيَدِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-yadi",
    meaning: "O Allah, I seek refuge in You from the trials of the hand.",
    category: "Protection"
  },
  {
    id: 134,
    title: "Dua for When You are in Fear of the Trials of the Foot",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الرِّجْلِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatir-rijli",
    meaning: "O Allah, I seek refuge in You from the trials of the foot.",
    category: "Protection"
  },
  {
    id: 135,
    title: "Dua for When You are in Fear of the Trials of the Stomach",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْبَطْنِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-batni",
    meaning: "O Allah, I seek refuge in You from the trials of the stomach.",
    category: "Protection"
  },
  {
    id: 136,
    title: "Dua for When You are in Fear of the Trials of the Private Parts",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْفَرْجِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-farji",
    meaning: "O Allah, I seek refuge in You from the trials of the private parts.",
    category: "Protection"
  },
  {
    id: 137,
    title: "Dua for When You are in Fear of the Trials of the Wealth",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَالِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-mali",
    meaning: "O Allah, I seek refuge in You from the trials of wealth.",
    category: "Protection"
  },
  {
    id: 138,
    title: "Dua for When You are in Fear of the Trials of the Children",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْأَوْلَادِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-awladi",
    meaning: "O Allah, I seek refuge in You from the trials of children.",
    category: "Protection"
  },
  {
    id: 139,
    title: "Dua for When You are in Fear of the Trials of the Family",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْأَهْلِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-ahli",
    meaning: "O Allah, I seek refuge in You from the trials of the family.",
    category: "Protection"
  },
  {
    id: 140,
    title: "Dua for When You are in Fear of the Trials of the Neighbors",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْجِيرَانِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-jirani",
    meaning: "O Allah, I seek refuge in You from the trials of the neighbors.",
    category: "Protection"
  },
  {
    id: 141,
    title: "Dua for When You are in Fear of the Trials of the Friends",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْأَصْدِقَاءِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-asdiqa'",
    meaning: "O Allah, I seek refuge in You from the trials of friends.",
    category: "Protection"
  },
  {
    id: 142,
    title: "Dua for When You are in Fear of the Trials of the Society",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمُجْتَمَعِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-mujtama'",
    meaning: "O Allah, I seek refuge in You from the trials of society.",
    category: "Protection"
  },
  {
    id: 143,
    title: "Dua for When You are in Fear of the Trials of the Government",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْحُكُومَةِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-hukumah",
    meaning: "O Allah, I seek refuge in You from the trials of the government.",
    category: "Protection"
  },
  {
    id: 144,
    title: "Dua for When You are in Fear of the Trials of the Media",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْإِعْلَامِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-i'lam",
    meaning: "O Allah, I seek refuge in You from the trials of the media.",
    category: "Protection"
  },
  {
    id: 145,
    title: "Dua for When You are in Fear of the Trials of the Technology",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ التِّكْنُولُوجِيَا",
    transliteration: "Allahumma inni a'udhu bika min fitnatit-tiknulujiya",
    meaning: "O Allah, I seek refuge in You from the trials of technology.",
    category: "Protection"
  },
  {
    id: 146,
    title: "Dua for When You are in Fear of the Trials of the Future",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمُسْتَقْبَلِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-mustaqbal",
    meaning: "O Allah, I seek refuge in You from the trials of the future.",
    category: "Protection"
  },
  {
    id: 147,
    title: "Dua for When You are in Fear of the Trials of the Past",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَاضِي",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-madi",
    meaning: "O Allah, I seek refuge in You from the trials of the past.",
    category: "Protection"
  },
  {
    id: 148,
    title: "Dua for When You are in Fear of the Trials of the Present",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْحَاضِرِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-hadir",
    meaning: "O Allah, I seek refuge in You from the trials of the present.",
    category: "Protection"
  },
  {
    id: 149,
    title: "Dua for When You are in Fear of the Trials of the Hereafter",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْآخِرَةِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-akhirah",
    meaning: "O Allah, I seek refuge in You from the trials of the Hereafter.",
    category: "Protection"
  },
  {
    id: 150,
    title: "Dua for When You are in Fear of the Trials of the Day of Resurrection",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ يَوْمِ الْبَعْثِ",
    transliteration: "Allahumma inni a'udhu bika min fitnati yawmil-ba'th",
    meaning: "O Allah, I seek refuge in You from the trials of the Day of Resurrection.",
    category: "Protection"
  },
  {
    id: 151,
    title: "Dua for Protection from Evil Eye (2)",
    arabic: "أُعِيذُكَ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
    transliteration: "U'idhuka bikalimatil-lahit-tammati min kulli shaytanin wa hammatin wa min kulli 'aynin lammah",
    meaning: "I seek refuge for you in the perfect words of Allah from every devil and every poisonous creature and from every evil eye.",
    category: "Protection"
  },
  {
    id: 152,
    title: "Dua for When You are in Fear of the Trials of the Grave (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
    transliteration: "Allahumma inni a'udhu bika min 'adhabil-qabri",
    meaning: "O Allah, I seek refuge in You from the punishment of the grave.",
    category: "Protection"
  },
  {
    id: 153,
    title: "Dua for When You are in Fear of the Trials of the Fire (3)",
    arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
    transliteration: "Allahumma ajirni minan-nar",
    meaning: "O Allah, protect me from the Fire.",
    category: "Protection"
  },
  {
    id: 154,
    title: "Dua for When You are in Fear of the Trials of the Dajjal (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-masihid-dajjal",
    meaning: "O Allah, I seek refuge in You from the trial of the False Messiah.",
    category: "Protection"
  },
  {
    id: 155,
    title: "Dua for When You are in Fear of the Trials of Life and Death (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-mahya wal-mamati",
    meaning: "O Allah, I seek refuge in You from the trials of life and death.",
    category: "Protection"
  },
  {
    id: 156,
    title: "Dua for When You are in Fear of the Trials of the Grave (4)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْقَبْرِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-qabri",
    meaning: "O Allah, I seek refuge in You from the trials of the grave.",
    category: "Protection"
  },
  {
    id: 157,
    title: "Dua for When You are in Fear of the Trials of the Day of Judgment (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ يَوْمِ الْقِيَامَةِ",
    transliteration: "Allahumma inni a'udhu bika min fitnati yawmil-qiyamah",
    meaning: "O Allah, I seek refuge in You from the trials of the Day of Judgment.",
    category: "Protection"
  },
  {
    id: 158,
    title: "Dua for When You are in Fear of the Trials of the Hellfire (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ النَّارِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatin-nar",
    meaning: "O Allah, I seek refuge in You from the trials of the Fire.",
    category: "Protection"
  },
  {
    id: 159,
    title: "Dua for When You are in Fear of the Trials of the World (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا",
    transliteration: "Allahumma inni a'udhu bika min fitnatid-dunya",
    meaning: "O Allah, I seek refuge in You from the trials of the world.",
    category: "Protection"
  },
  {
    id: 160,
    title: "Dua for When You are in Fear of the Trials of the Enemy (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْعَدُوِّ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-'aduww",
    meaning: "O Allah, I seek refuge in You from the trials of the enemy.",
    category: "Protection"
  },
  {
    id: 161,
    title: "Dua for When You are in Fear of the Trials of the Oppressor (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الظَّالِمِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatiz-zalim",
    meaning: "O Allah, I seek refuge in You from the trials of the oppressor.",
    category: "Protection"
  },
  {
    id: 162,
    title: "Dua for When You are in Fear of the Trials of the Evil One (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الشَّيْطَانِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatish-shaytan",
    meaning: "O Allah, I seek refuge in You from the trials of Satan.",
    category: "Protection"
  },
  {
    id: 163,
    title: "Dua for When You are in Fear of the Trials of the Jinn (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْجِنِّ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-jinn",
    meaning: "O Allah, I seek refuge in You from the trials of the Jinn.",
    category: "Protection"
  },
  {
    id: 164,
    title: "Dua for When You are in Fear of the Trials of the Human (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْإِنْسِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-ins",
    meaning: "O Allah, I seek refuge in You from the trials of humans.",
    category: "Protection"
  },
  {
    id: 165,
    title: "Dua for When You are in Fear of the Trials of the Self (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ النَّفْسِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatin-nafs",
    meaning: "O Allah, I seek refuge in You from the trials of the self.",
    category: "Protection"
  },
  {
    id: 166,
    title: "Dua for When You are in Fear of the Trials of the Heart (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْقَلْبِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-qalb",
    meaning: "O Allah, I seek refuge in You from the trials of the heart.",
    category: "Protection"
  },
  {
    id: 167,
    title: "Dua for When You are in Fear of the Trials of the Tongue (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ اللِّسَانِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-lisan",
    meaning: "O Allah, I seek refuge in You from the trials of the tongue.",
    category: "Protection"
  },
  {
    id: 168,
    title: "Dua for When You are in Fear of the Trials of the Ear (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ السَّمْعِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatis-sam'i",
    meaning: "O Allah, I seek refuge in You from the trials of the ear.",
    category: "Protection"
  },
  {
    id: 169,
    title: "Dua for When You are in Fear of the Trials of the Eye (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْبَصَرِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-basari",
    meaning: "O Allah, I seek refuge in You from the trials of the eye.",
    category: "Protection"
  },
  {
    id: 170,
    title: "Dua for When You are in Fear of the Trials of the Hand (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْيَدِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-yadi",
    meaning: "O Allah, I seek refuge in You from the trials of the hand.",
    category: "Protection"
  },
  {
    id: 171,
    title: "Dua for When You are in Fear of the Trials of the Foot (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الرِّجْلِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatir-rijli",
    meaning: "O Allah, I seek refuge in You from the trials of the foot.",
    category: "Protection"
  },
  {
    id: 172,
    title: "Dua for When You are in Fear of the Trials of the Stomach (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْبَطْنِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-batni",
    meaning: "O Allah, I seek refuge in You from the trials of the stomach.",
    category: "Protection"
  },
  {
    id: 173,
    title: "Dua for When You are in Fear of the Trials of the Private Parts (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْفَرْجِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-farji",
    meaning: "O Allah, I seek refuge in You from the trials of the private parts.",
    category: "Protection"
  },
  {
    id: 174,
    title: "Dua for When You are in Fear of the Trials of the Wealth (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَالِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-mali",
    meaning: "O Allah, I seek refuge in You from the trials of wealth.",
    category: "Protection"
  },
  {
    id: 175,
    title: "Dua for When You are in Fear of the Trials of the Children (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْأَوْلَادِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-awladi",
    meaning: "O Allah, I seek refuge in You from the trials of children.",
    category: "Protection"
  },
  {
    id: 176,
    title: "Dua for When You are in Fear of the Trials of the Family (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْأَهْلِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-ahli",
    meaning: "O Allah, I seek refuge in You from the trials of the family.",
    category: "Protection"
  },
  {
    id: 177,
    title: "Dua for When You are in Fear of the Trials of the Neighbors (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْجِيرَانِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-jirani",
    meaning: "O Allah, I seek refuge in You from the trials of the neighbors.",
    category: "Protection"
  },
  {
    id: 178,
    title: "Dua for When You are in Fear of the Trials of the Friends (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْأَصْدِقَاءِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-asdiqa'",
    meaning: "O Allah, I seek refuge in You from the trials of friends.",
    category: "Protection"
  },
  {
    id: 179,
    title: "Dua for When You are in Fear of the Trials of the Society (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمُجْتَمَعِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-mujtama'",
    meaning: "O Allah, I seek refuge in You from the trials of society.",
    category: "Protection"
  },
  {
    id: 180,
    title: "Dua for When You are in Fear of the Trials of the Government (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْحُكُومَةِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-hukumah",
    meaning: "O Allah, I seek refuge in You from the trials of the government.",
    category: "Protection"
  },
  {
    id: 181,
    title: "Dua for When You are in Fear of the Trials of the Media (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْإِعْلَامِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-i'lam",
    meaning: "O Allah, I seek refuge in You from the trials of the media.",
    category: "Protection"
  },
  {
    id: 182,
    title: "Dua for When You are in Fear of the Trials of the Technology (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ التِّكْنُولُوجِيَا",
    transliteration: "Allahumma inni a'udhu bika min fitnatit-tiknulujiya",
    meaning: "O Allah, I seek refuge in You from the trials of technology.",
    category: "Protection"
  },
  {
    id: 183,
    title: "Dua for When You are in Fear of the Trials of the Future (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمُسْتَقْبَلِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-mustaqbal",
    meaning: "O Allah, I seek refuge in You from the trials of the future.",
    category: "Protection"
  },
  {
    id: 184,
    title: "Dua for When You are in Fear of the Trials of the Past (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَاضِي",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-madi",
    meaning: "O Allah, I seek refuge in You from the trials of the past.",
    category: "Protection"
  },
  {
    id: 185,
    title: "Dua for When You are in Fear of the Trials of the Present (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْحَاضِرِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-hadir",
    meaning: "O Allah, I seek refuge in You from the trials of the present.",
    category: "Protection"
  },
  {
    id: 186,
    title: "Dua for When You are in Fear of the Trials of the Hereafter (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْآخِرَةِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-akhirah",
    meaning: "O Allah, I seek refuge in You from the trials of the Hereafter.",
    category: "Protection"
  },
  {
    id: 187,
    title: "Dua for When You are in Fear of the Trials of the Day of Resurrection (2)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ يَوْمِ الْبَعْثِ",
    transliteration: "Allahumma inni a'udhu bika min fitnati yawmil-ba'th",
    meaning: "O Allah, I seek refuge in You from the trials of the Day of Resurrection.",
    category: "Protection"
  },
  {
    id: 188,
    title: "Dua for When You are in Fear of the Trials of the Day of Judgment (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ يَوْمِ الْقِيَامَةِ",
    transliteration: "Allahumma inni a'udhu bika min fitnati yawmil-qiyamah",
    meaning: "O Allah, I seek refuge in You from the trials of the Day of Judgment.",
    category: "Protection"
  },
  {
    id: 189,
    title: "Dua for When You are in Fear of the Trials of the Hellfire (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ النَّارِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatin-nar",
    meaning: "O Allah, I seek refuge in You from the trials of the Fire.",
    category: "Protection"
  },
  {
    id: 190,
    title: "Dua for When You are in Fear of the Trials of the World (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا",
    transliteration: "Allahumma inni a'udhu bika min fitnatid-dunya",
    meaning: "O Allah, I seek refuge in You from the trials of the world.",
    category: "Protection"
  },
  {
    id: 191,
    title: "Dua for When You are in Fear of the Trials of the Enemy (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْعَدُوِّ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-'aduww",
    meaning: "O Allah, I seek refuge in You from the trials of the enemy.",
    category: "Protection"
  },
  {
    id: 192,
    title: "Dua for When You are in Fear of the Trials of the Oppressor (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الظَّالِمِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatiz-zalim",
    meaning: "O Allah, I seek refuge in You from the trials of the oppressor.",
    category: "Protection"
  },
  {
    id: 193,
    title: "Dua for When You are in Fear of the Trials of the Evil One (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الشَّيْطَانِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatish-shaytan",
    meaning: "O Allah, I seek refuge in You from the trials of Satan.",
    category: "Protection"
  },
  {
    id: 194,
    title: "Dua for When You are in Fear of the Trials of the Jinn (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْجِنِّ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-jinn",
    meaning: "O Allah, I seek refuge in You from the trials of the Jinn.",
    category: "Protection"
  },
  {
    id: 195,
    title: "Dua for When You are in Fear of the Trials of the Human (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْإِنْسِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-ins",
    meaning: "O Allah, I seek refuge in You from the trials of humans.",
    category: "Protection"
  },
  {
    id: 196,
    title: "Dua for When You are in Fear of the Trials of the Self (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ النَّفْسِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatin-nafs",
    meaning: "O Allah, I seek refuge in You from the trials of the self.",
    category: "Protection"
  },
  {
    id: 197,
    title: "Dua for When You are in Fear of the Trials of the Heart (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْقَلْبِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-qalb",
    meaning: "O Allah, I seek refuge in You from the trials of the heart.",
    category: "Protection"
  },
  {
    id: 198,
    title: "Dua for When You are in Fear of the Trials of the Tongue (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ اللِّسَانِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-lisan",
    meaning: "O Allah, I seek refuge in You from the trials of the tongue.",
    category: "Protection"
  },
  {
    id: 199,
    title: "Dua for When You are in Fear of the Trials of the Ear (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ السَّمْعِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatis-sam'i",
    meaning: "O Allah, I seek refuge in You from the trials of the ear.",
    category: "Protection"
  },
  {
    id: 200,
    title: "Dua for When You are in Fear of the Trials of the Eye (3)",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْبَصَرِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-basari",
    meaning: "O Allah, I seek refuge in You from the trials of the eye.",
    category: "Protection"
  }
];
