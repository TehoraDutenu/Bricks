/* Préparer le canevas */

var canvas = document.getElementById("myCanvas"); /* Déclarer le canevas et son contexte */
var ctx = canvas.getContext("2d");

/* Dessiner */

/* Carré rouge */
ctx.beginPath(); /* Commencer le dessin d'un carré rouge */
ctx.rect(20, 40, 50, 50); /* Rectangle : x, y (coordonnées du coin en haut a gauche), largeur, hauteur */
ctx.fillStyle = "#FF0000"; /* Stocker la couleur du carré */
ctx.fill(); /* Remplir le carré */
ctx.closePath();

/* Cercle vert */
ctx.beginPath();
ctx.arc(240, 160, 50, 0, Math.PI * 2, false); /* x, y (centre de l'arc), rayon de l'arc, angle de depart, angle d'arrivée, sens de rotation (facultatif) */
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

/* Bordure rectangle bleu */
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "blue";
ctx.stroke();
ctx.closePath();
