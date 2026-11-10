// Hindi Module (Swar, Vyanjan, Bubble Pop)
const HindiModule = {
  initSwar() {
    const swar = [
      { s: 'अ', w: 'अनार', e: '🍎', p: 'अ से अनार' },
      { s: 'आ', w: 'आम', e: '🥭', p: 'आ से आम' },
      { s: 'इ', w: 'इमली', e: '🌿', p: 'इ से इमली' },
      { s: 'ई', w: 'ईख', e: '🎋', p: 'ई से ईख' },
      { s: 'उ', w: 'उल्लू', e: '🦉', p: 'उ से उल्लू' },
      { s: 'ऊ', w: 'ऊन', e: '🧶', p: 'ऊ से ऊन' },
      { s: 'ऋ', w: 'ऋषि', e: '🧘', p: 'ऋ से ऋषि' },
      { s: 'ए', w: 'एड़ी', e: '🦶', p: 'ए से एड़ी' },
      { s: 'ऐ', w: 'ऐनक', e: '👓', p: 'ऐ से ऐनक' },
      { s: 'ओ', w: 'ओखली', e: '🥣', p: 'ओ से ओखली' },
      { s: 'औ', w: 'औरत', e: '👩', p: 'औ से औरत' },
      { s: 'अं', w: 'अंगूर', e: '🍇', p: 'अं से अंगूर' },
      { s: 'अः', w: 'खाली', e: '✨', p: 'अः खाली' }
    ];

    App.speak('हिंदी स्वर वर्णमाला! अक्षरों को छूकर उच्चारण सुनो!');
    const arena = document.getElementById('gameArena');
    let html = `
      <div class="w-full">
        <span class="text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full uppercase">स्वर वर्णमाला (अ से अः)</span>
        <div class="w-full max-h-[340px] overflow-y-auto grid grid-cols-3 md:grid-cols-4 gap-3 p-2 my-3">
    `;
    swar.forEach(item => {
      html += `
        <button onclick="HindiModule.playSwar('${item.s}', '${item.p}')" class="bg-orange-50 hover:bg-orange-100 border-2 border-orange-300 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-sm">
          <span class="fun-font text-4xl text-orange-600 mb-1">${item.s}</span>
          <span class="text-2xl">${item.e}</span>
          <span class="text-xs font-bold text-slate-600 mt-1">${item.w}</span>
        </button>
      `;
    });
    html += '</div></div>';
    arena.innerHTML = html;
  },

  playSwar(s, p) {
    App.playRewardSound();
    App.speak(p);
  },

  initBubble() {
    const list = [
      { target: 'अ', options: ['इ', 'अ', 'उ'], name: 'अ से अनार' },
      { target: 'आ', options: ['आ', 'ए', 'ओ'], name: 'आ से आम' },
      { target: 'इ', options: ['ई', 'उ', 'इ'], name: 'इ से इमली' },
      { target: 'क', options: ['ख', 'क', 'ग'], name: 'क से कबूतर' }
    ];
    const cur = list[Math.floor(Math.random() * list.length)];

    App.speak(`Gubbare me se ${cur.name} ko chuno!`);
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center">
        <span class="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full uppercase mb-4">🎈 Swar Bubble Pop</span>
        <p class="fun-font text-2xl text-orange-700 my-4">Dhoondo: ${cur.name} 🎈</p>
        <div class="flex space-x-4 justify-center">
          ${cur.options.map(opt => `
            <button onclick="HindiModule.popBubble(this, '${opt}', '${cur.target}', '${cur.name}')" class="w-24 h-28 bg-gradient-to-b from-pink-200 to-rose-300 border-4 border-rose-400 rounded-full fun-font text-4xl text-rose-800 shadow-lg btn-bounce flex items-center justify-center">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  popBubble(btn, chosen, target, name) {
    if (chosen === target) {
      App.awardStarsAndWin(`Superb! ${name} phod diya!`);
      setTimeout(() => this.initBubble(), 1800);
    } else {
      App.speak('Arey ye nahi hai, doosra gubbara try karein!');
      btn.classList.add('opacity-30');
    }
  }
};
