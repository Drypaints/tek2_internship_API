# Projet d'introduction

Une série d'exercices pour introduire aux technologies utilisées dans le projet LesCourtiersBordelais.

La finalité de ce projet va être de créer **une API simple en NodeJS**, avec **une base de donnée MongoDB** qui va desservir **un front en React** et 
**une application hybride crée avec Ionic**.

On aussi s'introduire aux notions de testing et d'intégration continue.

Consignes à respecter :
* On essaye de respecter un workflow Git assez simple mais efficace pour pouvoir travailler en équipe en se basant sur des branches de fix/feature, des merge request et des rebase (pas de travail uniquement sur la branche master comme à tek ;) ) , un article intéressant sur le sujet : https://nvie.com/posts/a-successful-git-branching-model/
* Chaque exercice va correspondre à une nouvelle branche Git avec la notation : step_X avec X le numero de l'exercice
* Lorsqu'un exercice est terminé, il faudra push sur la branche correspondante et créer une merge request vers la branche master sur Gitlab (https://docs.gitlab.com/ee/gitlab-basics/add-merge-request.html)
* Pendant que je review le code qui sera push, tu pourras passer à l'exercice suivant en créant une nouvelle branche Git depuis la branche de l'exercice précédent
* Lorsque j'aurai fini ma review et qu'il y aura peut être des retours à traiter, il faudra revenir sur la branche de l'exercice, traiter les retour et push tes corrections
* Si dans le cas, où tu est déjà passé à l'exercice suivant, mais que tu as eu à traiter des retours sur la branche de l'exercice précédent il faudra, suite aux push des corrections sur la branche de l'exercice précédent, faire un git rebase sur l'exercice suivant pour faire rentrer tes modificaitons de l'exercice précedent dans ton exercice actuelle : git rebase previous_exo_branch (https://www.miximum.fr/blog/git-rebase/)

Les commandes ressembleront à quelque chose comme ça : 

```bash
# je crée une nouvelle branche pour mon exercice
$ git checkout -b step_1
# j'ai fini mes modifications et je les commit et push
$ git add .
$ git commit -am "step_1: new feature"
$ git push origin step_1
# je vais sur le repo sur Gitlab créer une MR (merge request) depuis ma branche à master
# en attendant les retours sur ma MR, je passe à l'exo suivant en créer une nouvelle branche depuis l'exo précédent
$ git checkout - b step_2
# j'ai reçu des retours à traiter sur ma MR je repasse donc sur la branche précédente
$ git checkout step_1
# je fais les modifications pour traiter les retour et je les repush comme précedemment
# je peux retourner sur ma deuxième branche
$ git checkout step_2
# mais il va falloir rebase sur la première branche pour pouvoir récupérer les modifs
$ git rebase step_1
# il va certainement y avoir des conflits à traiter, s'aider de mon lien sur les MR pour voir la méthodologie à suivre :)
```

# Exercice 1

Créer un script javascript éxecutable avec node en ligne de commande, qui prendre en paramètre un chemin vers un fichier texte et qui en affichera son contenu.
Il faudra gérer le cas où le fichier n'est pas accesible ou inexistant en lancant un message d'erreur à l'utilisateur.

Exemple : 
```bash
$node step_1.js ../text_file
$ "Contenu fichier text_file"
$node step_1.js invalide_file
$ "Ce fichier est invalide ou introuvable"
```

