// Hindi Module (Swar, Vyanjan, Barahkhadi Voice Board, 36-Letter Bubble Challenge, 30x 2-Letter & 30x 3-Letter Words)
const HindiModule = {
  score: 0,
  selectedBkChar: 'क',
  bkReciteTimer: null,
  queues: {},
  currentGame: null,

  // Child-Friendly Natural Hindi Voice
  speakHindi(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice =
        voices.find(v => v.lang.includes('hi-IN') && (v.name.includes('Google') || v.name.includes('Swara') || v.name.includes('Lekha'))) ||
        voices.find(v => v.lang.includes('hi'));

      if (hindiVoice) utter.voice = hindiVoice;
      utter.lang = 'hi-IN';
      utter.rate = 0.88;
      utter.pitch = 1.12;
      window.speechSynthesis.speak(utter);
    } else if (typeof App !== 'undefined' && App.speak) {
      App.speak(text);
    }
  },

  addScore() {
    this.score++;
    const el = document.getElementById('hindiScoreBadge');
    if (el) el.innerText = this.score;
  },

  stopRecitation() {
    if (this.bkReciteTimer) {
      clearInterval(this.bkReciteTimer);
      this.bkReciteTimer = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  switchMode(mode) {
    this.stopRecitation();
    document.querySelectorAll('.hindi-tab').forEach(btn => btn.classList.remove('hindi-tab-active'));
    const active = document.getElementById(`htab-${mode}`);
    if (active) active.classList.add('hindi-tab-active');

    if (mode === 'swar') this.initSwar();
    else if (mode === 'vyanjan') this.initVyanjan();
    else if (mode === 'barahkhadi') this.initBarahkhadi(this.selectedBkChar || 'क');
    else if (mode === 'bubble') this.initBubble();
    else if (mode === 'words2') this.initWordBuilder(2);
    else if (mode === 'words3') this.initWordBuilder(3);
  },

  getNextFromPool(key, list) {
    if (!this.queues[key] || this.queues[key].length === 0) {
      this.queues[key] = [...list].sort(() => Math.random() - 0.5);
    }
    return this.queues[key].pop();
  },

  // =========================================================================
  // 1. SWAR (अ से अः)
  // =========================================================================
  swarList: [
    { s: 'अ', w: 'अनार', e: '🍎', p: 'अ से अनार' },
    { s: 'आ', w: 'आम', e: '🥭', p: 'आ से आम' },
    { s: 'इ', w: 'इमली', e: '🌿', p: 'इ से इमली' },
    { s: 'ई', w: 'ईख', e: '🎋', p: 'ई से ईख' },
    { s: 'उ', w: 'उल्लू', e: '🦉', p: 'उ से उल्लू' },
    { s: 'ऊ', w: 'ऊन', e: '🧶', p: 'ऊ से ऊन' },
    { s: 'ऋ', w: 'ऋषि', e: '🧘', p: 'ऋ से ऋषि' },
    { s: 'ए', w: 'एड़ी', e: '🦶', p: 'ए से एड़ी' },
    { s: 'ऐ', w: 'ऐनक', e: '👓', p: 'ऐ से ऐनक' },
    { s: 'ओ', w: 'ओखली', e: '🥣', p: 'ओ से ओखली' },
    { s: 'औ', w: 'औरत', e: '👩', p: 'औ से औरत' },
    { s: 'अं', w: 'अंगूर', e: '🍇', p: 'अं से अंगूर' },
    { s: 'अः', w: 'खाली', e: '✨', p: 'अः खाली' }
  ],

  initSwar() {
    this.speakHindi('हिंदी स्वर वर्णमाला! किसी भी अक्षर पर टैप करके सुनें।');
    const arena = document.getElementById('gameArena');
    let html = `
      <div class="w-full pop-in">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-orange-800 bg-orange-100 border border-orange-300 px-3 py-1 rounded-full">🍎 स्वर वर्णमाला (अ से अः)</span>
          <span class="text-[11px] font-bold text-slate-500">अक्षर दबाएं 👆</span>
        </div>
        <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 p-1.5">
    `;
    this.swarList.forEach(item => {
      html += `
        <button onclick="HindiModule.playLetter('${item.p}')" class="bg-gradient-to-b from-white to-orange-50 hover:bg-orange-100 border-2 border-orange-300 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-sm">
          <span class="fun-font text-4xl text-orange-600 mb-1">${item.s}</span>
          <span class="text-2xl">${item.e}</span>
          <span class="text-xs font-extrabold text-slate-700 mt-1">${item.w}</span>
        </button>
      `;
    });
    html += '</div></div>';
    arena.innerHTML = html;
  },

  // =========================================================================
  // 2. VYANJAN (क से ज्ञ - 36 Letters)
  // =========================================================================
  vyanjanList: [
    { s: 'क', w: 'कबूतर', e: '🕊️', p: 'क से कबूतर' },
    { s: 'ख', w: 'खरगोश', e: '🐇', p: 'ख से खरगोश' },
    { s: 'ग', w: 'गमला', e: '🪴', p: 'ग से गमला' },
    { s: 'घ', w: 'घर', e: '🏠', p: 'घ से घर' },
    { s: 'ङ', w: 'खाली', e: '✨', p: 'ङ खाली' },
    { s: 'च', w: 'चम्मच', e: '🥄', p: 'च से चम्मच' },
    { s: 'छ', w: 'छतरी', e: '☂️', p: 'छ से छतरी' },
    { s: 'ज', w: 'जहाज', e: '🚢', p: 'ज से जहाज' },
    { s: 'झ', w: 'झंडा', e: '🇮🇳', p: 'झ से झंडा' },
    { s: 'ञ', w: 'खाली', e: '✨', p: 'ञ खाली' },
    { s: 'ट', w: 'टमाटर', e: '🍅', p: 'ट से टमाटर' },
    { s: 'ठ', w: 'ठेला', e: '🛒', p: 'ठ से ठेला' },
    { s: 'ड', w: 'डमरू', e: '🥁', p: 'ड से डमरू' },
    { s: 'ढ', w: 'ढक्कन', e: '🍲', p: 'ढ से ढक्कन' },
    { s: 'ण', w: 'खाली', e: '✨', p: 'ण खाली' },
    { s: 'त', w: 'तरबूज', e: '🍉', p: 'त से तरबूज' },
    { s: 'थ', w: 'थर्मस', e: '🍶', p: 'थ से थर्मस' },
    { s: 'द', w: 'दवात', e: '🖋️', p: 'द से दवात' },
    { s: 'ध', w: 'धनुष', e: '🏹', p: 'ध से धनुष' },
    { s: 'न', w: 'नल', e: '🚰', p: 'न से नल' },
    { s: 'प', w: 'पतंग', e: '🪁', p: 'प से पतंग' },
    { s: 'फ', w: 'फल', e: '🍇', p: 'फ से फल' },
    { s: 'ब', w: 'बत्तख', e: '🦆', p: 'ब से बत्तख' },
    { s: 'भ', w: 'भालू', e: '🐻', p: 'भ से भालू' },
    { s: 'म', w: 'मछली', e: '🐟', p: 'म से मछली' },
    { s: 'य', w: 'यज्ञ', e: '🔥', p: 'य से यज्ञ' },
    { s: 'र', w: 'रथ', e: '🛞', p: 'र से रथ' },
    { s: 'ल', w: 'लट्टू', e: '🪀', p: 'ल से लट्टू' },
    { s: 'व', w: 'वन', e: '🌳', p: 'व से वन' },
    { s: 'श', w: 'शलगम', e: '🥕', p: 'श से शलगम' },
    { s: 'ष', w: 'षट्कोण', e: '🛑', p: 'ष से षट्कोण' },
    { s: 'स', w: 'सेब', e: '🍎', p: 'स से सेब' },
    { s: 'ह', w: 'हाथी', e: '🐘', p: 'ह से हाथी' },
    { s: 'क्ष', w: 'क्षत्रिय', e: '🛡️', p: 'क्ष से क्षत्रिय' },
    { s: 'त्र', w: 'त्रिशूल', e: '🔱', p: 'त्र से त्रिशूल' },
    { s: 'ज्ञ', w: 'ज्ञानी', e: '📖', p: 'ज्ञ से ज्ञानी' }
  ],

  initVyanjan() {
    this.speakHindi('हिंदी व्यंजन वर्णमाला! क से ज्ञ तक अक्षरों को छूकर सुनें।');
    const arena = document.getElementById('gameArena');
    let html = `
      <div class="w-full pop-in">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">🦚 व्यंजन वर्णमाला (क से ज्ञ)</span>
          <span class="text-[11px] font-bold text-slate-500">अक्षर दबाएं 👆</span>
        </div>
        <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 p-1.5">
    `;
    this.vyanjanList.forEach(item => {
      html += `
        <button onclick="HindiModule.playLetter('${item.p}')" class="bg-gradient-to-b from-white to-amber-50 hover:bg-amber-100 border-2 border-amber-300 rounded-2xl p-2.5 flex flex-col items-center justify-center btn-bounce shadow-sm">
          <span class="fun-font text-3xl text-amber-700 mb-0.5">${item.s}</span>
          <span class="text-2xl">${item.e}</span>
          <span class="text-[11px] font-extrabold text-slate-700 mt-1">${item.w}</span>
        </button>
      `;
    });
    html += '</div></div>';
    arena.innerHTML = html;
  },

  playLetter(phrase) {
    App.playRewardSound();
    this.speakHindi(phrase);
  },

  // =========================================================================
  // 3. BARAHKHADI VOICE NOTES (क, का, कि, की, कु, कू, के, कै, को, कौ, कं, कः)
  // =========================================================================
  barahkhadiConsonants: ['क', 'ख', 'ग', 'घ', 'च', 'ज', 'ट', 'ड', 'त', 'द', 'न', 'प', 'ब', 'म', 'य', 'र', 'ल', 'व', 'स', 'ह'],

  getBarahkhadiForms(base) {
    return [
      { form: `${base}`, matra: 'अ (बिना मात्रा)', speak: `${base}` },
      { form: `${base}ा`, matra: 'आ की मात्रा (ा)', speak: `${base}ा` },
      { form: `${base}ि`, matra: 'इ की मात्रा (ि)', speak: `${base}ि` },
      { form: `${base}ी`, matra: 'ई की मात्रा (ी)', speak: `${base}ी` },
      { form: `${base}ु`, matra: 'उ की मात्रा (ु)', speak: `${base}ु` },
      { form: `${base}ू`, matra: 'ऊ की मात्रा (ू)', speak: `${base}ू` },
      { form: `${base}े`, matra: 'ए की मात्रा (े)', speak: `${base}े` },
      { form: `${base}ै`, matra: 'ऐ की मात्रा (ै)', speak: `${base}ै` },
      { form: `${base}ो`, matra: 'ओ की मात्रा (ो)', speak: `${base}ो` },
      { form: `${base}ौ`, matra: 'औ की मात्रा (ौ)', speak: `${base}ौ` },
      { form: `${base}ं`, matra: 'अं की बिंदी (ं)', speak: `${base}ं` },
      { form: `${base}ः`, matra: 'अः विसर्ग (ः)', speak: `${base}ः` }
    ];
  },

  initBarahkhadi(base = 'क') {
    this.stopRecitation();
    this.selectedBkChar = base;
    const forms = this.getBarahkhadiForms(base);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full max-w-2xl pop-in">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-purple-800 bg-purple-100 border border-purple-300 px-3 py-1 rounded-full">
            🎶 बारहखड़ी अभ्यास (${base} से ${base}ः)
          </span>
          <button onclick="HindiModule.reciteFullBarahkhadi('${base}')" class="bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce flex items-center gap-1">
            <span>🔊</span><span>पूरी लाइन सुनें (${base}.. ${base}ः)</span>
          </button>
        </div>

        <!-- Consonant Selector Strip -->
        <div class="bg-purple-50/80 p-2 rounded-2xl border-2 border-purple-200 mb-3">
          <p class="text-[11px] font-extrabold text-purple-800 mb-1.5 px-1">अक्षर चुनें:</p>
          <div class="flex gap-1.5 overflow-x-auto pb-1">
            ${this.barahkhadiConsonants.map(ch => `
              <button onclick="HindiModule.initBarahkhadi('${ch}')"
                class="min-w-[40px] h-10 rounded-xl fun-font text-lg border-2 transition shrink-0 ${ch === base ? 'bk-char-active' : 'bg-white hover:bg-purple-100 text-purple-900 border-purple-200'}">
                ${ch}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 12 Matra Cards Grid -->
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          ${forms.map((item, idx) => `
            <button id="bkcard-${idx}" onclick="HindiModule.playSingleBk(${idx}, '${item.speak}')"
              class="bg-white hover:bg-amber-50 border-2 border-purple-200 rounded-2xl p-3 flex flex-col items-center justify-center shadow-xs btn-bounce transition">
              <span class="fun-font text-3xl md:text-4xl text-purple-800">${item.form}</span>
              <span class="text-[10px] font-bold text-slate-500 mt-1">${item.matra}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    this.speakHindi(`${base} की बारहखड़ी! किसी भी अक्षर को दबाकर आवाज़ सुनें।`);
  },

  playSingleBk(idx, text) {
    document.querySelectorAll('[id^="bkcard-"]').forEach(el => el.classList.remove('!bg-amber-100', '!border-amber-500', 'scale-105'));
    const card = document.getElementById(`bkcard-${idx}`);
    if (card) card.classList.add('!bg-amber-100', '!border-amber-500', 'scale-105');
    App.playRewardSound();
    this.speakHindi(text);
  },

  reciteFullBarahkhadi(base) {
    this.stopRecitation();
    const forms = this.getBarahkhadiForms(base);
    let idx = 0;

    const step = () => {
      if (idx >= forms.length) {
        this.stopRecitation();
        return;
      }
      document.querySelectorAll('[id^="bkcard-"]').forEach(el => el.classList.remove('!bg-amber-100', '!border-amber-500', 'scale-105'));
      const card = document.getElementById(`bkcard-${idx}`);
      if (card) card.classList.add('!bg-amber-100', '!border-amber-500', 'scale-105');
      this.speakHindi(forms[idx].speak);
      idx++;
    };

    step();
    this.bkReciteTimer = setInterval(step, 1350);
  },

  // =========================================================================
  // 4. GUBBARA CHALLENGE (36 Letters Pool: Swar + Vyanjan)
  // =========================================================================
  bubblePool: [
    { target: 'अ', name: 'अ से अनार' },
    { target: 'आ', name: 'आ से आम' },
    { target: 'इ', name: 'इ से इमली' },
    { target: 'ई', name: 'ई से ईख' },
    { target: 'उ', name: 'उ से उल्लू' },
    { target: 'ऊ', name: 'ऊ से ऊन' },
    { target: 'ए', name: 'ए से एड़ी' },
    { target: 'ऐ', name: 'ऐ से ऐनक' },
    { target: 'ओ', name: 'ओ से ओखली' },
    { target: 'औ', name: 'औ से औरत' },
    { target: 'अं', name: 'अं से अंगूर' },
    { target: 'क', name: 'क से कबूतर' },
    { target: 'ख', name: 'ख से खरगोश' },
    { target: 'ग', name: 'ग से गमला' },
    { target: 'घ', name: 'घ से घर' },
    { target: 'च', name: 'च से चम्मच' },
    { target: 'छ', name: 'छ से छतरी' },
    { target: 'ज', name: 'ज से जहाज' },
    { target: 'झ', name: 'झ से झंडा' },
    { target: 'ट', name: 'ट से टमाटर' },
    { target: 'ठ', name: 'ठ से ठेला' },
    { target: 'ड', name: 'ड से डमरू' },
    { target: 'ढ', name: 'ढ से ढक्कन' },
    { target: 'त', name: 'त से तरबूज' },
    { target: 'थ', name: 'थ से थर्मस' },
    { target: 'द', name: 'द से दवात' },
    { target: 'ध', name: 'ध से धनुष' },
    { target: 'न', name: 'न से नल' },
    { target: 'प', name: 'प से पतंग' },
    { target: 'फ', name: 'फ से फल' },
    { target: 'ब', name: 'ब से बत्तख' },
    { target: 'भ', name: 'भ से भालू' },
    { target: 'म', name: 'म से मछली' },
    { target: 'र', name: 'र से रथ' },
    { target: 'ल', name: 'ल से लट्टू' },
    { target: 'ह', name: 'ह से हाथी' }
  ],

  initBubble() {
    const cur = this.getNextFromPool('hindiBubble', this.bubblePool);
    const allTargets = this.bubblePool.map(i => i.target);
    const distractors = allTargets
      .filter(ch => ch !== cur.target)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [cur.target, ...distractors].sort(() => Math.random() - 0.5);
    const balloonColors = [
      'from-pink-200 to-rose-400 border-rose-500 text-rose-950',
      'from-sky-200 to-blue-400 border-blue-500 text-blue-950',
      'from-amber-200 to-orange-400 border-orange-500 text-orange-950',
      'from-emerald-200 to-teal-400 border-teal-500 text-teal-950'
    ];

    this.currentGame = { solved: false };
    this.speakHindi(`गुब्बारों में से ${cur.name} को ढूंढकर फोड़ो!`);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-rose-800 bg-rose-100 border border-rose-300 px-3 py-1 rounded-full">
            🎈 गुब्बारा चैलेंज (36 अक्षर)
          </span>
          <button onclick="HindiModule.speakHindi('${cur.name}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 फिर से सुनें
          </button>
        </div>

        <div class="bg-rose-50/80 border-2 border-rose-200 rounded-2xl py-3 px-4 my-4">
          <p class="text-xs font-bold text-slate-500">सही अक्षर वाला गुब्बारा फोड़ें:</p>
          <p class="fun-font text-2xl md:text-3xl text-orange-700 mt-1">🎯 ${cur.name}</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center my-6">
          ${options.map((opt, idx) => `
            <button onclick="HindiModule.popBubble(this, '${opt}', '${cur.target}', '${cur.name}')"
              style="animation-delay: ${idx * 0.25}s"
              class="balloon-float w-24 h-28 bg-gradient-to-b ${balloonColors[idx % 4]} border-4 rounded-full fun-font text-4xl shadow-lg btn-bounce flex flex-col items-center justify-center relative">
              <span>${opt}</span>
              <span class="text-xs opacity-60 -mt-1">▲</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  popBubble(btn, chosen, target, name) {
    if (this.currentGame.solved) return;
    if (chosen === target) {
      this.currentGame.solved = true;
      btn.innerHTML = '<span class="text-4xl">💥</span>';
      btn.classList.add('scale-125', '!bg-emerald-400', '!border-emerald-600');
      this.addScore();
      App.awardStarsAndWin(`शाबाश! ${name} का गुब्बारा फोड़ दिया!`);
      setTimeout(() => this.initBubble(), 1600);
    } else {
      btn.classList.add('shake-anim', 'opacity-30');
      btn.disabled = true;
      this.speakHindi('अरे यह नहीं है, दूसरा गुब्बारा देखो!');
    }
  },

  // =========================================================================
  // 5. TWO-LETTER WORDS (30 Words) & THREE-LETTER WORDS (30 Words)
  // =========================================================================
  words2Pool: [
    { w: 'घर', parts: ['घ', 'र'], img: '🏠', hint: 'जहाँ हम रहते हैं' },
    { w: 'जल', parts: ['ज', 'ल'], img: '💧', hint: 'पीने का पानी' },
    { w: 'नल', parts: ['न', 'ल'], img: '🚰', hint: 'इससे पानी आता है' },
    { w: 'फल', parts: ['फ', 'ल'], img: '🍎', hint: 'सेब, आम, केला' },
    { w: 'बस', parts: ['ब', 'स'], img: '🚌', hint: 'सवारी गाड़ी' },
    { w: 'रथ', parts: ['र', 'थ'], img: '🛞', hint: 'घोड़े वाला रथ' },
    { w: 'हल', parts: ['ह', 'ल'], img: '🌾', hint: 'किसान खेत में चलाता है' },
    { w: 'वन', parts: ['व', 'न'], img: '🌳', hint: 'घना जंगल' },
    { w: 'कप', parts: ['क', 'प'], img: '☕', hint: 'चाय पीने का कप' },
    { w: 'जग', parts: ['ज', 'ग'], img: '🏺', hint: 'पानी भरने का बर्तन' },
    { w: 'टब', parts: ['ट', 'ब'], img: '🛁', hint: 'नहाने का टब' },
    { w: 'नथ', parts: ['न', 'थ'], img: '💍', hint: 'नाक में पहनते हैं' },
    { w: 'पत्र', parts: ['प', 'त्र'], img: '✉️', hint: 'चिट्ठी (Letter)' },
    { w: 'गज', parts: ['ग', 'ज'], img: '🐘', hint: 'हाथी को गज कहते हैं' },
    { w: 'खत', parts: ['ख', 'त'], img: '📩', hint: 'संदेश वाला खत' },
    { w: 'धन', parts: ['ध', 'न'], img: '💰', hint: 'रुपया-पैसा' },
    { w: 'मन', parts: ['म', 'न'], img: '🧠', hint: 'हमारा दिल और मन' },
    { w: 'तन', parts: ['त', 'न'], img: '🧍', hint: 'हमारा शरीर' },
    { w: 'छत', parts: ['छ', 'त'], img: '🏡', hint: 'घर के ऊपर की छत' },
    { w: 'दस', parts: ['द', 'स'], img: '🔟', hint: 'गिनती का १०' },
    { w: 'ईख', parts: ['ई', 'ख'], img: '🎋', hint: 'मीठा गन्ना' },
    { w: 'ऊन', parts: ['ऊ', 'न'], img: '🧶', hint: 'स्वेटर बुनने का ऊन' },
    { w: 'आम', parts: ['आ', 'म'], img: '🥭', hint: 'फलों का राजा' },
    { w: 'आग', parts: ['आ', 'ग'], img: '🔥', hint: 'गर्म आग' },
    { w: 'ऊँट', parts: ['ऊँ', 'ट'], img: '🐪', hint: 'रेगिस्तान का जहाज' },
    { w: 'पग', parts: ['प', 'ग'], img: '👣', hint: 'कदम या पैर' },
    { w: 'नभ', parts: ['न', 'भ'], img: '☁️', hint: 'नीला आसमान' },
    { w: 'जल', parts: ['ज', 'ल'], img: '🌊', hint: 'निर्मल जल' },
    { w: 'यज्ञ', parts: ['य', 'ज्ञ'], img: '🪔', hint: 'पवित्र यज्ञ' },
    { w: 'सच', parts: ['स', 'च'], img: '✅', hint: 'हमेशा सच बोलो' }
  ],

  words3Pool: [
    { w: 'कमल', parts: ['क', 'म', 'ल'], img: '🪷', hint: 'तालाब में खिलने वाला फूल' },
    { w: 'कलम', parts: ['क', 'ल', 'म'], img: '🖊️', hint: 'लिखने वाली पेन' },
    { w: 'महल', parts: ['म', 'ह', 'ल'], img: '🏰', hint: 'राजा का बड़ा घर' },
    { w: 'मगर', parts: ['म', 'ग', 'र'], img: '🐊', hint: 'पानी का मगरमच्छ' },
    { w: 'बत्तख', parts: ['ब', 'त्त', 'ख'], img: '🦆', hint: 'पानी में तैरने वाली चिड़िया' },
    { w: 'सड़क', parts: ['स', 'ड़', 'क'], img: '🛣️', hint: 'जिस पर गाड़ियाँ चलती हैं' },
    { w: 'नमक', parts: ['न', 'म', 'क'], img: '🧂', hint: 'खाने में स्वाद लाता है' },
    { w: 'शहद', parts: ['श', 'ह', 'द'], img: '🍯', hint: 'मधुमक्खी का मीठा शहद' },
    { w: 'फसल', parts: ['फ', 'स', 'ल'], img: '🌾', hint: 'खेत में उगने वाली फसल' },
    { w: 'मटर', parts: ['म', 'ट', 'र'], img: '🫛', hint: 'हरी-हरी मटर' },
    { w: 'बटन', parts: ['ब', 'ट', 'न'], img: '🔘', hint: 'शर्ट में लगा बटन' },
    { w: 'नयन', parts: ['न', 'य', 'न'], img: '👀', hint: 'हमारी सुंदर आँखें' },
    { w: 'चरण', parts: ['च', 'र', 'ण'], img: '🦶', hint: 'बड़ों के पैर (चरण)' },
    { w: 'पवन', parts: ['प', 'व', 'न'], img: '🌬️', hint: 'ठंडी-ठंडी हवा' },
    { w: 'भवन', parts: ['भ', 'व', 'न'], img: '🏢', hint: 'बड़ी इमारत' },
    { w: 'हवन', parts: ['ह', 'व', 'न'], img: '🔥', hint: 'पूजा का हवन' },
    { w: 'गगन', parts: ['ग', 'ग', 'न'], img: '🌌', hint: 'ऊँचा आसमान' },
    { w: 'चमन', parts: ['च', 'म', 'न'], img: '🌺', hint: 'फूलों का बगीचा' },
    { w: 'कलश', parts: ['क', 'ल', 'श'], img: '🏺', hint: 'पूजा का कलश' },
    { w: 'पकड़', parts: ['प', 'क', 'ड़'], img: '✊', hint: 'हाथ से पकड़ना' },
    { w: 'रबड़', parts: ['र', 'ब', 'ड़'], img: '🧽', hint: 'पेंसिल मिटाने वाला रबड़' },
    { w: 'चमक', parts: ['च', 'म', 'क'], img: '✨', hint: 'सितारों की चमक' },
    { w: 'पलक', parts: ['प', 'ल', 'क'], img: '👁️', hint: 'आँखों की पलक' },
    { w: 'लहर', parts: ['ल', 'ह', 'र'], img: '🌊', hint: 'समुद्र की लहर' },
    { w: 'शहर', parts: ['श', 'ह', 'र'], img: '🏙️', hint: 'बड़ा नगर या शहर' },
    { w: 'नहर', parts: ['न', 'ह', 'र'], img: '🏞️', hint: 'पानी की नहर' },
    { w: 'डगर', parts: ['ड', 'ग', 'र'], img: '🛤️', hint: 'चलने का रास्ता' },
    { w: 'नगर', parts: ['न', 'ग', 'र'], img: '🏘️', hint: 'बस्ती या नगर' },
    { w: 'अमर', parts: ['अ', 'म', 'र'], img: '🌟', hint: 'जो सदा रहे' },
    { w: 'सरल', parts: ['स', 'र', 'ल'], img: '😊', hint: 'बहुत आसान (सरल)' }
  ],

  initWordBuilder(aksharCount) {
    const pool = aksharCount === 2 ? this.words2Pool : this.words3Pool;
    const item = this.getNextFromPool(`hindiWords_${aksharCount}`, pool);
    const parts = item.parts;
    const scrambled = [...parts].sort(() => Math.random() - 0.5);
    if (scrambled.join('') === item.w) scrambled.reverse();

    this.currentGame = {
      aksharCount,
      target: item.w,
      parts,
      placed: []
    };

    const badgeStyle = aksharCount === 2
      ? 'text-sky-800 bg-sky-100 border-sky-300'
      : 'text-emerald-800 bg-emerald-100 border-emerald-300';
    const tileStyle = aksharCount === 2
      ? 'bg-gradient-to-b from-sky-200 to-sky-300 border-sky-500 text-sky-950'
      : 'bg-gradient-to-b from-emerald-200 to-emerald-300 border-emerald-500 text-emerald-950';

    this.speakHindi(`अक्षरों को जोड़कर शब्द बनाओ: ${item.w}`);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full max-w-md text-center flex flex-col items-center pop-in">
        <div class="w-full flex items-center justify-between mb-3">
          <span class="text-xs font-bold ${badgeStyle} border px-3 py-1 rounded-full">
            ${aksharCount === 2 ? '🧩 2 अक्षर वाले शब्द (30)' : '🚀 3 अक्षर वाले शब्द (30)'}
          </span>
          <div class="flex gap-2">
            <button onclick="HindiModule.speakHindi('${item.w}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
              🔊 सुनें
            </button>
            <button onclick="HindiModule.resetHindiWord()" class="bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-700 btn-bounce">
              🔄 साफ़ करें
            </button>
          </div>
        </div>

        <div class="bg-white border-2 border-orange-200 rounded-3xl px-8 py-4 shadow-sm mb-4">
          <div class="text-6xl mb-1">${item.img}</div>
          <p class="text-xs font-bold text-slate-500">${item.hint}</p>
        </div>

        <!-- Slots -->
        <div class="flex justify-center gap-3 mb-5" id="hSlotsRow">
          ${parts.map((_, i) => `
            <div id="hwslot-${i}" class="w-16 h-16 border-4 border-dashed border-orange-400 bg-orange-50 rounded-2xl flex items-center justify-center fun-font text-3xl text-orange-800 shadow-inner transition-all">_</div>
          `).join('')}
        </div>

        <p class="text-xs font-bold text-slate-500 mb-2.5">सही क्रम में अक्षरों पर टैप करें:</p>
        <div class="flex justify-center gap-3" id="hTilesRow">
          ${scrambled.map((ch, idx) => `
            <button id="hwtile-${idx}" onclick="HindiModule.pickHindiChar(${idx}, '${ch}')"
              class="w-16 h-16 ${tileStyle} border-2 border-b-4 rounded-2xl fun-font text-3xl shadow-md btn-bounce transition">
              ${ch}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  pickHindiChar(tileIdx, ch) {
    const g = this.currentGame;
    if (!g || g.placed.length >= g.parts.length) return;

    const slotIdx = g.placed.length;
    const slotEl = document.getElementById(`hwslot-${slotIdx}`);
    const tileEl = document.getElementById(`hwtile-${tileIdx}`);

    slotEl.innerText = ch;
    slotEl.classList.remove('border-dashed');
    slotEl.classList.add('bg-white', 'scale-105');

    tileEl.disabled = true;
    tileEl.classList.add('opacity-25', 'scale-90');

    g.placed.push(ch);
    App.playRewardSound();
    this.speakHindi(ch);

    if (g.placed.length === g.parts.length) {
      const formed = g.placed.join('');
      if (formed === g.target) {
        document.querySelectorAll('#hSlotsRow > div').forEach(el => {
          el.classList.add('border-emerald-500', 'bg-emerald-100', 'text-emerald-800');
        });
        this.addScore();
        App.awardStarsAndWin(`बहुत बढ़िया! ${g.target} शब्द पूरा हो गया!`);
        setTimeout(() => this.initWordBuilder(g.aksharCount), 1800);
      } else {
        const row = document.getElementById('hSlotsRow');
        if (row) row.classList.add('shake-anim');
        document.querySelectorAll('#hSlotsRow > div').forEach(el => {
          el.classList.add('border-red-400', 'bg-red-50', 'text-red-600');
        });
        this.speakHindi('अरे क्रम गलत हो गया, फिर से कोशिश करें!');
        setTimeout(() => this.resetHindiWord(), 1000);
      }
    }
  },

  resetHindiWord() {
    const g = this.currentGame;
    if (!g) return;
    g.placed = [];

    const row = document.getElementById('hSlotsRow');
    if (row) row.classList.remove('shake-anim');

    g.parts.forEach((_, i) => {
      const slot = document.getElementById(`hwslot-${i}`);
      if (slot) {
        slot.innerText = '_';
        slot.classList.add('border-dashed');
        slot.classList.remove('bg-white', 'scale-105', 'border-red-400', 'bg-red-50', 'text-red-600', 'border-emerald-500', 'bg-emerald-100', 'text-emerald-800');
      }
    });

    document.querySelectorAll('#hTilesRow button').forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('opacity-25', 'scale-90');
    });
  }
};