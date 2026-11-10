// General Knowledge Module
const GkModule = {
  initDaysTrain() {
    const days = [
      { en: 'Sunday', hi: 'Itwar (Ravivar)', icon: '☀️' },
      { en: 'Monday', hi: 'Somwar', icon: '🌙' },
      { en: 'Tuesday', hi: 'Mangalwar', icon: '🔥' },
      { en: 'Wednesday', hi: 'Budhwar', icon: '🌳' },
      { en: 'Thursday', hi: 'Jumerat (Guruwar)', icon: '⭐' },
      { en: 'Friday', hi: 'Juma (Shukrawar)', icon: '🕌' },
      { en: 'Saturday', hi: 'Hafta (Shaniwar)', icon: '🎉' }
    ];

    App.speak('Days of the week train! Dabbe par tap karke din ka naam sunein!');
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full">
        <span class="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase">🚂 7 Dino Ki Gaadi</span>
        <div class="flex overflow-x-auto space-x-3 p-3 my-5">
          ${days.map((d, i) => `
            <div onclick="GkModule.playDayAudio('${d.en}', '${d.hi}')" class="min-w-[130px] bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 rounded-3xl p-3 flex flex-col items-center justify-center cursor-pointer btn-bounce shadow-sm">
              <span class="text-3xl mb-1">${d.icon}</span>
              <span class="fun-font text-base text-purple-900">${d.en}</span>
              <span class="text-xs font-bold text-slate-500 mt-0.5">${d.hi}</span>
              <span class="text-[10px] bg-purple-200 text-purple-800 font-bold px-2 py-0.5 rounded-full mt-2">Day ${i + 1}</span>
            </div>
          `).join('')}
        </div>
        <p class="text-xs font-bold text-slate-500">Tap karke seekhein har din ka naam!</p>
      </div>
    `;
  },

  playDayAudio(en, hi) {
    App.playRewardSound();
    App.speak(`Today is ${en}! Yani ${hi}!`);
  },

  initMonths() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const target = months[Math.floor(Math.random() * months.length)];
    const opts = [target];
    while (opts.length < 3) {
      const m = months[Math.floor(Math.random() * months.length)];
      if (!opts.includes(m)) opts.push(m);
    }
    opts.sort(() => Math.random() - 0.5);

    App.speak(`Dhoondo mahina: ${target}!`);
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md">
        <span class="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full uppercase">🗓️ 12 Mahine</span>
        <h3 class="fun-font text-2xl text-indigo-900 my-4">Dhoondo: ${target}</h3>
        <div class="grid grid-cols-1 gap-3">
          ${opts.map(m => `
            <button onclick="GkModule.checkMonth('${m}', '${target}')" class="w-full py-3 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-300 rounded-2xl fun-font text-xl text-indigo-800 shadow btn-bounce">📅 ${m}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkMonth(chosen, target) {
    if (chosen === target) {
      App.awardStarsAndWin(`Shabash! Ye mahina ${target} hi hai!`);
      setTimeout(() => this.initMonths(), 1800);
    } else {
      App.speak('Arey ye doosra mahina hai, dobara dekhein!');
    }
  },

  initFruits() {
    const fruits = [
      { name: 'Aam (Mango)', icon: '🥭', desc: 'Falon ka raja aam!' },
      { name: 'Seb (Apple)', icon: '🍎', desc: 'Laal meetha seb!' },
      { name: 'Kela (Banana)', icon: '🍌', desc: 'Taqatwar kela!' },
      { name: 'Angoor (Grapes)', icon: '🍇', desc: 'Rasbhare angoor!' },
      { name: 'Tarbooz (Watermelon)', icon: '🍉', desc: 'Thanda meetha tarbooz!' },
      { name: 'Santara (Orange)', icon: '🍊', desc: 'Khatta meetha santara!' }
    ];
    const target = fruits[Math.floor(Math.random() * fruits.length)];
    App.speak(`Pehchano: ${target.name} kaunsa hai?`);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md">
        <span class="text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full uppercase">🍓 Phal (Fruits)</span>
        <p class="fun-font text-2xl text-orange-900 my-4">Dhoondo: ${target.name}</p>
        <div class="grid grid-cols-3 gap-3">
          ${fruits.map(f => `
            <button onclick="GkModule.checkFruit('${f.name}', '${target.name}', '${f.desc}')" class="bg-orange-50 hover:bg-orange-100 border-2 border-orange-300 rounded-3xl p-4 flex flex-col items-center justify-center btn-bounce shadow-sm">
              <span class="text-5xl mb-1">${f.icon}</span>
              <span class="text-xs font-bold text-slate-700">${f.name.split(' ')[0]}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkFruit(chosen, target, desc) {
    if (chosen === target) {
      App.awardStarsAndWin(`Superb! ${desc}`);
      setTimeout(() => this.initFruits(), 2000);
    } else {
      App.speak('Arey ye doosra fal hai dost, dobara chuno!');
    }
  },

  initVeggies() {
    const veggies = [
      { name: 'Aloo (Potato)', icon: '🥔' },
      { name: 'Tamatar (Tomato)', icon: '🍅' },
      { name: 'Gajar (Carrot)', icon: '🥕' },
      { name: 'Gobhi (Broccoli)', icon: '🥦' },
      { name: 'Bhutta (Corn)', icon: '🌽' },
      { name: 'Matar (Peas)', icon: '🫛' }
    ];
    const target = veggies[Math.floor(Math.random() * veggies.length)];
    App.speak(`Kaunsi sabzi hai: ${target.name}?`);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md">
        <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">🥦 Sabziyan (Vegetables)</span>
        <p class="fun-font text-2xl text-emerald-900 my-4">Pehchano: ${target.name}</p>
        <div class="grid grid-cols-3 gap-3">
          ${veggies.map(v => `
            <button onclick="GkModule.checkVeggie('${v.name}', '${target.name}')" class="bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 rounded-3xl p-4 flex flex-col items-center justify-center btn-bounce shadow-sm">
              <span class="text-5xl mb-1">${v.icon}</span>
              <span class="text-xs font-bold text-slate-700">${v.name.split(' ')[0]}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkVeggie(chosen, target) {
    if (chosen === target) {
      App.awardStarsAndWin(`Wah! Ye taaza ${target} hai!`);
      setTimeout(() => this.initVeggies(), 1800);
    } else {
      App.speak('Ye doosri sabzi hai, dobara dekhein!');
    }
  }
};
