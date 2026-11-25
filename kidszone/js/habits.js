// Good Habits Module (20 Daily Good Habits + Big Pop-Up + Good vs Bad Habit Sorter)
const HabitsModule = {
  score: 0,
  queues: {},
  exploredSet: new Set(),
  currentGame: null,
  popupState: { index: 0, speechText: '' },

  habitsList: [
    { title: 'Wake Up Early', time: '🌅 Subah ki Aadat', icon: '⏰', desc: 'Subah jaldi uthne se hum poora din fresh, active aur khush rehte hain!' },
    { title: 'Brush Twice Daily', time: '🦷 Dental Care', icon: '🪥', desc: 'Subah uthne ke baad aur raat ko sone se pehle brush karne se daant chamakte hain!' },
    { title: 'Take a Bath Daily', time: '🚿 Safai', icon: '🛁', desc: 'Roz nahane se sharir saaf rehta hai aur saari thakan door ho jati hai!' },
    { title: 'Wash Your Hands', time: '🧼 Hygiene', icon: '🧼', desc: 'Khana khane se pehle aur khel kar aane ke baad sabun se 20 second haath dhoyein!' },
    { title: 'Comb Your Hair', time: '💇 Neat & Tidy', icon: '🪮', desc: 'Roz baal kanghi karne aur saaf kapde pehenne se hum smart dikhte hain!' },
    { title: 'Eat Healthy Breakfast', time: '🥣 Nashta', icon: '🥛', desc: 'Subah doodh, phal aur healthy nashta karne se dimaag tez chalta hai!' },
    { title: 'Drink Plenty of Water', time: '💧 Hydration', icon: '🚰', desc: 'Din mein 6-8 glass saaf paani peene se hum tandurust rehte hain!' },
    { title: 'Eat Fruits & Veggies', time: '🥦 Healthy Diet', icon: '🍎', desc: 'Hari sabziyan aur taaze phal khane se humein bimariyon se ladne ki taqat milti hai!' },
    { title: 'Study on Time', time: '📚 Padhai', icon: '📖', desc: 'Roz thoda waqt padhne aur homework poora karne se hum class mein top karte hain!' },
    { title: 'Outdoor Play & Exercise', time: '⚽ Khel-Kood', icon: '🏃', desc: 'Mobile/TV kam dekh kar bahar daudne-khelne se sharir mazboot banta hai!' },
    { title: 'Trim Your Nails', time: '✂️ Safai', icon: '💅', desc: 'Hafte mein ek baar nakhun katwane se unmein gandagi jama nahi hoti!' },
    { title: 'Keep Toys & Books Tidy', time: '🧸 Orderliness', icon: '📦', desc: 'Padhne ke baad kitaabein aur khelne ke baad khilone sahi jagah par rakhein!' },
    { title: 'Save Water', time: '🌍 Earth Care', icon: '🚰', desc: 'Brush karte waqt nal band rakhein, paani ki ek-ek boond qeemti hai!' },
    { title: 'Save Electricity', time: '💡 Energy Care', icon: '🔌', desc: 'Kamre se bahar nikalte waqt light aur pankha band kar dein!' },
    { title: 'Plant & Water Trees', time: '🌱 Nature Love', icon: '🌳', desc: 'Paudhon ko roz paani dein, ped humein thandi chhaon aur oxygen dete hain!' },
    { title: 'Say Bismillah Before Eating', time: '🤲 Barkat', icon: '🍽️', desc: 'Har achha kaam aur khana Bismillah keh kar shuru karna chahiye!' },
    { title: 'Sit Straight', time: '🪑 Good Posture', icon: '🧘', desc: 'Padhte aur baithte waqt kamar seedhi rakhne se reedh ki haddi mazboot rehti hai!' },
    { title: 'Pack Bag at Night', time: '🎒 Discipline', icon: '📒', desc: 'Raat ko hi agle din ka school bag taiyar rakhne se subah der nahi hoti!' },
    { title: 'Limit Screen Time', time: '📵 Eye Care', icon: '👀', desc: 'Mobile aur TV zyada der dekhne se aankhein kamzor hoti hain!' },
    { title: 'Sleep Early at Night', time: '🌙 Raat ki Aadat', icon: '😴', desc: 'Raat ko jaldi sone se subah neend poori hoti hai aur hum jaldi uth pate hain!' }
  ],

  sorterPool: [
    { text: 'Subah aur raat 2 baar brush karna', icon: '🪥', isGood: true, msg: 'Bilkul sahi! Roz 2 baar brush karna ek Good Habit hai!' },
    { text: 'Khana khane se pehle sabun se haath dhona', icon: '🧼', isGood: true, msg: 'Shabash! Haath dhone se germs door rehte hain!' },
    { text: 'Kachra sadak par phenk dena', icon: '🗑️', isGood: false, msg: 'Yeh Bad Habit hai! Kachra hamesha dustbin mein daalna chahiye!' },
    { text: 'Roz taaze phal aur hari sabziyan khana', icon: '🥦', isGood: true, msg: 'Zabardast! Healthy food khana Good Habit hai!' },
    { text: 'Raat ko der tak mobile dekhna', icon: '📱', isGood: false, msg: 'Yeh Bad Habit hai! Raat ko jaldi sona chahiye!' },
    { text: 'Kamre se bahar jate waqt light band karna', icon: '💡', isGood: true, msg: 'Bahut khoob! Bijli bachana ek smart Good Habit hai!' },
    { text: 'Daanton se nakhun chabana (Nail biting)', icon: '😬', isGood: false, msg: 'Yeh Bad Habit hai! Isse pet mein germs ja sakte hain!' },
    { text: 'Khelne ke baad khilone sahi jagah rakhna', icon: '🧸', isGood: true, msg: 'Shabash! Apna kamra saaf rakhna Good Habit hai!' },
    { text: 'Nal khula chhod kar paani bahana', icon: '🚰', isGood: false, msg: 'Yeh Bad Habit hai! Paani barbad nahi karna chahiye!' },
    { text: 'Roz subah jaldi uthna aur exercise karna', icon: '🏃', isGood: true, msg: 'Bilkul sahi! Jaldi uthna aur exercise karna Good Habit hai!' },
    { text: 'Roz cold drink aur chips khana', icon: '🍟', isGood: false, msg: 'Yeh Bad Habit hai! Junk food roz khane se sehat kharab hoti hai!' },
    { text: 'Paudhon ko roz paani dena', icon: '🌱', isGood: true, msg: 'Pyari aadat! Paudhon ki dekhbhal karna Good Habit hai!' }
  ],

  speakFriendly(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find(v => v.lang.includes('hi-IN') && (v.name.includes('Google') || v.name.includes('Swara'))) ||
        voices.find(v => v.lang.includes('en-IN')) ||
        voices.find(v => v.lang.includes('hi'));
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
    const el = document.getElementById('habScoreBadge');
    if (el) el.innerText = this.score;
  },

  switchMode(mode) {
    document.querySelectorAll('.hab-tab').forEach(btn => btn.classList.remove('hab-tab-active'));
    const active = document.getElementById(`htab-${mode}`);
    if (active) active.classList.add('hab-tab-active');

    if (mode === 'explore') this.initExplore();
    else this.initSorter();
  },

  openPopup(index) {
    const item = this.habitsList[index];
    if (!item) return;

    const speech = `${item.title}! ${item.desc}`;
    this.popupState = { index, speechText: speech };

    document.getElementById('habPopupTime').innerText = item.time;
    document.getElementById('habPopupIcon').innerText = item.icon;
    document.getElementById('habPopupTitle').innerText = item.title;
    document.getElementById('habPopupDesc').innerText = item.desc;

    const card = document.getElementById('habModalCard');
    card.classList.remove('hero-pop-out');
    void card.offsetWidth;
    card.classList.add('hero-pop-out');

    document.getElementById('habZoomModal').classList.remove('hidden');
    App.playRewardSound();
    this.speakFriendly(speech);

    if (!this.exploredSet.has(index)) {
      this.exploredSet.add(index);
      this.addScore();
      if (this.exploredSet.size % 4 === 0) {
        App.awardStarsAndWin(`Superstar! Tumne ${this.exploredSet.size} Good Habits seekh li hain!`);
      }
    }
  },

  navigatePopup(step) {
    const next = (this.popupState.index + step + this.habitsList.length) % this.habitsList.length;
    this.openPopup(next);
  },

  replayAudio() {
    if (this.popupState.speechText) {
      App.playRewardSound();
      this.speakFriendly(this.popupState.speechText);
    }
  },

  closePopup() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    document.getElementById('habZoomModal').classList.add('hidden');
  },

  initExplore() {
    this.speakFriendly('Daily Good Habits! Kisi bhi aadat par tap karke bada card dekhein!');
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full pop-in">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-teal-800 bg-teal-100 border border-teal-300 px-3 py-1 rounded-full">🌞 20 Daily Good Habits</span>
          <span class="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Tap Icon = Big Pop-Up! ✨</span>
        </div>

        <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 p-1">
          ${this.habitsList.map((item, idx) => `
            <button onclick="HabitsModule.openPopup(${idx})"
              class="bg-gradient-to-b from-white to-teal-50 hover:bg-teal-100 border-2 border-teal-200 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-xs">
              <span class="text-4xl mb-1.5">${item.icon}</span>
              <span class="fun-font text-xs text-slate-900 text-center leading-tight">${item.title}</span>
              <span class="text-[10px] font-bold text-teal-700 mt-0.5">${item.time}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  initSorter() {
    if (!this.queues.hab || this.queues.hab.length === 0) {
      this.queues.hab = [...this.sorterPool].sort(() => Math.random() - 0.5);
    }
    const item = this.queues.hab.pop();
    this.currentGame = { item, solved: false };

    this.speakFriendly(`Batao: ${item.text}! Yeh Good Habit hai ya Bad Habit?`);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">👍 Good Habit vs 👎 Bad Habit</span>
          <button onclick="HabitsModule.speakFriendly('${item.text}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">🔊 Suno</button>
        </div>

        <div class="bg-white border-4 border-teal-200 rounded-3xl p-6 my-4 shadow-sm">
          <div class="text-7xl mb-2 float-slow">${item.icon}</div>
          <h3 class="fun-font text-xl text-slate-900">${item.text}</h3>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-5">
          <button onclick="HabitsModule.checkChoice(this, true)"
            class="py-4 px-3 bg-gradient-to-b from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-3xl border-b-4 border-green-800 shadow-lg btn-bounce flex flex-col items-center">
            <span class="text-3xl mb-1">👍</span>
            <span class="fun-font text-lg">Good Habit</span>
            <span class="text-[11px] opacity-90">(Achhi Aadat)</span>
          </button>

          <button onclick="HabitsModule.checkChoice(this, false)"
            class="py-4 px-3 bg-gradient-to-b from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-3xl border-b-4 border-red-800 shadow-lg btn-bounce flex flex-col items-center">
            <span class="text-3xl mb-1">👎</span>
            <span class="fun-font text-lg">Bad Habit</span>
            <span class="text-[11px] opacity-90">(Buri Aadat)</span>
          </button>
        </div>
      </div>
    `;
  },

  checkChoice(btn, choice) {
    const g = this.currentGame;
    if (!g || g.solved) return;

    if (choice === g.item.isGood) {
      g.solved = true;
      btn.classList.add('scale-105', 'ring-4', 'ring-amber-400');
      this.addScore();
      App.awardStarsAndWin(g.item.msg);
      setTimeout(() => this.initSorter(), 2000);
    } else {
      btn.classList.add('shake-anim');
      this.speakFriendly(`Dhyan se socho! ${g.item.msg}`);
      setTimeout(() => btn.classList.remove('shake-anim'), 600);
    }
  }
};