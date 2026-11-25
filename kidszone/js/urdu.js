// Urdu Module (Huroof-e-Tahajji, Nuqta Workshop)
const UrduModule = {
  initHuroof() {
    const huroof = [
      { h: 'ا', n: 'Alif', e: '🍎', p: 'Alif se Anaar' },
      { h: 'ب', n: 'Bay', e: '🐱', p: 'Bay se Billi' },
      { h: 'پ', n: 'Pay', e: '🍃', p: 'Pay se Patta' },
      { h: 'ت', n: 'Tay', e: '🦋', p: 'Tay se Titli' },
      { h: 'ٹ', n: 'Ttay', e: '🍅', p: 'Ttay se Tamatar' },
      { h: 'ث', n: 'Say', e: '🍇', p: 'Say se Samar' },
      { h: 'ج', n: 'Jeem', e: '👞', p: 'Jeem se Joota' },
      { h: 'چ', n: 'Chay', e: '🥄', p: 'Chay se Chamach' },
      { h: 'ح', n: 'Badi Hey', e: '🧖', p: 'Hey se Halwa' },
      { h: 'خ', n: 'Khay', e: '🍈', p: 'Khay se Kharbooza' },
      { h: 'د', n: 'Daal', e: '🌲', p: 'Daal se Darakht' },
      { h: 'ڈ', n: 'Ddaal', e: '🥁', p: 'Ddaal se Dhol' },
      { h: 'ر', n: 'Ray', e: '🚂', p: 'Ray se Rail' },
      { h: 'ز', n: 'Zay', e: '🦓', p: 'Zay se Zabra' },
      { h: 'س', n: 'Seen', e: '🍎', p: 'Seen se Saib' },
      { h: 'ش', n: 'Sheen', e: '🦁', p: 'Sheen se Sher' },
      { h: 'م', n: 'Meem', e: '🥭', p: 'Meem se Maangoo' },
      { h: 'ن', n: 'Noon', e: '💧', p: 'Noon se Nal' }
    ];

    App.speak('Urdu huroof! Kisi bhi harf ko tap karke aawaz suno!');
    const arena = document.getElementById('gameArena');
    let html = `
      <div class="w-full" dir="rtl">
        <div class="text-right mb-2">
          <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">حروفِ تہجی</span>
        </div>
        <div class="w-full max-h-[340px] overflow-y-auto grid grid-cols-3 md:grid-cols-4 gap-3 p-2">
    `;
    huroof.forEach(item => {
      html += `
        <button onclick="UrduModule.playUrdu('${item.h}', '${item.p}')" class="bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-sm">
          <span class="fun-font text-4xl text-emerald-800 leading-none mb-1">${item.h}</span>
          <span class="text-2xl">${item.e}</span>
          <span class="text-xs font-bold text-slate-600 mt-1">${item.n}</span>
        </button>
      `;
    });
    html += '</div></div>';
    arena.innerHTML = html;
  },

  playUrdu(h, phrase) {
    App.playRewardSound();
    App.speak(phrase);
  },

  initNuqta() {
    const nuqtaLevels = [
      { base: 'ٮ', letter: 'ب', dots: 1, pos: 'bottom', msg: 'Bay ke neeche 1 nuqta lagayein' },
      { base: 'ٮ', letter: 'پ', dots: 3, pos: 'bottom', msg: 'Pay ke neeche 3 nuqte lagayein' },
      { base: 'ٮ', letter: 'ت', dots: 2, pos: 'top', msg: 'Tay ke upar 2 nuqte lagayein' },
      { base: 'ح', letter: 'ج', dots: 1, pos: 'inside', msg: 'Jeem ke pet me 1 nuqta lagayein' }
    ];
    const lvl = nuqtaLevels[Math.floor(Math.random() * nuqtaLevels.length)];

    App.speak(lvl.msg);
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="flex flex-col items-center text-center">
        <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase mb-4">نقطہ ورکشاپ</span>
        <div class="bg-emerald-50 border-4 border-emerald-400 rounded-3xl p-6 w-56 flex flex-col items-center justify-center shadow-inner relative">
          <div id="topSlot" class="h-8 flex space-x-1 items-center justify-center"></div>
          <span class="fun-font text-8xl text-emerald-900 leading-none select-none">${lvl.base}</span>
          <div id="bottomSlot" class="h-8 flex space-x-1 items-center justify-center mt-2"></div>
        </div>
        <p class="text-xs font-bold text-slate-500 my-4">${lvl.msg}</p>
        <button onclick="UrduModule.dropNuqta('${lvl.pos}', ${lvl.dots}, '${lvl.letter}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-2xl fun-font text-base shadow btn-bounce">Nuqta Lagao ⚫</button>
      </div>
    `;
  },

  dropNuqta(pos, dots, letter) {
    const target = pos === 'top' ? document.getElementById('topSlot') : document.getElementById('bottomSlot');
    target.innerHTML = '';
    for (let i = 0; i < dots; i++) {
      target.innerHTML += '<span class="w-5 h-5 bg-slate-900 rounded-full inline-block mx-0.5"></span>';
    }
    App.awardStarsAndWin(`Wah! ${letter} mukammal (complete) ho gaya!`);
    setTimeout(() => this.initNuqta(), 2200);
  }
};
