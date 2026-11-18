# Bave Digital Invitations

Moteur réutilisable d'invitation de mariage digitale interactive — projet
BAVE PICTURES (direction artistique Ivory & Gold).

## Structure

```
template/                  moteur partagé — ne change jamais par client
├── css/
│   ├── base.css            reset + typographie
│   ├── layout.css          structure de page
│   ├── components.css      cartes et widgets (enveloppe, galerie, livre d'or...)
│   └── theme-ivory-gold.css  jetons de couleur + décors du thème actuel
├── js/
│   ├── render.js            lit CONFIG et construit le contenu
│   └── interactions.js      clics, swipe, animations, livre d'or
├── img/wax-seal.png          élément de marque partagé par tous les clients
└── config.sample.js          structure CONFIG totalement vide (référence)

clients/
├── _example/                  dossier à dupliquer pour un nouveau client —
│                               mêmes champs qu'un vrai client, mais remplis
│                               de valeurs fictives marquées « exemple »
└── yves-clarisse/            une invitation = un dossier
    ├── index.html            identique pour tous les clients
    ├── config.js              données propres à ce couple
    ├── img/                   leurs photos
    └── audio/                 leur musique

portfolio/
└── theme-moodboards/          références visuelles pour de futurs thèmes
                                (pas utilisées par le moteur)

docs/
└── new-client-checklist.md   procédure pour créer une nouvelle invitation
```

## Créer l'invitation d'un nouveau couple

Voir [`docs/new-client-checklist.md`](docs/new-client-checklist.md).

## Déploiement

Pour l'instant via GitHub : chaque dossier `clients/<slug>/` référence le
moteur de `template/` par chemin relatif, donc aucune étape de build n'est
nécessaire — le dépôt fonctionne tel quel une fois poussé.

## À venir

- Thèmes visuels additionnels (Romantique, Noir & Or, Cinématique) sur le
  même moteur — voir la section correspondante dans
  `docs/new-client-checklist.md`.
- Formulaire web qui génère un `config.js` à partir des infos saisies pour
  un nouveau client, en partant de la structure vide de
  `template/config.sample.js`.
