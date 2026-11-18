# Créer l'invitation d'un nouveau client

Le moteur (CSS + JS dans `template/`) ne change jamais d'un client à l'autre.
Seul le dossier du client change.

1. **Dupliquer `clients/_example/`** sous `clients/<slug-du-nouveau-couple>/`.
   C'est un dossier client complet (mêmes champs que n'importe quel vrai
   client) mais rempli de valeurs fictives clairement marquées « exemple » —
   jamais les données d'un client réel. Son `index.html` est le même pour
   tout le monde, pas besoin de le réécrire.

2. **Remplacer les photos** dans `clients/<slug>/img/` par celles du nouveau
   couple :
   - garder les mêmes noms de fichiers (`photo-1.jpg`, `photo-2.jpg`…) pour
     n'avoir rien à changer dans `config.js`, OU
   - leur donner d'autres noms et mettre à jour les chemins dans
     `CONFIG.galerie`.
   - Conseil : recadrer/compresser les photos avant (max ~1100px de long
     côté, JPEG qualité ~78) pour que la page reste rapide.

3. **Remplacer le fichier audio** dans `clients/<slug>/audio/` par le morceau
   définitif du couple, et mettre à jour `CONFIG.musique.fichier` si le nom
   change.

4. **Remplir `clients/<slug>/config.js`** avec les informations du nouveau
   couple (prénoms, familles, dates, lieux, dress code, message de
   clôture...), en remplaçant chaque valeur d'exemple. `template/config.sample.js`
   contient la même structure totalement vide, utile comme référence ou pour
   un script/formulaire qui génère un `config.js` automatiquement.

5. **Publier.** Pour l'instant via GitHub : `clients/<slug>/index.html`
   référence le moteur partagé par chemin relatif (`../../template/...`),
   donc tout fonctionne tel quel une fois le dossier poussé sur le dépôt —
   aucune étape de build.

Le cachet de cire doré (`template/img/wax-seal.png`) et toute l'identité
visuelle "Ivory & Gold" (`template/css/theme-ivory-gold.css`) sont des
éléments de marque Bave Pictures : ils restent identiques d'un couple à
l'autre, sauf demande contraire.

## Ajouter un nouveau thème visuel

1. Copier `template/css/theme-ivory-gold.css` vers `template/css/theme-<nom>.css`
   et y changer les jetons de couleur (`--bg-ivory`, `--card`, `--ink`, `--gold`...)
   et les décors (`body::before`, `body::after`).
2. Dans le `index.html` du client concerné, remplacer la dernière feuille de
   style par le nouveau fichier :
   `<link rel="stylesheet" href="../../template/css/theme-<nom>.css">`
3. `base.css`, `layout.css` et `components.css` n'ont besoin d'aucune
   modification : ils ne font que lire les variables du thème actif.
