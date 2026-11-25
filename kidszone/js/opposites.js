// Opposites Module (24 Visual Pairs + Big Comparison Pop-Up + Match Opposite Quiz)
const OppositesModule = {
  score: 0,
  queues: {},
  exploredSet: new Set(),
  currentGame: null,
  popupState: { index: 0, speechText: '' },

  pairs: [
    { w1: 'BIG', h1: 'Bada', i1: '🐘', w2: 'SMALL', h2: 'Chhota', i2: '🐜', ex: 'Haathi BIG (bada) hota hai, aur Cheenti SMALL (chhoti) hoti hai!' },
    { w1: 'HOT', h1: 'Garam', i1: '☕', w2: 'COLD', h2: 'Thanda', i2: '🍦', ex: 'Chai HOT (garam) hoti hai, aur Ice Cream COLD (thandi) hoti hai!' },
    { w1: 'DAY', h1: 'Din', i1: '☀️', w2: 'NIGHT', h2: 'Raat', i2: '🌙', ex: 'DAY (din) mein Sooraj chamakta hai, aur NIGHT (raat) mein Chaand!' },
    { w1: 'HAPPY', h1: 'Khush', i1: '😄', w2: 'SAD', h2: 'Udaas', i2: '😢', ex: 'Muskurana HAPPY (khush) hona hai, aur rona SAD (udaas)!' },
    { w1: 'FAST', h1: 'Tez', i1: '🐇', w2: 'SLOW', h2: 'Dheema', i2: '🐢', ex: 'Khargosh FAST (tez) daudta hai, aur Kachhua SLOW (dheere) chalta hai!' },
    { w1: 'UP', h1: 'Upar', i1: '⬆️', w2: 'DOWN', h2: 'Neeche', i2: '⬇️', ex: 'Rocket UP (upar) aasman mein jata hai, aur ball DOWN (neeche) girti hai!' },
    { w1: 'FULL', h1: 'Bhara Hua', i1: '🧺', w2: 'EMPTY', h2: 'Khaali', i2: '🗑️', ex: 'Phalon se bhari tokri FULL hai, aur khaali dibba EMPTY!' },
    { w1: 'TALL', h1: 'Lamba', i1: '🦒', w2: 'SHORT', h2: 'Chhota / Nata', i2: '🐕', ex: 'Giraffe bohot TALL (lamba) hota hai, aur Puppy SHORT!' },
    { w1: 'HEAVY', h1: 'Bhaari', i1: '🪨', w2: 'LIGHT', h2: 'Halka', i2: '🪶', ex: 'Patthar HEAVY (bhaari) hota hai, aur Pankh LIGHT (halka)!' },
    { w1: 'OPEN', h1: 'Khula', i1: '📖', w2: 'CLOSE', h2: 'Band', i2: '📕', ex: 'Padhne ke liye kitaab OPEN (kholte) hain, aur baad mein CLOSE (band)!' },
    { w1: 'CLEAN', h1: 'Saaf', i1: '✨', w2: 'DIRTY', h2: 'Ganda', i2: '🦠', ex: 'Humein hamesha CLEAN (saaf) rehna chahiye, DIRTY (ganda) nahi!' },
    { w1: 'HARD', h1: 'Sakht', i1: '🧱', w2: 'SOFT', h2: 'Naram', i2: '🧸', ex: 'Eent HARD (sakht) hoti hai, aur Teddy Bear SOFT (mulayam)!' },
    { w1: 'SWEET', h1: 'Meetha', i1: '🍯', w2: 'SOUR', h2: 'Khatta', i2: '🍋', ex: 'Shehad SWEET (meetha) hota hai, aur Nimbu SOUR (khatta)!' },
    { w1: 'WET', h1: 'Geela', i1: '🌧️', w2: 'DRY', h2: 'Sookha', i2: '🏜️', ex: 'Baarish mein kapde WET (geele) hote hain, dhoop mein DRY (sookh) jate hain!' },
    { w1: 'OLD', h1: 'Boodha / Purana', i1: '👴', w2: 'YOUNG', h2: 'Jawan / Chhota', i2: '👶', ex: 'Dadaji OLD hain, aur chhota bachha YOUNG!' },
    { w1: 'IN', h1: 'Andar', i1: '📥', w2: 'OUT', h2: 'Bahar', i2: '📤', ex: 'Box ke andar IN, aur box ke bahar OUT!' },
    { w1: 'ON', h1: 'Chalu', i1: '💡', w2: 'OFF', h2: 'Band', i2: '🔌', ex: 'Roshni ke liye bulb ON karte hain, sote waqt OFF!' },
    { w1: 'NEW', h1: 'Naya', i1: '👟', w2: 'OLD', h2: 'Purana', i2: '🥾', ex: 'Naye joote NEW hain, purane joote OLD!' },
    { w1: 'MANY', h1: 'Bohot Saare', i1: '🍇', w2: 'ONE', h2: 'Ek', i2: '🍎', ex: 'Angoor MANY (bohot saare) hain, aur Seb ONE (ek) hai!' },
    { w1: 'STRONG', h1: 'Taqatwar', i1: '🦁', w2: 'WEAK', h2: 'Kamzor', i2: '🐣', ex: 'Sher STRONG (taqatwar) hota hai, aur chhota chuza WEAK!' },
    { w1: 'LOUD', h1: 'Tez Awaaz', i1: '📢', w2: 'QUIET', h2: 'Shant / Chup', i2: '🤫', ex: 'Dhol ki awaaz LOUD hoti hai, library mein QUIET rehte hain!' },
    { w1: 'FRONT', h1: 'Saamne / Aage', i1: '🚗', w2: 'BACK', h2: 'Peeche', i2: '🔙', ex: 'Car ke aage ka hissa FRONT, aur peeche ka hissa BACK!' },
    { w1: 'FAR', h1: 'Door', i1: '🪐', w2: 'NEAR', h2: 'Paas', i2: '🏠', ex: 'Planets humse bohot FAR (door) hain, aur hamara ghar NEAR (paas)!' },
    { w1: 'MORE', h1: 'Zyada', i1: '🍓🍓🍓', w2: 'LESS', h2: 'Kam', i2: '🍓', ex: '3 strawberries MORE (zyada) hain, 1 strawberry LESS (kam)!' }
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
    const badge = document.getElementById('oppScoreBadge');
    if (badge) badge.innerText = this.score;
  },

  switchMode(mode) {
    document.querySelectorAll('.opp-tab').forEach(btn => btn.classList.remove('opp-tab-active'));
    const active = document.getElementById(`otab-${mode}`);
    if (active) active.classList.add('opp-tab-active');

    if (mode === 'explore') this.initExplore();
    else this.initQuiz();
  },

  openPopup(index) {
    const p = this.pairs[index];
    if (!p) return;
    const speech = `${p.w1} ka opposite ${p.w2}! ${p.ex}`;
    this.popupState = { index, speechText: speech };

    document.getElementById('oppIcon1').innerText = p.i1;
    document.getElementById('oppWord1').innerText = p.w1;
    document.getElementById('oppHi1').innerText = p.h1;
    document.getElementById('oppIcon2').innerText = p.i2;
    document.getElementById('oppWord2').innerText = p.w2;
    document.getElementById('oppHi2').innerText = p.h2;
    document.getElementById('oppExample').innerText = p.ex;

    const card = document.getElementById('oppModalCard');
    card.classList.remove('hero-pop-out');
    void card.offsetWidth;
    card.classList.add('hero-pop-out');

    document.getElementById('oppZoomModal').classList.remove('hidden');
    App.playRewardSound();
    this.speakFriendly(speech);

    if (!this.exploredSet.has(index)) {
      this.exploredSet.add(index);
      this.addScore();
      if (this.exploredSet.size % 5 === 0) {
        App.awardStarsAndWin(`Zabardast! Tumne ${this.exploredSet.size} Opposite pairs seekh liye!`);
      }
    }
  },

  navigatePopup(step) {
    const next = (this.popupState.index + step + this.pairs.length) % this.pairs.length;
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
    document.getElementById('oppZoomModal').classList.add('hidden');
  },

  initExplore() {
    this.speakFriendly('Opposites World! Kisi bhi pair par tap karke bada comparison card dekhein!');
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-sky-800 bg-sky-100 border border-sky-300 px-3 py-1 rounded-full">↔️ 24 Opposite Words & Visuals</span>
          <span class="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Tap Card = Big Pop-Up! ✨</span>
        </div>

        <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 p-1">
          ${this.pairs.map((p, idx) => `
            <button onclick="OppositesModule.openPopup(${idx})"
              class="bg-gradient-to-r from-sky-50 via-white to-rose-50 hover:shadow-md border-2 border-sky-200 rounded-2xl p-3 flex items-center justify-between btn-bounce shadow-xs">
              <div class="flex flex-col items-center w-2/5">
                <span class="text-3xl">${p.i1}</span>
                <span class="fun-font text-sm text-sky-900 mt-0.5">${p.w1}</span>
                <span class="text-[10px] font-bold text-slate-500">${p.h1}</span>
              </div>
              <span class="fun-font text-sm text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">↔</span>
              <div class="flex flex-col items-center w-2/5">
                <span class="text-3xl">${p.i2}</span>
                <span class="fun-font text-sm text-rose-800 mt-0.5">${p.w2}</span>
                <span class="text-[10px] font-bold text-slate-500">${p.h2}</span>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  initQuiz() {
    if (!this.queues.opp || this.queues.opp.length === 0) {
      this.queues.opp = [...this.pairs].sort(() => Math.random() - 0.5);
    }
    const pair = this.queues.opp.pop();
    const askFirst = Math.random() > 0.5;
    const givenWord = askFirst ? pair.w1 : pair.w2;
    const givenIcon = askFirst ? pair.i1 : pair.i2;
    const givenHi = askFirst ? pair.h1 : pair.h2;

    const correctWord = askFirst ? pair.w2 : pair.w1;
    const correctIcon = askFirst ? pair.i2 : pair.i1;
    const correctHi = askFirst ? pair.h2 : pair.h1;

    const distractors = this.pairs
      .filter(p => p.w1 !== pair.w1)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(p => (Math.random() > 0.5 ? { w: p.w1, i: p.i1, h: p.h1 } : { w: p.w2, i: p.i2, h: p.h2 }));

    const options = [{ w: correctWord, i: correctIcon, h: correctHi }, ...distractors].sort(() => Math.random() - 0.5);
    this.currentGame = { solved: false, ex: pair.ex };

    const prompt = `${givenWord} (${givenHi}) ka opposite kya hota hai?`;
    this.speakFriendly(prompt);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">🎯 Match the Opposite</span>
          <button onclick="OppositesModule.speakFriendly('${prompt}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">🔊 Suno</button>
        </div>

        <div class="bg-sky-50 border-2 border-sky-300 rounded-3xl p-4 mb-5 flex items-center justify-center gap-4">
          <span class="text-6xl float-slow">${givenIcon}</span>
          <div class="text-left">
            <span class="text-[11px] font-bold text-slate-500 uppercase">Is Word Ka Ulta Chuno:</span>
            <h3 class="fun-font text-3xl text-sky-900">${givenWord}</h3>
            <span class="text-xs font-bold text-sky-700">(${givenHi})</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          ${options.map(opt => `
            <button onclick="OppositesModule.checkQuiz(this, '${opt.w}', '${correctWord}')"
              class="bg-white hover:bg-sky-50 border-2 border-b-4 border-sky-300 rounded-2xl p-3.5 flex flex-col items-center justify-center shadow btn-bounce transition">
              <span class="text-4xl mb-1">${opt.i}</span>
              <span class="fun-font text-lg text-slate-900">${opt.w}</span>
              <span class="text-[11px] font-bold text-slate-500">${opt.h}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkQuiz(btn, chosen, correct) {
    if (this.currentGame.solved) return;
    if (chosen === correct) {
      this.currentGame.solved = true;
      btn.classList.add('!bg-emerald-100', '!border-emerald-500', 'scale-105');
      this.addScore();
      App.awardStarsAndWin(`Bilkul sahi! ${this.currentGame.ex}`);
      setTimeout(() => this.initQuiz(), 2000);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400');
      this.speakFriendly('Arey yeh nahi, ulta word socho!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400'), 600);
    }
  }
};