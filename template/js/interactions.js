/* ============================================================
   INTERACTIONS — comportements déclenchés par l'invité et
   animations décoratives. Ne lit CONFIG que pour la clé de
   stockage du livre d'or ; sinon agnostique du couple.
   Doit être chargé après render.js (utilise cfCards / cfActive /
   layoutCoverflow / cfGoTo définis là-bas).
   ============================================================ */

// ---------- Navigation galerie (clic, swipe, pause auto) ----------
let galleryPaused = false;
let galleryPauseTimer = null;
function pauseGalleryAutoplay(){
  galleryPaused = true;
  clearTimeout(galleryPauseTimer);
  galleryPauseTimer = setTimeout(() => { galleryPaused = false; }, 6000);
}

document.getElementById("cf-prev").addEventListener("click", () => { pauseGalleryAutoplay(); cfGoTo(cfActive - 1); });
document.getElementById("cf-next").addEventListener("click", () => { pauseGalleryAutoplay(); cfGoTo(cfActive + 1); });

const cfEl = document.getElementById("coverflow");
let cfTouchStartX = null;
cfEl.addEventListener("touchstart", e => {
  cfTouchStartX = e.touches[0].clientX;
  pauseGalleryAutoplay();
}, { passive: true });
cfEl.addEventListener("touchend", e => {
  if (cfTouchStartX === null) return;
  const dx = e.changedTouches[0].clientX - cfTouchStartX;
  if (dx > 36) cfGoTo(cfActive - 1);
  else if (dx < -36) cfGoTo(cfActive + 1);
  cfTouchStartX = null;
}, { passive: true });

/* ---------- Livre d'or ----------
   Stockage local au navigateur de l'invité (try/catch : certains
   navigateurs en navigation privée bloquent localStorage). */
(function initGuestbook(){
  const key = "bave-gb-" + CONFIG.couple.prenom1 + "-" + CONFIG.couple.prenom2;
  const form = document.getElementById("guestbook-form");
  const nameInput = document.getElementById("gb-name");
  const msgInput = document.getElementById("gb-message");
  const listEl = document.getElementById("guestbook-list");
  const emptyEl = document.getElementById("guestbook-empty");
  const noteEl = document.getElementById("gb-note");

  function loadEntries(){
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch (e) { return []; }
  }
  function saveEntries(entries){
    try { localStorage.setItem(key, JSON.stringify(entries)); } catch (e) {}
  }
  function formatDate(iso){
    try {
      return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    } catch (e) { return ""; }
  }
  function render(){
    const entries = loadEntries();
    listEl.innerHTML = "";
    emptyEl.style.display = entries.length ? "none" : "block";
    entries.slice().reverse().forEach(entry => {
      const card = document.createElement("div");
      card.className = "gb-entry";
      const top = document.createElement("div");
      top.className = "gb-entry-top";
      const name = document.createElement("span");
      name.className = "gb-entry-name";
      name.textContent = entry.nom;
      const date = document.createElement("span");
      date.className = "gb-entry-date";
      date.textContent = formatDate(entry.date);
      top.appendChild(name);
      top.appendChild(date);
      const msg = document.createElement("p");
      msg.className = "gb-entry-msg";
      msg.textContent = entry.message;
      card.appendChild(top);
      card.appendChild(msg);
      listEl.appendChild(card);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nom = nameInput.value.trim();
    const message = msgInput.value.trim();
    if (!nom || !message) return;
    const entries = loadEntries();
    entries.push({ nom, message, date: new Date().toISOString() });
    saveEntries(entries);
    form.reset();
    render();
    if (noteEl) {
      noteEl.textContent = "Merci pour vos vœux, " + nom + " !";
      setTimeout(() => { noteEl.textContent = ""; }, 3500);
    }
  });

  render();
})();

/* ---------- Pétales ambiants sur l'écran d'enveloppe ---------- */
(function initPetals(){
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host = document.getElementById("petals");
  const tones = ["#cdbfa5", "#b08d57", "#e8c468", "#d98b3f", "#8c6a3f", "#fbf7ee"];
  const rand = (min, max) => min + Math.random() * (max - min);
  const count = 13;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    const size = rand(8, 20);
    petal.style.width = size + "px";
    petal.style.height = (size * rand(1.15, 1.45)) + "px";
    petal.style.left = rand(-4, 98) + "%";

    const duration = rand(11, 23);
    petal.style.animationDuration = duration.toFixed(1) + "s";
    petal.style.animationDelay = (-rand(0, duration)).toFixed(1) + "s";

    // trajectoire propre à chaque pétale : balancement et rotation aléatoires
    const dir = Math.random() > 0.5 ? 1 : -1;
    petal.style.setProperty("--op", rand(0.28, 0.6).toFixed(2));
    petal.style.setProperty("--r0", rand(0, 360).toFixed(0) + "deg");
    petal.style.setProperty("--s1", (dir * rand(10, 50)).toFixed(0) + "px");
    petal.style.setProperty("--s2", (-dir * rand(10, 55)).toFixed(0) + "px");
    petal.style.setProperty("--s3", (dir * rand(6, 40)).toFixed(0) + "px");
    petal.style.setProperty("--s4", (-dir * rand(4, 30)).toFixed(0) + "px");
    petal.style.setProperty("--r1", rand(40, 160).toFixed(0) + "deg");
    petal.style.setProperty("--r2", rand(140, 260).toFixed(0) + "deg");
    petal.style.setProperty("--r3", rand(220, 320).toFixed(0) + "deg");
    petal.style.setProperty("--r4", rand(300, 420).toFixed(0) + "deg");

    const color = tones[Math.floor(Math.random() * tones.length)];
    petal.innerHTML = `<svg viewBox="0 0 20 32" fill="${color}"><path d="M10 0 C17 7, 17 24, 10 32 C3 24, 3 7, 10 0 Z"/></svg>`;
    host.appendChild(petal);
  }
})();

