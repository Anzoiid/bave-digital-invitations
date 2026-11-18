/* ============================================================
   CONFIG — données du couple Yves & Clarisse.
   Voir docs/new-client-checklist.md pour la structure attendue
   et la procédure de création d'une nouvelle invitation.
   ============================================================ */
const CONFIG = {
  couple: {
    prenom1: "Yves",
    prenom2: "Clarisse",
    nomComplet1: "Nkurunziza Yves",
    nomComplet2: "Irakoze Clarisse",
  },
  dateMariage: "2026-11-01", // format AAAA-MM-JJ, utilisé pour le calendrier
  dateAffichee: { jourSemaine: "Dimanche", jour: "01", mois: "Novembre", annee: "2026" },

  familles: [
    { titre: "Mr et Mme", parents: "Nkurunziza Jean / Niyonkuru Alice" },
    { titre: "Mr et Mme", parents: "Irakoze Pierre / Nduwimana Marie" },
  ],

  ceremonie: { heure: "10:30", lieu: "État civil — Hôtel de Ville" },
  reception: { heure: "16:30" },

  lieuReception: {
    nom: "Restaurant Belvédère",
    adresse: "Kiriri, Bujumbura",
    rechercheMaps: "Restaurant Belvédère Kiriri Bujumbura",
  },

  galerie: {
    // Chemins relatifs vers img/ dans ce dossier client.
    photoPrincipale: "img/photo-1.jpg",
    photos: [
      "img/photo-2.jpg",
      "img/photo-3.jpg",
      "img/photo-4.jpg",
      "img/photo-5.jpg",
      "img/photo-6.jpg",
      "img/photo-7.jpg",
    ],
  },

  dressCode: {
    consigne: "Tenue de soirée",
    couleurs: ["#e8c468", "#d98b3f", "#e3a9a0", "#2f4a3a", "#7f9a7d", "#8ea3c2"],
  },

  musique: {
    titre: "Piano doux (temporaire — à remplacer par le morceau définitif)",
    fichier: "audio/temp-music.mp3", // chemin relatif vers audio/ dans ce dossier client
  },

  messageCloture: "Votre présence serait le plus beau des cadeaux !",
};
