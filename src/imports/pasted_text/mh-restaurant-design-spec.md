# Prompt de conception d'une maquette UI/UX moderne pour le site web "MH Restaurant & Bar avec Piscine"

Agis comme un designer UI/UX senior, expert en conception d'interfaces modernes et en expérience utilisateur. Conçois une maquette haut de gamme, élégante, responsive et intuitive pour le site web *MH Restaurant & Bar avec Piscine*.

Le design doit transmettre une image de luxe, de convivialité et de détente, avec une expérience utilisateur fluide sur ordinateur, tablette et mobile.

## Identité visuelle

Le style doit être :

* Moderne
* Élégant
* Premium
* Minimaliste
* Professionnel

### Palette de couleurs

* Noir profond (#111111)
* Blanc (#FFFFFF)
* Gris clair (#F5F5F5)
* Bleu turquoise (#25C4D8) rappelant la piscine

### Style graphique

* Grandes images immersives
* Coins arrondis
* Ombres douces
* Icônes modernes
* Animations fluides
* Effets Hover élégants
* Glassmorphism léger sur certaines cartes
* Typographie raffinée (Poppins, Playfair Display ou Montserrat)

---

# Navigation principale

Créer une barre de navigation fixe contenant :

* Accueil
* À propos
* Menu
* Piscine
* Réservations
* Contact

Bouton principal :

*Réserver maintenant*

---

# 1. Page Accueil

Créer une page d'accueil spectaculaire comprenant :

* Hero Banner plein écran
* Vidéo ou image du restaurant et de la piscine
* Logo MH Restaurant
* Slogan inspirant

Exemple :

*« Une expérience gastronomique d'exception dans un cadre unique. »*

Deux boutons :

* Découvrir le Menu
* Réserver une table

Puis afficher :

* Nos spécialités
* Nos services
* Pourquoi nous choisir
* Galerie
* Avis clients
* Call To Action

---

# 2. À propos

Inclure :

* Histoire du restaurant
* Notre vision
* Notre mission
* Nos valeurs
* Notre équipe
* Photos du restaurant

---

# 3. Le Menu

Créer une interface moderne avec des cartes de plats.

Catégories :

* Entrées
* Plats principaux
* Grillades
* Fruits de mer
* Desserts
* Cocktails
* Boissons
* Vins

Chaque plat affiche :

* Image
* Nom
* Description
* Prix
* Badge "Populaire" si nécessaire

Ajouter :

* Recherche instantanée
* Filtre par catégorie
* Animation lors du survol

---

# 4. Piscine

Créer une section premium présentant :

* Grandes photos
* Description
* Horaires
* Tarifs
* Services proposés
* Galerie
* Bouton "Réserver"

---

# 5. Réservations

Créer une interface intuitive avec un formulaire comprenant :

* Nom
* Prénom
* Téléphone
* Email
* Date
* Heure
* Nombre de personnes
* Type de réservation

Choix :

* Restaurant
* Piscine
* Restaurant + Piscine

Champ :

* Commentaire

Après validation :

Afficher un joli message de confirmation.

---

# 6. Contact

Inclure :

* Carte Google Maps
* Adresse
* Téléphone
* Email
* Horaires d'ouverture
* Réseaux sociaux

Formulaire :

* Nom
* Email
* Sujet
* Message

Bouton :

Envoyer

---

# Footer

Inclure :

* Logo MH
* Liens rapides
* Coordonnées
* Réseaux sociaux
* Newsletter
* Copyright
* Mentions légales
* Politique de confidentialité

---

# Interface Back-office Administrateur

Créer un tableau de bord professionnel inspiré des applications SaaS modernes.

Style :

* Sidebar sombre
* Dashboard clair
* Cartes statistiques
* Graphiques
* Tableau responsive

---

# Authentification Administrateur

Créer une page sécurisée comprenant :

## Connexion

* Adresse e-mail
* Mot de passe
* Bouton Se connecter
* Option "Se souvenir de moi"
* Bouton Déconnexion

---

## Création d'un compte administrateur

Le formulaire contient :

* Nom complet
* Adresse e-mail
* Mot de passe
* Confirmation du mot de passe

Seuls les administrateurs autorisés peuvent créer de nouveaux comptes administrateurs.

---

## Gestion du profil

Chaque administrateur peut :

* Modifier son nom
* Modifier son adresse e-mail
* Modifier son mot de passe
* Consulter ses informations personnelles

---

## Réinitialisation du mot de passe

Permettre la récupération du mot de passe via l'adresse e-mail avec l'envoi d'un lien sécurisé (fonctionnalité couramment associée aux comptes Google lorsque l'utilisateur utilise une adresse Gmail, mais ne dépendant pas de Google lui-même).

Le processus comprend :

* Saisie de l'adresse e-mail
* Envoi d'un lien sécurisé
* Définition d'un nouveau mot de passe

---

# Tableau de bord

Afficher :

* Nombre de plats
* Nombre de réservations
* Nombre de messages
* Nombre d'administrateurs

Afficher également :

* Dernières réservations
* Derniers messages

---

# Gestion du Menu

L'administrateur peut :

* Ajouter un plat
* Modifier un plat
* Supprimer un plat
* Ajouter une image
* Modifier le prix
* Modifier la catégorie
* Activer ou désactiver un plat

---

# Gestion des Réservations

Fonctionnalités :

* Voir toutes les réservations
* Rechercher
* Filtrer
* Confirmer
* Annuler
* Supprimer

---

# Gestion des Messages

Permettre :

* Lire
* Répondre
* Supprimer

---

# Gestion des Administrateurs

Le Super Administrateur peut :

* Créer un administrateur
* Modifier un administrateur
* Réinitialiser son mot de passe
* Désactiver un compte
* Supprimer un compte

---

# Paramètres du site

Permettre de modifier :

* Logo
* Nom du restaurant
* Adresse
* Téléphone
* Email
* Horaires
* Réseaux sociaux
* Images de la galerie
* Informations de contact

---

# Sécurité

Prévoir les bonnes pratiques suivantes :

* Authentification sécurisée
* Hachage des mots de passe (Argon2 ou bcrypt)
* Sessions sécurisées avec JWT ou cookies HTTPOnly
* Protection CSRF et XSS
* Validation des formulaires
* Contrôle des rôles (Super Administrateur / Administrateur)
* Journalisation des actions importantes (création, modification, suppression)

---

# Technologies recommandées

* Front-end : React.js ou Next.js
* Back-end : Node.js avec Express.js
* Base de données : PostgreSQL ou MySQL
* ORM : Prisma
* Authentification : JWT + bcrypt/Argon2 + récupération de mot de passe par e-mail
* Stockage des images : Cloudinary ou Firebase Storage
* Interface : Tailwind CSS avec composants Shadcn UI

---

# Résultat attendu

La maquette doit être élégante, cohérente, professionnelle et prête à être développée. Elle doit inclure tous les écrans du site public ainsi que l'intégralité du back-office, avec une expérience utilisateur fluide, des composants réutilisables, des animations modernes et une interface responsive offrant une expérience haut de gamme digne d'un restaurant de prestige.