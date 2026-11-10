// Mathematics Game Module
const MathsModule = {
  // 1. Tables (Pahada)
  initTables() {
    const tableNums = [2, 3, 4, 5, 10];
    const base = tableNums[Math.floor(Math.random() * tableNums.length)];
    const step = Math.floor(Math.random() * 8) + 2;
    const correct = base * step;

    App.speak(`${base} ka pahada! ${base} zarab (multiply) ${step} barabar kitna hoga?`);
    const opts = [correct, correct + base, Math.max(1, correct - base)].sort(() => Math.random() - 0.5);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md">
        <span class="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase">Pahada Challenge (Tables)</span>
        <div class="my-6 flex items-center justify-center space-x-3">
          <div class="w-16 h-16 bg-blue-100 border-2 border-blue-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-blue-800 shadow">${base}</div>
          <span class="fun-font text-3xl text-slate-500">×</span>
          <div class="w-16 h-16 bg-blue-100 border-2 border-blue-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-blue-800 shadow">${step}</div>
          <span class="fun-font text-3xl text-slate-500">=</span>
          <div class="w-16 h-16 bg-amber-100 border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-amber-700 font-bold shadow">?</div>
        </div>
        <p class="text-xs font-bold text-slate-500 mb-4">Sahi jawab chuno:</p>
        <div class="flex justify-center space-x-3">
          ${opts.map(o => `
            <button onclick="MathsModule.checkTable(${o}, ${correct})" class="w-20 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl fun-font text-2xl shadow-lg border-b-4 border-blue-700 btn-bounce">${o}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkTable(chosen, correct) {
    if (chosen === correct) {
      App.awardStarsAndWin(`Shaandaar! ${chosen} bilkul sahi jawab hai!`);
      setTimeout(() => this.initTables(), 2000);
    } else {
      App.speak('Arey nahi dost, dobara pahada gino!');
    }
  },

  // 2. Before, After, Between
  initBlanks() {
    const modes = ['between', 'after', 'before'];
    const mode = modes[Math.floor(Math.random() * modes.length)];
    const start = Math.floor(Math.random() * 25) + 3;
    let correct = 0;
    let prompt = '';
    let visual = '';

    if (mode === 'between') {
      correct = start + 1;
      prompt = `${start} aur ${start + 2} ke beech (between) me kaunsa number aayega?`;
      visual = `
        <div class="w-14 h-16 bg-blue-100 border-2 border-blue-300 rounded-2xl flex items-center justify-center fun-font text-3xl text-blue-800">${start}</div>
        <div class="w-14 h-16 bg-amber-100 border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-amber-700">?</div>
        <div class="w-14 h-16 bg-blue-100 border-2 border-blue-300 rounded-2xl flex items-center justify-center fun-font text-3xl text-blue-800">${start + 2}</div>
      `;
    } else if (mode === 'after') {
      correct = start + 1;
      prompt = `${start} ke baad (after) kaunsa number aayega?`;
      visual = `
        <div class="w-14 h-16 bg-blue-100 border-2 border-blue-300 rounded-2xl flex items-center justify-center fun-font text-3xl text-blue-800">${start}</div>
        <div class="w-14 h-16 bg-amber-100 border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-amber-700">?</div>
      `;
    } else {
      correct = start - 1;
      prompt = `${start} se pehle (before) kaunsa number aata hai?`;
      visual = `
        <div class="w-14 h-16 bg-amber-100 border-4 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-3xl text-amber-700">?</div>
        <div class="w-14 h-16 bg-blue-100 border-2 border-blue-300 rounded-2xl flex items-center justify-center fun-font text-3xl text-blue-800">${start}</div>
      `;
    }

    App.speak(prompt);
    const opts = [correct, correct + 1, correct - 1].sort(() => Math.random() - 0.5);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md">
        <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">${mode.toUpperCase()} Number</span>
        <div class="my-6 flex items-center justify-center space-x-3">${visual}</div>
        <p class="text-xs font-bold text-slate-500 mb-4">Sahi number chuniye:</p>
        <div class="flex justify-center space-x-3">
          ${opts.map(n => `
            <button onclick="MathsModule.checkBlank(${n}, ${correct})" class="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl fun-font text-2xl shadow border-b-4 border-emerald-700 btn-bounce">${n}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkBlank(chosen, correct) {
    if (chosen === correct) {
      App.awardStarsAndWin('Bahut khoob! Missing number sahi pehchana!');
      setTimeout(() => this.initBlanks(), 1800);
    } else {
      App.speak('Arey nahi, ek baar ginti karke dekhein!');
    }
  },

  // 3. Ascending & Descending Order
  initAscDesc() {
    const isAsc = Math.random() > 0.5;
    const nums = [];
    while (nums.length < 4) {
      const r = Math.floor(Math.random() * 20) + 1;
      if (!nums.includes(r)) nums.push(r);
    }
    const sorted = [...nums].sort((a, b) => isAsc ? a - b : b - a);
    let chosenList = [];

    App.speak(isAsc ? 'Chhote se bada (Ascending order) me lagayein!' : 'Bade se chhota (Descending order) me lagayein!');

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md">
        <span class="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
          ${isAsc ? '⬆️ Ascending Order (Chhota → Bada)' : '⬇️ Descending Order (Bada → Chhota)'}
        </span>
        <div class="flex justify-center space-x-2 my-5">
          <div id="slot-0" class="w-14 h-16 border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50 flex items-center justify-center fun-font text-2xl text-indigo-700">_</div>
          <div id="slot-1" class="w-14 h-16 border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50 flex items-center justify-center fun-font text-2xl text-indigo-700">_</div>
          <div id="slot-2" class="w-14 h-16 border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50 flex items-center justify-center fun-font text-2xl text-indigo-700">_</div>
          <div id="slot-3" class="w-14 h-16 border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50 flex items-center justify-center fun-font text-2xl text-indigo-700">_</div>
        </div>
        <p class="text-xs font-bold text-slate-500 mb-3">Kramanusar (sequentially) tap karein:</p>
        <div class="flex justify-center space-x-3">
          ${nums.map(n => `
            <button onclick="MathsModule.pickAscDesc(this, ${n})" class="w-14 h-14 bg-amber-100 hover:bg-amber-200 border-2 border-amber-400 rounded-2xl fun-font text-2xl text-amber-800 shadow btn-bounce">${n}</button>
          `).join('')}
        </div>
      </div>
    `;

    MathsModule.ascState = { sorted, chosenList };
  },

  pickAscDesc(btn, val) {
    const s = MathsModule.ascState;
    const idx = s.chosenList.length;
    if (val === s.sorted[idx]) {
      s.chosenList.push(val);
      document.getElementById(`slot-${idx}`).innerText = val;
      btn.disabled = true;
      btn.classList.add('opacity-30');
      App.playRewardSound();

      if (s.chosenList.length === 4) {
        App.awardStarsAndWin('Superb! Sahi tarteeb (order) me laga diya!');
        setTimeout(() => this.initAscDesc(), 2000);
      }
    } else {
      App.speak('Arey ye kram galat hai, dobara try karein!');
    }
  },

  // 4. Picture Addition & Subtraction
  initAddSub() {
    const isPlus = Math.random() > 0.4;
    const n1 = Math.floor(Math.random() * 4) + 2;
    const n2 = Math.floor(Math.random() * (isPlus ? 4 : n1 - 1)) + 1;
    const ans = isPlus ? n1 + n2 : n1 - n2;

    App.speak(isPlus ? `${n1} seb aur ${n2} seb milakar kitne hue?` : `${n1} seb me se ${n2} seb nikal diye, kitne bache?`);
    const opts = [ans, ans + 1, Math.max(0, ans - 1)].sort(() => Math.random() - 0.5);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md">
        <span class="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full uppercase">
          ${isPlus ? 'Addition (Jodna)' : 'Subtraction (Ghatana)'}
        </span>
        <div class="my-6 flex items-center justify-center space-x-3">
          <div class="bg-rose-50 p-3 rounded-2xl border border-rose-300">
            <span class="text-3xl">${'🍎'.repeat(n1)}</span>
            <span class="text-xs font-bold block text-slate-500 mt-1">${n1}</span>
          </div>
          <span class="fun-font text-3xl text-slate-600">${isPlus ? '+' : '−'}</span>
          <div class="bg-rose-50 p-3 rounded-2xl border border-rose-300">
            <span class="text-3xl">${'🍎'.repeat(n2)}</span>
            <span class="text-xs font-bold block text-slate-500 mt-1">${n2}</span>
          </div>
          <span class="fun-font text-3xl text-slate-600">=</span>
          <div class="w-14 h-14 bg-amber-100 border-2 border-dashed border-amber-400 rounded-2xl flex items-center justify-center fun-font text-2xl text-amber-700">?</div>
        </div>
        <p class="text-xs font-bold text-slate-500 mb-3">Total count karein:</p>
        <div class="flex justify-center space-x-3">
          ${opts.map(o => `
            <button onclick="MathsModule.checkAddSub(${o}, ${ans})" class="w-16 h-16 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl fun-font text-2xl shadow border-b-4 border-rose-700 btn-bounce">${o}</button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkAddSub(chosen, correct) {
    if (chosen === correct) {
      App.awardStarsAndWin(`Bohot khoob! Sahi jawab ${correct} hai!`);
      setTimeout(() => this.initAddSub(), 1800);
    } else {
      App.speak('Dobara count karein, aap kar sakte hain!');
    }
  }
};
