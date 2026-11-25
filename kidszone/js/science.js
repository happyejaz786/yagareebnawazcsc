// Science Discovery Module with Big Pop-Out Modal (Space 24, Magic Lab 24, Body Parts 20, Living/Non 30, Healthy Food 28)
const ScienceModule = {
  score: 0,
  queues: {},
  currentGame: null,
  exploredSet: new Set(),
  popupState: {
    category: 'space',
    index: 0,
    speechText: ''
  },

  speakFriendly(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find(v => v.lang.includes('hi-IN') && (v.name.includes('Google') || v.name.includes('Swara'))) ||
        voices.find(v => v.lang.includes('en-IN') && (v.name.includes('Google') || v.name.includes('Heera'))) ||
        voices.find(v => v.lang.includes('hi') || v.lang.includes('en-IN'));

      if (preferred) utter.voice = preferred;
      utter.lang = preferred ? preferred.lang : 'hi-IN';
      utter.rate = 0.90;
      utter.pitch = 1.12;
      window.speechSynthesis.speak(utter);
    } else if (typeof App !== 'undefined' && App.speak) {
      App.speak(text);
    }
  },

  addScore() {
    this.score++;
    const badge = document.getElementById('sciScoreBadge');
    if (badge) badge.innerText = this.score;
  },

  switchMode(mode) {
    document.querySelectorAll('.sci-tab').forEach(btn => btn.classList.remove('sci-tab-active'));
    const active = document.getElementById(`stab-${mode}`);
    if (active) active.classList.add('sci-tab-active');

    if (mode === 'space') this.initSpaceExplorer();
    else if (mode === 'magic') this.initMagicLab();
    else if (mode === 'body') this.initBodyParts('explore');
    else if (mode === 'living') this.initLivingSorter();
    else if (mode === 'food') this.initHealthyFoodSorter();
  },

  getNextFromPool(key, list) {
    if (!this.queues[key] || this.queues[key].length === 0) {
      this.queues[key] = [...list].sort(() => Math.random() - 0.5);
    }
    return this.queues[key].pop();
  },

  // =========================================================================
  // BIG POP-UP MODAL ENGINE (Scratch Card / Sticker Zoom Style)
  // =========================================================================
  openDiscoveryPopup(category, index) {
    let list = [];
    let badgeText = '';
    let badgeClass = '';
    let iconWrapClass = '';

    if (category === 'space') {
      list = this.spaceItems;
      badgeText = '🪐 Space & Solar System';
      badgeClass = 'bg-indigo-100 text-indigo-800 border-indigo-300';
      iconWrapClass = 'bg-gradient-to-b from-slate-900 to-indigo-950 border-indigo-400';
    } else if (category === 'magic') {
      list = this.magicExperiments;
      badgeText = '🧪 Magic Science Lab';
      badgeClass = 'bg-purple-100 text-purple-800 border-purple-300';
      iconWrapClass = 'bg-gradient-to-b from-purple-50 to-amber-50 border-purple-300';
    } else if (category === 'body') {
      list = this.bodyPartsList;
      badgeText = '👀 Human Body Explorer';
      badgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
      iconWrapClass = 'bg-gradient-to-b from-amber-50 to-orange-50 border-amber-300';
    }

    const item = list[index];
    if (!item) return;

    const title = item.name || item.title;
    const desc = item.fact || item.hint;
    const speech = `${title}! ${desc}`;

    this.popupState = { category, index, speechText: speech };

    const modal = document.getElementById('scienceZoomModal');
    const card = document.getElementById('sciModalCard');
    const badge = document.getElementById('sciPopupBadge');
    const iconWrap = document.getElementById('sciPopupIconWrap');
    const iconEl = document.getElementById('sciPopupIcon');
    const titleEl = document.getElementById('sciPopupTitle');
    const factEl = document.getElementById('sciPopupFact');

    badge.className = `inline-block text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border mb-2 ${badgeClass}`;
    badge.innerText = badgeText;

    iconWrap.className = `w-44 h-44 mx-auto my-2 rounded-3xl border-4 border-dashed shadow-inner flex items-center justify-center ${iconWrapClass}`;
    iconEl.innerText = item.icon;
    titleEl.innerText = title;
    factEl.innerText = desc;

    // Retrigger spring pop-out animation
    card.classList.remove('hero-pop-out');
    void card.offsetWidth;
    card.classList.add('hero-pop-out');

    modal.classList.remove('hidden');

    App.playRewardSound();
    this.speakFriendly(speech);

    // Track exploration & reward stars every 5 new discoveries
    const key = `${category}_${index}`;
    if (!this.exploredSet.has(key)) {
      this.exploredSet.add(key);
      this.addScore();
      if (this.exploredSet.size % 5 === 0) {
        App.awardStarsAndWin(`Zabardast Scientist! Tumne ${this.exploredSet.size} nayi cheezein khoj nikali!`);
      }
    }
  },

  navigatePopup(step) {
    const { category, index } = this.popupState;
    let total = 0;
    if (category === 'space') total = this.spaceItems.length;
    else if (category === 'magic') total = this.magicExperiments.length;
    else if (category === 'body') total = this.bodyPartsList.length;

    const nextIdx = (index + step + total) % total;
    this.openDiscoveryPopup(category, nextIdx);
  },

  replayPopupAudio() {
    if (this.popupState.speechText) {
      App.playRewardSound();
      this.speakFriendly(this.popupState.speechText);
    }
  },

  closeDiscoveryPopup() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    document.getElementById('scienceZoomModal').classList.add('hidden');
  },

  // =========================================================================
  // 1. SPACE & SOLAR SYSTEM EXPLORER (24 Interactive Space Items)
  // =========================================================================
  spaceItems: [
    { name: 'Sun (Sooraj)', icon: '☀️', fact: 'Sooraj ek aag ka bada gola hai jo humein roshni aur garmi deta hai!' },
    { name: 'Mercury (Budh)', icon: '🌑', fact: 'Mercury Sooraj ke sabse paas wala chhota planet hai!' },
    { name: 'Venus (Shukra)', icon: '🌕', fact: 'Venus aasman mein sabse zyada chamakne wala planet hai!' },
    { name: 'Earth (Prithvi)', icon: '🌍', fact: 'Hamari Prithvi neeli dikhti hai kyunki is par bohot paani aur zindagi hai!' },
    { name: 'Moon (Chaand)', icon: '🌙', fact: 'Chaand hamari Prithvi ke chaaron taraf ghoomta hai!' },
    { name: 'Mars (Mangal)', icon: '🔴', fact: 'Mars ko Red Planet kehte hain kyunki iski mitti laal hai!' },
    { name: 'Jupiter (Brihaspati)', icon: '🪐', fact: 'Jupiter hamare Solar System ka sabse bada planet hai!' },
    { name: 'Saturn (Shani)', icon: '💫', fact: 'Saturn ke chaaron taraf barf aur pattharon ke sundar rings hain!' },
    { name: 'Uranus (Arun)', icon: '🔵', fact: 'Uranus ek thanda aur neela-hara planet hai jo ludhak kar ghoomta hai!' },
    { name: 'Neptune (Varun)', icon: '🌀', fact: 'Neptune Sooraj se sabse door aur bohot tez hawaon wala planet hai!' },
    { name: 'Rocket', icon: '🚀', fact: 'Rocket tez aag chhod kar astronauts ko space mein le jata hai!' },
    { name: 'Astronaut', icon: '👨‍🚀', fact: 'Space mein jane wale scientist ko Astronaut kehte hain!' },
    { name: 'Satellite', icon: '🛰️', fact: 'Satellite aasman se humein TV, mobile aur mausam ki khabar deta hai!' },
    { name: 'Telescope', icon: '🔭', fact: 'Telescope se door ke taare aur chaand paas dikhayi dete hain!' },
    { name: 'Shooting Star', icon: '🌠', fact: 'Toot-ta taara asal mein space ka chhota patthar hota hai jo jal uthta hai!' },
    { name: 'Galaxy', icon: '🌌', fact: 'Galaxy mein arabon taare aur planets ek saath rehte hain!' },
    { name: 'Comet', icon: '☄️', fact: 'Comet barf aur dhool ka gola hai jiski lambi chamkili poonch hoti hai!' },
    { name: 'UFO / Space Ship', icon: '🛸', fact: 'Spacecraft bina hawa ke bhi antariksh mein safar kar sakta hai!' },
    { name: 'Stars (Taare)', icon: '⭐', fact: 'Taare din mein bhi aasman mein hote hain par sooraj ki roshni se chhup jate hain!' },
    { name: 'Solar Eclipse', icon: '🌘', fact: 'Jab Chaand Sooraj ke saamne aa jata hai toh Sooraj Grahan hota hai!' },
    { name: 'Space Station', icon: '🏗️', fact: 'ISS antariksh mein udta hua ek ghar hai jahan scientists rehte hain!' },
    { name: 'Asteroid', icon: '🪨', fact: 'Asteroid space mein ghoomne wali badi-badi chattanein hain!' },
    { name: 'Rover', icon: '🤖', fact: 'Rover ek robot gaadi hai jo Chaand aur Mars par chalti hai!' },
    { name: 'Rainbow Sky', icon: '🌈', fact: 'Baarish ke baad jab dhoop nikalti hai toh 7 rangon ka Rainbow banta hai!' }
  ],

  initSpaceExplorer() {
    this.speakFriendly('Space Explorer! Kisi bhi planet ya rocket par tap karke bada pop-up dekhein!');
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full pop-in">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-indigo-800 bg-indigo-100 border border-indigo-300 px-3 py-1 rounded-full">
            🪐 Space & Solar System (24 Objects)
          </span>
          <span class="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            Tap Icon = Big Pop-Up! ✨
          </span>
        </div>

        <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 p-1">
          ${this.spaceItems.map((item, idx) => `
            <button onclick="ScienceModule.openDiscoveryPopup('space', ${idx})"
              class="bg-gradient-to-b from-slate-800 to-indigo-950 hover:from-indigo-800 hover:to-purple-900 border-2 border-indigo-400/70 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow text-white">
              <span class="text-4xl mb-1.5">${item.icon}</span>
              <span class="text-[11px] font-bold text-indigo-100 text-center leading-tight">${item.name.split(' ')[0]}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 2. MAGIC SCIENCE LAB (24 Everyday Science Wonders)
  // =========================================================================
  magicExperiments: [
    { title: 'Magnet Magic', icon: '🧲', fact: 'Magnet sirf lohe (Iron) ki cheezon ko apni taraf kheenchta hai, lakdi ko nahi!' },
    { title: 'Ice & Water', icon: '🧊', fact: 'Paani ko thanda karne par Barf banta hai aur garam karne par Bhaap (Steam)!' },
    { title: 'Rainbow Colors', icon: '🌈', fact: 'Sooraj ki safed roshni mein 7 rang chhupe hote hain: VIBGYOR!' },
    { title: 'Seed to Plant', icon: '🌱', fact: 'Beej ko mitti, paani aur dhoop milne par woh bada ped ban jata hai!' },
    { title: 'Gravity Pull', icon: '🍎', fact: 'Prithvi ki Gravity har cheez ko neeche zameen ki taraf kheenchti hai!' },
    { title: 'Day & Night', icon: '🌓', fact: 'Prithvi ke apne axis par ghoomne se Din aur Raat hote hain!' },
    { title: 'Rain & Clouds', icon: '🌧️', fact: 'Samundar ka paani bhaap bankar baadal banta hai aur baarish barsata hai!' },
    { title: 'Volcano Lava', icon: '🌋', fact: 'Zameen ke andar bohot garmi hoti hai jo kabhi-kabhi lava bankar bahar aati hai!' },
    { title: 'Butterfly Life', icon: '🦋', fact: 'Chhoti si Caterpillar (illi) badal kar sundar Titli ban jati hai!' },
    { title: 'Honey Bees', icon: '🐝', fact: 'Madhumakkhiyan phoolon ka ras choos kar meetha shehad banati hain!' },
    { title: 'Shadow Play', icon: '👤', fact: 'Jab roshni ke saamne koi cheez aati hai toh uski Parchhayi (Shadow) banti hai!' },
    { title: 'Floating Boat', icon: '⛵', fact: 'Halki aur khaas aakar wali cheezein paani par tairti hain aur patthar doob jata hai!' },
    { title: 'Electricity', icon: '⚡', fact: 'Bijli taaron se daud kar bulb jalati hai aur pankha chalati hai!' },
    { title: 'Magnifying Glass', icon: '🔍', fact: 'Lens se chhoti cheezein badi dikhti hain kyunki yeh roshni ko modta hai!' },
    { title: 'Sound Waves', icon: '🥁', fact: 'Jab koi cheez hil-ti (vibrate) hai tabhi awaaz paida hoti hai!' },
    { title: 'Photosynthesis', icon: '🍃', fact: 'Ped ke hare patte dhoop aur hawa se apna khana khud banate hain!' },
    { title: 'Oxygen Air', icon: '🌬️', fact: 'Ped humein saans lene ke liye taaza Oxygen dete hain!' },
    { title: 'Thermometer', icon: '🌡️', fact: 'Thermometer se hum bukhar ya garmi-sardi ka temperature naapte hain!' },
    { title: 'Light Speed', icon: '🔦', fact: 'Duniya mein sabse tez roshni (Light) chalti hai, awaaz se bhi tez!' },
    { title: 'Snowflakes', icon: '❄️', fact: 'Aasman se girne wale har barf ke tukde ka design alag hota hai!' },
    { title: 'Compass', icon: '🧭', fact: 'Compass ki sui hamesha North (Uttar) disha dikhati hai!' },
    { title: 'Soap Bubbles', icon: '🫧', fact: 'Sabun ke paani mein hawa bharne se rang-birange bul-bule bante hain!' },
    { title: 'Solar Energy', icon: '🔋', fact: 'Solar panel Sooraj ki dhoop se bijli bana sakta hai!' },
    { title: 'Friction Heat', icon: '🙌', fact: 'Dono haathon ko tez ragadne se garmi paida hoti hai, ise Friction kehte hain!' }
  ],

  initMagicLab() {
    this.speakFriendly('Magic Science Lab! Kisi bhi experiment par tap karke bada pop-up dekhein!');
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full pop-in">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-purple-800 bg-purple-100 border border-purple-300 px-3 py-1 rounded-full">
            🧪 Magic Science Lab (24 Wonders)
          </span>
          <span class="text-xs font-extrabold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Tap Icon = Big Pop-Up! 🔬
          </span>
        </div>

        <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 p-1">
          ${this.magicExperiments.map((exp, idx) => `
            <button onclick="ScienceModule.openDiscoveryPopup('magic', ${idx})"
              class="bg-gradient-to-b from-white to-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-xs">
              <span class="text-4xl mb-1.5">${exp.icon}</span>
              <span class="text-[11px] font-extrabold text-slate-700 text-center leading-tight">${exp.title}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 3. HUMAN BODY PARTS (20 Parts - Big Pop-Up Explore + Quiz Mode)
  // =========================================================================
  bodyPartsList: [
    { name: 'Eyes (Aankhein)', icon: '👀', hint: 'Inse hum duniya dekhte hain' },
    { name: 'Ears (Kaan)', icon: '👂', hint: 'Inse hum awaaz sunte hain' },
    { name: 'Nose (Naak)', icon: '👃', hint: 'Isse hum khushboo soonghte hain' },
    { name: 'Tongue (Jeebh)', icon: '👅', hint: 'Isse humein meetha-khatta swaad milta hai' },
    { name: 'Teeth (Daant)', icon: '🦷', hint: 'Inse hum khana chabate hain' },
    { name: 'Brain (Dimaag)', icon: '🧠', hint: 'Isse hum sochte aur yaad rakhte hain' },
    { name: 'Heart (Dil)', icon: '🫀', hint: 'Yeh poore sharir mein khoon bhejta hai' },
    { name: 'Lungs (Phephde)', icon: '🫁', hint: 'Inse hum taaza hawa mein saans lete hain' },
    { name: 'Hands (Haath)', icon: '✋', hint: 'Inse hum likhte aur cheezein pakadte hain' },
    { name: 'Legs (Pair)', icon: '🦵', hint: 'Inse hum chalte aur daudte hain' },
    { name: 'Foot (Panja)', icon: '🦶', hint: 'Zameen par khade hone mein madad karta hai' },
    { name: 'Bones (Haddiyan)', icon: '🦴', hint: 'Yeh hamare sharir ko mazboot dhancha deti hain' },
    { name: 'Muscles (Maanspeshi)', icon: '💪', hint: 'Inse humein wazan uthane ki taqat milti hai' },
    { name: 'Lips (Honth)', icon: '👄', hint: 'Bolne aur muskurane mein madad karte hain' },
    { name: 'Fingers (Ungliyan)', icon: '🖐️', hint: 'Ek haath mein 5 ungliyan hoti hain' },
    { name: 'Hair (Baal)', icon: '💇', hint: 'Hamare sir ko dhoop aur thand se bachate hain' },
    { name: 'Face (Chehra)', icon: '😊', hint: 'Is par aankh, naak aur muskaan hoti hai' },
    { name: 'Skin (Twacha)', icon: '🤲', hint: 'Isse humein garam aur thanda mehsoos hota hai' },
    { name: 'Palm (Hatheli)', icon: '🫱', hint: 'Haath ka beech wala hissa' },
    { name: 'Thumb (Angootha)', icon: '👍', hint: 'Haath ki sabse moti ungli' }
  ],

  initBodyParts(subMode = 'explore') {
    const arena = document.getElementById('gameArena');

    if (subMode === 'explore') {
      this.speakFriendly('Hamare sharir ke 20 ang! Kisi par bhi tap karke bada pop-up dekhein!');
      arena.innerHTML = `
        <div class="w-full pop-in">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
              👀 Human Body Parts (20 Parts)
            </span>
            <button onclick="ScienceModule.initBodyParts('quiz')" class="bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce">
              🎯 Quiz Khelein →
            </button>
          </div>

          <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 p-1">
            ${this.bodyPartsList.map((p, idx) => `
              <button onclick="ScienceModule.openDiscoveryPopup('body', ${idx})"
                class="bg-gradient-to-b from-white to-amber-50 hover:bg-amber-100 border-2 border-amber-200 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-xs">
                <span class="text-4xl mb-1.5">${p.icon}</span>
                <span class="text-[11px] font-extrabold text-slate-700 text-center leading-tight">${p.name.split(' ')[0]}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      const target = this.getNextFromPool('bodyQuiz', this.bodyPartsList);
      const distractors = this.bodyPartsList
        .filter(p => p.name !== target.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [target, ...distractors].sort(() => Math.random() - 0.5);

      this.currentGame = { solved: false };
      this.speakFriendly(`Pehchano: ${target.hint}! Kaunsa body part hai?`);

      arena.innerHTML = `
        <div class="text-center w-full max-w-md pop-in">
          <div class="flex items-center justify-between mb-4">
            <button onclick="ScienceModule.initBodyParts('explore')" class="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1 rounded-xl text-xs font-extrabold border border-amber-300 btn-bounce">
              ← Sab 20 Dekhein
            </button>
            <button onclick="ScienceModule.speakFriendly('${target.hint}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
              🔊 Hint Suno
            </button>
          </div>

          <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-4 mb-5">
            <p class="text-xs font-bold text-slate-500 uppercase">Kaunsa Body Part Hai?</p>
            <p class="fun-font text-xl md:text-2xl text-amber-900 mt-1">"${target.hint}"</p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            ${options.map(opt => `
              <button onclick="ScienceModule.checkBodyQuiz(this, '${opt.name}', '${target.name}')"
                class="bg-white hover:bg-lime-50 border-2 border-b-4 border-lime-400 rounded-2xl p-4 flex flex-col items-center justify-center shadow btn-bounce transition">
                <span class="text-5xl mb-1">${opt.icon}</span>
                <span class="fun-font text-sm text-slate-800">${opt.name}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
  },

  checkBodyQuiz(btn, chosen, target) {
    if (this.currentGame.solved) return;
    if (chosen === target) {
      this.currentGame.solved = true;
      btn.classList.add('!bg-emerald-100', '!border-emerald-500', 'scale-105');
      this.addScore();
      App.awardStarsAndWin(`Bilkul sahi! Yeh ${target} hai!`);
      setTimeout(() => this.initBodyParts('quiz'), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400');
      this.speakFriendly('Yeh doosra ang hai, hint phir se suno!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400'), 600);
    }
  },

  // =========================================================================
  // 4. LIVING VS NON-LIVING THINGS SORTER (30 Items)
  // =========================================================================
  livingPool: [
    { name: 'Butterfly (Titli)', icon: '🦋', isLiving: true, reason: 'Titli udti hai, khana khati hai aur badhti hai!' },
    { name: 'Tree (Ped)', icon: '🌳', isLiving: true, reason: 'Ped paani aur dhoop se badhta hai aur saans leta hai!' },
    { name: 'Dog (Kutta)', icon: '🐶', isLiving: true, reason: 'Kutta daudta hai, khata hai aur badhta hai!' },
    { name: 'Fish (Machhli)', icon: '🐟', isLiving: true, reason: 'Machhli paani mein tairti aur saans leti hai!' },
    { name: 'Baby (Bachha)', icon: '👶', isLiving: true, reason: 'Bachha doodh peeta hai aur bada hota hai!' },
    { name: 'Bird (Chidiya)', icon: '🦜', isLiving: true, reason: 'Chidiya udti hai aur ande deti hai!' },
    { name: 'Flower Plant', icon: '🌻', isLiving: true, reason: 'Paudha mitti aur paani se bada hota hai!' },
    { name: 'Lion (Sher)', icon: '🦁', isLiving: true, reason: 'Sher ek zinda jaanwar hai!' },
    { name: 'Frog (Mendhak)', icon: '🐸', isLiving: true, reason: 'Mendhak koodta hai aur badhta hai!' },
    { name: 'Elephant (Haathi)', icon: '🐘', isLiving: true, reason: 'Haathi khana khata hai aur saans leta hai!' },
    { name: 'Ant (Cheenti)', icon: '🐜', isLiving: true, reason: 'Chhoti cheenti bhi chalti aur khati hai!' },
    { name: 'Duck (Battakh)', icon: '🦆', isLiving: true, reason: 'Battakh ek living bird hai!' },
    { name: 'Rabbit (Khargosh)', icon: '🐇', isLiving: true, reason: 'Khargosh gajar khata hai aur badhta hai!' },
    { name: 'Tortoise (Kachhua)', icon: '🐢', isLiving: true, reason: 'Kachhua saans leta hai aur chalta hai!' },
    { name: 'Honey Bee', icon: '🐝', isLiving: true, reason: 'Madhumakkhi udti hai aur kaam karti hai!' },
    { name: 'Car (Gaadi)', icon: '🚗', isLiving: false, reason: 'Car khud se khana nahi khati aur badhti nahi!' },
    { name: 'Football (Gend)', icon: '⚽', isLiving: false, reason: 'Ball saans nahi leti, yeh Non-Living hai!' },
    { name: 'Chair (Kursi)', icon: '🪑', isLiving: false, reason: 'Kursi lakdi ki bani hoti hai aur be-jaan hai!' },
    { name: 'Book (Kitaab)', icon: '📖', isLiving: false, reason: 'Kitaab padhne ke liye hai, yeh badhti nahi!' },
    { name: 'Mobile Phone', icon: '📱', isLiving: false, reason: 'Mobile ek machine hai, Living thing nahi!' },
    { name: 'Stone (Patthar)', icon: '🪨', isLiving: false, reason: 'Patthar na saans leta hai na chalta hai!' },
    { name: 'Bicycle (Cycle)', icon: '🚲', isLiving: false, reason: 'Cycle ko hum chalate hain, yeh khud zinda nahi!' },
    { name: 'Clock (Ghadi)', icon: '⏰', isLiving: false, reason: 'Ghadi cell se chalti hai, yeh Non-Living hai!' },
    { name: 'Pencil', icon: '✏️', isLiving: false, reason: 'Pencil likhne ki cheez hai, be-jaan hai!' },
    { name: 'House (Ghar)', icon: '🏠', isLiving: false, reason: 'Ghar eent-patthar se bana Non-Living hai!' },
    { name: 'Umbrella (Chhatri)', icon: '☂️', isLiving: false, reason: 'Chhatri saans nahi leti, yeh Non-Living hai!' },
    { name: 'Cup (Pyaala)', icon: '☕', isLiving: false, reason: 'Cup ek be-jaan bartan hai!' },
    { name: 'Teddy Bear', icon: '🧸', isLiving: false, reason: 'Teddy ek khilauna hai, asli bhalu nahi!' },
    { name: 'Shoe (Joota)', icon: '👟', isLiving: false, reason: 'Joota badhta nahi hai, yeh Non-Living hai!' },
    { name: 'Aeroplane', icon: '✈️', isLiving: false, reason: 'Hawai jahaz ek machine hai, zinda pakshi nahi!' }
  ],

  initLivingSorter() {
    const item = this.getNextFromPool('living30', this.livingPool);
    this.currentGame = { item, solved: false };
    this.speakFriendly(`Batao: ${item.name} Living thing hai ya Non-Living?`);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-lime-800 bg-lime-100 border border-lime-300 px-3 py-1 rounded-full">
            🌱 Living vs Non-Living (30 Items)
          </span>
          <button onclick="ScienceModule.speakFriendly('${item.name}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Suno
          </button>
        </div>

        <div class="bg-white border-4 border-lime-200 rounded-3xl p-6 my-4 shadow-sm">
          <div class="text-7xl mb-2 float-slow">${item.icon}</div>
          <h3 class="fun-font text-2xl text-slate-800">${item.name}</h3>
          <p class="text-xs font-bold text-slate-500 mt-1">Kya yeh saans leta aur badhta hai?</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-5">
          <button onclick="ScienceModule.checkLiving(this, true)"
            class="py-4 px-3 bg-gradient-to-b from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white rounded-3xl border-b-4 border-emerald-800 shadow-lg btn-bounce flex flex-col items-center">
            <span class="text-3xl mb-1">🌱</span>
            <span class="fun-font text-lg">Living Thing</span>
            <span class="text-[11px] opacity-90">(Jaan-dar)</span>
          </button>

          <button onclick="ScienceModule.checkLiving(this, false)"
            class="py-4 px-3 bg-gradient-to-b from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800 text-white rounded-3xl border-b-4 border-slate-900 shadow-lg btn-bounce flex flex-col items-center">
            <span class="text-3xl mb-1">🪨</span>
            <span class="fun-font text-lg">Non-Living</span>
            <span class="text-[11px] opacity-90">(Be-jaan)</span>
          </button>
        </div>
      </div>
    `;
  },

  checkLiving(btn, choice) {
    const g = this.currentGame;
    if (!g || g.solved) return;

    if (choice === g.item.isLiving) {
      g.solved = true;
      btn.classList.add('scale-105', 'ring-4', 'ring-amber-400');
      this.addScore();
      App.awardStarsAndWin(`Shabash! ${g.item.reason}`);
      setTimeout(() => this.initLivingSorter(), 2000);
    } else {
      btn.classList.add('shake-anim');
      this.speakFriendly(`Socho! ${g.item.reason}`);
      setTimeout(() => btn.classList.remove('shake-anim'), 600);
    }
  },

  // =========================================================================
  // 5. HEALTHY FOOD VS JUNK FOOD SORTER (28 Food Items)
  // =========================================================================
  foodPool: [
    { name: 'Apple (Seb)', icon: '🍎', isHealthy: true, msg: 'Seb roz khane se hum healthy aur strong bante hain!' },
    { name: 'Milk (Doodh)', icon: '🥛', isHealthy: true, msg: 'Doodh se daant aur haddiyan mazboot hoti hain!' },
    { name: 'Banana (Kela)', icon: '🍌', isHealthy: true, msg: 'Kela humein khelne ke liye turant energy deta hai!' },
    { name: 'Carrot (Gajar)', icon: '🥕', isHealthy: true, msg: 'Gajar khane se aankhon ki roshni tez hoti hai!' },
    { name: 'Egg (Anda)', icon: '🥚', isHealthy: true, msg: 'Ande mein bohot saara Protein hota hai!' },
    { name: 'Broccoli / Sabzi', icon: '🥦', isHealthy: true, msg: 'Hari sabziyan humein bimariyon se bachati hain!' },
    { name: 'Watermelon (Tarbooz)', icon: '🍉', isHealthy: true, msg: 'Tarbooz mein paani aur vitamins hote hain!' },
    { name: 'Grapes (Angoor)', icon: '🍇', isHealthy: true, msg: 'Angoor ek sehatmand phal hai!' },
    { name: 'Tomato (Tamatar)', icon: '🍅', isHealthy: true, msg: 'Tamatar salad aur sabzi mein bohot healthy hota hai!' },
    { name: 'Corn (Bhutta)', icon: '🌽', isHealthy: true, msg: 'Bhutta fiber aur taqat deta hai!' },
    { name: 'Orange (Santra)', icon: '🍊', isHealthy: true, msg: 'Santre mein Vitamin C hota hai!' },
    { name: 'Curd / Bowl', icon: '🥣', isHealthy: true, msg: 'Dahi aur dal pet ke liye bohot achhi hoti hain!' },
    { name: 'Coconut Water', icon: '🥥', isHealthy: true, msg: 'Nariyal paani sabse healthy drink hai!' },
    { name: 'Honey (Shehad)', icon: '🍯', isHealthy: true, msg: 'Shehad natural aur sehatmand hota hai!' },
    { name: 'Burger', icon: '🍔', isHealthy: false, msg: 'Burger zyada khane se pet kharab ho sakta hai, yeh Junk Food hai!' },
    { name: 'Pizza', icon: '🍕', isHealthy: false, msg: 'Pizza kabhi-kabhi thik hai par roz ke liye Junk Food hai!' },
    { name: 'French Fries', icon: '🍟', isHealthy: false, msg: 'Zyada tala hua khana Junk Food hota hai!' },
    { name: 'Cold Drink', icon: '🥤', isHealthy: false, msg: 'Cold drink mein bohot cheeni hoti hai, doodh aur paani behtar hain!' },
    { name: 'Candy / Toffee', icon: '🍬', isHealthy: false, msg: 'Zyada toffee khane se daanton mein keeda lag sakta hai!' },
    { name: 'Donut', icon: '🍩', isHealthy: false, msg: 'Donut mein bohot cheeni aur maida hota hai!' },
    { name: 'Lollipop', icon: '🍭', isHealthy: false, msg: 'Lollipop ek Junk sweet hai!' },
    { name: 'Ice Cream Cone', icon: '🍦', isHealthy: false, msg: 'Roz ice cream khane se gala kharab ho sakta hai!' },
    { name: 'Hot Dog', icon: '🌭', isHealthy: false, msg: 'Yeh ek Junk Food hai!' },
    { name: 'Cupcake', icon: '🧁', isHealthy: false, msg: 'Zyada meetha cake Junk Food mein aata hai!' },
    { name: 'Chocolate Bar', icon: '🍫', isHealthy: false, msg: 'Zyada chocolate daanton ke liye achhi nahi!' },
    { name: 'Pastry Cake', icon: '🍰', isHealthy: false, msg: 'Cream pastry roz khana healthy nahi hota!' },
    { name: 'Popcorn Tub', icon: '🍿', isHealthy: false, msg: 'Zyada namak-makkhan wala popcorn Junk Food hai!' },
    { name: 'Cookie', icon: '🍪', isHealthy: false, msg: 'Maide ke biscuits zyada nahi khane chahiye!' }
  ],

  initHealthyFoodSorter() {
    const item = this.getNextFromPool('food28', this.foodPool);
    this.currentGame = { item, solved: false };
    this.speakFriendly(`Batao: ${item.name} Healthy Food hai ya Junk Food?`);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-rose-800 bg-rose-100 border border-rose-300 px-3 py-1 rounded-full">
            🥦 Healthy vs Junk Food (28 Items)
          </span>
          <button onclick="ScienceModule.speakFriendly('${item.name}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Suno
          </button>
        </div>

        <div class="bg-white border-4 border-rose-200 rounded-3xl p-6 my-4 shadow-sm">
          <div class="text-7xl mb-2 float-slow">${item.icon}</div>
          <h3 class="fun-font text-2xl text-slate-800">${item.name}</h3>
          <p class="text-xs font-bold text-slate-500 mt-1">Yeh hamari sehat ke liye kaisa hai?</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-5">
          <button onclick="ScienceModule.checkFoodChoice(this, true)"
            class="py-4 px-3 bg-gradient-to-b from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white rounded-3xl border-b-4 border-green-800 shadow-lg btn-bounce flex flex-col items-center">
            <span class="text-3xl mb-1">🥗</span>
            <span class="fun-font text-lg">Healthy Food</span>
            <span class="text-[11px] opacity-90">(Taqatwar Khana)</span>
          </button>

          <button onclick="ScienceModule.checkFoodChoice(this, false)"
            class="py-4 px-3 bg-gradient-to-b from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-3xl border-b-4 border-red-800 shadow-lg btn-bounce flex flex-col items-center">
            <span class="text-3xl mb-1">🍔</span>
            <span class="fun-font text-lg">Junk Food</span>
            <span class="text-[11px] opacity-90">(Kam Khana Chahiye)</span>
          </button>
        </div>
      </div>
    `;
  },

  checkFoodChoice(btn, choice) {
    const g = this.currentGame;
    if (!g || g.solved) return;

    if (choice === g.item.isHealthy) {
      g.solved = true;
      btn.classList.add('scale-105', 'ring-4', 'ring-amber-400');
      this.addScore();
      App.awardStarsAndWin(`Bilkul sahi! ${g.item.msg}`);
      setTimeout(() => this.initHealthyFoodSorter(), 2000);
    } else {
      btn.classList.add('shake-anim');
      this.speakFriendly(`Dhyan se socho! ${g.item.msg}`);
      setTimeout(() => btn.classList.remove('shake-anim'), 600);
    }
  }
};