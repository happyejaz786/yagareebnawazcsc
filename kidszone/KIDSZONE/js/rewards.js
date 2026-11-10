// High-Quality SVG Stickers & Interactive Scratch Card Reward System
const Rewards = {
  unlockedIds: ['rocket', 'lion', 'apple', 'balloon'],

  catalog: [
    {
      id: 'rocket',
      name: 'Super Rocket',
      titleUrdu: 'خلائی راکٹ',
      desc: 'Sitaron ki taraf udne wala rocket!',
      svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="rkGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f43f5e"/><stop offset="100%" stop-color="#be123c"/></linearGradient>
          <linearGradient id="finGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#1d4ed8"/></linearGradient>
        </defs>
        <path d="M50 10 C62 25 70 50 68 72 L32 72 C30 50 38 25 50 10 Z" fill="url(#rkGrad)" stroke="#881337" stroke-width="2"/>
        <path d="M32 50 L18 68 C16 75 25 78 33 72 Z" fill="url(#finGrad)"/>
        <path d="M68 50 L82 68 C84 75 75 78 67 72 Z" fill="url(#finGrad)"/>
        <circle cx="50" cy="40" r="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
        <circle cx="47" cy="37" r="3" fill="#ffffff"/>
        <polygon points="42,72 58,72 50,92" fill="#f59e0b"/>
        <polygon points="45,72 55,72 50,86" fill="#ef4444"/>
      </svg>`
    },
    {
      id: 'lion',
      name: 'Jungle King Lion',
      titleUrdu: 'ببر شیر',
      desc: 'Sher jo dahaad maarta hai!',
      svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <circle cx="50" cy="50" r="38" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <circle cx="50" cy="52" r="28" fill="#fbbf24"/>
        <circle cx="28" cy="28" r="8" fill="#d97706"/><circle cx="28" cy="28" r="4" fill="#fbbf24"/>
        <circle cx="72" cy="28" r="8" fill="#d97706"/><circle cx="72" cy="28" r="4" fill="#fbbf24"/>
        <ellipse cx="40" cy="48" rx="4" ry="5" fill="#1e293b"/>
        <ellipse cx="60" cy="48" rx="4" ry="5" fill="#1e293b"/>
        <circle cx="41" cy="46" r="1.5" fill="#ffffff"/><circle cx="61" cy="46" r="1.5" fill="#ffffff"/>
        <polygon points="50,56 44,52 56,52" fill="#78350f"/>
        <path d="M44 60 Q50 66 56 60" stroke="#78350f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="34" cy="56" r="4" fill="#f87171" opacity="0.6"/>
        <circle cx="66" cy="56" r="4" fill="#f87171" opacity="0.6"/>
      </svg>`
    },
    {
      id: 'apple',
      name: 'Sweet Red Apple',
      titleUrdu: 'میٹھا سیب',
      desc: 'Roz ek seb khao sehatmand raho!',
      svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="apGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ef4444"/><stop offset="100%" stop-color="#b91c1c"/></linearGradient>
        </defs>
        <path d="M50 32 C36 18 16 26 22 52 C26 72 40 86 50 88 C60 86 74 72 78 52 C84 26 64 18 50 32 Z" fill="url(#apGrad)" stroke="#7f1d1d" stroke-width="2"/>
        <path d="M50 32 C50 20 54 14 58 12" stroke="#78350f" stroke-width="4" stroke-linecap="round" fill="none"/>
        <ellipse cx="62" cy="22" rx="10" ry="5" fill="#22c55e" transform="rotate(-30 62 22)"/>
        <ellipse cx="38" cy="44" rx="4" ry="12" fill="#ffffff" opacity="0.35" transform="rotate(-20 38 44)"/>
      </svg>`
    },
    {
      id: 'balloon',
      name: 'Rainbow Balloon',
      titleUrdu: 'رنگ برنگا غبارہ',
      desc: 'Hawa me udne wala pyara gubbara!',
      svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="balGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ec4899"/><stop offset="100%" stop-color="#a855f7"/></linearGradient>
        </defs>
        <ellipse cx="50" cy="44" rx="30" ry="36" fill="url(#balGrad)" stroke="#831843" stroke-width="2"/>
        <polygon points="50,78 45,84 55,84" fill="#a855f7"/>
        <path d="M50 84 Q44 90 52 95 Q46 98 50 100" stroke="#94a3b8" stroke-width="2" fill="none"/>
        <ellipse cx="38" cy="32" rx="5" ry="12" fill="#ffffff" opacity="0.45" transform="rotate(-25 38 32)"/>
      </svg>`
    },
    {
      id: 'car',
      name: 'Speedy Car',
      titleUrdu: 'تیز رفتار گاڑی',
      desc: 'Peep peep! Sadak par chalne wali car!',
      svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="carGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient>
        </defs>
        <path d="M15 58 L25 40 Q35 34 50 34 L66 34 Q75 35 84 45 L92 56 Q94 62 90 68 L16 68 Q12 65 15 58 Z" fill="url(#carGrad)" stroke="#1e3a8a" stroke-width="2"/>
        <path d="M30 42 L48 42 L48 54 L24 54 Z" fill="#e0f2fe"/>
        <path d="M54 42 L72 42 L78 54 L54 54 Z" fill="#e0f2fe"/>
        <circle cx="32" cy="70" r="10" fill="#1e293b" stroke="#64748b" stroke-width="3"/>
        <circle cx="32" cy="70" r="4" fill="#f8fafc"/>
        <circle cx="74" cy="70" r="10" fill="#1e293b" stroke="#64748b" stroke-width="3"/>
        <circle cx="74" cy="70" r="4" fill="#f8fafc"/>
        <circle cx="89" cy="58" r="3" fill="#fef08a"/>
      </svg>`
    },
    {
      id: 'gold_star',
      name: 'Golden Champion Star',
      titleUrdu: 'سنہرا ستارہ',
      desc: 'Aapki kamiyabi ka roshan sitaara!',
      svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fde047"/><stop offset="100%" stop-color="#eab308"/></linearGradient>
        </defs>
        <polygon points="50,10 62,35 89,38 68,57 74,84 50,70 26,84 32,57 11,38 38,35" fill="url(#starGrad)" stroke="#ca8a04" stroke-width="2.5"/>
        <ellipse cx="42" cy="46" rx="3" ry="4" fill="#713f12"/>
        <ellipse cx="58" cy="46" rx="3" ry="4" fill="#713f12"/>
        <path d="M44 54 Q50 60 56 54" stroke="#713f12" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'butterfly',
      name: 'Sparkle Butterfly',
      titleUrdu: 'رنگین تتلی',
      desc: 'Phoolon par udne wali haseen titli!',
      svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <path d="M48 38 C32 15 8 26 18 52 C24 64 36 62 48 54 Z" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
        <path d="M52 38 C68 15 92 26 82 52 C76 64 64 62 52 54 Z" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
        <path d="M48 54 C36 60 26 74 36 84 C46 90 48 74 49 64 Z" fill="#a855f7" stroke="#7e22ce" stroke-width="1.5"/>
        <path d="M52 54 C64 60 74 74 64 84 C54 90 52 74 51 64 Z" fill="#a855f7" stroke="#7e22ce" stroke-width="1.5"/>
        <ellipse cx="50" cy="50" rx="4" ry="20" fill="#1e293b"/>
        <circle cx="50" cy="30" r="5" fill="#1e293b"/>
        <path d="M48 26 Q42 16 36 18" stroke="#1e293b" stroke-width="2" fill="none"/>
        <path d="M52 26 Q58 16 64 18" stroke="#1e293b" stroke-width="2" fill="none"/>
      </svg>`
    },
    {
      id: 'crown',
      name: 'King Crown',
      titleUrdu: 'شاہی تاج',
      desc: 'Shaandaar karkardagi ka taaj!',
      svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="crGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#d97706"/></linearGradient>
        </defs>
        <polygon points="18,72 24,38 40,54 50,28 60,54 76,38 82,72" fill="url(#crGrad)" stroke="#b45309" stroke-width="2.5"/>
        <rect x="18" y="70" width="64" height="12" rx="4" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <circle cx="24" cy="38" r="4" fill="#ef4444"/>
        <circle cx="50" cy="28" r="5" fill="#3b82f6"/>
        <circle cx="76" cy="38" r="4" fill="#10b981"/>
        <circle cx="34" cy="76" r="3" fill="#ffffff"/>
        <circle cx="50" cy="76" r="3" fill="#ffffff"/>
        <circle cx="66" cy="76" r="3" fill="#ffffff"/>
      </svg>`
    }
  ],

  currentPrize: null,
  scratchedRatio: 0,

  init() {
    if (localStorage.getItem('kz_stickers_v2')) {
      try {
        this.unlockedIds = JSON.parse(localStorage.getItem('kz_stickers_v2'));
      } catch (e) {
        console.error(e);
      }
    }
  },

  showScratchCard() {
    const unearned = this.catalog.filter(c => !this.unlockedIds.includes(c.id));
    const prize = unearned.length > 0 
      ? unearned[Math.floor(Math.random() * unearned.length)]
      : this.catalog[Math.floor(Math.random() * this.catalog.length)];

    this.currentPrize = prize;

    const modal = document.getElementById('scratchModal');
    if (!modal) return;

    document.getElementById('prizeSvgContainer').innerHTML = prize.svg;
    document.getElementById('prizeName').innerText = prize.name;
    document.getElementById('prizeDesc').innerText = prize.desc;
    document.getElementById('claimRewardBtn').classList.add('hidden');
    modal.classList.remove('hidden');

    App.speak('Shabash! Aapke liye ek surprise scratch card hai! Ungli ya mouse se scratch kijiye!');
    this.setupScratchCanvas();
  },

  setupScratchCanvas() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 260;
    canvas.height = 260;

    // Fill with modern holographic/silver texture
    ctx.globalCompositeOperation = 'source-over';
    const grad = ctx.createLinearGradient(0, 0, 260, 260);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.3, '#cbd5e1');
    grad.addColorStop(0.7, '#e2e8f0');
    grad.addColorStop(1, '#64748b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 260, 260);

    // Decorative Text & Patterns
    ctx.font = 'bold 22px Fredoka One, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE ✨', 130, 125);
    ctx.font = 'bold 13px Quicksand, sans-serif';
    ctx.fillText('Ungli se ghis kar kholein!', 130, 155);

    let isDrawing = false;
    this.scratchedRatio = 0;

    const scratch = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      this.checkScratchProgress(ctx, canvas);
    };

    canvas.onmousedown = (e) => { isDrawing = true; scratch(e); };
    window.onmouseup = () => { isDrawing = false; };
    canvas.onmousemove = scratch;

    canvas.ontouchstart = (e) => { isDrawing = true; scratch(e); };
    window.ontouchend = () => { isDrawing = false; };
    canvas.ontouchmove = scratch;
  },

  checkScratchProgress(ctx, canvas) {
    if (this.scratchedRatio >= 0.40) return;
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clearPixels = 0;
      for (let i = 3; i < imgData.data.length; i += 32) {
        if (imgData.data[i] === 0) clearPixels++;
      }
      this.scratchedRatio = clearPixels / (imgData.data.length / 32);

      if (this.scratchedRatio > 0.38) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('claimRewardBtn').classList.remove('hidden');
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        App.playRewardSound();
        App.speak(`Mubarak ho! Aapne jeeta: ${this.currentPrize.name}!`);
      }
    } catch (e) {
      document.getElementById('claimRewardBtn').classList.remove('hidden');
    }
  },

  claimReward() {
    if (this.currentPrize && !this.unlockedIds.includes(this.currentPrize.id)) {
      this.unlockedIds.push(this.currentPrize.id);
      localStorage.setItem('kz_stickers_v2', JSON.stringify(this.unlockedIds));
    }
    this.closeScratchCard();
    this.openStickerBook();
  },

  closeScratchCard() {
    const modal = document.getElementById('scratchModal');
    if (modal) modal.classList.add('hidden');
  },

  openStickerBook() {
    const list = document.getElementById('stickerItems');
    if (!list) return;
    list.innerHTML = '';

    this.catalog.forEach(item => {
      const isUnlocked = this.unlockedIds.includes(item.id);
      const card = document.createElement('div');
      card.className = `p-3 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer btn-bounce shadow-sm transition ${
        isUnlocked 
          ? 'bg-amber-50 border-amber-300 hover:bg-amber-100' 
          : 'bg-slate-100 border-slate-200 opacity-50 grayscale'
      }`;
      
      card.innerHTML = `
        <div class="w-16 h-16 mb-1 ${isUnlocked ? 'floating-anim' : ''}">${item.svg}</div>
        <span class="fun-font text-xs text-slate-800 text-center leading-tight">${item.name}</span>
        <span class="text-[10px] font-bold ${isUnlocked ? 'text-emerald-600' : 'text-slate-400'} mt-1">
          ${isUnlocked ? 'Unlocked ⭐' : '🔒 Locked'}
        </span>
      `;

      card.onclick = () => {
        if (isUnlocked) {
          Rewards.showStickerZoomModal(item);
        } else {
          App.speak('Yeh sticker abhi band hai. Naye tasks jeet kar isko unlock karein!');
        }
      };
      list.appendChild(card);
    });

    document.getElementById('stickerModal').classList.remove('hidden');
    App.speak('Meri Sticker Book! Kisi bhi sticker par tap karke bada dekhein!');
  },

  closeStickerBook() {
    document.getElementById('stickerModal').classList.add('hidden');
  },

  // Big Zoom Pop-Up View
  showStickerZoomModal(item) {
    const zoomModal = document.getElementById('stickerZoomModal');
    if (!zoomModal) return;

    document.getElementById('zoomSvgContainer').innerHTML = item.svg;
    document.getElementById('zoomTitle').innerText = item.name;
    document.getElementById('zoomSubtitle').innerText = item.titleUrdu || '';
    document.getElementById('zoomDesc').innerText = item.desc || '';

    zoomModal.classList.remove('hidden');
    App.playRewardSound();
    App.speak(`${item.name}! ${item.desc}`);
  },

  closeStickerZoomModal() {
    const zoomModal = document.getElementById('stickerZoomModal');
    if (zoomModal) zoomModal.classList.add('hidden');
  }
};
