// Mathematics Game Module (Learn Tables 1-10, 40+ Tables Quiz, Missing 1-50 & 1-100, 24+ Asc/Desc, 35+ Add/Sub)
const MathsModule = {
  score: 0,
  missingRange: 50, // 50 or 100
  selectedTableNum: 2,
  tableReciteTimer: null,
  queues: {},
  currentGame: null,

  // Child-Friendly Natural Voice Helper (Warm, clear, slightly slower for kids)
  speakNatural(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find(v => v.lang.includes('hi-IN') && (v.name.includes('Google') || v.name.includes('Swara') || v.name.includes('Heera'))) ||
        voices.find(v => v.lang.includes('en-IN') && (v.name.includes('Google') || v.name.includes('Heera') || v.name.includes('Veena'))) ||
        voices.find(v => v.lang.includes('hi') || v.lang.includes('en-IN'));

      if (preferred) utter.voice = preferred;
      utter.lang = preferred ? preferred.lang : 'hi-IN';
      utter.rate = 0.90;  // Clear & unhurried for children
      utter.pitch = 1.12; // Warm & friendly tone
      window.speechSynthesis.speak(utter);
    } else if (typeof App !== 'undefined' && App.speak) {
      App.speak(text);
    }
  },

  addScore() {
    this.score++;
    const badge = document.getElementById('mathScoreBadge');
    if (badge) badge.innerText = this.score;
  },

  stopRecitation() {
    if (this.tableReciteTimer) {
      clearInterval(this.tableReciteTimer);
      this.tableReciteTimer = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  switchMode(mode) {
    this.stopRecitation();
    document.querySelectorAll('.math-tab').forEach(btn => btn.classList.remove('math-tab-active'));
    const active = document.getElementById(`mtab-${mode}`);
    if (active) active.classList.add('math-tab-active');

    if (mode === 'learnTables') this.initLearnTables(this.selectedTableNum || 2);
    else if (mode === 'tablesQuiz') this.initTablesQuiz();
    else if (mode === 'missing') this.initMissingNumbers();
    else if (mode === 'ascDesc') this.initAscDesc();
    else if (mode === 'addSub') this.initAddSub();
  },

  getNextFromPool(key, builderFn) {
    if (!this.queues[key] || this.queues[key].length === 0) {
      this.queues[key] = builderFn().sort(() => Math.random() - 0.5);
    }
    return this.queues[key].pop();
  },

  // =========================================================================
  // 1. LEARN TABLES (1 to 10 Column Selector + Full Table Display)
  // =========================================================================
  initLearnTables(num = 2) {
    this.stopRecitation();
    this.selectedTableNum = num;

    const arena = document.getElementById('gameArena');
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let rowsHtml = '';
    for (let i = 1; i <= 10; i++) {
      const prod = num * i;
      rowsHtml += `
        <button id="trow-${i}" onclick="MathsModule.speakSingleTableRow(${num}, ${i}, ${prod})"
          class="w-full flex items-center justify-between px-4 py-2 bg-white hover:bg-amber-50 border-2 border-blue-100 rounded-xl shadow-xs transition btn-bounce">
          <span class="fun-font text-lg md:text-xl text-blue-900">${num} &nbsp;×&nbsp; ${i}</span>
          <span class="fun-font text-lg md:text-xl text-slate-400">=</span>
          <span class="fun-font text-xl md:text-2xl text-emerald-600 bg-emerald-50 px-3 py-0.5 rounded-lg border border-emerald-200">${prod}</span>
        </button>
      `;
    }

    arena.innerHTML = `
      <div class="w-full max-w-2xl pop-in">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full uppercase">
            📖 Pahada Seekhein (1 se 10)
          </span>
          <button onclick="MathsModule.reciteFullTable(${num})" class="bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow btn-bounce flex items-center gap-1">
            <span>🔊</span><span>Poora ${num} ka Pahada Suno</span>
          </button>
        </div>

        <div class="grid grid-cols-12 gap-3 items-start">
          <!-- Left Column: Numbers 1 to 10 -->
          <div class="col-span-4 sm:col-span-3 bg-blue-50/80 p-2 rounded-2xl border-2 border-blue-200">
            <p class="text-[11px] font-extrabold text-center text-blue-800 mb-2">Number Chunein</p>
            <div class="grid grid-cols-2 sm:grid-cols-1 gap-1.5">
              ${numbers.map(n => `
                <button onclick="MathsModule.initLearnTables(${n})"
                  class="py-2 rounded-xl fun-font text-base md:text-lg border-2 transition shadow-xs ${n === num ? 'num-col-active' : 'bg-white hover:bg-blue-100 text-blue-900 border-blue-200'}">
                  ${n}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Right Area: Selected Table -->
          <div class="col-span-8 sm:col-span-9 bg-gradient-to-b from-blue-50 to-amber-50/50 p-3 rounded-2xl border-2 border-blue-200">
            <div class="flex items-center justify-between mb-2 px-1">
              <h3 class="fun-font text-lg md:text-xl text-blue-900">Table of ${num} (${num} ka Pahada)</h3>
              <span class="text-[11px] font-bold text-slate-500">Line par tap karein 👆</span>
            </div>
            <div class="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
              ${rowsHtml}
            </div>
          </div>
        </div>
      </div>
    `;

    this.speakNatural(`${num} ka pahada! Kisi bhi line par tap karke suno.`);
  },

  speakSingleTableRow(num, step, prod) {
    document.querySelectorAll('[id^="trow-"]').forEach(el => el.classList.remove('!bg-amber-100', '!border-amber-400'));
    const row = document.getElementById(`trow-${step}`);
    if (row) row.classList.add('!bg-amber-100', '!border-amber-400');
    App.playRewardSound();
    this.speakNatural(`${num} ${step} za ${prod}`);
  },

  reciteFullTable(num) {
    this.stopRecitation();
    let step = 1;
    const speakStep = () => {
      if (step > 10) {
        this.stopRecitation();
        return;
      }
      const prod = num * step;
      document.querySelectorAll('[id^="trow-"]').forEach(el => el.classList.remove('!bg-amber-100', '!border-amber-400'));
      const row = document.getElementById(`trow-${step}`);
      if (row) {
        row.classList.add('!bg-amber-100', '!border-amber-400');
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      this.speakNatural(`${num} ${step} za ${prod}`);
      step++;
    };
    speakStep();
    this.tableReciteTimer = setInterval(speakStep, 2100);
  },

  // =========================================================================
  // 2. TABLES QUIZ (45+ Questions covering Tables 1 to 10)
  // =========================================================================
  buildTablesPool() {
    const list = [];
    // Generate 45 balanced questions from tables 1 to 10
    for (let base = 1; base <= 10; base++) {
      const steps = base === 1 ? [2, 5, 8] : [2, 3, 4, 5, 6, 7, 8, 9, 10];
      steps.forEach(step => {
        if (base === 1 || (base + step) % 2 === 0 || step <= 5) {
          list.push({ base, step, ans: base * step });
        }
      });
    }
    return list;
  },

  initTablesQuiz() {
    const q = this.getNextFromPool('tablesQuiz', () => this.buildTablesPool());
    const distractors = new Set();
    while (distractors.size < 2) {
      const offset = (Math.floor(Math.random() * 3) + 1) * (Math.random() > 0.5 ? 1 : -1) * Math.max(1, Math.min(q.base, 3));
      const candidate = q.ans + offset;
      if (candidate > 0 && candidate !== q.ans) distractors.add(candidate);
    }
    const opts = [q.ans, ...distractors].sort(() => Math.random() - 0.5);

    this.currentGame = { solved: false };
    const questionText = `${q.base} times ${q.step} kitna hota hai?`;
    this.speakNatural(questionText);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-blue-800 bg-blue-100 border border-blue-300 px-3 py-1 rounded-full uppercase">
            📊 Tables Challenge (1 - 10)
          </span>
          <button onclick="MathsModule.speakNatural('${questionText}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Sawal Suno
          </button>
        </div>

        <div class="my-6 flex items-center justify-center space-x-3 bg-blue-50/70 p-5 rounded-3xl border-2 border-blue-200">
          <div class="w-16 h-16 bg-white border-2 border-blue-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-blue-800 shadow">${q.base}</div>
          <span class="fun-font text-3xl text-slate-500">×</span>
          <div class="w-16 h-16 bg-white border-2 border-blue-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-blue-800 shadow">${q.step}</div>
          <span class="fun-font text-3xl text-slate-500">=</span>
          <div id="tquizSlot" class="w-16 h-16 bg-amber-100 border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-amber-700 font-bold shadow">?</div>
        </div>

        <p class="text-xs font-bold text-slate-500 mb-4">Sahi jawab par tap karein:</p>
        <div class="flex justify-center space-x-3">
          ${opts.map(o => `
            <button onclick="MathsModule.checkTableQuiz(this, ${o}, ${q.ans})" class="w-22 h-16 px-5 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl fun-font text-2xl shadow-lg border-b-4 border-blue-800 btn-bounce transition">${o}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkTableQuiz(btn, chosen, correct) {
    if (this.currentGame.solved) return;
    if (chosen === correct) {
      this.currentGame.solved = true;
      const slot = document.getElementById('tquizSlot');
      if (slot) {
        slot.innerText = correct;
        slot.classList.remove('border-dashed', 'bg-amber-100', 'text-amber-700');
        slot.classList.add('border-emerald-500', 'bg-emerald-500', 'text-white', 'scale-110');
      }
      this.addScore();
      App.awardStarsAndWin(`Shabash! ${correct} bilkul sahi jawab hai!`);
      setTimeout(() => this.initTablesQuiz(), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-500', '!border-red-700');
      this.speakNatural('Koi baat nahi, ek baar phir se table gino!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-500', '!border-red-700'), 600);
    }
  },

  // =========================================================================
  // 3. MISSING NUMBERS (2 Options: 1 to 50 & 1 to 100 | 45+ Questions)
  // =========================================================================
  setMissingRange(range) {
    this.missingRange = range;
    this.queues[`missing_${range}`] = [];
    this.initMissingNumbers();
  },

  buildMissingPool(maxNum) {
    const items = [];
    const modes = ['between', 'after', 'before'];
    // Generate 45 distinct questions across 2 to maxNum-1
    const step = maxNum === 50 ? 1 : 2;
    for (let n = 2; n < maxNum; n += step) {
      const mode = modes[n % 3];
      items.push({ num: n, mode });
    }
    return items;
  },

  initMissingNumbers() {
    const maxNum = this.missingRange;
    const item = this.getNextFromPool(`missing_${maxNum}`, () => this.buildMissingPool(maxNum));
    const n = item.num;
    const mode = item.mode;

    let correct = n;
    let prompt = '';
    let visual = '';

    if (mode === 'between') {
      prompt = `${n - 1} aur ${n + 1} ke beech mein kaunsa number aayega?`;
      visual = `
        <div class="w-15 h-16 px-3 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-center fun-font text-2xl sm:text-3xl text-emerald-900 shadow">${n - 1}</div>
        <div id="mBlankSlot" class="w-15 h-16 px-3 bg-white border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-2xl sm:text-3xl text-amber-600 shadow-inner">?</div>
        <div class="w-15 h-16 px-3 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-center fun-font text-2xl sm:text-3xl text-emerald-900 shadow">${n + 1}</div>
      `;
    } else if (mode === 'after') {
      prompt = `${n - 1} ke baad kaunsa number aata hai?`;
      visual = `
        <div class="w-15 h-16 px-3 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-center fun-font text-2xl sm:text-3xl text-emerald-900 shadow">${n - 1}</div>
        <div id="mBlankSlot" class="w-15 h-16 px-3 bg-white border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-2xl sm:text-3xl text-amber-600 shadow-inner">?</div>
        <div class="w-15 h-16 px-3 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-center fun-font text-2xl sm:text-3xl text-emerald-900 shadow">${n + 1}</div>
      `;
      // Show only 2 boxes for pure After
      visual = `
        <div class="w-16 h-16 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-emerald-900 shadow">${n - 1}</div>
        <span class="text-xl text-emerald-400 font-black">➔</span>
        <div id="mBlankSlot" class="w-16 h-16 bg-white border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-amber-600 shadow-inner">?</div>
      `;
    } else {
      prompt = `${n + 1} se pehle kaunsa number aata hai?`;
      visual = `
        <div id="mBlankSlot" class="w-16 h-16 bg-white border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-amber-600 shadow-inner">?</div>
        <span class="text-xl text-emerald-400 font-black">➔</span>
        <div class="w-16 h-16 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-emerald-900 shadow">${n + 1}</div>
      `;
    }

    const optsSet = new Set([correct]);
    while (optsSet.size < 3) {
      const delta = (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const val = correct + delta;
      if (val >= 1 && val <= maxNum) optsSet.add(val);
    }
    const opts = [...optsSet].sort(() => Math.random() - 0.5);

    this.currentGame = { solved: false };
    this.speakNatural(prompt);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <!-- Range Selector: 2 Options (1-50 & 1-100) -->
        <div class="flex items-center justify-center gap-2 mb-4 bg-emerald-50 p-1.5 rounded-2xl border-2 border-emerald-200">
          <button onclick="MathsModule.setMissingRange(50)"
            class="flex-1 py-1.5 rounded-xl fun-font text-xs sm:text-sm transition ${maxNum === 50 ? 'bg-emerald-600 text-white shadow' : 'text-emerald-800 hover:bg-emerald-100'}">
            🎯 1 se 50 Tak
          </button>
          <button onclick="MathsModule.setMissingRange(100)"
            class="flex-1 py-1.5 rounded-xl fun-font text-xs sm:text-sm transition ${maxNum === 100 ? 'bg-emerald-600 text-white shadow' : 'text-emerald-800 hover:bg-emerald-100'}">
            🚀 1 se 100 Tak
          </button>
        </div>

        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
            ${mode === 'between' ? '↔️ Between Number' : mode === 'after' ? '➡️ After Number' : '⬅️ Before Number'}
          </span>
          <button onclick="MathsModule.speakNatural('${prompt}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Suno
          </button>
        </div>

        <div class="my-5 flex items-center justify-center space-x-3 bg-emerald-50/60 p-5 rounded-3xl border-2 border-emerald-200">
          <span class="text-3xl">🚂</span>
          ${visual}
        </div>

        <p class="text-xs font-bold text-slate-500 mb-3">Sahi missing number chuniye:</p>
        <div class="flex justify-center space-x-3">
          ${opts.map(opt => `
            <button onclick="MathsModule.checkMissingNumber(this, ${opt}, ${correct})" class="w-18 h-16 px-4 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl fun-font text-2xl shadow border-b-4 border-emerald-800 btn-bounce transition">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkMissingNumber(btn, chosen, correct) {
    if (this.currentGame.solved) return;
    if (chosen === correct) {
      this.currentGame.solved = true;
      const slot = document.getElementById('mBlankSlot');
      if (slot) {
        slot.innerText = correct;
        slot.classList.remove('border-dashed', 'text-amber-600');
        slot.classList.add('border-emerald-600', 'bg-emerald-500', 'text-white', 'scale-110');
      }
      this.addScore();
      App.awardStarsAndWin(`Bahut khoob! ${correct} bilkul sahi number hai!`);
      setTimeout(() => this.initMissingNumbers(), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-500', '!border-red-700');
      this.speakNatural('Arey nahi, ginti karke dekhein!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-500', '!border-red-700'), 600);
    }
  },

  // =========================================================================
  // 4. ASCENDING & DESCENDING ORDER (24 Pre-designed + Dynamic Sets)
  // =========================================================================
  buildAscDescPool() {
    const sets = [
      // 12 Ascending Sets
      { isAsc: true, nums: [4, 1, 9, 6] },
      { isAsc: true, nums: [12, 5, 18, 9] },
      { isAsc: true, nums: [20, 11, 15, 3] },
      { isAsc: true, nums: [25, 14, 30, 8] },
      { isAsc: true, nums: [19, 7, 24, 13] },
      { isAsc: true, nums: [33, 21, 40, 16] },
      { isAsc: true, nums: [45, 29, 38, 12] },
      { isAsc: true, nums: [50, 35, 42, 28] },
      { isAsc: true, nums: [62, 48, 75, 51] },
      { isAsc: true, nums: [81, 64, 90, 72] },
      { isAsc: true, nums: [95, 70, 88, 60] },
      { isAsc: true, nums: [17, 2, 29, 10] },
      // 12 Descending Sets
      { isAsc: false, nums: [3, 10, 6, 1] },
      { isAsc: false, nums: [8, 19, 12, 4] },
      { isAsc: false, nums: [15, 27, 9, 21] },
      { isAsc: false, nums: [11, 34, 22, 18] },
      { isAsc: false, nums: [26, 41, 19, 32] },
      { isAsc: false, nums: [30, 49, 25, 37] },
      { isAsc: false, nums: [44, 58, 39, 50] },
      { isAsc: false, nums: [53, 69, 47, 61] },
      { isAsc: false, nums: [65, 84, 73, 59] },
      { isAsc: false, nums: [78, 96, 82, 71] },
      { isAsc: false, nums: [89, 100, 74, 92] },
      { isAsc: false, nums: [14, 23, 5, 17] }
    ];
    return sets;
  },

  initAscDesc() {
    const item = this.getNextFromPool('ascDesc', () => this.buildAscDescPool());
    const isAsc = item.isAsc;
    const nums = [...item.nums].sort(() => Math.random() - 0.5);
    const sorted = [...nums].sort((a, b) => (isAsc ? a - b : b - a));

    this.currentGame = {
      isAsc,
      nums,
      sorted,
      chosenList: []
    };

    const instruction = isAsc
      ? 'Chhote se bada, yaani Ascending order mein lagayein!'
      : 'Bade se chhota, yaani Descending order mein lagayein!';
    this.speakNatural(instruction);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-indigo-800 bg-indigo-100 border border-indigo-300 px-3 py-1 rounded-full">
            ${isAsc ? '⬆️ Ascending (Chhota → Bada)' : '⬇️ Descending (Bada → Chhota)'}
          </span>
          <button onclick="MathsModule.resetAscDesc()" class="bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-700 btn-bounce">
            🔄 Clear
          </button>
        </div>

        <p class="text-xs font-bold text-slate-600 mb-3">
          ${isAsc ? 'Sabse chhote number se shuru karein:' : 'Sabse bade number se shuru karein:'}
        </p>

        <!-- Target Slots -->
        <div class="flex justify-center space-x-2.5 my-4">
          ${[0, 1, 2, 3].map(i => `
            <div id="slot-${i}" class="w-15 h-16 px-2 border-2 border-dashed border-indigo-400 rounded-2xl bg-indigo-50 flex items-center justify-center fun-font text-2xl text-indigo-800 shadow-inner transition-all">_</div>
          `).join('')}
        </div>

        <!-- Number Buttons -->
        <div class="flex justify-center space-x-3 mt-5" id="ascTiles">
          ${nums.map((n, idx) => `
            <button id="ascBtn-${idx}" onclick="MathsModule.pickAscDesc(this, ${n})" class="w-16 h-16 bg-gradient-to-b from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 border-2 border-b-4 border-amber-400 rounded-2xl fun-font text-2xl text-amber-950 shadow btn-bounce transition">${n}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  pickAscDesc(btn, val) {
    const s = this.currentGame;
    if (!s || s.chosenList.length >= 4) return;

    const idx = s.chosenList.length;
    if (val === s.sorted[idx]) {
      s.chosenList.push(val);
      const slot = document.getElementById(`slot-${idx}`);
      slot.innerText = val;
      slot.classList.remove('border-dashed', 'bg-indigo-50');
      slot.classList.add('border-emerald-500', 'bg-emerald-100', 'text-emerald-900', 'scale-105');

      btn.disabled = true;
      btn.classList.add('opacity-25', 'scale-90');
      App.playRewardSound();

      if (s.chosenList.length === 4) {
        this.addScore();
        App.awardStarsAndWin('Superb! Bilkul sahi order mein laga diya!');
        setTimeout(() => this.initAscDesc(), 1800);
      }
    } else {
      btn.classList.add('shake-anim', '!bg-red-200', '!border-red-500');
      this.speakNatural(
        s.isAsc
          ? 'Pehle sabse chhota number chuniye!'
          : 'Pehle sabse bada number chuniye!'
      );
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-200', '!border-red-500'), 600);
    }
  },

  resetAscDesc() {
    const s = this.currentGame;
    if (!s) return;
    s.chosenList = [];
    [0, 1, 2, 3].forEach(i => {
      const slot = document.getElementById(`slot-${i}`);
      if (slot) {
        slot.innerText = '_';
        slot.classList.add('border-dashed', 'bg-indigo-50');
        slot.classList.remove('border-emerald-500', 'bg-emerald-100', 'text-emerald-900', 'scale-105');
      }
    });
    document.querySelectorAll('#ascTiles button').forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('opacity-25', 'scale-90');
    });
  },

  // =========================================================================
  // 5. VISUAL ADDITION & SUBTRACTION (40+ Questions with Varied Items)
  // =========================================================================
  buildAddSubPool() {
    const themes = [
      { icon: '🍎', name: 'seb' },
      { icon: '🥭', name: 'aam' },
      { icon: '⭐', name: 'sitare' },
      { icon: '🎈', name: 'gubbare' },
      { icon: '🍬', name: 'toffiyan' },
      { icon: '🚗', name: 'gaadiyan' }
    ];
    const items = [];
    // 22 Addition problems
    for (let i = 0; i < 22; i++) {
      const n1 = (i % 7) + 2;      // 2 to 8
      const n2 = ((i * 2) % 6) + 1; // 1 to 6
      const t = themes[i % themes.length];
      items.push({ isPlus: true, n1, n2, ans: n1 + n2, icon: t.icon, name: t.name });
    }
    // 20 Subtraction problems
    for (let i = 0; i < 20; i++) {
      const n1 = (i % 6) + 4;      // 4 to 9
      const n2 = (i % (n1 - 1)) + 1;
      const t = themes[(i + 2) % themes.length];
      items.push({ isPlus: false, n1, n2, ans: n1 - n2, icon: t.icon, name: t.name });
    }
    return items;
  },

  initAddSub() {
    const q = this.getNextFromPool('addSub', () => this.buildAddSubPool());
    const prompt = q.isPlus
      ? `${q.n1} ${q.name} aur ${q.n2} ${q.name} milakar kitne hue?`
      : `${q.n1} ${q.name} mein se ${q.n2} nikal diye, kitne bache?`;

    this.speakNatural(prompt);

    const optsSet = new Set([q.ans]);
    while (optsSet.size < 3) {
      const candidate = q.ans + (Math.floor(Math.random() * 3) + 1) * (Math.random() > 0.5 ? 1 : -1);
      if (candidate >= 0 && candidate !== q.ans) optsSet.add(candidate);
    }
    const opts = [...optsSet].sort(() => Math.random() - 0.5);

    this.currentGame = { solved: false };

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-lg pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-rose-800 bg-rose-100 border border-rose-300 px-3 py-1 rounded-full uppercase">
            ${q.isPlus ? '➕ Addition (Jodna)' : '➖ Subtraction (Ghatana)'}
          </span>
          <button onclick="MathsModule.speakNatural('${prompt}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Suno
          </button>
        </div>

        <div class="my-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-rose-50/70 p-4 rounded-3xl border-2 border-rose-200">
          <div class="bg-white p-3 rounded-2xl border-2 border-rose-200 min-w-[95px] shadow-xs">
            <div class="text-2xl sm:text-3xl leading-snug tracking-tight">${q.icon.repeat(q.n1)}</div>
            <span class="fun-font text-lg text-rose-800 block mt-1">${q.n1}</span>
          </div>

          <span class="fun-font text-3xl text-slate-600">${q.isPlus ? '+' : '−'}</span>

          <div class="bg-white p-3 rounded-2xl border-2 border-rose-200 min-w-[95px] shadow-xs">
            <div class="text-2xl sm:text-3xl leading-snug tracking-tight">${q.icon.repeat(q.n2)}</div>
            <span class="fun-font text-lg text-rose-800 block mt-1">${q.n2}</span>
          </div>

          <span class="fun-font text-3xl text-slate-600">=</span>

          <div id="addSubSlot" class="w-16 h-16 bg-amber-100 border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-amber-700 shadow-inner">?</div>
        </div>

        <p class="text-xs font-bold text-slate-500 mb-3">Total count karke sahi number dabayein:</p>
        <div class="flex justify-center space-x-3">
          ${opts.map(o => `
            <button onclick="MathsModule.checkAddSub(this, ${o}, ${q.ans})" class="w-18 h-16 px-4 bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-2xl fun-font text-2xl shadow border-b-4 border-rose-800 btn-bounce transition">${o}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkAddSub(btn, chosen, correct) {
    if (this.currentGame.solved) return;
    if (chosen === correct) {
      this.currentGame.solved = true;
      const slot = document.getElementById('addSubSlot');
      if (slot) {
        slot.innerText = correct;
        slot.classList.remove('border-dashed', 'bg-amber-100', 'text-amber-700');
        slot.classList.add('border-emerald-500', 'bg-emerald-500', 'text-white', 'scale-110');
      }
      this.addScore();
      App.awardStarsAndWin(`Bahut khoob! Sahi jawab ${correct} hai!`);
      setTimeout(() => this.initAddSub(), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-500', '!border-red-700');
      this.speakNatural('Dobara ungli rakh kar gino, aap kar sakte hain!');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-500', '!border-red-700'), 600);
    }
  }
};