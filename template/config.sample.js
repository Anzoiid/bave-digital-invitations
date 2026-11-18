/* ============================================================
   CONFIG — fichier à dupliquer sous le nom "config.js" dans le
   dossier d'un nouveau client (voir docs/new-client-checklist.md
   pour la procédure complète). Toutes les informations propres
   à CE couple (texte, dates, photos, musique, couleurs) vivent
   ici. Le moteur (template/js/render.js et interactions.js) lit
   cet objet et construit la page automatiquement : il n'a jamais
   besoin d'être modifié pour un nouveau couple.
   ============================================================ */
const CONFIG = {
  couple: {
    prenom1: "",
    prenom2: "",
    nomComplet1: "",
    nomComplet2: "",
  },
  dateMariage: "", // format AAAA-MM-JJ, utilisé pour le calendrier
  dateAffichee: { jourSemaine: "", jour: "", mois: "", annee: "" },

  familles: [
    { titre: "Mr et Mme", parents: "" },
    { titre: "Mr et Mme", parents: "" },
  ],

  ceremonie: { heure: "", lieu: "" },
  reception: { heure: "" },

  lieuReception: {
    nom: "",
    adresse: "",
    rechercheMaps: "",
  },

  galerie: {
    // Chemins relatifs vers img/ dans le dossier de ce client.
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
    consigne: "",
    couleurs: ["#e8c468", "#d98b3f", "#e3a9a0", "#2f4a3a", "#7f9a7d", "#8ea3c2"],
  },

  musique: {
    titre: "",
    fichier: "audio/temp-music.mp3", // chemin relatif vers audio/ dans le dossier de ce client
  },

  messageCloture: "Votre présence serait le plus beau des cadeaux !",
};
