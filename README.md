Task Manager App

Comment ça marche ?
Backend (Fastify)

    /tasks :

        GET → Récupère toutes les tâches

        POST → Crée une tâche (faut lui envoyer un title et optionnellement une description)

    /tasks/:id :

        DELETE → Supprime la tâche (sans pitié)

        PATCH → Change le status (pending/done)

Petit plus : J'ai ajouté un endpoint /tasks/:id/toggle qui switch le status automatiquement.
Frontend (React)

    Une liste de tâches simple

    Un formulaire pour en ajouter

    Boutons pour delete et changer le status

Installation locale
1. Clone le repo
bash

git clone https://github.com/celina-coding/TasksManagementApplication.git
cd TasksManagementApp

2. Setup le Backend
bash

cd backend
npm install
npm run dev
# Le serveur tourne sur http://localhost:3000

3. Setup le Frontend
bash

cd ../frontend
npm install
npm run dev
# L'app se lance sur http://localhost:5173