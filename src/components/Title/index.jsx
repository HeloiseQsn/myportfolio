import { useEffect } from 'react'

function Title() {
  useEffect(() => {
    const text = 'Bienvenue sur mon portfolio'
    const speed = 100 // Vitesse de frappe en millisecondes
    let textPos = 0 // Début du texte = position 0

    function typewriter() {
      const destination = document.getElementById('title')
      if (textPos < text.length) {
        destination.innerHTML = text.substring(0, textPos + 1) + '_' // Ajout d'une lettre suivi d'un curseur
        textPos++ // Ajout de +1 à chaque lettre ajoutée
        setTimeout(typewriter, speed) // Appeler la fonction à nouveau après un délai pour ajouter de nouveau une lettre
      } else {
        destination.innerHTML = text // Une fois que le nombre de lettres = total de lettres de la phrase, on affiche la phrase entière
      }
    }

    typewriter()
  }, []) // On exécute l'animation une fois

  return (
    <div className="title__container">
      <h1
        id="title"
        className="title__container--text"
        aria-live="polite" // Annonce le texte au fur et à mesure de son apparition
        aria-atomic="true" // Annonce le changement complet du contenu du titre
      ></h1>
    </div>
  )
}

export default Title
