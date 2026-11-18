/* ============================================================
   RENDER — lit CONFIG (voir config.sample.js / le config.js de
   chaque client) et construit le contenu de la page.
   Rien ici ne dépend d'un couple en particulier : ce fichier
   n'a jamais besoin d'être modifié pour un nouveau client.
   Doit être chargé après config.js et avant interactions.js.
   ============================================================ */
function formatDateCourte(d){
  return `${d.jourSemaine} ${d.jour} ${d.mois} ${d.annee}`;
}

// Titre de l'onglet + piste musicale
document.title = `Invitation ${CONFIG.couple.prenom1} & ${CONFIG.couple.prenom2}`;
document.getElementById("bg-music").src = CONFIG.musique.fichier;

// Écran enveloppe
document.getElementById("env-names").textContent = `${CONFIG.couple.prenom1} & ${CONFIG.couple.prenom2}`;
document.getElementById("env-date").textContent = formatDateCourte(CONFIG.dateAffichee);

// Titre section couple
document.getElementById("couple-title").textContent = `${CONFIG.couple.prenom1} & ${CONFIG.couple.prenom2}`;
document.getElementById("main-photo").src = CONFIG.galerie.photoPrincipale;
document.getElementById("main-photo").alt = `${CONFIG.couple.prenom1} et ${CONFIG.couple.prenom2}`;

// Familles
const famEl = document.getElementById("families");
CONFIG.familles.forEach((f, i) => {
  if (i > 0) {
    const sep = document.createElement("div");
    sep.className = "sep";
    famEl.appendChild(sep);
  }
  const div = document.createElement("div");
  div.innerHTML = `${f.titre}<b>${f.parents}</b>`;
  famEl.appendChild(div);
});
document.getElementById("full-name-1").textContent = CONFIG.couple.nomComplet1;
document.getElementById("full-name-2").textContent = CONFIG.couple.nomComplet2;

// Cérémonie / Réception
document.getElementById("ceremony-time").textContent = CONFIG.ceremonie.heure;
document.getElementById("ceremony-date").innerHTML =
  `<span>${CONFIG.dateAffichee.jourSemaine}</span><b>${CONFIG.dateAffichee.jour}</b><span>${CONFIG.dateAffichee.mois}</span>`;
document.getElementById("reception-time").textContent = CONFIG.reception.heure;
document.getElementById("reception-date").innerHTML =
  `<span>${CONFIG.dateAffichee.jourSemaine}</span><b>${CONFIG.dateAffichee.jour}</b><span>${CONFIG.dateAffichee.mois}</span>`;

// Galerie — carrousel en éventail (coverflow)
// cfCards / cfActive / layoutCoverflow / cfGoTo sont utilisés par
// interactions.js (clics, swipe, autoplay).
const cfTrack = document.getElementById("coverflow-track");
const counterEl = document.getElementById("gallery-counter");
const cfCards = CONFIG.galerie.photos.map((src, i) => {
  const card = document.createElement("div");
  card.className = "card";
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Photo ${i + 1} du couple`;
  img.loading = "lazy";
  card.appendChild(img);
  cfTrack.appendChild(card);
  return card;
});

let cfActive = 0;
function layoutCoverflow(){
  const n = cfCards.length;
  cfCards.forEach((card, i) => {
    let offset = i - cfActive;
    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;
    const abs = Math.abs(offset);
    const tx = offset * 78;
    const scale = Math.max(1 - abs * 0.16, 0.56);
    const rot = offset * -24;
    const tz = -abs * 70;
    const opacity = abs > 2.4 ? 0 : 1 - abs * 0.32;
    card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${rot}deg) scale(${scale})`;
    card.style.opacity = String(Math.max(opacity, 0));
    card.style.zIndex = String(100 - Math.round(abs * 10));
    card.style.pointerEvents = offset === 0 ? "auto" : "none";
  });
  counterEl.textContent = `${cfActive + 1} / ${n}`;
}
function cfGoTo(i){
  const n = cfCards.length;
  cfActive = ((i % n) + n) % n;
  layoutCoverflow();
}
layoutCoverflow();

// Calendrier
(function buildCalendar(){
  const d = new Date(CONFIG.dateMariage + "T00:00:00");
  const year = d.getFullYear(), month = d.getMonth();
  const monthNames = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  document.getElementById("cal-month").textContent = `${monthNames[month]} ${year}`;

  const grid = document.getElementById("cal-grid");
  ["Lu","Ma","Me","Je","Ve","Sa","Di"].forEach(dow => {
    const el = document.createElement("div");
    el.className = "dow"; el.textContent = dow;
    grid.appendChild(el);
  });

  const firstDay = new Date(year, month, 1);
  let startOffset = firstDay.getDay() - 1; // lundi = 0
  if (startOffset < 0) startOffset = 6;
  for (let i = 0; i < startOffset; i++) {
    const el = document.createElement("div");
    el.className = "day empty";
    grid.appendChild(el);
  }
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const el = document.createElement("div");
    el.className = "day" + (day === d.getDate() ? " the-day" : "");
    el.textContent = day === d.getDate() ? "♥" : day;
    grid.appendChild(el);
  }

  // Lien Google Calendar
  const startStr = CONFIG.dateMariage.replace(/-/g,"") + "T" + CONFIG.ceremonie.heure.replace(":","") + "00";
  const endStr = CONFIG.dateMariage.replace(/-/g,"") + "T" + CONFIG.reception.heure.replace(":","") + "00";
  const gcalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Mariage de ' + CONFIG.couple.prenom1 + ' & ' + CONFIG.couple.prenom2)}&dates=${startStr}/${endStr}&location=${encodeURIComponent(CONFIG.lieuReception.adresse)}`;
  document.getElementById("add-cal-link").href = gcalUrl;
})();

// Lieu
document.getElementById("venue-name").textContent = CONFIG.lieuReception.nom;
document.getElementById("venue-addr").textContent = CONFIG.lieuReception.adresse;
document.getElementById("map-link").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.lieuReception.rechercheMaps)}`;

// Dress code
document.getElementById("dress-sub").textContent = CONFIG.dressCode.consigne;
const swEl = document.getElementById("swatches");
CONFIG.dressCode.couleurs.forEach(c => {
  const s = document.createElement("div");
  s.className = "swatch";
  s.style.background = c;
  swEl.appendChild(s);
});

// Livre d'or — le placeholder cite les prénoms du couple, lus depuis CONFIG
document.getElementById("gb-message").placeholder =
  `Votre message pour ${CONFIG.couple.prenom1} & ${CONFIG.couple.prenom2}...`;

// Clôture
document.getElementById("closing-msg").textContent = CONFIG.messageCloture;
