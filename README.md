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

    Le CSS est fait main (oui, j'ai passé trop de temps sur les border-radius)

Pour l'installer

Backend :
bash

cd backend
npm install
npm run dev

Frontend :
bash

cd frontend
npm install
npm run dev

Pourquoi j'ai fait comme ça ?

    Fastify : Parce que j'avais envie d'essayer et c'était cool

    Pas de DB : Les données vivent en mémoire (ça me fait une variable globale de plus à gérer)

    Zod : Pour valider les inputs et éviter les surprises

    React Query : J'ai pas eu le temps mais je l'aurais mis si j'avais 2h de plus

Screenshot

https://./screenshot.png (J'ai mis un screenshot dégueu pris avec mon tel)
