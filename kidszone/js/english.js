// English Module (A-Z Phonics, 24x 3-Letter Words, 22x 4-Letter Words A-Z, Missing Alphabets, Before & After)
const EnglishModule = {
  streak: 0,
  queues: {},
  currentGame: null,

  // 1. Complete A to Z Phonics Data
  alphabetData: [
    { l: 'A', w: 'Apple', e: '🍎', p: 'A for Apple', type: 'Vowel' },
    { l: 'B', w: 'Ball', e: '⚽', p: 'B for Ball', type: 'Consonant' },
    { l: 'C', w: 'Cat', e: '🐱', p: 'C for Cat', type: 'Consonant' },
    { l: 'D', w: 'Duck', e: '🦆', p: 'D for Duck', type: 'Consonant' },
    { l: 'E', w: 'Elephant', e: '🐘', p: 'E for Elephant', type: 'Vowel' },
    { l: 'F', w: 'Fish', e: '🐟', p: 'F for Fish', type: 'Consonant' },
    { l: 'G', w: 'Grapes', e: '🍇', p: 'G for Grapes', type: 'Consonant' },
    { l: 'H', w: 'Hat', e: '🎩', p: 'H for Hat', type: 'Consonant' },
    { l: 'I', w: 'Ice Cream', e: '🍦', p: 'I for Ice Cream', type: 'Vowel' },
    { l: 'J', w: 'Jug', e: '🏺', p: 'J for Jug', type: 'Consonant' },
    { l: 'K', w: 'Kite', e: '🪁', p: 'K for Kite', type: 'Consonant' },
    { l: 'L', w: 'Lion', e: '🦁', p: 'L for Lion', type: 'Consonant' },
    { l: 'M', w: 'Monkey', e: '🐵', p: 'M for Monkey', type: 'Consonant' },
    { l: 'N', w: 'Nest', e: '🪺', p: 'N for Nest', type: 'Consonant' },
    { l: 'O', w: 'Orange', e: '🍊', p: 'O for Orange', type: 'Vowel' },
    { l: 'P', w: 'Parrot', e: '🦜', p: 'P for Parrot', type: 'Consonant' },
    { l: 'Q', w: 'Queen', e: '👑', p: 'Q for Queen', type: 'Consonant' },
    { l: 'R', w: 'Rocket', e: '🚀', p: 'R for Rocket', type: 'Consonant' },
    { l: 'S', w: 'Sun', e: '☀️', p: 'S for Sun', type: 'Consonant' },
    { l: 'T', w: 'Tiger', e: '🐯', p: 'T for Tiger', type: 'Consonant' },
    { l: 'U', w: 'Umbrella', e: '☂️', p: 'U for Umbrella', type: 'Vowel' },
    { l: 'V', w: 'Van', e: '🚐', p: 'V for Van', type: 'Consonant' },
    { l: 'W', w: 'Watch', e: '⌚', p: 'W for Watch', type: 'Consonant' },
    { l: 'X', w: 'Xylophone', e: '🎵', p: 'X for Xylophone', type: 'Consonant' },
    { l: 'Y', w: 'Yo-Yo', e: '🪀', p: 'Y for Yo Yo', type: 'Consonant' },
    { l: 'Z', w: 'Zebra', e: '🦓', p: 'Z for Zebra', type: 'Consonant' }
  ],

  // 2. 24 Three-Letter Words Pool (CVC & Sight Words)
  words3Pool: [
    { w: 'CAT', img: '🐱', hint: 'Meow bolti hai' },
    { w: 'DOG', img: '🐶', hint: 'Wafadar jaanwar' },
    { w: 'SUN', img: '☀️', hint: 'Din mein chamakta hai' },
    { w: 'BUS', img: '🚌', hint: 'School le jati hai' },
    { w: 'BAT', img: '🦇', hint: 'Raat ko udta hai' },
    { w: 'HAT', img: '🎩', hint: 'Sir par pehente hain' },
    { w: 'CUP', img: '☕', hint: 'Chai ya doodh peete hain' },
    { w: 'PEN', img: '🖊️', hint: 'Likhne ke kaam aata hai' },
    { w: 'HEN', img: '🐔', hint: 'Anda deti hai' },
    { w: 'PIG', img: '🐷', hint: 'Pink color ka animal' },
    { w: 'COW', img: '🐮', hint: 'Meetha doodh deti hai' },
    { w: 'OWL', img: '🦉', hint: 'Badi aankhon wala bird' },
    { w: 'BEE', img: '🐝', hint: 'Shehad (Honey) banati hai' },
    { w: 'ANT', img: '🐜', hint: 'Chhoti si mehnati cheenti' },
    { w: 'CAR', img: '🚗', hint: '4 wheels wali gaadi' },
    { w: 'BOX', img: '📦', hint: 'Samaan rakhne ka dibba' },
    { w: 'FOX', img: '🦊', hint: 'Chalaak lomdi' },
    { w: 'BED', img: '🛏️', hint: 'Raat ko sote hain' },
    { w: 'KEY', img: '🔑', hint: 'Taala kholti hai' },
    { w: 'NET', img: '🥅', hint: 'Jaal (Net)' },
    { w: 'JAM', img: '🍓', hint: 'Bread par lagate hain' },
    { w: 'VAN', img: '🚐', hint: 'Badi gaadi' },
    { w: 'WEB', img: '🕸️', hint: 'Makdi ka jaala' },
    { w: 'MAP', img: '🗺️', hint: 'Rasta dikhata hai' }
  ],

  // 3. 22 Four-Letter Words Pool (Covering A to Z)
  words4Pool: [
    { w: 'ANTS', img: '🐜', hint: 'A - Chhoti cheentiyan' },
    { w: 'BALL', img: '⚽', hint: 'B - Khelne ki gend' },
    { w: 'CAKE', img: '🎂', hint: 'C - Birthday par kat-te hain' },
    { w: 'DUCK', img: '🦆', hint: 'D - Paani mein tairti hai' },
    { w: 'EYES', img: '👀', hint: 'E - Inse hum dekhte hain' },
    { w: 'FISH', img: '🐟', hint: 'F - Paani ki rani' },
    { w: 'GOAT', img: '🐐', hint: 'G - Bakri' },
    { w: 'HAND', img: '✋', hint: 'H - Hamara haath' },
    { w: 'IRON', img: '🧺', hint: 'I - Kapde press karte hain' },
    { w: 'JEEP', img: '🚙', hint: 'J - Jungle safari gaadi' },
    { w: 'KITE', img: '🪁', hint: 'K - Aasman mein udti patang' },
    { w: 'LION', img: '🦁', hint: 'L - Jungle ka raja' },
    { w: 'MOON', img: '🌙', hint: 'M - Raat ka chaand' },
    { w: 'NEST', img: '🪺', hint: 'N - Chidiya ka ghosla' },
    { w: 'OVEN', img: '♨️', hint: 'O - Khana garam karta hai' },
    { w: 'PEAR', img: '🍐', hint: 'P - Nashpati phal' },
    { w: 'RAIN', img: '🌧️', hint: 'R - Baarish ki boondein' },
    { w: 'STAR', img: '⭐', hint: 'S - Chamakta sitara' },
    { w: 'TREE', img: '🌳', hint: 'T - Hara bhara ped' },
    { w: 'WOLF', img: '🐺', hint: 'W - Bhediya' },
    { w: 'YARN', img: '🧶', hint: 'Y - Oon ka gola' },
    { w: 'ZERO', img: '0️⃣', hint: 'Z - Shunya (0)' }
  ],

  // Switch Mode & Highlight Active Tab
  switchMode(mode) {
    document.querySelectorAll('.eng-tab').forEach(btn => btn.classList.remove('tab-active'));
    const activeTab = document.getElementById(`tab-${mode}`);
    if (activeTab) activeTab.classList.add('tab-active');

    if (mode === 'alphabet') this.initAlphabet();
    else if (mode === 'words3') this.initWordBuilder(3);
    else if (mode === 'words4') this.initWordBuilder(4);
    else if (mode === 'missing') this.initMissingLetter();
    else if (mode === 'beforeAfter') this.initBeforeAfter();
  },

  // Non-repeating shuffled item picker
  getNextFromPool(poolKey, sourceArray) {
    if (!this.queues[poolKey] || this.queues[poolKey].length === 0) {
      this.queues[poolKey] = [...sourceArray].sort(() => Math.random() - 0.5);
    }
    return this.queues[poolKey].pop();
  },

  updateStreak(increment = true) {
    if (increment) this.streak++;
    const el = document.getElementById('englishStreak');
    if (el) el.innerText = this.streak;
  },

  // ==========================================
  // MODE 1: A to Z Phonics Board
  // ==========================================
  initAlphabet() {
    App.speak('A to Z Alphabet! Kisi bhi letter ko tap karke uski awaaz suno!');
    const arena = document.getElementById('gameArena');
    let html = `
      <div class="w-full pop-in">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full uppercase">🔤 A to Z Phonics Board</span>
          <div class="flex items-center gap-2 text-[11px] font-bold">
            <span class="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-300">★ Vowel (A,E,I,O,U)</span>
            <span class="bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">Consonant</span>
          </div>
        </div>
        <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 p-1.5">
    `;

    this.alphabetData.forEach(item => {
      const isVowel = item.type === 'Vowel';
      const cardStyle = isVowel
        ? 'bg-gradient-to-b from-amber-50 to-amber-100/80 border-amber-400 hover:bg-amber-100'
        : 'bg-gradient-to-b from-white to-rose-50 border-rose-200 hover:bg-rose-100';
      const letterColor = isVowel ? 'text-amber-600' : 'text-rose-600';

      html += `
        <button onclick="EnglishModule.playLetter('${item.l}', '${item.p}')" class="${cardStyle} border-2 rounded-2xl p-2.5 flex flex-col items-center justify-center btn-bounce shadow-sm relative transition">
          ${isVowel ? '<span class="absolute top-1 right-1.5 text-[10px] text-amber-500 font-black">★</span>' : ''}
          <span class="fun-font text-3xl ${letterColor} leading-none">${item.l}</span>
          <span class="text-3xl my-1.5">${item.e}</span>
          <span class="text-xs font-extrabold text-slate-700 tracking-wide">${item.w}</span>
        </button>
      `;
    });

    html += '</div></div>';
    arena.innerHTML = html;
  },

  playLetter(l, phrase) {
    App.playRewardSound();
    App.speak(phrase);
  },

  // ==========================================
  // MODE 2 & 3: 3-Letter & 4-Letter Word Builder
  // ==========================================
  initWordBuilder(length) {
    const pool = length === 3 ? this.words3Pool : this.words4Pool;
    const item = this.getNextFromPool(`words${length}`, pool);
    const letters = item.w.split('');
    const scrambled = [...letters].sort(() => Math.random() - 0.5);

    // Ensure scrambled order is not identical to target word
    if (scrambled.join('') === item.w) {
      scrambled.reverse();
    }

    this.currentGame = {
      type: 'builder',
      length,
      target: item.w,
      letters,
      placed: [],
      pickedBtns: []
    };

    const badgeColor = length === 3 ? 'text-amber-800 bg-amber-100 border-amber-300' : 'text-sky-800 bg-sky-100 border-sky-300';
    const slotStyle = length === 3 ? 'border-amber-400 bg-amber-50 text-amber-800' : 'border-sky-400 bg-sky-50 text-sky-800';
    const tileStyle = length === 3
      ? 'bg-gradient-to-b from-amber-200 to-amber-300 border-amber-500 text-amber-950'
      : 'bg-gradient-to-b from-sky-200 to-sky-300 border-sky-500 text-sky-950';

    App.speak(`Spell the word ${item.w}!`);
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full max-w-md text-center flex flex-col items-center pop-in">
        <div class="w-full flex items-center justify-between mb-3">
          <span class="text-xs font-bold ${badgeColor} border px-3 py-1 rounded-full uppercase">
            ${length === 3 ? '🧩 3-Letter Word Builder' : '🚀 4-Letter Word (A-Z)'}
          </span>
          <div class="flex gap-2">
            <button onclick="App.speak('${item.w}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
              🔊 Suno
            </button>
            <button onclick="EnglishModule.resetBuilderSlots()" class="bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-700 btn-bounce">
              🔄 Clear
            </button>
          </div>
        </div>

        <!-- Picture & Hint Card -->
        <div class="bg-white border-2 border-slate-200 rounded-3xl px-8 py-4 shadow-sm mb-4">
          <div class="text-7xl mb-1">${item.img}</div>
          <p class="text-xs font-bold text-slate-500">${item.hint}</p>
        </div>

        <!-- Answer Slots -->
        <div class="flex justify-center gap-2.5 mb-5" id="slotsContainer">
          ${letters.map((_, i) => `
            <div id="wslot-${i}" class="w-14 h-16 md:w-16 md:h-18 border-4 border-dashed ${slotStyle} rounded-2xl flex items-center justify-center fun-font text-3xl shadow-inner transition-all">_</div>
          `).join('')}
        </div>

        <p class="text-xs font-bold text-slate-500 mb-2.5">Sahi order mein letters par tap karein:</p>
        
        <!-- Letter Tiles -->
        <div class="flex justify-center gap-3 flex-wrap" id="tilesContainer">
          ${scrambled.map((char, idx) => `
            <button id="wtile-${idx}" onclick="EnglishModule.pickBuilderChar(${idx}, '${char}')" class="w-14 h-14 md:w-16 md:h-16 ${tileStyle} border-b-4 border-2 rounded-2xl fun-font text-2xl md:text-3xl shadow-md btn-bounce transition">
              ${char}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  pickBuilderChar(tileIdx, char) {
    const g = this.currentGame;
    if (!g || g.placed.length >= g.letters.length) return;

    const slotIdx = g.placed.length;
    const slotEl = document.getElementById(`wslot-${slotIdx}`);
    const tileEl = document.getElementById(`wtile-${tileIdx}`);

    slotEl.innerText = char;
    slotEl.classList.remove('border-dashed');
    slotEl.classList.add('scale-105', 'bg-white');

    tileEl.disabled = true;
    tileEl.classList.add('opacity-25', 'scale-90');

    g.placed.push(char);
    g.pickedBtns.push(tileIdx);

    App.playRewardSound();
    App.speak(char);

    if (g.placed.length === g.letters.length) {
      const formed = g.placed.join('');
      if (formed === g.target) {
        document.querySelectorAll('#slotsContainer > div').forEach(el => {
          el.classList.add('border-emerald-500', 'bg-emerald-100', 'text-emerald-800');
        });
        this.updateStreak(true);
        App.awardStarsAndWin(`Shabash! ${g.target} bilkul sahi spelling hai!`);
        setTimeout(() => this.initWordBuilder(g.length), 1800);
      } else {
        const container = document.getElementById('slotsContainer');
        container.classList.add('shake-anim');
        document.querySelectorAll('#slotsContainer > div').forEach(el => {
          el.classList.add('border-red-400', 'bg-red-50', 'text-red-600');
        });
        App.speak('Oops! Galat spelling, dobara koshish karein!');
        setTimeout(() => this.resetBuilderSlots(), 1000);
      }
    }
  },

  resetBuilderSlots() {
    const g = this.currentGame;
    if (!g) return;
    g.placed = [];
    g.pickedBtns = [];

    const container = document.getElementById('slotsContainer');
    if (container) container.classList.remove('shake-anim');

    g.letters.forEach((_, i) => {
      const slot = document.getElementById(`wslot-${i}`);
      if (slot) {
        slot.innerText = '_';
        slot.classList.add('border-dashed');
        slot.classList.remove('scale-105', 'bg-white', 'border-red-400', 'bg-red-50', 'text-red-600', 'border-emerald-500', 'bg-emerald-100', 'text-emerald-800');
      }
    });

    document.querySelectorAll('#tilesContainer button').forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('opacity-25', 'scale-90');
    });
  },

  // ==========================================
  // MODE 4: Missing Alphabets (3-Letter Words)
  // ==========================================
  initMissingLetter() {
    const item = this.getNextFromPool('missing3', this.words3Pool);
    const letters = item.w.split('');
    const missingIdx = Math.floor(Math.random() * 3); // 0, 1, or 2
    const correctChar = letters[missingIdx];

    // Generate 3 distinct distractor letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const distractors = alphabet
      .filter(c => c !== correctChar)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [correctChar, ...distractors].sort(() => Math.random() - 0.5);

    this.currentGame = {
      type: 'missing',
      word: item.w,
      missingIdx,
      correctChar,
      solved: false
    };

    App.speak(`Word ${item.w} mein missing letter kaunsa hai?`);
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full max-w-md text-center flex flex-col items-center pop-in">
        <div class="w-full flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-purple-800 bg-purple-100 border border-purple-300 px-3 py-1 rounded-full uppercase">
            ❓ Missing Alphabet (3-Letter)
          </span>
          <button onclick="App.speak('${item.w}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Word Suno
          </button>
        </div>

        <div class="bg-white border-2 border-purple-200 rounded-3xl px-8 py-4 shadow-sm mb-5">
          <div class="text-7xl mb-1">${item.img}</div>
          <p class="text-xs font-bold text-slate-500">${item.hint}</p>
        </div>

        <!-- Word with Blank -->
        <div class="flex justify-center gap-3 mb-6" id="missingWordRow">
          ${letters.map((ch, idx) => {
            if (idx === missingIdx) {
              return `<div id="missingBlankBox" class="w-16 h-18 border-4 border-dashed border-purple-500 bg-purple-50 rounded-2xl flex items-center justify-center fun-font text-4xl text-purple-700 shadow-inner">?</div>`;
            }
            return `<div class="w-16 h-18 border-2 border-slate-300 bg-white rounded-2xl flex items-center justify-center fun-font text-4xl text-slate-800 shadow-sm">${ch}</div>`;
          }).join('')}
        </div>

        <p class="text-xs font-bold text-slate-500 mb-3">Neeche se sahi letter chunein:</p>
        <div class="grid grid-cols-4 gap-3 w-full max-w-xs">
          ${options.map(opt => `
            <button onclick="EnglishModule.checkMissingOption(this, '${opt}')" class="h-16 bg-gradient-to-b from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 border-2 border-b-4 border-purple-400 rounded-2xl fun-font text-3xl text-purple-900 shadow btn-bounce transition">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkMissingOption(btn, chosen) {
    const g = this.currentGame;
    if (!g || g.solved) return;

    if (chosen === g.correctChar) {
      g.solved = true;
      const blankBox = document.getElementById('missingBlankBox');
      blankBox.innerText = chosen;
      blankBox.classList.remove('border-dashed', 'border-purple-500', 'bg-purple-50', 'text-purple-700');
      blankBox.classList.add('border-emerald-500', 'bg-emerald-100', 'text-emerald-800', 'scale-110');

      btn.classList.add('!bg-emerald-400', '!border-emerald-600', '!text-white');
      this.updateStreak(true);
      App.awardStarsAndWin(`Zabardast! ${g.word} complete ho gaya!`);
      setTimeout(() => this.initMissingLetter(), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700');
      App.speak(`${chosen} galat hai, dobara sochein!`);
      setTimeout(() => {
        btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700');
      }, 600);
    }
  },

  // ==========================================
  // MODE 5: Before & After (Alphabet Fill in the Blanks)
  // ==========================================
  initBeforeAfter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    // Pick a middle index (1 to 24) so it always has both a valid Before (idx-1) and After (idx+1)
    const midIdx = Math.floor(Math.random() * 24) + 1;
    const trio = [alphabet[midIdx - 1], alphabet[midIdx], alphabet[midIdx + 1]];

    // Mode types: 0 = Before (_ B C), 1 = Between (A _ C), 2 = After (A B _)
    const blankPos = Math.floor(Math.random() * 3);
    const correctChar = trio[blankPos];
    const modeLabels = ['Before Letter (Pehle kya aayega?)', 'Between Letter (Beech mein kya aayega?)', 'After Letter (Baad mein kya aayega?)'];

    const distractors = alphabet
      .filter(c => c !== correctChar && !trio.includes(c))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [correctChar, ...distractors].sort(() => Math.random() - 0.5);

    this.currentGame = {
      type: 'beforeAfter',
      trio,
      blankPos,
      correctChar,
      solved: false
    };

    App.speak(modeLabels[blankPos]);
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full max-w-md text-center flex flex-col items-center pop-in">
        <div class="w-full flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full uppercase">
            🚂 Before & After Blanks
          </span>
          <button onclick="App.speak('${modeLabels[blankPos]}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">
            🔊 Sawal Suno
          </button>
        </div>

        <p class="fun-font text-base md:text-lg text-slate-700 mb-5">${modeLabels[blankPos]}</p>

        <!-- Alphabet Train Coaches -->
        <div class="flex items-center justify-center gap-2 sm:gap-3 mb-7 bg-emerald-50/70 p-4 rounded-3xl border-2 border-emerald-200 w-full">
          <span class="text-3xl sm:text-4xl">🚂</span>
          ${trio.map((ch, idx) => {
            const connector = idx > 0 ? `<span class="text-emerald-400 font-black text-xl">-</span>` : '';
            if (idx === blankPos) {
              return `
                ${connector}
                <div id="baBlankBox" class="w-16 h-20 sm:w-20 sm:h-22 border-4 border-dashed border-emerald-500 bg-white rounded-2xl flex items-center justify-center fun-font text-4xl text-emerald-600 shadow-inner">
                  ?
                </div>
              `;
            }
            return `
              ${connector}
              <div class="w-16 h-20 sm:w-20 sm:h-22 border-2 border-b-4 border-emerald-400 bg-gradient-to-b from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center fun-font text-4xl text-emerald-950 shadow">
                ${ch}
              </div>
            `;
          }).join('')}
        </div>

        <p class="text-xs font-bold text-slate-500 mb-3">Train ka dibba poora karne ke liye letter tap karein:</p>
        <div class="grid grid-cols-4 gap-3 w-full max-w-xs">
          ${options.map(opt => `
            <button onclick="EnglishModule.checkBeforeAfter(this, '${opt}')" class="h-16 bg-gradient-to-b from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 border-2 border-b-4 border-amber-400 rounded-2xl fun-font text-3xl text-amber-950 shadow btn-bounce transition">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkBeforeAfter(btn, chosen) {
    const g = this.currentGame;
    if (!g || g.solved) return;

    if (chosen === g.correctChar) {
      g.solved = true;
      const blankBox = document.getElementById('baBlankBox');
      blankBox.innerText = chosen;
      blankBox.classList.remove('border-dashed', 'border-emerald-500', 'text-emerald-600');
      blankBox.classList.add('border-emerald-600', 'bg-emerald-500', 'text-white', 'scale-110');

      btn.classList.add('!bg-emerald-500', '!border-emerald-700', '!text-white');
      this.updateStreak(true);
      App.awardStarsAndWin(`Bilkul sahi! ${g.trio.join(', ')}!`);
      setTimeout(() => this.initBeforeAfter(), 1700);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700');
      App.speak('Yeh sahi letter nahi hai, A B C D padh kar dekhein!');
      setTimeout(() => {
        btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700');
      }, 600);
    }
  }
};