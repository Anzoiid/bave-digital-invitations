/* ============================================================
   CONFIG — EXEMPLE. Ce dossier n'est pas un vrai client : c'est
   le point de départ à copier pour en créer un nouveau (voir
   docs/new-client-checklist.md). Toutes les valeurs ci-dessous
   sont fictives et le disent explicitement.
   ============================================================ */
const CONFIG = {
  couple: {
    prenom1: "Prénom A",
    prenom2: "Prénom B",
    nomComplet1: "Prénom A Nom (exemple)",
    nomComplet2: "Prénom B Nom (exemple)",
  },
  dateMariage: "2027-06-12", // format AAAA-MM-JJ, utilisé pour le calendrier
  dateAffichee: { jourSemaine: "Samedi", jour: "12", mois: "Juin", annee: "2027" },

  familles: [
    { titre: "Mr et Mme", parents: "Parent 1 / Parent 2 (exemple)" },
    { titre: "Mr et Mme", parents: "Parent 3 / Parent 4 (exemple)" },
  ],

  ceremonie: { heure: "11:00", lieu: "Lieu de cérémonie (exemple)" },
  reception: { heure: "17:00" },

  lieuReception: {
    nom: "Salle de réception (exemple)",
    adresse: "Adresse, Ville (exemple)",
    rechercheMaps: "Salle de réception exemple",
  },

  galerie: {
    // Chemins relatifs vers img/ dans ce dossier.
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
    consigne: "Tenue de soirée (exemple)",
    couleurs: ["#e8c468", "#d98b3f", "#e3a9a0", "#2f4a3a", "#7f9a7d", "#8ea3c2"],
  },

  musique: {
    titre: "Musique d'exemple (silence)",
    fichier: "audio/placeholder-music.wav", // chemin relatif vers audio/ dans ce dossier
  },

  messageCloture: "Votre présence serait le plus beau des cadeaux ! (message d'exemple)",
};
