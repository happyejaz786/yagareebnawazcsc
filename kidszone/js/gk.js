// General Knowledge Module (7 Days Rainbow Train, 12 Months & Seasons, 28 Fruits/Veggies, 16 Mera Bharat, 18 Vehicles, 16 Helpers)
const GkModule = {
  score: 0,
  queues: {},
  reciteTimer: null,
  exploredSet: new Set(),
  currentGame: null,
  popupState: {
    category: 'days',
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

  stopRecitation() {
    if (this.reciteTimer) {
      clearInterval(this.reciteTimer);
      this.reciteTimer = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  addScore() {
    this.score++;
    const el = document.getElementById('gkScoreBadge');
    if (el) el.innerText = this.score;
  },

  switchMode(mode) {
    this.stopRecitation();
    document.querySelectorAll('.gk-tab').forEach(btn => btn.classList.remove('gk-tab-active'));
    const active = document.getElementById(`gktab-${mode}`);
    if (active) active.classList.add('gk-tab-active');

    if (mode === 'days') this.initDaysTrain('explore');
    else if (mode === 'months') this.initMonths('explore');
    else if (mode === 'food') this.initFoodWorld('explore');
    else if (mode === 'india') this.initIndiaWorld('explore');
    else if (mode === 'vehicles') this.initVehiclesWorld('explore');
    else if (mode === 'helpers') this.initHelpersWorld('explore');
  },

  getNextFromPool(key, list) {
    if (!this.queues[key] || this.queues[key].length === 0) {
      this.queues[key] = [...list].sort(() => Math.random() - 0.5);
    }
    return this.queues[key].pop();
  },

  // =========================================================================
  // BIG POP-UP MODAL ENGINE
  // =========================================================================
  getCategoryList(cat) {
    if (cat === 'days') return this.daysList;
    if (cat === 'months') return this.monthsList;
    if (cat === 'food') return this.foodList;
    if (cat === 'india') return this.indiaList;
    if (cat === 'vehicles') return this.vehiclesList;
    if (cat === 'helpers') return this.helpersList;
    return [];
  },

  openPopup(category, index) {
    this.stopRecitation();
    const list = this.getCategoryList(category);
    const item = list[index];
    if (!item) return;

    const badges = {
      days: '🚂 7 Days of the Week',
      months: '🗓️ 12 Months of the Year',
      food: '🍓 Healthy Fruits & Veggies',
      india: '🇮🇳 Mera Bharat Mahan',
      vehicles: '🚀 Transport & Vehicles',
      helpers: '👨‍⚕️ Our Community Helpers'
    };

    const title = item.en || item.name;
    const sub = item.hi || item.tag || '';
    const desc = item.tip || item.desc || '';
    const speech = `${title}! ${sub ? sub + '!' : ''} ${desc}`;

    this.popupState = { category, index, speechText: speech };

    document.getElementById('gkPopupBadge').innerText = badges[category] || '🌍 General Knowledge';
    document.getElementById('gkPopupIcon').innerText = item.icon;
    document.getElementById('gkPopupTitle').innerText = title;
    document.getElementById('gkPopupSub').innerText = sub;
    document.getElementById('gkPopupDesc').innerText = desc;

    const card = document.getElementById('gkModalCard');
    card.classList.remove('hero-pop-out');
    void card.offsetWidth;
    card.classList.add('hero-pop-out');

    document.getElementById('gkZoomModal').classList.remove('hidden');

    App.playRewardSound();
    this.speakFriendly(speech);

    const key = `${category}_${index}`;
    if (!this.exploredSet.has(key)) {
      this.exploredSet.add(key);
      this.addScore();
      if (this.exploredSet.size % 5 === 0) {
        App.awardStarsAndWin(`Zabardast GK Champ! Tumne ${this.exploredSet.size} nayi cheezein seekhi!`);
      }
    }
  },

  navigatePopup(step) {
    const { category, index } = this.popupState;
    const list = this.getCategoryList(category);
    if (!list.length) return;
    const nextIdx = (index + step + list.length) % list.length;
    this.openPopup(category, nextIdx);
  },

  replayPopupAudio() {
    if (this.popupState.speechText) {
      App.playRewardSound();
      this.speakFriendly(this.popupState.speechText);
    }
  },

  closePopup() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    document.getElementById('gkZoomModal').classList.add('hidden');
  },

  // =========================================================================
  // 1. 7 DAYS RAINBOW TRAIN (Super Attractive + Auto-Song + Quiz)
  // =========================================================================
  daysList: [
    { en: 'Sunday', hi: 'Itwar (Ravivar)', icon: '☀️', color: 'from-rose-400 to-red-500 border-red-600', tip: 'Day 1: Sunday is a Holiday! Khelne aur family ke saath masti ka din!' },
    { en: 'Monday', hi: 'Somwar', icon: '🎒', color: 'from-orange-400 to-amber-500 border-amber-600', tip: 'Day 2: Monday ko fresh hokar school aur padhai shuru karte hain!' },
    { en: 'Tuesday', hi: 'Mangalwar', icon: '🚀', color: 'from-yellow-400 to-amber-400 border-yellow-600', tip: 'Day 3: Tuesday ko hum naye games aur tables seekhte hain!' },
    { en: 'Wednesday', hi: 'Budhwar', icon: '🌳', color: 'from-emerald-400 to-green-500 border-green-600', tip: 'Day 4: Wednesday hafte ke beech (middle) ka din hota hai!' },
    { en: 'Thursday', hi: 'Jumerat (Guruwar)', icon: '⭐', color: 'from-sky-400 to-blue-500 border-blue-600', tip: 'Day 5: Thursday ko hum drawing aur story time enjoy karte hain!' },
    { en: 'Friday', hi: 'Juma (Shukrawar)', icon: '🕌', color: 'from-indigo-400 to-purple-500 border-purple-600', tip: 'Day 6: Friday bohot pyara aur barkat wala din hota hai!' },
    { en: 'Saturday', hi: 'Hafta (Shaniwar)', icon: '🎨', color: 'from-pink-400 to-fuchsia-500 border-fuchsia-600', tip: 'Day 7: Saturday hafte ka aakhiri din hai, kal phir Sunday aayega!' }
  ],

  initDaysTrain(subMode = 'explore') {
    this.stopRecitation();
    const arena = document.getElementById('gameArena');

    if (subMode === 'explore') {
      this.speakFriendly('7 Dino ki Rainbow Train! Kisi bhi dabbe par tap karo ya poora hafta ek saath suno!');
      arena.innerHTML = `
        <div class="w-full pop-in">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="text-xs font-bold text-purple-800 bg-purple-100 border border-purple-300 px-3 py-1 rounded-full">
              🚂 7 Dino Ki Rainbow Train
            </span>
            <div class="flex gap-2">
              <button onclick="GkModule.reciteAllDays()" class="bg-amber-400 hover:bg-amber-500 text-amber-950 px-3 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce">
                🔊 Poora Hafta Suno
              </button>
              <button onclick="GkModule.initDaysTrain('quiz')" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce">
                🎯 Days Quiz →
              </button>
            </div>
          </div>

          <!-- Train Engine Banner -->
          <div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white rounded-2xl p-3 mb-3 flex items-center justify-between shadow">
            <div class="flex items-center gap-2.5">
              <span class="text-4xl float-slow">🚂💨</span>
              <div>
                <h4 class="fun-font text-base text-amber-300">1 Week = 7 Days (Ek Hafte mein 7 Din)</h4>
                <p class="text-[11px] text-purple-100">Kisi bhi dabbe par tap karke bada card kholein!</p>
              </div>
            </div>
          </div>

          <!-- 7 Colorful Train Coaches Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            ${this.daysList.map((d, idx) => `
              <button id="daycoach-${idx}" onclick="GkModule.openPopup('days', ${idx})"
                class="bg-gradient-to-b ${d.color} border-2 border-b-4 rounded-3xl p-3 text-white flex flex-col items-center justify-between shadow-md btn-bounce transition relative">
                <span class="bg-white/25 text-white text-[10px] font-black px-2 py-0.5 rounded-full">Day ${idx + 1}</span>
                <span class="text-4xl my-2 drop-shadow">${d.icon}</span>
                <div class="text-center">
                  <span class="fun-font text-base block leading-tight">${d.en}</span>
                  <span class="text-[11px] font-bold text-white/90 block mt-0.5">${d.hi.split(' ')[0]}</span>
                </div>
                <div class="flex gap-2 mt-2 text-xs opacity-90"><span>⚫</span><span>⚫</span></div>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Days Quiz (Before / After / Day Number)
      const idx = Math.floor(Math.random() * 7);
      const qType = Math.floor(Math.random() * 3); // 0: After, 1: Before, 2: Day number
      let question = '';
      let correct = '';

      if (qType === 0) {
        const nextIdx = (idx + 1) % 7;
        question = `${this.daysList[idx].en} ke baad (after) kaunsa din aata hai?`;
        correct = this.daysList[nextIdx].en;
      } else if (qType === 1) {
        const prevIdx = (idx - 1 + 7) % 7;
        question = `${this.daysList[idx].en} se pehle (before) kaunsa din aata hai?`;
        correct = this.daysList[prevIdx].en;
      } else {
        question = `Hafte ka Day ${idx + 1} kaunsa din hota hai?`;
        correct = this.daysList[idx].en;
      }

      const distractors = this.daysList
        .map(d => d.en)
        .filter(name => name !== correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const opts = [correct, ...distractors].sort(() => Math.random() - 0.5);

      this.currentGame = { solved: false };
      this.speakFriendly(question);

      arena.innerHTML = `
        <div class="text-center w-full max-w-md pop-in">
          <div class="flex items-center justify-between mb-4">
            <button onclick="GkModule.initDaysTrain('explore')" class="bg-purple-100 hover:bg-purple-200 text-purple-900 px-3 py-1 rounded-xl text-xs font-extrabold border border-purple-300 btn-bounce">
              ← Train Dekhein
            </button>
            <button onclick="GkModule.speakFriendly('${question}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
              🔊 Sawal Suno
            </button>
          </div>

          <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 mb-5">
            <span class="text-4xl block mb-2">🚂❓</span>
            <h3 class="fun-font text-xl text-purple-950">${question}</h3>
          </div>

          <div class="grid grid-cols-2 gap-3">
            ${opts.map(opt => `
              <button onclick="GkModule.checkDayQuiz(this, '${opt}', '${correct}')"
                class="py-3.5 px-3 bg-white hover:bg-purple-50 border-2 border-b-4 border-purple-400 rounded-2xl fun-font text-lg text-purple-900 shadow btn-bounce transition">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
  },

  reciteAllDays() {
    this.stopRecitation();
    let idx = 0;
    const step = () => {
      if (idx >= this.daysList.length) {
        this.stopRecitation();
        return;
      }
      document.querySelectorAll('[id^="daycoach-"]').forEach(el => el.classList.remove('ring-4', 'ring-yellow-300', 'scale-105'));
      const coach = document.getElementById(`daycoach-${idx}`);
      if (coach) coach.classList.add('ring-4', 'ring-yellow-300', 'scale-105');

      const d = this.daysList[idx];
      this.speakFriendly(`Day ${idx + 1}: ${d.en}, ${d.hi.split(' ')[0]}`);
      idx++;
    };
    step();
    this.reciteTimer = setInterval(step, 2000);
  },

  checkDayQuiz(btn, chosen, correct) {
    if (this.currentGame.solved) return;
    if (chosen === correct) {
      this.currentGame.solved = true;
      btn.classList.add('!bg-emerald-500', '!border-emerald-700', '!text-white', 'scale-105');
      this.addScore();
      App.awardStarsAndWin(`Shabash! ${correct} bilkul sahi jawab hai!`);
      setTimeout(() => this.initDaysTrain('quiz'), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700');
      this.speakFriendly('Arey nahi, Sunday Monday ginti karke dekhein!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700'), 600);
    }
  },

  // =========================================================================
  // 2. 12 MONTHS & SEASONS (Visual Cards + Memory Clues + Recite + Quiz)
  // =========================================================================
  monthsList: [
    { en: 'January', hi: 'Month 1 • ❄️ Sardi', icon: '⛄', cardBg: 'from-sky-50 to-blue-100 border-blue-300', tip: 'Saal ka pehla mahina (1st Month)! Isme khoob thand padti hai aur New Year manate hain!' },
    { en: 'February', hi: 'Month 2 • 🌸 Basant', icon: '🌷', cardBg: 'from-pink-50 to-rose-100 border-rose-300', tip: 'Saal ka doosra mahina (2nd Month)! Yeh sabse chhota mahina hota hai (28 ya 29 din)!' },
    { en: 'March', hi: 'Month 3 • 🎨 Rang & Phool', icon: '🦋', cardBg: 'from-fuchsia-50 to-purple-100 border-purple-300', tip: 'Teesra mahina (3rd Month)! Nayi class aur rangon ka mausam aata hai!' },
    { en: 'April', hi: 'Month 4 • ☀️ Halki Garmi', icon: '🌻', cardBg: 'from-amber-50 to-yellow-100 border-yellow-300', tip: 'Chautha mahina (4th Month)! Sooraj tez chamakne lagta hai!' },
    { en: 'May', hi: 'Month 5 • 🥭 Aam ka Mausam', icon: '🥭', cardBg: 'from-orange-50 to-amber-100 border-orange-300', tip: 'Paanchwa mahina (5th Month)! Meethe-meethe aam aate hain aur summer vacation hoti hai!' },
    { en: 'June', hi: 'Month 6 • 🍦 Summer Holidays', icon: '🏖️', cardBg: 'from-yellow-50 to-orange-100 border-amber-400', tip: 'Chhatha mahina (6th Month)! Garmi ki chhuttiyon mein ice cream aur masti!' },
    { en: 'July', hi: 'Month 7 • 🌧️ Baarish (Monsoon)', icon: '☔', cardBg: 'from-cyan-50 to-sky-100 border-cyan-400', tip: 'Saatwa mahina (7th Month)! Rimjhim baarish aur kaagaz ki naav chalane ka mausam!' },
    { en: 'August', hi: 'Month 8 • 🇮🇳 Azadi ka Mahina', icon: '🇮🇳', cardBg: 'from-emerald-50 to-green-100 border-emerald-400', tip: 'Aathwa mahina (8th Month)! 15 August ko hum Independence Day manate hain!' },
    { en: 'September', hi: 'Month 9 • 👩‍🏫 Teachers Day', icon: '📚', cardBg: 'from-indigo-50 to-blue-100 border-indigo-300', tip: 'Nauwa mahina (9th Month)! 5 September ko Teachers Day manate hain!' },
    { en: 'October', hi: 'Month 10 • 🪔 Tyoharon ka Mahina', icon: '✨', cardBg: 'from-amber-50 to-orange-100 border-amber-400', tip: 'Daswa mahina (10th Month)! 2 October ko Gandhi Jayanti aur roshni ke tyohar aate hain!' },
    { en: 'November', hi: 'Month 11 • 🧸 Childrens Day', icon: '🎈', cardBg: 'from-rose-50 to-pink-100 border-rose-300', tip: 'Gyarahwa mahina (11th Month)! 14 November ko Childrens Day aur gulabi thand!' },
    { en: 'December', hi: 'Month 12 • ❄️ Sardi & Holidays', icon: '🎄', cardBg: 'from-blue-50 to-indigo-100 border-blue-400', tip: 'Saal ka aakhiri mahina (12th Month)! Winter holidays aur thandi hawa!' }
  ],

  initMonths(subMode = 'explore') {
    this.stopRecitation();
    const arena = document.getElementById('gameArena');

    if (subMode === 'explore') {
      this.speakFriendly('12 Mahine! Kisi bhi mahine par tap karke uska mausam aur khasiyat jaano!');
      arena.innerHTML = `
        <div class="w-full pop-in">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="text-xs font-bold text-indigo-800 bg-indigo-100 border border-indigo-300 px-3 py-1 rounded-full">
              🗓️ 1 Year = 12 Months (12 Mahine)
            </span>
            <div class="flex gap-2">
              <button onclick="GkModule.reciteAllMonths()" class="bg-amber-400 hover:bg-amber-500 text-amber-950 px-3 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce">
                🔊 12 Mahine Suno
              </button>
              <button onclick="GkModule.initMonths('quiz')" class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce">
                🎯 Months Quiz →
              </button>
            </div>
          </div>

          <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 p-1">
            ${this.monthsList.map((m, idx) => `
              <button id="monthcard-${idx}" onclick="GkModule.openPopup('months', ${idx})"
                class="bg-gradient-to-b ${m.cardBg} border-2 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-xs relative">
                <span class="absolute top-1.5 left-2 text-[10px] font-black bg-white/80 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">#${idx + 1}</span>
                <span class="text-4xl my-1">${m.icon}</span>
                <span class="fun-font text-base text-slate-900">${m.en}</span>
                <span class="text-[11px] font-bold text-slate-600 mt-0.5">${m.hi.split('•')[1] || m.hi}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      const idx = Math.floor(Math.random() * 12);
      const qType = Math.floor(Math.random() * 2); // 0: Month number, 1: After month
      let question = '';
      let correct = '';

      if (qType === 0) {
        question = `Saal ka Month #${idx + 1} kaunsa mahina hota hai?`;
        correct = this.monthsList[idx].en;
      } else {
        const nextIdx = (idx + 1) % 12;
        question = `${this.monthsList[idx].en} ke baad kaunsa mahina aata hai?`;
        correct = this.monthsList[nextIdx].en;
      }

      const distractors = this.monthsList
        .map(m => m.en)
        .filter(name => name !== correct)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const opts = [correct, ...distractors].sort(() => Math.random() - 0.5);

      this.currentGame = { solved: false };
      this.speakFriendly(question);

      arena.innerHTML = `
        <div class="text-center w-full max-w-md pop-in">
          <div class="flex items-center justify-between mb-4">
            <button onclick="GkModule.initMonths('explore')" class="bg-indigo-100 hover:bg-indigo-200 text-indigo-900 px-3 py-1 rounded-xl text-xs font-extrabold border border-indigo-300 btn-bounce">
              ← 12 Mahine Dekhein
            </button>
            <button onclick="GkModule.speakFriendly('${question}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
              🔊 Sawal Suno
            </button>
          </div>

          <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 mb-5">
            <span class="text-4xl block mb-2">🗓️✨</span>
            <h3 class="fun-font text-xl text-indigo-950">${question}</h3>
          </div>

          <div class="grid grid-cols-2 gap-3">
            ${opts.map(opt => `
              <button onclick="GkModule.checkMonthQuiz(this, '${opt}', '${correct}')"
                class="py-3.5 px-3 bg-white hover:bg-indigo-50 border-2 border-b-4 border-indigo-400 rounded-2xl fun-font text-lg text-indigo-900 shadow btn-bounce transition">
                📅 ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
  },

  reciteAllMonths() {
    this.stopRecitation();
    let idx = 0;
    const step = () => {
      if (idx >= this.monthsList.length) {
        this.stopRecitation();
        return;
      }
      document.querySelectorAll('[id^="monthcard-"]').forEach(el => el.classList.remove('ring-4', 'ring-amber-400', 'scale-105'));
      const card = document.getElementById(`monthcard-${idx}`);
      if (card) {
        card.classList.add('ring-4', 'ring-amber-400', 'scale-105');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      this.speakFriendly(`Number ${idx + 1}: ${this.monthsList[idx].en}`);
      idx++;
    };
    step();
    this.reciteTimer = setInterval(step, 1750);
  },

  checkMonthQuiz(btn, chosen, correct) {
    if (this.currentGame.solved) return;
    if (chosen === correct) {
      this.currentGame.solved = true;
      btn.classList.add('!bg-emerald-500', '!border-emerald-700', '!text-white', 'scale-105');
      this.addScore();
      App.awardStarsAndWin(`Zabardast! ${correct} bilkul sahi jawab hai!`);
      setTimeout(() => this.initMonths('quiz'), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700');
      this.speakFriendly('January February ginti karke phir se dekhein!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700'), 600);
    }
  },

  // =========================================================================
  // 3. FRUITS & VEGGIES (28 Items - Big Pop-Up + Quiz)
  // =========================================================================
  foodList: [
    { name: 'Mango (Aam)', tag: '🍓 Fruit • Falon ka Raja', icon: '🥭', desc: 'Aam peela aur meetha hota hai, ise Falon ka Raja kehte hain!' },
    { name: 'Apple (Seb)', tag: '🍓 Fruit • Sehatmand Fal', icon: '🍎', desc: 'Laal meetha seb humein healthy aur strong banata hai!' },
    { name: 'Banana (Kela)', tag: '🍓 Fruit • Energy Booster', icon: '🍌', desc: 'Kela chheel kar khate hain aur isme koi beej nahi hota!' },
    { name: 'Grapes (Angoor)', tag: '🍓 Fruit • Rasbhare', icon: '🍇', desc: 'Angoor guchhon mein ugte hain aur hare ya kaale rang ke hote hain!' },
    { name: 'Watermelon (Tarbooz)', tag: '🍓 Fruit • Thanda Meetha', icon: '🍉', desc: 'Tarbooz bahar se hara aur andar se laal aur rasila hota hai!' },
    { name: 'Orange (Santra)', tag: '🍓 Fruit • Vitamin C', icon: '🍊', desc: 'Santra khatta-meetha hota hai aur isse juice bhi banta hai!' },
    { name: 'Pineapple (Ananas)', tag: '🍓 Fruit • Taj Wala Fal', icon: '🍍', desc: 'Ananas ke upar patton ka taj hota hai!' },
    { name: 'Strawberry', tag: '🍓 Fruit • Pyari Berry', icon: '🍓', desc: 'Laal rang ki strawberry cake aur milkshake mein bohot tasty lagti hai!' },
    { name: 'Pomegranate (Anar)', tag: '🍓 Fruit • Laal Daane', icon: '🧆', desc: 'Anar ke andar laal moti jaise meethe daane hote hain!' },
    { name: 'Papaya (Papita)', tag: '🍓 Fruit • Pet ke Liye Best', icon: '🍈', desc: 'Papita pachaane mein aasaan aur bohot sehatmand hota hai!' },
    { name: 'Pear (Nashpati)', tag: '🍓 Fruit', icon: '🍐', desc: 'Nashpati hari aur rasili hoti hai!' },
    { name: 'Cherry', tag: '🍓 Fruit', icon: '🍒', desc: 'Chhoti si laal cherry bohot pyari dikhti hai!' },
    { name: 'Kiwi', tag: '🍓 Fruit', icon: '🥝', desc: 'Kiwi bahar se bhoori aur andar se hari hoti hai!' },
    { name: 'Coconut (Nariyal)', tag: '🍓 Fruit', icon: '🥥', desc: 'Nariyal ka paani humein taaza aur thanda rakhta hai!' },
    { name: 'Potato (Aloo)', tag: '🥦 Vegetable • Sabziyon ka Raja', icon: '🥔', desc: 'Aloo zameen ke neeche ugta hai aur har sabzi ke saath mil jata hai!' },
    { name: 'Tomato (Tamatar)', tag: '🥦 Vegetable', icon: '🍅', desc: 'Laal-laal tamatar salad aur sabzi ka swaad badhata hai!' },
    { name: 'Carrot (Gajar)', tag: '🥦 Vegetable', icon: '🥕', desc: 'Gajar khane se hamari aankhon ki roshni tez hoti hai!' },
    { name: 'Broccoli / Gobhi', tag: '🥦 Vegetable', icon: '🥦', desc: 'Broccoli chhote hare ped jaisi dikhti hai aur bohot healthy hoti hai!' },
    { name: 'Corn (Bhutta)', tag: '🥦 Vegetable', icon: '🌽', desc: 'Bhutte ke peele daanon se Popcorn bhi banta hai!' },
    { name: 'Peas (Matar)', tag: '🥦 Vegetable', icon: '🫛', desc: 'Hari phali ke andar gol-gol meethe matar hote hain!' },
    { name: 'Brinjal (Baingan)', tag: '🥦 Vegetable', icon: '🍆', desc: 'Baingan jaamuni (purple) rang ka hota hai!' },
    { name: 'Onion (Pyaz)', tag: '🥦 Vegetable', icon: '🧅', desc: 'Pyaz mein kai partein (layers) hoti hain!' },
    { name: 'Garlic (Lahsun)', tag: '🥦 Vegetable', icon: '🧄', desc: 'Lahsun khane mein khushboo aur sehat deta hai!' },
    { name: 'Cucumber (Kheera)', tag: '🥦 Vegetable', icon: '🥒', desc: 'Kheera salad mein khate hain, isme bohot paani hota hai!' },
    { name: 'Capsicum (Shimla Mirch)', tag: '🥦 Vegetable', icon: '🫑', desc: 'Shimla mirch hari, laal aur peeli hoti hai aur teekhi nahi hoti!' },
    { name: 'Mushroom', tag: '🥦 Vegetable', icon: '🍄', desc: 'Mushroom chhoti chhatri jaisa dikhta hai!' },
    { name: 'Pumpkin (Kaddu)', tag: '🥦 Vegetable', icon: '🎃', desc: 'Kaddu ek bada aur gol sabzi hota hai!' },
    { name: 'Sweet Potato (Shakarkandi)', tag: '🥦 Vegetable', icon: '🍠', desc: 'Shakarkandi bhoon kar khane mein meethi lagti hai!' }
  ],

  initFoodWorld(subMode = 'explore') {
    const arena = document.getElementById('gameArena');
    if (subMode === 'explore') {
      this.speakFriendly('Fruits aur Vegetables! Kisi par bhi tap karke bada pop-up dekhein!');
      arena.innerHTML = `
        <div class="w-full pop-in">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="text-xs font-bold text-orange-800 bg-orange-100 border border-orange-300 px-3 py-1 rounded-full">
              🍓 Fruits & Vegetables (28 Items)
            </span>
            <button onclick="GkModule.initFoodWorld('quiz')" class="bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce">
              🎯 Pehchano Quiz →
            </button>
          </div>
          <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5 p-1">
            ${this.foodList.map((item, idx) => `
              <button onclick="GkModule.openPopup('food', ${idx})"
                class="bg-gradient-to-b from-white to-orange-50 hover:bg-orange-100 border-2 border-orange-200 rounded-2xl p-2.5 flex flex-col items-center justify-center btn-bounce shadow-xs">
                <span class="text-4xl mb-1">${item.icon}</span>
                <span class="text-[11px] font-extrabold text-slate-700 text-center leading-tight">${item.name.split(' ')[0]}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      this.renderIconQuiz('food', this.foodList, 'Kaunsa Phal ya Sabzi Hai?');
    }
  },

  // =========================================================================
  // 4. MERA BHARAT (16 National Symbols & Wonders)
  // =========================================================================
  indiaList: [
    { name: 'Tiranga (National Flag)', tag: '🇮🇳 Rashtriya Dhwaj', icon: '🇮🇳', desc: 'Hamare Tirange mein 3 rang (Kesariya, Safed, Hara) aur beech mein Ashoka Chakra hai!' },
    { name: 'Royal Bengal Tiger', tag: '🐯 National Animal', icon: '🐯', desc: 'Bagh (Tiger) Bharat ka Rashtriya Pashu hai, yeh taqat aur furti ka pratik hai!' },
    { name: 'Peacock (Mor)', tag: '🦚 National Bird', icon: '🦚', desc: 'Sundar rang-birange pankhon wala Mor Bharat ka Rashtriya Pakshi hai!' },
    { name: 'Lotus (Kamal)', tag: '🪷 National Flower', icon: '🪷', desc: 'Paani mein khilne wala Kamal Bharat ka Rashtriya Phool hai!' },
    { name: 'Mango (Aam)', tag: '🥭 National Fruit', icon: '🥭', desc: 'Meetha Aam Bharat ka Rashtriya Phal hai!' },
    { name: 'Banyan Tree (Bargad)', tag: '🌳 National Tree', icon: '🌳', desc: 'Bargad ka ped bohot bada aur ghana hota hai, yeh hamara Rashtriya Vriksh hai!' },
    { name: 'Indian Rupee (₹)', tag: '💰 National Currency', icon: '💵', desc: 'Bharat ki mudra ko Indian Rupee (₹) kehte hain!' },
    { name: 'Hockey & Cricket', tag: '🏑 Sports of India', icon: '🏏', desc: 'Bharat ke bachon ko Hockey aur Cricket khelna bohot pasand hai!' },
    { name: 'Taj Mahal (Agra)', tag: '🕌 Wonder of the World', icon: '🕌', desc: 'Safed sangmarmar se bana Taj Mahal duniya ke 7 ajoobon mein shamil hai!' },
    { name: 'Red Fort (Lal Qila)', tag: '🏰 Delhi Monument', icon: '🏰', desc: 'Lal Qila Delhi mein hai, yahan 15 August ko Tiranga fehraya jata hai!' },
    { name: 'River Ganga', tag: '🌊 National River', icon: '🏞️', desc: 'Ganga Bharat ki sabse pavitra aur lambi nadiyon mein se ek hai!' },
    { name: 'Elephant (Haathi)', tag: '🐘 Heritage Animal', icon: '🐘', desc: 'Haathi Bharat ka National Heritage Animal hai!' },
    { name: 'King Cobra', tag: '🐍 National Reptile', icon: '🐍', desc: 'King Cobra Bharat ka National Reptile hai!' },
    { name: 'River Dolphin', tag: '🐬 National Aquatic Animal', icon: '🐬', desc: 'Ganga mein rehne wali Dolphin hamara Rashtriya Jaliya Jeev hai!' },
    { name: 'Indian Railways', tag: '🚆 Bharat ki Train', icon: '🚆', desc: 'Indian Railways poore desh ke shehron aur gaon ko jodti hai!' },
    { name: 'ISRO Space', tag: '🚀 Bharat ka Rocket', icon: '🚀', desc: 'ISRO ne Chandrayaan ko Chaand par bhej kar Bharat ka naam roshan kiya!' }
  ],

  initIndiaWorld(subMode = 'explore') {
    const arena = document.getElementById('gameArena');
    if (subMode === 'explore') {
      this.speakFriendly('Mera Bharat Mahan! Hamare desh ke National Symbols par tap karke jaano!');
      arena.innerHTML = `
        <div class="w-full pop-in">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
              🇮🇳 Mera Bharat Mahan (16 Symbols)
            </span>
            <button onclick="GkModule.initIndiaWorld('quiz')" class="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce">
              🎯 Bharat Quiz →
            </button>
          </div>
          <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1">
            ${this.indiaList.map((item, idx) => `
              <button onclick="GkModule.openPopup('india', ${idx})"
                class="bg-gradient-to-b from-orange-50 via-white to-emerald-50 hover:shadow-md border-2 border-amber-300 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-xs">
                <span class="text-4xl mb-1">${item.icon}</span>
                <span class="fun-font text-xs text-slate-800 text-center">${item.name}</span>
                <span class="text-[10px] font-bold text-emerald-700 mt-0.5">${item.tag}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      this.renderIconQuiz('india', this.indiaList, 'Mera Bharat Quiz');
    }
  },

  // =========================================================================
  // 5. VEHICLES & TRANSPORT (18 Land, Air & Water Vehicles)
  // =========================================================================
  vehiclesList: [
    { name: 'Car', tag: '🛣️ Land Transport', icon: '🚗', desc: 'Car ke 4 pahiye (wheels) hote hain aur yeh sadak par chalti hai!' },
    { name: 'School Bus', tag: '🛣️ Land Transport', icon: '🚌', desc: 'Peeli School Bus bachon ko roz school le jati aur laati hai!' },
    { name: 'Train (Railgaadi)', tag: '🛤️ Track Transport', icon: '🚂', desc: 'Chhuk-chhuk karti Train lohe ki patriyon (tracks) par chalti hai!' },
    { name: 'Metro Train', tag: '🚇 Fast City Train', icon: '🚇', desc: 'Metro bade shehron mein bijli se tez chalti hai!' },
    { name: 'Aeroplane', tag: '☁️ Air Transport', icon: '✈️', desc: 'Hawai Jahaz badalon ke upar ud kar door ke deshon tak le jata hai!' },
    { name: 'Helicopter', tag: '☁️ Air Transport', icon: '🚁', desc: 'Helicopter ke upar bada pankha (rotor) ghoomta hai aur yeh kahin bhi utar sakta hai!' },
    { name: 'Rocket', tag: '🚀 Space Transport', icon: '🚀', desc: 'Rocket sabse tez ud kar antariksh (Space) mein jata hai!' },
    { name: 'Ship (Paani ka Jahaz)', tag: '🌊 Water Transport', icon: '🚢', desc: 'Bada Ship samundar mein tair kar saaman aur logon ko le jata hai!' },
    { name: 'Boat (Naav)', tag: '🌊 Water Transport', icon: '⛵', desc: 'Chhoti Naav nadi aur jheel mein chalti hai!' },
    { name: 'Submarine', tag: '🌊 Underwater Vehicle', icon: '🚤', desc: 'Submarine paani ke andar (underwater) chalti hai!' },
    { name: 'Ambulance', tag: '🚑 Emergency Vehicle', icon: '🚑', desc: 'Ambulance beemar logon ko jaldi hospital pahunchati hai!' },
    { name: 'Fire Engine', tag: '🚒 Emergency Vehicle', icon: '🚒', desc: 'Laal Fire Brigade gaadi paani daal kar aag bujhati hai!' },
    { name: 'Police Car', tag: '🚓 Emergency Vehicle', icon: '🚓', desc: 'Police ki gaadi hamari suraksha ke liye ghoomti hai!' },
    { name: 'Tractor', tag: '🌾 Farm Vehicle', icon: '🚜', desc: 'Tractor kisan ki khet jotne mein madad karta hai!' },
    { name: 'Bicycle (Cycle)', tag: '🚲 2-Wheeler', icon: '🚲', desc: 'Cycle chalane se hamari exercise hoti hai aur dhuan bhi nahi hota!' },
    { name: 'Auto Rickshaw', tag: '🛺 3-Wheeler', icon: '🛺', desc: 'Auto Rickshaw ke 3 pahiye hote hain!' },
    { name: 'Scooter / Bike', tag: '🛵 2-Wheeler', icon: '🛵', desc: 'Scooter aur bike chalate waqt hamesha Helmet pehenna chahiye!' },
    { name: 'Hot Air Balloon', tag: '🎈 Sky Ride', icon: '🎈', desc: 'Garam hawa se bhara bada gubbara aasman mein dheere-dheere udta hai!' }
  ],

  initVehiclesWorld(subMode = 'explore') {
    const arena = document.getElementById('gameArena');
    if (subMode === 'explore') {
      this.speakFriendly('Vehicles aur Transport! Gaadiyon, train aur aeroplane par tap karke jaano!');
      arena.innerHTML = `
        <div class="w-full pop-in">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="text-xs font-bold text-sky-800 bg-sky-100 border border-sky-300 px-3 py-1 rounded-full">
              🚀 Vehicles & Transport (18)
            </span>
            <button onclick="GkModule.initVehiclesWorld('quiz')" class="bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce">
              🎯 Vehicles Quiz →
            </button>
          </div>
          <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 p-1">
            ${this.vehiclesList.map((item, idx) => `
              <button onclick="GkModule.openPopup('vehicles', ${idx})"
                class="bg-gradient-to-b from-white to-sky-50 hover:bg-sky-100 border-2 border-sky-200 rounded-2xl p-2.5 flex flex-col items-center justify-center btn-bounce shadow-xs">
                <span class="text-4xl mb-1">${item.icon}</span>
                <span class="text-[11px] font-extrabold text-slate-700 text-center leading-tight">${item.name.split(' ')[0]}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      this.renderIconQuiz('vehicles', this.vehiclesList, 'Vehicle Pehchano');
    }
  },

  // =========================================================================
  // 6. COMMUNITY HELPERS (16 Helpers - Big Pop-Up + "Who am I?" Quiz)
  // =========================================================================
  helpersList: [
    { name: 'Doctor', tag: '🏥 Hospital Helper', icon: '👨‍⚕️', desc: 'Jab hum beemar hote hain toh Doctor dawai dekar humein theek karte hain!' },
    { name: 'Teacher', tag: '🏫 School Helper', icon: '👩‍🏫', desc: 'Teacher humein school mein padhna, likhna aur achhi baatein sikhati hain!' },
    { name: 'Police Officer', tag: '🚓 Safety Helper', icon: '👮', desc: 'Police hamari raksha karti hai aur choron ko pakadti hai!' },
    { name: 'Firefighter', tag: '🚒 Rescue Helper', icon: '🧑‍🚒', desc: 'Firefighter apni jaan par khel kar aag bujhate aur logon ko bachate hain!' },
    { name: 'Farmer (Kisan)', tag: '🌾 Food Helper', icon: '👨‍🌾', desc: 'Kisan khet mein mehnat karke hamare liye anaaj, phal aur sabziyan ugate hain!' },
    { name: 'Soldier (Fauji)', tag: '🇮🇳 Country Protector', icon: '💂', desc: 'Bahadur Sainik border par khade hokar hamare desh ki raksha karte hain!' },
    { name: 'Pilot', tag: '✈️ Sky Helper', icon: '👨‍✈️', desc: 'Pilot hawai jahaz (Aeroplane) udate hain!' },
    { name: 'Chef (Bawarchi)', tag: '🍳 Kitchen Helper', icon: '👨‍🍳', desc: 'Chef tasty aur healthy khana banate hain!' },
    { name: 'Astronaut', tag: '🚀 Space Explorer', icon: '👨‍🚀', desc: 'Astronaut rocket mein baith kar chaand aur space ki khoj karte hain!' },
    { name: 'Postman', tag: '✉️ Mail Helper', icon: '📮', desc: 'Dakiya (Postman) hamare ghar chitthi aur parcel pahunchata hai!' },
    { name: 'Judge / Lawyer', tag: '⚖️ Justice Helper', icon: '👩‍⚖️', desc: 'Judge sabko insaaf (justice) dilate hain!' },
    { name: 'Scientist', tag: '🔬 Research Helper', icon: '👩‍🔬', desc: 'Scientist lab mein naye-naye inventions aur dawaiyan banate hain!' },
    { name: 'Builder / Mason', tag: '🧱 Construction Helper', icon: '👷', desc: 'Rajmistri aur Engineer hamare ghar, school aur pul banate hain!' },
    { name: 'Artist / Painter', tag: '🎨 Creative Helper', icon: '👩‍🎨', desc: 'Artist sundar tasveerein aur rang-birangi paintings banate hain!' },
    { name: 'Singer / Musician', tag: '🎵 Music Helper', icon: '🧑‍🎤', desc: 'Singer pyare gaane gaate aur sangeet bajate hain!' },
    { name: 'Mechanic', tag: '🔧 Repair Helper', icon: '🧑‍🔧', desc: 'Mechanic kharab car, bike aur machineon ko theek karte hain!' }
  ],

  initHelpersWorld(subMode = 'explore') {
    const arena = document.getElementById('gameArena');
    if (subMode === 'explore') {
      this.speakFriendly('Hamare Madadgar! Doctor, Teacher, Kisan aur Police par tap karke jaano!');
      arena.innerHTML = `
        <div class="w-full pop-in">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
              👨‍⚕️ Our Community Helpers (16)
            </span>
            <button onclick="GkModule.initHelpersWorld('quiz')" class="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce">
              🎯 Helpers Quiz →
            </button>
          </div>
          <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 gap-2.5 p-1">
            ${this.helpersList.map((item, idx) => `
              <button onclick="GkModule.openPopup('helpers', ${idx})"
                class="bg-gradient-to-b from-white to-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-xs">
                <span class="text-4xl mb-1">${item.icon}</span>
                <span class="fun-font text-xs text-slate-800 text-center">${item.name.split(' ')[0]}</span>
                <span class="text-[10px] font-bold text-emerald-700 mt-0.5">${item.tag.split(' ')[1] || item.tag}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      this.renderIconQuiz('helpers', this.helpersList, 'Kaun Madad Karta Hai?');
    }
  },

  // =========================================================================
  // UNIVERSAL 4-OPTION VISUAL QUIZ FOR FOOD, INDIA, VEHICLES & HELPERS
  // =========================================================================
  renderIconQuiz(category, list, label) {
    const target = this.getNextFromPool(`gkquiz_${category}`, list);
    const distractors = list
      .filter(i => i.name !== target.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const opts = [target, ...distractors].sort(() => Math.random() - 0.5);

    this.currentGame = { category, list, label, solved: false };
    const prompt = `Pehchano: ${target.name} kaunsa hai?`;
    this.speakFriendly(prompt);

    const backHandlers = {
      food: "GkModule.initFoodWorld('explore')",
      india: "GkModule.initIndiaWorld('explore')",
      vehicles: "GkModule.initVehiclesWorld('explore')",
      helpers: "GkModule.initHelpersWorld('explore')"
    };

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-4">
          <button onclick="${backHandlers[category]}" class="bg-purple-100 hover:bg-purple-200 text-purple-900 px-3 py-1 rounded-xl text-xs font-extrabold border border-purple-300 btn-bounce">
            ← Sab Dekhein
          </button>
          <button onclick="GkModule.speakFriendly('${prompt}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Suno
          </button>
        </div>

        <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-4 mb-5">
          <span class="text-[11px] font-extrabold uppercase text-purple-700">${label}</span>
          <h3 class="fun-font text-2xl text-purple-950 mt-1">Dhoondo: ${target.name}</h3>
        </div>

        <div class="grid grid-cols-2 gap-3">
          ${opts.map(opt => `
            <button onclick="GkModule.checkIconQuiz(this, '${opt.name}', '${target.name}', '${opt.desc.replace(/'/g, '')}')"
              class="bg-white hover:bg-purple-50 border-2 border-b-4 border-purple-300 rounded-2xl p-4 flex flex-col items-center justify-center shadow btn-bounce transition">
              <span class="text-5xl mb-1.5">${opt.icon}</span>
              <span class="fun-font text-xs sm:text-sm text-slate-800">${opt.name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkIconQuiz(btn, chosen, target, desc) {
    const g = this.currentGame;
    if (!g || g.solved) return;

    if (chosen === target) {
      g.solved = true;
      btn.classList.add('!bg-emerald-100', '!border-emerald-500', 'scale-105');
      this.addScore();
      App.awardStarsAndWin(`Superb! ${desc}`);
      setTimeout(() => this.renderIconQuiz(g.category, g.list, g.label), 1900);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400');
      this.speakFriendly('Arey yeh doosra hai, phir se dekhein!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400'), 600);
    }
  }
};