/* ---------- Confettis (déclenchés à l'ouverture) ---------- */
function fireConfetti(){
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.scale(dpr, dpr);

  const colors = ["#b08d57", "#8c6a3f", "#e8c468", "#fbf7ee", "#d98b3f"];
  const count = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 70;
  const pieces = Array.from({ length: count }, () => ({
    x: window.innerWidth / 2 + (Math.random() - 0.5) * 60,
    y: window.innerHeight * 0.3 + (Math.random() - 0.5) * 40,
    vx: (Math.random() - 0.5) * 7,
    vy: -(Math.random() * 7 + 4),
    size: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI,
    vrot: (Math.random() - 0.5) * 0.3,
    shape: Math.random() > 0.5 ? "rect" : "circle",
  }));

  const gravity = 0.18;
  const start = performance.now();
  const duration = 2200;

  function frame(now){
    const elapsed = now - start;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    pieces.forEach(p => {
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }
  requestAnimationFrame(frame);
}

/* ---------- Défilement automatique après l'ouverture ----------
   Fait glisser la page vers le bas toute seule, comme sur le site
   de référence. S'arrête dès que l'invité touche l'écran, scrolle
   ou utilise la molette — pour ne jamais lutter contre son geste. */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function startAutoScroll(){
  if (reducedMotion) return;
  let active = true;
  const stop = () => { active = false; };
  ["wheel", "touchstart", "pointerdown"].forEach(ev =>
    window.addEventListener(ev, stop, { once: true, passive: true })
  );
  const speed = 0.045; // px par milliseconde
  let last = null;
  function step(ts){
    if (!active) return;
    if (last === null) last = ts;
    const dt = ts - last;
    last = ts;
    window.scrollBy(0, speed * dt);
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
    if (!atBottom) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- Rotation automatique de la galerie ---------- */
function startGalleryAutoplay(){
  if (reducedMotion) return;
  setInterval(() => {
    if (galleryPaused) return;
    cfGoTo(cfActive + 1);
  }, 2000);
}

/* ---------- Interaction : ouverture de l'enveloppe ---------- */
const invitation = document.getElementById("invitation");
document.getElementById("btn-open").addEventListener("click", () => {
  document.getElementById("envelope-screen").style.display = "none";
  invitation.hidden = false;
  requestAnimationFrame(() => invitation.classList.add("visible"));

  fireConfetti();
  startGalleryAutoplay();
  setTimeout(startAutoScroll, 700);

  // La musique démarre tout de suite, dans le même tick que le clic.
  // Important sur iPhone/Safari : un setTimeout, même court, casse le lien
  // avec le geste utilisateur et bloque silencieusement la lecture.
  tryPlayMusic();
});
invitation.hidden = true;

/* ---------- Interaction : bouton musique ----------
   L'icône reflète toujours l'état RÉEL de la lecture (jamais une
   supposition) : si l'autoplay est bloqué par le navigateur, le bouton
   reste sur "▶" pour inviter à un tap manuel, qui lui marche toujours
   car c'est un geste utilisateur direct et immédiat. */
const musicBtn = document.getElementById("music-btn");
const bgAudio = document.getElementById("bg-music");

function setMusicIcon(isPlaying) {
  musicBtn.setAttribute("aria-pressed", String(isPlaying));
  musicBtn.textContent = isPlaying ? "❚❚" : "▶";
}

function tryPlayMusic() {
  if (!bgAudio.src) return;
  bgAudio.play().then(() => setMusicIcon(true)).catch(() => setMusicIcon(false));
}

musicBtn.addEventListener("click", () => {
  if (!bgAudio.src) return;
  if (!bgAudio.paused) {
    bgAudio.pause();
    setMusicIcon(false);
  } else {
    bgAudio.play().then(() => setMusicIcon(true)).catch(() => setMusicIcon(false));
  }
});
