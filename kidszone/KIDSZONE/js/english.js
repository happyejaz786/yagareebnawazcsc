// English Module (Alphabet, Phonics, Tracing, 3-Letter Words)
const EnglishModule = {
  initAlphabet() {
    const letters = [
      { l: 'A', w: 'Apple', e: '🍎', p: 'A for Apple' },
      { l: 'B', w: 'Ball', e: '⚽', p: 'B for Ball' },
      { l: 'C', w: 'Cat', e: '🐱', p: 'C for Cat' },
      { l: 'D', w: 'Duck', e: '🦆', p: 'D for Duck' },
      { l: 'E', w: 'Elephant', e: '🐘', p: 'E for Elephant' },
      { l: 'F', w: 'Fish', e: '🐟', p: 'F for Fish' },
      { l: 'G', w: 'Grapes', e: '🍇', p: 'G for Grapes' },
      { l: 'H', w: 'Hat', e: '🎩', p: 'H for Hat' },
      { l: 'I', w: 'Ice Cream', e: '🍦', p: 'I for Ice Cream' },
      { l: 'J', w: 'Jug', e: '🏺', p: 'J for Jug' },
      { l: 'K', w: 'Kite', e: '🪁', p: 'K for Kite' },
      { l: 'L', w: 'Lion', e: '🦁', p: 'L for Lion' },
      { l: 'M', w: 'Monkey', e: '🐵', p: 'M for Monkey' },
      { l: 'N', w: 'Nest', e: '🪺', p: 'N for Nest' },
      { l: 'O', w: 'Orange', e: '🍊', p: 'O for Orange' },
      { l: 'P', w: 'Parrot', e: '🦜', p: 'P for Parrot' },
      { l: 'Q', w: 'Queen', e: '👑', p: 'Q for Queen' },
      { l: 'R', w: 'Rocket', e: '🚀', p: 'R for Rocket' },
      { l: 'S', w: 'Sun', e: '☀️', p: 'S for Sun' },
      { l: 'T', w: 'Tiger', e: '🐯', p: 'T for Tiger' },
      { l: 'U', w: 'Umbrella', e: '☂️', p: 'U for Umbrella' },
      { l: 'V', w: 'Van', e: '🚐', p: 'V for Van' },
      { l: 'W', w: 'Watch', e: '⌚', p: 'W for Watch' },
      { l: 'X', w: 'Xylophone', e: '🎵', p: 'X for Xylophone' },
      { l: 'Y', w: 'Yo-Yo', e: '🪀', p: 'Y for Yo Yo' },
      { l: 'Z', w: 'Zebra', e: '🦓', p: 'Z for Zebra' }
    ];

    App.speak('A to Z Alphabet! Kisi bhi letter ko chhoo kar suno!');
    const arena = document.getElementById('gameArena');
    let html = `
      <div class="w-full">
        <span class="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full uppercase">🔤 Alphabet & Phonics</span>
        <div class="w-full max-h-[340px] overflow-y-auto grid grid-cols-3 md:grid-cols-4 gap-3 p-2 my-3">
    `;
    letters.forEach(item => {
      html += `
        <button onclick="EnglishModule.playLetter('${item.l}', '${item.p}')" class="bg-rose-50 hover:bg-rose-100 border-2 border-rose-300 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-sm">
          <span class="fun-font text-3xl text-rose-600">${item.l}</span>
          <span class="text-2xl my-1">${item.e}</span>
          <span class="text-xs font-bold text-slate-600">${item.w}</span>
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

  initWords() {
    const words = [
      { w: 'CAT', img: '🐱', letters: ['C', 'A', 'T'] },
      { w: 'SUN', img: '☀️', letters: ['S', 'U', 'N'] },
      { w: 'DOG', img: '🐶', letters: ['D', 'O', 'G'] },
      { w: 'BUS', img: '🚌', letters: ['B', 'U', 'S'] }
    ];
    const target = words[Math.floor(Math.random() * words.length)];
    let placed = [];

    App.speak(`Spell karo word ${target.w}!`);
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center flex flex-col items-center">
        <span class="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full uppercase mb-4">3-Letter Word Builder</span>
        <div class="text-7xl mb-2">${target.img}</div>
        <div class="flex space-x-3 mb-6" id="slotsContainer">
          ${target.letters.map((_, i) => `
            <div id="wslot-${i}" class="w-14 h-16 border-4 border-dashed border-rose-400 bg-rose-50 rounded-2xl flex items-center justify-center fun-font text-3xl text-rose-700">_</div>
          `).join('')}
        </div>
        <p class="text-xs font-bold text-slate-500 mb-3">Letters tap karein:</p>
        <div class="flex space-x-3">
          ${[...target.letters].sort(() => Math.random() - 0.5).map(char => `
            <button onclick="EnglishModule.pickChar(this, '${char}', '${target.w}')" class="w-14 h-14 bg-rose-200 hover:bg-rose-300 border-2 border-rose-400 rounded-2xl fun-font text-2xl text-rose-800 shadow btn-bounce">${char}</button>
          `).join('')}
        </div>
      </div>
    `;

    EnglishModule.wordState = { target: target.w, letters: target.letters, placed: [] };
  },

  pickChar(btn, char, targetWord) {
    const s = EnglishModule.wordState;
    if (s.placed.length < s.letters.length) {
      const idx = s.placed.length;
      document.getElementById(`wslot-${idx}`).innerText = char;
      s.placed.push(char);
      btn.disabled = true;
      btn.classList.add('opacity-30');
      App.playRewardSound();
      App.speak(char);

      if (s.placed.length === s.letters.length) {
        if (s.placed.join('') === targetWord) {
          App.awardStarsAndWin(`Superb! ${targetWord} mukammal (complete) ho gaya!`);
          setTimeout(() => this.initWords(), 2000);
        } else {
          App.speak('Arey spelling galat ho gayi, dobara try karein!');
          setTimeout(() => this.initWords(), 1500);
        }
      }
    }
  }
};
