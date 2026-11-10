// Science Module (Safari Animals, Body Parts, Hygiene)
const ScienceModule = {
  initSafari() {
    const animals = [
      { name: 'Sher (Lion)', icon: '🦁', sound: 'Roaaar! Main jungle ka raja sher hoon!' },
      { name: 'Haathi (Elephant)', icon: '🐘', sound: 'Pawoo! Main sabse bada haathi hoon!' },
      { name: 'Billi (Cat)', icon: '🐱', sound: 'Meow Meow! Main pyari billi hoon!' },
      { name: 'Kutta (Dog)', icon: '🐶', sound: 'Woof Woof! Main wafadar kutta hoon!' },
      { name: 'Gaaye (Cow)', icon: '🐄', sound: 'Moooo! Gaaye doodh deti hai!' },
      { name: 'Mendhak (Frog)', icon: '🐸', sound: 'Tarr Tarr! Main mendhak hoon!' }
    ];

    App.speak('Animal Safari! Janwaron ko chhoo kar unki boliyan sunein!');
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md">
        <span class="text-xs font-bold text-lime-700 bg-lime-100 px-3 py-1 rounded-full uppercase">🦁 Animal Sounds Safari</span>
        <div class="grid grid-cols-3 gap-3 my-4">
          ${animals.map(a => `
            <button onclick="ScienceModule.playAnimalSound('${a.name}', '${a.sound}')" class="bg-lime-50 hover:bg-lime-100 border-2 border-lime-300 rounded-3xl p-4 flex flex-col items-center justify-center btn-bounce shadow">
              <span class="text-5xl mb-1">${a.icon}</span>
              <span class="text-xs font-bold text-lime-900">${a.name.split(' ')[0]}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  playAnimalSound(name, sound) {
    App.playRewardSound();
    App.speak(sound);
    App.awardStarsAndWin(`Shabash! Tumne ${name} se dosti ki!`);
  },

  initBodyParts() {
    const parts = [
      { name: 'Aankh (Eyes)', icon: '👀', hint: 'Dekhne ke kaam aati hain' },
      { name: 'Kaan (Ears)', icon: '👂', hint: 'Sunne ke kaam aate hain' },
      { name: 'Naak (Nose)', icon: '👃', hint: 'Khushboo soonghne ke kaam aati hai' },
      { name: 'Haath (Hands)', icon: '✋', hint: 'Taali bajane aur kaam karne ke liye' }
    ];
    const target = parts[Math.floor(Math.random() * parts.length)];

    App.speak(`Pehchano: ${target.name} kaunsa hai? ${target.hint}!`);
    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center">
        <span class="text-xs font-bold text-lime-700 bg-lime-100 px-3 py-1 rounded-full uppercase mb-4">Body Parts Explorer</span>
        <p class="fun-font text-2xl text-lime-800 my-2">Dhoondo: ${target.name}</p>
        <p class="text-xs font-bold text-slate-500 mb-6">${target.hint}</p>
        <div class="flex space-x-3 justify-center">
          ${parts.map(p => `
            <button onclick="ScienceModule.checkPart('${p.name}', '${target.name}')" class="text-6xl p-4 bg-white border-4 border-lime-300 rounded-3xl shadow btn-bounce">${p.icon}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkPart(chosen, target) {
    if (chosen === target) {
      App.awardStarsAndWin(`Bilkul sahi! Ye ${target} hai!`);
      setTimeout(() => this.initBodyParts(), 2000);
    } else {
      App.speak('Ye doosra ang hai dost, dobara socho!');
    }
  }
};
