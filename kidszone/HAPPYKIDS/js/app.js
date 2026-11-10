// KidsZone Main Application Controller
const App = {
  stars: 20,
  currentSubjectKey: '',
  secondsInSession: 0,
  timerInterval: null,
  restingSubjects: new Set(),
  audioCtx: null,

  init(subjectKey = '') {
    this.currentSubjectKey = subjectKey;

    if (localStorage.getItem('kz_stars_v2')) {
      this.stars = parseInt(localStorage.getItem('kz_stars_v2'), 10);
    }
    const starEl = document.getElementById('starCounter');
    if (starEl) starEl.innerText = this.stars;

    Rewards.init();
    this.setupDrawer();
    this.startActiveTimer();
  },

  setupDrawer() {
    const menuBtn = document.getElementById('menuBtn');
    const drawer = document.getElementById('sidebarDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const closeBtn = document.getElementById('closeDrawerBtn');

    if (menuBtn && drawer && overlay) {
      menuBtn.onclick = () => this.openDrawer();
      overlay.onclick = () => this.closeDrawer();
      if (closeBtn) closeBtn.onclick = () => this.closeDrawer();
    }
  },

  openDrawer() {
    document.getElementById('sidebarDrawer').classList.remove('-translate-x-full');
    document.getElementById('drawerOverlay').classList.remove('hidden');
  },

  closeDrawer() {
    document.getElementById('sidebarDrawer').classList.add('-translate-x-full');
    document.getElementById('drawerOverlay').classList.add('hidden');
  },

  // 30-Minute Auto-switch Session
  startActiveTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.secondsInSession++;
      const mins = Math.floor(this.secondsInSession / 60);
      const secs = this.secondsInSession % 60;
      const timerBadge = document.getElementById('timerBadge');
      if (timerBadge) {
        timerBadge.innerText = `⏱️ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }

      if (this.secondsInSession >= 1800) {
        this.triggerCooldownTransition();
      }
    }, 1000);
  },

  triggerCooldownTransition() {
    clearInterval(this.timerInterval);
    confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
    const modal = document.getElementById('cooldownModal');
    if (modal) modal.classList.remove('hidden');
    this.speak('Bohot khoob! 30 minute poore hue! Thoda aaraam karein ya naya subject seekhein!');
  },

  confirmCooldownSwitch() {
    const modal = document.getElementById('cooldownModal');
    if (modal) modal.classList.add('hidden');
    this.secondsInSession = 0;
    window.location.href = 'index.html';
  },

  // Audio & Speech Utilities
  speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.88;
    utter.pitch = 1.15;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.includes('hi') || v.lang.includes('ur'));
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  },

  playRewardSound() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, this.audioCtx.currentTime + 0.35); // C6
    gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.4);
  },

  awardStarsAndWin(msg) {
    this.stars += 3;
    localStorage.setItem('kz_stars_v2', this.stars);
    const starEl = document.getElementById('starCounter');
    if (starEl) starEl.innerText = this.stars;

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    this.playRewardSound();
    this.speak(msg);

    // 40% probability to trigger excitement scratch card
    if (Math.random() > 0.35) {
      setTimeout(() => Rewards.showScratchCard(), 1000);
    }
  }
};
