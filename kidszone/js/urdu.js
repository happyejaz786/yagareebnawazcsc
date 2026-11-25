// Urdu Qaida Module (38 Huroof-e-Tahajji, Nuqta Workshop, Zabar/Zer/Pesh, 25 Two-Letter Words, 24 Picture Quiz)
const UrduModule = {
  score: 0,
  queues: {},
  exploredSet: new Set(),
  selectedHarakatHarf: 'ب',
  currentGame: null,
  popupState: { index: 0, speechText: '' },

  // Complete 38 Huroof-e-Tahajji with Nuqta info & Roman/Hindi phonetic guide
  huroofList: [
    { h: 'ا', w: 'انار', e: '🍎', nuqta: 'Bina Nuqta (Seedha Alif)', speak: 'Alif se Anaar! Alif bilkul seedha hota hai, isme koi nuqta nahi hota.' },
    { h: 'آ', w: 'آم', e: '🥭', nuqta: 'Alif Madd (ا کے اوپر مد)', speak: 'Alif Madd Aa se Aam! Iske upar lehrati hui Madd hoti hai.' },
    { h: 'ب', w: 'بلی', e: '🐱', nuqta: '1 Nuqta Neeche', speak: 'Be se Billi! Be ke neeche ek nuqta hota hai.' },
    { h: 'پ', w: 'پتنگ', e: '🪁', nuqta: '3 Nuqte Neeche', speak: 'Pe se Patang! Pe ke neeche teen nuqte hote hain.' },
    { h: 'ت', w: 'تتلی', e: '🦋', nuqta: '2 Nuqte Upar (Andar)', speak: 'Te se Titli! Te ke andar do nuqte hote hain.' },
    { h: 'ٹ', w: 'ٹماٹر', e: '🍅', nuqta: 'Chhoti Toy (ٹ) Upar', speak: 'Te se Tamatar! Iske upar chhoti si toy bani hoti hai.' },
    { h: 'ث', w: 'ثمر', e: '🍇', nuqta: '3 Nuqte Upar (Andar)', speak: 'Se se Samar yani phal! Iske andar teen nuqte hote hain.' },
    { h: 'ج', w: 'جہاز', e: '🚢', nuqta: '1 Nuqta Pet Mein', speak: 'Jeem se Jahaaz! Jeem ke pet mein ek nuqta hota hai.' },
    { h: 'چ', w: 'چاند', e: '🌙', nuqta: '3 Nuqte Pet Mein', speak: 'Che se Chaand! Che ke pet mein teen nuqte hote hain.' },
    { h: 'ح', w: 'حلوہ', e: '🥣', nuqta: 'Khaali (Bina Nuqta)', speak: 'Badi He se Halwa! Yeh bilkul khaali hoti hai, koi nuqta nahi.' },
    { h: 'خ', w: 'خرگوش', e: '🐇', nuqta: '1 Nuqta Upar', speak: 'Khe se Khargosh! Khe ke sir ke upar ek nuqta hota hai.' },
    { h: 'د', w: 'درخت', e: '🌳', nuqta: 'Khaali (Bina Nuqta)', speak: 'Daal se Darakht yani ped! Daal mein koi nuqta nahi hota.' },
    { h: 'ڈ', w: 'ڈول', e: '🪣', nuqta: 'Chhoti Toy (ڈ) Upar', speak: 'Daal se Dol! Iske upar chhoti toy hoti hai.' },
    { h: 'ذ', w: 'ذخیرہ', e: '📦', nuqta: '1 Nuqta Upar', speak: 'Zaal se Zakheera! Zaal ke upar ek nuqta hota hai.' },
    { h: 'ر', w: 'ریل گاڑی', e: '🚂', nuqta: 'Khaali (Bina Nuqta)', speak: 'Re se Railgaadi! Re mein koi nuqta nahi hota.' },
    { h: 'ڑ', w: 'پہاڑ', e: '⛰️', nuqta: 'Chhoti Toy (ڑ) Upar', speak: 'Ade se Pahaad! Iske upar chhoti toy hoti hai.' },
    { h: 'ز', w: 'زیبرا', e: '🦓', nuqta: '1 Nuqta Upar', speak: 'Ze se Zebra! Ze ke upar ek nuqta hota hai.' },
    { h: 'ژ', w: 'ژالہ باری', e: '🌨️', nuqta: '3 Nuqte Upar', speak: 'Zhe se Zhaala baari! Iske upar teen nuqte hote hain.' },
    { h: 'س', w: 'سیب', e: '🍎', nuqta: '3 Shoshe (Khaali)', speak: 'Seen se Seb! Isme teen dandaan hote hain aur koi nuqta nahi.' },
    { h: 'ش', w: 'شیر', e: '🦁', nuqta: '3 Nuqte Upar', speak: 'Sheen se Sher! Sheen ke upar teen nuqte hote hain.' },
    { h: 'ص', w: 'صابن', e: '🧼', nuqta: 'Khaali (Bina Nuqta)', speak: 'Suaad se Saabun! Suaad mein koi nuqta nahi hota.' },
    { h: 'ض', w: 'ضعیف', e: '👴', nuqta: '1 Nuqta Upar', speak: 'Zuaad se Zaeef! Zuaad ke upar ek nuqta hota hai.' },
    { h: 'ط', w: 'طوطا', e: '🦜', nuqta: 'Khaali (Bina Nuqta)', speak: 'Toy se Tota! Toy mein koi nuqta nahi hota.' },
    { h: 'ظ', w: 'ظروف', e: '🏺', nuqta: '1 Nuqta Upar', speak: 'Zoy se Zuroof yani bartan! Zoy ke upar ek nuqta hota hai.' },
    { h: 'ع', w: 'عینک', e: '👓', nuqta: 'Khaali (Bina Nuqta)', speak: 'Ain se Ainak! Ain mein koi nuqta nahi hota.' },
    { h: 'غ', w: 'غبارہ', e: '🎈', nuqta: '1 Nuqta Upar', speak: 'Ghain se Ghubbara! Ghain ke upar ek nuqta hota hai.' },
    { h: 'ف', w: 'فوارہ', e: '⛲', nuqta: '1 Nuqta Upar', speak: 'Fe se Fawwara! Fe ke upar ek nuqta hota hai.' },
    { h: 'ق', w: 'قلم', e: '🖊️', nuqta: '2 Nuqte Upar', speak: 'Qaaf se Qalam! Qaaf ke upar do nuqte hote hain.' },
    { h: 'ک', w: 'کبوتر', e: '🕊️', nuqta: '1 Markaz / Dandaa', speak: 'Kaaf se Kabootar! Kaaf ke upar ek tirchha dandaa hota hai.' },
    { h: 'گ', w: 'گلاب', e: '🌹', nuqta: '2 Markaz / Dande', speak: 'Gaaf se Gulaab! Gaaf ke upar do tirchhe dande hote hain.' },
    { h: 'ل', w: 'لومڑی', e: '🦊', nuqta: 'Khaali (Bina Nuqta)', speak: 'Laam se Lomdi! Laam mein koi nuqta nahi hota.' },
    { h: 'م', w: 'مچھلی', e: '🐟', nuqta: 'Khaali (Bina Nuqta)', speak: 'Meem se Machhli! Meem mein koi nuqta nahi hota.' },
    { h: 'ن', w: 'نل', e: '🚰', nuqta: '1 Nuqta Beech Mein', speak: 'Noon se Nal! Noon ke beech mein ek nuqta hota hai.' },
    { h: 'ں', w: 'ماں', e: '👩‍👧', nuqta: 'Noon Ghunna (Khaali)', speak: 'Noon Ghunna! Yeh naak se padha jata hai aur isme nuqta nahi hota.' },
    { h: 'و', w: 'ورق', e: '📄', nuqta: 'Khaali (Bina Nuqta)', speak: 'Wao se Waraq yani panna! Isme koi nuqta nahi hota.' },
    { h: 'ہ', w: 'ہاتھی', e: '🐘', nuqta: 'Chhoti He (Khaali)', speak: 'Chhoti He se Haathi! Isme koi nuqta nahi hota.' },
    { h: 'ی', w: 'یکہ', e: '🛞', nuqta: 'Chhoti Ye', speak: 'Chhoti Ye se Yakka!' },
    { h: 'ے', w: 'تارے', e: '⭐', nuqta: 'Badi Ye', speak: 'Badi Ye! Jaise Taare aur Kela ke aakhir mein aati hai.' }
  ],

  speakFriendly(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find(v => v.lang.includes('ur') || v.lang.includes('hi-IN')) ||
        voices.find(v => v.lang.includes('en-IN'));
      if (preferred) utter.voice = preferred;
      utter.lang = preferred ? preferred.lang : 'hi-IN';
      utter.rate = 0.88;
      utter.pitch = 1.12;
      window.speechSynthesis.speak(utter);
    } else if (typeof App !== 'undefined' && App.speak) {
      App.speak(text);
    }
  },

  addScore() {
    this.score++;
    const el = document.getElementById('urduScoreBadge');
    if (el) el.innerText = this.score;
  },

  switchMode(mode) {
    document.querySelectorAll('.urdu-tab').forEach(btn => btn.classList.remove('urdu-tab-active'));
    const active = document.getElementById(`utab-${mode}`);
    if (active) active.classList.add('urdu-tab-active');

    if (mode === 'huroof') this.initHuroof();
    else if (mode === 'nuqta') this.initNuqtaWorkshop();
    else if (mode === 'harakat') this.initHarakatLab(this.selectedHarakatHarf || 'ب');
    else if (mode === 'words2') this.initTwoLetterWords();
    else if (mode === 'picQuiz') this.initPictureQuiz();
  },

  getNextFromPool(key, list) {
    if (!this.queues[key] || this.queues[key].length === 0) {
      this.queues[key] = [...list].sort(() => Math.random() - 0.5);
    }
    return this.queues[key].pop();
  },

  // =========================================================================
  // 1. HUROOF-E-TAHAJJI BOARD (38 Letters + Big Pop-Out Modal)
  // =========================================================================
  openPopup(index) {
    const item = this.huroofList[index];
    if (!item) return;

    this.popupState = { index, speechText: item.speak };

    document.getElementById('urduPopupHarf').innerText = item.h;
    document.getElementById('urduPopupIcon').innerText = item.e;
    document.getElementById('urduPopupWord').innerText = `${item.h} سے ${item.w}`;
    document.getElementById('urduPopupNuqta').innerText = `🔴 ${item.nuqta}`;
    document.getElementById('urduPopupDesc').innerText = item.speak;

    const card = document.getElementById('urduModalCard');
    card.classList.remove('hero-pop-out');
    void card.offsetWidth;
    card.classList.add('hero-pop-out');

    document.getElementById('urduZoomModal').classList.remove('hidden');
    App.playRewardSound();
    this.speakFriendly(item.speak);

    if (!this.exploredSet.has(index)) {
      this.exploredSet.add(index);
      this.addScore();
      if (this.exploredSet.size % 5 === 0) {
        App.awardStarsAndWin(`MashAllah! Tumne ${this.exploredSet.size} Huroof-e-Tahajji seekh liye!`);
      }
    }
  },

  navigatePopup(step) {
    const next = (this.popupState.index + step + this.huroofList.length) % this.huroofList.length;
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
    document.getElementById('urduZoomModal').classList.add('hidden');
  },

  initHuroof() {
    this.speakFriendly('Huroof-e-Tahajji! Kisi bhi harf par tap karke uske nuqte aur alfaaz dekhein!');
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full pop-in">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
            🌙 حروفِ تہجی (Alif se Badi Ye - 38)
          </span>
          <span class="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            Tap Harf = Big Pop-Up! ✨
          </span>
        </div>

        <!-- Right-to-Left Grid for Natural Urdu Reading Order -->
        <div dir="rtl" class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 p-1.5">
          ${this.huroofList.map((item, idx) => `
            <button onclick="UrduModule.openPopup(${idx})"
              class="bg-gradient-to-b from-white to-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 rounded-2xl p-2.5 flex flex-col items-center justify-center btn-bounce shadow-xs">
              <span class="urdu-font text-3xl sm:text-4xl text-emerald-800 leading-none">${item.h}</span>
              <span class="text-2xl my-1">${item.e}</span>
              <span class="urdu-font text-xs font-bold text-slate-700">${item.w}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  // =========================================================================
  // 2. NUQTA WORKSHOP (Dots Recognition Game - 26 Letters)
  // =========================================================================
  nuqtaPool: [
    { h: 'ب', ans: '1 Nuqta Neeche', hint: 'Be se Billi' },
    { h: 'پ', ans: '3 Nuqte Neeche', hint: 'Pe se Patang' },
    { h: 'ت', ans: '2 Nuqte Upar', hint: 'Te se Titli' },
    { h: 'ٹ', ans: 'Chhoti Toy (ٹ)', hint: 'Te se Tamatar' },
    { h: 'ث', ans: '3 Nuqte Upar', hint: 'Se se Samar' },
    { h: 'ج', ans: '1 Nuqta Pet Mein', hint: 'Jeem se Jahaaz' },
    { h: 'چ', ans: '3 Nuqte Pet Mein', hint: 'Che se Chaand' },
    { h: 'ح', ans: 'Khaali (0 Nuqta)', hint: 'Badi He se Halwa' },
    { h: 'خ', ans: '1 Nuqta Upar', hint: 'Khe se Khargosh' },
    { h: 'د', ans: 'Khaali (0 Nuqta)', hint: 'Daal se Darakht' },
    { h: 'ڈ', ans: 'Chhoti Toy (ڈ)', hint: 'Daal se Dol' },
    { h: 'ذ', ans: '1 Nuqta Upar', hint: 'Zaal se Zakheera' },
    { h: 'ز', ans: '1 Nuqta Upar', hint: 'Ze se Zebra' },
    { h: 'ژ', ans: '3 Nuqte Upar', hint: 'Zhe se Zhaala' },
    { h: 'س', ans: 'Khaali (0 Nuqta)', hint: 'Seen se Seb' },
    { h: 'ش', ans: '3 Nuqte Upar', hint: 'Sheen se Sher' },
    { h: 'ض', ans: '1 Nuqta Upar', hint: 'Zuaad se Zaeef' },
    { h: 'ظ', ans: '1 Nuqta Upar', hint: 'Zoy se Zuroof' },
    { h: 'غ', ans: '1 Nuqta Upar', hint: 'Ghain se Ghubbara' },
    { h: 'ف', ans: '1 Nuqta Upar', hint: 'Fe se Fawwara' },
    { h: 'ق', ans: '2 Nuqte Upar', hint: 'Qaaf se Qalam' },
    { h: 'ن', ans: '1 Nuqta Beech Mein', hint: 'Noon se Nal' }
  ],

  initNuqtaWorkshop() {
    const item = this.getNextFromPool('urduNuqta', this.nuqtaPool);
    const allChoices = [
      '1 Nuqta Neeche',
      '3 Nuqte Neeche',
      '2 Nuqte Upar',
      '3 Nuqte Upar',
      '1 Nuqta Upar',
      '1 Nuqta Pet Mein',
      '3 Nuqte Pet Mein',
      '1 Nuqta Beech Mein',
      'Chhoti Toy (ٹ)',
      'Chhoti Toy (ڈ)',
      'Khaali (0 Nuqta)'
    ];
    const distractors = allChoices
      .filter(c => c !== item.ans)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const opts = [item.ans, ...distractors].sort(() => Math.random() - 0.5);

    this.currentGame = { solved: false };
    const prompt = `Harf ${item.hint} mein kitne nuqte aur kahan hote hain?`;
    this.speakFriendly(prompt);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-rose-800 bg-rose-100 border border-rose-300 px-3 py-1 rounded-full">
            🔴 نقطہ ورکشاپ (Nuqta Challenge)
          </span>
          <button onclick="UrduModule.speakFriendly('${prompt}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Suno
          </button>
        </div>

        <div class="bg-gradient-to-b from-emerald-50 to-white border-4 border-emerald-300 rounded-3xl p-5 my-4 shadow-sm">
          <span class="urdu-font text-7xl text-emerald-800 block leading-normal">${item.h}</span>
          <p class="text-xs font-extrabold text-slate-500 mt-1">(${item.hint})</p>
        </div>

        <p class="text-xs font-bold text-slate-600 mb-3">Is harf ki sahi pehchan chuniye:</p>
        <div class="grid grid-cols-2 gap-3">
          ${opts.map(opt => `
            <button onclick="UrduModule.checkNuqta(this, '${opt}', '${item.ans}')"
              class="py-3.5 px-3 bg-white hover:bg-rose-50 border-2 border-b-4 border-rose-300 rounded-2xl fun-font text-xs sm:text-sm text-slate-800 shadow btn-bounce transition">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkNuqta(btn, chosen, correct) {
    if (this.currentGame.solved) return;
    if (chosen === correct) {
      this.currentGame.solved = true;
      btn.classList.add('!bg-emerald-500', '!border-emerald-700', '!text-white', 'scale-105');
      this.addScore();
      App.awardStarsAndWin(`Bilkul sahi! ${correct} bilkul durust pehchana!`);
      setTimeout(() => this.initNuqtaWorkshop(), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700');
      this.speakFriendly('Harf ko ghaur se dekhein, nuqte ginti karein!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700'), 600);
    }
  },

  // =========================================================================
  // 3. ZABAR, ZER, PESH (Harakat Lab)
  // =========================================================================
  harakatConsonants: [
    { h: 'ب', name: 'Be', zabar: 'بَ (Ba)', zer: 'بِ (Bi)', pesh: 'بُ (Bu)' },
    { h: 'پ', name: 'Pe', zabar: 'پَ (Pa)', zer: 'پِ (Pi)', pesh: 'پُ (Pu)' },
    { h: 'ت', name: 'Te', zabar: 'تَ (Ta)', zer: 'تِ (Ti)', pesh: 'تُ (Tu)' },
    { h: 'ج', name: 'Jeem', zabar: 'جَ (Ja)', zer: 'جِ (Ji)', pesh: 'جُ (Ju)' },
    { h: 'د', name: 'Daal', zabar: 'دَ (Da)', zer: 'دِ (Di)', pesh: 'دُ (Du)' },
    { h: 'ر', name: 'Re', zabar: 'رَ (Ra)', zer: 'رِ (Ri)', pesh: 'رُ (Ru)' },
    { h: 'س', name: 'Seen', zabar: 'سَ (Sa)', zer: 'سِ (Si)', pesh: 'سُ (Su)' },
    { h: 'ش', name: 'Sheen', zabar: 'شَ (Sha)', zer: 'شِ (Shi)', pesh: 'شُ (Shu)' },
    { h: 'ف', name: 'Fe', zabar: 'فَ (Fa)', zer: 'فِ (Fi)', pesh: 'فُ (Fu)' },
    { h: 'ق', name: 'Qaaf', zabar: 'قَ (Qa)', zer: 'قِ (Qi)', pesh: 'قُ (Qu)' },
    { h: 'ک', name: 'Kaaf', zabar: 'کَ (Ka)', zer: 'کِ (Ki)', pesh: 'کُ (Ku)' },
    { h: 'ل', name: 'Laam', zabar: 'لَ (La)', zer: 'لِ (Li)', pesh: 'لُ (Lu)' },
    { h: 'م', name: 'Meem', zabar: 'مَ (Ma)', zer: 'مِ (Mi)', pesh: 'مُ (Mu)' },
    { h: 'ن', name: 'Noon', zabar: 'نَ (Na)', zer: 'نِ (Ni)', pesh: 'نُ (Nu)' },
    { h: 'ہ', name: 'He', zabar: 'ہَ (Ha)', zer: 'ہِ (Hi)', pesh: 'ہُ (Hu)' }
  ],

  initHarakatLab(base = 'ب') {
    this.selectedHarakatHarf = base;
    const item = this.harakatConsonants.find(x => x.h === base) || this.harakatConsonants[0];

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full max-w-xl pop-in">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-purple-800 bg-purple-100 border border-purple-300 px-3 py-1 rounded-full">
            🎶 زبر، زیر، پیش (Zabar, Zer, Pesh)
          </span>
          <span class="text-[11px] font-bold text-slate-500">Card par tap karke awaaz suno 👆</span>
        </div>

        <!-- Harf Selector -->
        <div dir="rtl" class="bg-purple-50/80 p-2 rounded-2xl border-2 border-purple-200 mb-4">
          <div class="flex gap-1.5 overflow-x-auto pb-1">
            ${this.harakatConsonants.map(c => `
              <button onclick="UrduModule.initHarakatLab('${c.h}')"
                class="min-w-[44px] h-11 rounded-xl urdu-font text-2xl border-2 transition shrink-0 flex items-center justify-center ${c.h === base ? 'harf-pill-active' : 'bg-white hover:bg-purple-100 text-purple-900 border-purple-200'}">
                ${c.h}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 3 Big Harakat Cards: Zabar, Zer, Pesh -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button onclick="UrduModule.playHarakat('${item.name} Zabar ${item.zabar.split(' ')[1]}')"
            class="bg-gradient-to-b from-amber-50 to-amber-100 hover:bg-amber-200 border-3 border-amber-400 rounded-3xl p-4 flex flex-col items-center justify-center btn-bounce shadow">
            <span class="text-[11px] font-extrabold bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">Zabar (Upar ــَـ)</span>
            <span class="urdu-font text-6xl text-amber-800 my-2">${item.h}َ</span>
            <span class="fun-font text-base text-slate-800">${item.zabar}</span>
          </button>

          <button onclick="UrduModule.playHarakat('${item.name} Zer ${item.zer.split(' ')[1]}')"
            class="bg-gradient-to-b from-sky-50 to-sky-100 hover:bg-sky-200 border-3 border-sky-400 rounded-3xl p-4 flex flex-col items-center justify-center btn-bounce shadow">
            <span class="text-[11px] font-extrabold bg-sky-200 text-sky-900 px-2.5 py-0.5 rounded-full">Zer (Neeche ــِـ)</span>
            <span class="urdu-font text-6xl text-sky-800 my-2">${item.h}ِ</span>
            <span class="fun-font text-base text-slate-800">${item.zer}</span>
          </button>

          <button onclick="UrduModule.playHarakat('${item.name} Pesh ${item.pesh.split(' ')[1]}')"
            class="bg-gradient-to-b from-emerald-50 to-emerald-100 hover:bg-emerald-200 border-3 border-emerald-400 rounded-3xl p-4 flex flex-col items-center justify-center btn-bounce shadow">
            <span class="text-[11px] font-extrabold bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full">Pesh (Gol ــُـ)</span>
            <span class="urdu-font text-6xl text-emerald-800 my-2">${item.h}ُ</span>
            <span class="fun-font text-base text-slate-800">${item.pesh}</span>
          </button>
        </div>
      </div>
    `;

    this.speakFriendly(`${item.name} ke saath Zabar, Zer aur Pesh! Teeno cards par tap karke farq sunein.`);
  },

  playHarakat(text) {
    App.playRewardSound();
    this.speakFriendly(text);
  },

  // =========================================================================
  // 4. TWO-LETTER WORDS BUILDER (25 Aasan Do-Harfi Alfaz - Right to Left)
  // =========================================================================
  words2Pool: [
    { w: 'اب', parts: ['ا', 'ب'], img: '⏱️', hint: 'Ab (Now)' },
    { w: 'آم', parts: ['آ', 'م'], img: '🥭', hint: 'Aam (Mango)' },
    { w: 'آگ', parts: ['آ', 'گ'], img: '🔥', hint: 'Aag (Fire)' },
    { w: 'بس', parts: ['ب', 'س'], img: '🚌', hint: 'Bus' },
    { w: 'پر', parts: ['پ', 'ر'], img: '🪶', hint: 'Par (Feather)' },
    { w: 'تار', parts: ['ت', 'ا', 'ر'], img: '🎸', hint: 'Taar (Wire/String)' },
    { w: 'جگ', parts: ['ج', 'گ'], img: '🏺', hint: 'Jug' },
    { w: 'چاند', parts: ['چ', 'ا', 'ن', 'د'], img: '🌙', hint: 'Chaand (Moon)' },
    { w: 'دل', parts: ['د', 'ل'], img: '❤️', hint: 'Dil (Heart)' },
    { w: 'دن', parts: ['د', 'ن'], img: '☀️', hint: 'Din (Day)' },
    { w: 'رات', parts: ['ر', 'ا', 'ت'], img: '🌃', hint: 'Raat (Night)' },
    { w: 'رب', parts: ['ر', 'ب'], img: '🤲', hint: 'Rabb (Allah)' },
    { w: 'سب', parts: ['س', 'ب'], img: '👨‍👩‍👧‍👦', hint: 'Sab (All)' },
    { w: 'سر', parts: ['س', 'ر'], img: '👦', hint: 'Sar (Head)' },
    { w: 'شیر', parts: ['ش', 'ی', 'ر'], img: '🦁', hint: 'Sher (Lion)' },
    { w: 'صاف', parts: ['ص', 'ا', 'ف'], img: '✨', hint: 'Saaf (Clean)' },
    { w: 'کار', parts: ['ک', 'ا', 'ر'], img: '🚗', hint: 'Car' },
    { w: 'کم', parts: ['ک', 'م'], img: '🤏', hint: 'Kam (Less)' },
    { w: 'گل', parts: ['گ', 'ل'], img: '🌹', hint: 'Gul (Flower)' },
    { w: 'لال', parts: ['ل', 'ا', 'ل'], img: '🔴', hint: 'Laal (Red)' },
    { w: 'من', parts: ['م', 'ن'], img: '🧠', hint: 'Mann' },
    { w: 'مور', parts: ['م', 'و', 'ر'], img: '🦚', hint: 'Mor (Peacock)' },
    { w: 'نل', parts: ['ن', 'ل'], img: '🚰', hint: 'Nal (Tap)' },
    { w: 'نم', parts: ['ن', 'م'], img: '💧', hint: 'Nam (Moist)' },
    { w: 'ہاتھ', parts: ['ہ', 'ا', 'تھ'], img: '✋', hint: 'Haath (Hand)' }
  ],

  initTwoLetterWords() {
    const item = this.getNextFromPool('urduWords25', this.words2Pool);
    const parts = item.parts;
    const scrambled = [...parts].sort(() => Math.random() - 0.5);
    if (scrambled.join('') === parts.join('')) scrambled.reverse();

    this.currentGame = {
      target: item.w,
      parts,
      placed: []
    };

    this.speakFriendly(`Huroof ko jod kar lafz banao: ${item.hint}`);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full max-w-md text-center flex flex-col items-center pop-in">
        <div class="w-full flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-sky-800 bg-sky-100 border border-sky-300 px-3 py-1 rounded-full">
            🧩 حروف جوڑیں (Word Builder)
          </span>
          <div class="flex gap-2">
            <button onclick="UrduModule.speakFriendly('${item.hint}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
              🔊 Suno
            </button>
            <button onclick="UrduModule.resetUrduWord()" class="bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-700 btn-bounce">
              🔄 Clear
            </button>
          </div>
        </div>

        <div class="bg-white border-2 border-emerald-200 rounded-3xl px-8 py-4 shadow-sm mb-4">
          <div class="text-6xl mb-1">${item.img}</div>
          <p class="fun-font text-base text-emerald-800">${item.hint}</p>
        </div>

        <!-- Right-to-Left Answer Slots -->
        <div dir="rtl" class="flex justify-center gap-2.5 mb-5" id="uSlotsRow">
          ${parts.map((_, i) => `
            <div id="uwslot-${i}" class="w-16 h-16 border-4 border-dashed border-emerald-400 bg-emerald-50 rounded-2xl flex items-center justify-center urdu-font text-3xl text-emerald-800 shadow-inner transition-all">_</div>
          `).join('')}
        </div>

        <p class="text-xs font-bold text-slate-500 mb-2.5">Daayein se baayein (Right → Left) huroof par tap karein:</p>
        <div dir="rtl" class="flex justify-center gap-3 flex-wrap" id="uTilesRow">
          ${scrambled.map((ch, idx) => `
            <button id="uwtile-${idx}" onclick="UrduModule.pickUrduHarf(${idx}, '${ch}')"
              class="w-16 h-16 bg-gradient-to-b from-sky-200 to-sky-300 border-2 border-b-4 border-sky-500 rounded-2xl urdu-font text-3xl text-sky-950 shadow-md btn-bounce transition">
              ${ch}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  pickUrduHarf(tileIdx, ch) {
    const g = this.currentGame;
    if (!g || g.placed.length >= g.parts.length) return;

    const slotIdx = g.placed.length;
    const slotEl = document.getElementById(`uwslot-${slotIdx}`);
    const tileEl = document.getElementById(`uwtile-${tileIdx}`);

    slotEl.innerText = ch;
    slotEl.classList.remove('border-dashed');
    slotEl.classList.add('bg-white', 'scale-105');

    tileEl.disabled = true;
    tileEl.classList.add('opacity-25', 'scale-90');

    g.placed.push(ch);
    App.playRewardSound();

    if (g.placed.length === g.parts.length) {
      if (g.placed.join('') === g.parts.join('')) {
        document.querySelectorAll('#uSlotsRow > div').forEach(el => {
          el.classList.add('border-emerald-500', 'bg-emerald-100', 'text-emerald-900');
        });
        this.addScore();
        App.awardStarsAndWin(`Zabardast! Lafz "${g.target}" mukammal ho gaya!`);
        setTimeout(() => this.initTwoLetterWords(), 1800);
      } else {
        const row = document.getElementById('uSlotsRow');
        if (row) row.classList.add('shake-anim');
        document.querySelectorAll('#uSlotsRow > div').forEach(el => {
          el.classList.add('border-red-400', 'bg-red-50', 'text-red-600');
        });
        this.speakFriendly('Tartib galat ho gayi, dobara koshish karein!');
        setTimeout(() => this.resetUrduWord(), 1000);
      }
    }
  },

  resetUrduWord() {
    const g = this.currentGame;
    if (!g) return;
    g.placed = [];

    const row = document.getElementById('uSlotsRow');
    if (row) row.classList.remove('shake-anim');

    g.parts.forEach((_, i) => {
      const slot = document.getElementById(`uwslot-${i}`);
      if (slot) {
        slot.innerText = '_';
        slot.classList.add('border-dashed');
        slot.classList.remove('bg-white', 'scale-105', 'border-red-400', 'bg-red-50', 'text-red-600', 'border-emerald-500', 'bg-emerald-100', 'text-emerald-900');
      }
    });

    document.querySelectorAll('#uTilesRow button').forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('opacity-25', 'scale-90');
    });
  },

  // =========================================================================
  // 5. PICTURE WORD QUIZ (24 Visual Urdu Words)
  // =========================================================================
  picQuizPool: [
    { word: 'انار', roman: 'Anaar', icon: '🍎' },
    { word: 'آم', roman: 'Aam', icon: '🥭' },
    { word: 'بلی', roman: 'Billi', icon: '🐱' },
    { word: 'پتنگ', roman: 'Patang', icon: '🪁' },
    { word: 'تتلی', roman: 'Titli', icon: '🦋' },
    { word: 'ٹماٹر', roman: 'Tamatar', icon: '🍅' },
    { word: 'جہاز', roman: 'Jahaaz', icon: '🚢' },
    { word: 'چاند', roman: 'Chaand', icon: '🌙' },
    { word: 'خرگوش', roman: 'Khargosh', icon: '🐇' },
    { word: 'درخت', roman: 'Darakht', icon: '🌳' },
    { word: 'ریل گاڑی', roman: 'Railgaadi', icon: '🚂' },
    { word: 'زیبرا', roman: 'Zebra', icon: '🦓' },
    { word: 'سیب', roman: 'Seb', icon: '🍏' },
    { word: 'شیر', roman: 'Sher', icon: '🦁' },
    { word: 'صابن', roman: 'Saabun', icon: '🧼' },
    { word: 'طوطا', roman: 'Tota', icon: '🦜' },
    { word: 'عینک', roman: 'Ainak', icon: '👓' },
    { word: 'غبارہ', roman: 'Ghubbara', icon: '🎈' },
    { word: 'قلم', roman: 'Qalam', icon: '🖊️' },
    { word: 'کبوتر', roman: 'Kabootar', icon: '🕊️' },
    { word: 'گلاب', roman: 'Gulaab', icon: '🌹' },
    { word: 'مچھلی', roman: 'Machhli', icon: '🐟' },
    { word: 'نل', roman: 'Nal', icon: '🚰' },
    { word: 'ہاتھی', roman: 'Haathi', icon: '🐘' }
  ],

  initPictureQuiz() {
    const target = this.getNextFromPool('urduPic24', this.picQuizPool);
    const distractors = this.picQuizPool
      .filter(i => i.word !== target.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const opts = [target, ...distractors].sort(() => Math.random() - 0.5);

    this.currentGame = { solved: false };
    this.speakFriendly(`Tasveer dekhein: ${target.roman}! Urdu mein sahi lafz chuniye.`);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
            🖼️ تصویر پہچانو (Urdu Reading)
          </span>
          <button onclick="UrduModule.speakFriendly('${target.roman}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Suno
          </button>
        </div>

        <div class="bg-white border-4 border-emerald-200 rounded-3xl p-5 my-4 shadow-sm">
          <div class="text-7xl mb-2 float-slow">${target.icon}</div>
          <p class="text-xs font-bold text-slate-500">Is tasveer ka sahi Urdu naam chunein:</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          ${opts.map(opt => `
            <button onclick="UrduModule.checkPicQuiz(this, '${opt.word}', '${target.word}', '${opt.roman}')"
              class="py-3 px-4 bg-white hover:bg-emerald-50 border-2 border-b-4 border-emerald-300 rounded-2xl urdu-font text-2xl text-emerald-950 shadow btn-bounce transition">
              ${opt.word}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkPicQuiz(btn, chosen, target, roman) {
    if (this.currentGame.solved) return;
    if (chosen === target) {
      this.currentGame.solved = true;
      btn.classList.add('!bg-emerald-500', '!border-emerald-700', '!text-white', 'scale-105');
      this.addScore();
      App.awardStarsAndWin(`MashAllah! "${target}" (${roman}) bilkul sahi padha!`);
      setTimeout(() => this.initPictureQuiz(), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700');
      this.speakFriendly('Huroof ko mila kar phir se padhein!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700'), 600);
    }
  }
};