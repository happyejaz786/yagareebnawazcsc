// Good Manners & "Be a Good Friend" Module
const MannersModule = {
  score: 0,
  queues: {},
  exploredSet: new Set(),
  currentGame: null,
  popupState: { category: 'manners', index: 0, speechText: '' },

  mannersList: [
    { title: 'Greet With Salaam', golden: 'Assalamu Alaikum! 🌙', icon: '🤲', desc: 'Kisi se bhi milne par muskurakar Assalamu Alaikum kehna sabse pyari aadat hai!' },
    { title: 'Say Please', golden: 'Please / Meherbani 🙏', icon: '🥺', desc: 'Koi cheez maangne se pehle hamesha pyar se PLEASE bolna chahiye!' },
    { title: 'Say Thank You', golden: 'Thank You / Shukriya 💖', icon: '🎁', desc: 'Jab koi aapki madad kare ya tohfa de toh hamesha THANK YOU kahein!' },
    { title: 'Say Sorry', golden: 'I am Sorry / Maaf Kijiye 😔', icon: '💐', desc: 'Galti ho jane par turant SORRY bolne se sab khush ho jate hain!' },
    { title: 'Say Excuse Me', golden: 'Excuse Me 🙋', icon: '🗣️', desc: 'Do logon ke beech se guzarne ya baat karne se pehle EXCUSE ME kahein!' },
    { title: 'Respect Elders', golden: 'Badon ka Adab 👴👵', icon: '❤️', desc: 'Ammi, Abbu, Dada-Dadi aur Teachers ki baat dhyan se sunein aur izzat karein!' },
    { title: 'Speak Softly', golden: 'Meethi Awaaz 🕊️', icon: '😊', desc: 'Chillakar nahi, hamesha pyar aur dheemi awaaz mein baat karni chahiye!' },
    { title: 'Always Tell Truth', golden: 'Hamesha Sach Bolo 🌟', icon: '✅', desc: 'Sach bolne wale bachon se Allah aur sab log pyar karte hain!' },
    { title: 'Wait Your Turn', golden: 'Line Mein Khade Raho 🚶', icon: '⏳', desc: 'School, jhoole ya bus mein dhakka na dein, apni baari ka intezar karein!' },
    { title: 'Table Manners', golden: 'Bismillah & Aaram Se Khana 🍽️', icon: '🥗', desc: 'Khana shuru karne se pehle Bismillah padhein aur bina giraye chaba kar khayein!' },
    { title: 'Cover Mouth', golden: 'Cheenkne Par Haath Rakhein 🤧', icon: '🧻', desc: 'Khansi ya cheenk aane par rumal ya kohni se munh dhak lena chahiye!' },
    { title: 'Knock First', golden: 'Darwaza Khatkhatayein 🚪', icon: '✊', desc: 'Kisi ke kamre mein jane se pehle darwaza knock karke ijazat lein!' },
    { title: 'Help At Home', golden: 'Ghar Mein Madad 🧹', icon: '🏡', desc: 'Khelne ke baad apne khilone khud samet kar rakhna achhe bachon ki pehchan hai!' },
    { title: 'Be Kind to Animals', golden: 'Jaanwaron Se Pyar 🐱', icon: '🐦', desc: 'Chidiya, billi ya kisi bhi jaanwar ko kabhi patthar na maarein, unhein paani dein!' },
    { title: 'Dont Waste Food', golden: 'Khana Barbad Na Karein 🍚', icon: '🙏', desc: 'Plate mein utna hi khana lein jitna aap poora kha sakein!' },
    { title: 'Keep Clean', golden: 'Kachra Dustbin Mein 🗑️', icon: '♻️', desc: 'Toffee ka wrapper sadak par nahi, hamesha dustbin mein daalein!' }
  ],

  friendList: [
    { title: 'Share Your Toys', golden: 'Mil-Baant Kar Khelo 🧸', icon: '🚂', desc: 'Achha dost apne khilone aur colors apne doston ke saath share karta hai!' },
    { title: 'Help a Friend', golden: 'Dost Ki Madad Karo 🤝', icon: '🩹', desc: 'Agar dost khelte waqt gir jaye toh use uthayein aur tasalli dein!' },
    { title: 'Include Everyone', golden: 'Sabko Saath Khilao ⚽', icon: '👫', desc: 'Kisi dost ko akela na chhodein, sabko apne game mein shamil karein!' },
    { title: 'Say Kind Words', golden: 'Tareef Karo 🌟', icon: '💬', desc: 'Dost ki drawing ya kaam achha lage toh "Wah, bohot achha!" zaroor kahein!' },
    { title: 'Take Turns', golden: 'Baari-Baari Khelo 🎠', icon: '🔄', desc: 'Slide ya bat-ball par sirf khud na khelein, dost ko bhi baari dein!' },
    { title: 'Listen to Friends', golden: 'Dost Ki Baat Suno 👂', icon: '😊', desc: 'Jab dost kuch suna raha ho toh beech mein na tokein, pyar se sunein!' },
    { title: 'Cheer Up Sad Friend', golden: 'Udaas Dost Ko Hasao 🎈', icon: '🤗', desc: 'Agar dost udaas ho toh uske paas baith kar uska mood achha karein!' },
    { title: 'No Fighting', golden: 'Jhagda Nahi Karna 🕊️', icon: '❤️', desc: 'Achhe dost kabhi maarte ya chidhate nahi hain, pyar se baat suljhate hain!' },
    { title: 'Share Lunch', golden: 'Tiffin Share Karna 🍱', icon: '🍎', desc: 'Agar koi dost lunch bhool jaye toh apna tiffin uske saath share karein!' },
    { title: 'Be Honest', golden: 'Dost Se Sach Bolo 🤝', icon: '💎', desc: 'Sachi dosti mein kabhi jhooth ya dhokha nahi hota!' },
    { title: 'Say Sorry Fast', golden: 'Roothna Nahi Hai 🌸', icon: '💐', desc: 'Agar dost ko bura lag jaye toh ego chhod kar jaldi Sorry bol dein!' },
    { title: 'Study Together', golden: 'Saath Milkar Padho 📚', icon: '✏️', desc: 'Agar dost ko koi sawal samajh na aaye toh pyar se uski help karein!' }
  ],

  quizList: [
    { q: 'Kisi se koi cheez maangne se pehle kya bolna chahiye?', icon: '🥺', opts: ['Please (Meherbani)', 'Mujhe do abhi!', 'Chup raho'], ans: 'Please (Meherbani)' },
    { q: 'Agar aapka dost khelte waqt gir jaye toh aap kya karenge?', icon: '🏃', opts: ['Haath pakad kar uthayenge', 'Hasenge', 'Bhaag jayenge'], ans: 'Haath pakad kar uthayenge' },
    { q: 'Jab koi aapko tohfa (gift) ya madad de toh kya kehte hain?', icon: '🎁', opts: ['Thank You', 'Bye Bye', 'Kuch nahi'], ans: 'Thank You' },
    { q: 'Agar galti se aap se kisi ka glass gir jaye toh kya bolenge?', icon: '🥛', opts: ['I am Sorry', 'Meri galti nahi', 'Hanso'], ans: 'I am Sorry' },
    { q: 'Ek achha dost (Good Friend) apne khilone kaise khelta hai?', icon: '🧸', opts: ['Sabke saath share karke', 'Chhupa kar', 'Tod kar'], ans: 'Sabke saath share karke' },
    { q: 'Toffee khane ke baad wrapper kahan daalna chahiye?', icon: '🍬', opts: ['Dustbin mein', 'Zameen par', 'Bed ke neeche'], ans: 'Dustbin mein' },
    { q: 'Subah school ya ghar mein badon se milne par kya kahein?', icon: '☀️', opts: ['Assalamu Alaikum', 'Munh pher lein', 'Chillayein'], ans: 'Assalamu Alaikum' },
    { q: 'Kisi ke kamre mein jane se pehle kya karna chahiye?', icon: '🚪', opts: ['Darwaza knock karein', 'Seedhe ghus jayein', 'Zor se maarein'], ans: 'Darwaza knock karein' }
  ],

  speakFriendly(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find(v => v.lang.includes('hi-IN') && (v.name.includes('Google') || v.name.includes('Swara'))) ||
        voices.find(v => v.lang.includes('en-IN')) ||
        voices.find(v => v.lang.includes('hi'));
      if (preferred) utter.voice = preferred;
      utter.lang = preferred ? preferred.lang : 'hi-IN';
      utter.rate = 0.90;
      utter.pitch = 1.12;
      window.speechSynthesis.speak(utter);
    } else if (typeof App !== 'undefined' && App.speak) {
      App.speak(text);
    }
  },

  addScore() {
    this.score++;
    const el = document.getElementById('manScoreBadge');
    if (el) el.innerText = this.score;
  },

  switchMode(mode) {
    document.querySelectorAll('.man-tab').forEach(btn => btn.classList.remove('man-tab-active'));
    const active = document.getElementById(`mtab-${mode}`);
    if (active) active.classList.add('man-tab-active');

    if (mode === 'manners') this.renderCards('manners', this.mannersList, '✨ Golden Words & Good Manners (16)');
    else if (mode === 'friend') this.renderCards('friend', this.friendList, '🤝 How to Be a Good Friend (12)');
    else this.initQuiz();
  },

  openPopup(category, index) {
    const list = category === 'manners' ? this.mannersList : this.friendList;
    const item = list[index];
    if (!item) return;

    const speech = `${item.title}! ${item.golden}! ${item.desc}`;
    this.popupState = { category, index, speechText: speech };

    document.getElementById('manPopupBadge').innerText = category === 'manners' ? '✨ Good Manners' : '🤝 Be a Good Friend';
    document.getElementById('manPopupIcon').innerText = item.icon;
    document.getElementById('manPopupTitle').innerText = item.title;
    document.getElementById('manPopupGolden').innerText = item.golden;
    document.getElementById('manPopupDesc').innerText = item.desc;

    const card = document.getElementById('manModalCard');
    card.classList.remove('hero-pop-out');
    void card.offsetWidth;
    card.classList.add('hero-pop-out');

    document.getElementById('manZoomModal').classList.remove('hidden');
    App.playRewardSound();
    this.speakFriendly(speech);

    const key = `${category}_${index}`;
    if (!this.exploredSet.has(key)) {
      this.exploredSet.add(key);
      this.addScore();
      if (this.exploredSet.size % 4 === 0) {
        App.awardStarsAndWin(`MashAllah! Tumne ${this.exploredSet.size} achhi aadatein aur dosti ke rules seekhe!`);
      }
    }
  },

  navigatePopup(step) {
    const { category, index } = this.popupState;
    const list = category === 'manners' ? this.mannersList : this.friendList;
    const next = (index + step + list.length) % list.length;
    this.openPopup(category, next);
  },

  replayAudio() {
    if (this.popupState.speechText) {
      App.playRewardSound();
      this.speakFriendly(this.popupState.speechText);
    }
  },

  closePopup() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    document.getElementById('manZoomModal').classList.add('hidden');
  },

  renderCards(category, list, heading) {
    this.speakFriendly(category === 'manners'
      ? 'Good Manners! Kisi bhi card par tap karke golden words seekhein!'
      : 'Be a Good Friend! Ek achha dost kaise bante hain, tap karke dekhein!');

    const cardBg = category === 'manners'
      ? 'from-white to-pink-50 border-pink-200 hover:bg-pink-100'
      : 'from-white to-amber-50 border-amber-200 hover:bg-amber-100';

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="w-full pop-in">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold text-pink-800 bg-pink-100 border border-pink-300 px-3 py-1 rounded-full">${heading}</span>
          <span class="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Tap Card = Big Story Pop-Up! ✨</span>
        </div>

        <div class="w-full max-h-[360px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 p-1">
          ${list.map((item, idx) => `
            <button onclick="MannersModule.openPopup('${category}', ${idx})"
              class="bg-gradient-to-b ${cardBg} border-2 rounded-2xl p-3 flex flex-col items-center justify-center btn-bounce shadow-xs">
              <span class="text-4xl mb-1.5">${item.icon}</span>
              <span class="fun-font text-xs sm:text-sm text-slate-900 text-center">${item.title}</span>
              <span class="text-[10px] font-bold text-pink-700 mt-0.5 text-center">${item.golden}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  initQuiz() {
    if (!this.queues.manQuiz || this.queues.manQuiz.length === 0) {
      this.queues.manQuiz = [...this.quizList].sort(() => Math.random() - 0.5);
    }
    const item = this.queues.manQuiz.pop();
    const opts = [...item.opts].sort(() => Math.random() - 0.5);
    this.currentGame = { solved: false };

    this.speakFriendly(item.q);

    const arena = document.getElementById('gameArena');
    arena.innerHTML = `
      <div class="text-center w-full max-w-md pop-in">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">🌟 Manners & Friendship Quiz</span>
          <button onclick="MannersModule.speakFriendly('${item.q}')" class="bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 px-3 py-1 rounded-xl text-xs font-extrabold text-yellow-900 btn-bounce">🔊 Suno</button>
        </div>

        <div class="bg-pink-50 border-2 border-pink-200 rounded-3xl p-4 mb-5">
          <span class="text-5xl block mb-2 float-slow">${item.icon}</span>
          <h3 class="fun-font text-lg sm:text-xl text-slate-900">${item.q}</h3>
        </div>

        <div class="space-y-2.5">
          ${opts.map(opt => `
            <button onclick="MannersModule.checkQuiz(this, '${opt}', '${item.ans}')"
              class="w-full py-3.5 px-4 bg-white hover:bg-pink-50 border-2 border-b-4 border-pink-300 rounded-2xl fun-font text-base text-slate-800 shadow btn-bounce transition">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  checkQuiz(btn, chosen, correct) {
    if (this.currentGame.solved) return;
    if (chosen === correct) {
      this.currentGame.solved = true;
      btn.classList.add('!bg-emerald-500', '!border-emerald-700', '!text-white', 'scale-105');
      this.addScore();
      App.awardStarsAndWin(`Shabash! "${correct}" bilkul achhi baat hai!`);
      setTimeout(() => this.initQuiz(), 1800);
    } else {
      btn.classList.add('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700');
      this.speakFriendly('Socho, ek achha bachha kya karega?');
      setTimeout(() => btn.classList.remove('shake-anim', '!bg-red-100', '!border-red-400', '!text-red-700'), 600);
    }
  }
};