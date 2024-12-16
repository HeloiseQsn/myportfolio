import { useEffect } from 'react'
import './title.scss'

function Title() {
  useEffect(() => {
    const text = 'Bienvenue sur mon portfolio'
    const speed = 100 // Vitesse de frappe en millisecondes
    let textPos = 0 //début du texte = position 0

    function typewriter() {
      const destination = document.getElementById('typedtext')
      if (textPos < text.length) {
        destination.innerHTML = text.substring(0, textPos + 1) + '_' //ajout d'une lettre suivi d'un curseur
        textPos++ // ajout de +1 à chaque lettre ajoutée
        setTimeout(typewriter, speed) // Appeler la fonction à nouveau après un délai pour ajouter de nouveau une lettre
      } else {
        destination.innerHTML = text // Une fois que le nbre de lettres = total de lettres de la phrase, on affiche la phrase entière
      }
    }

    typewriter()
  }, []) // on éxécute l'animation une fois

  return (
    <div className="typewriter-container">
      <h1 id="typedtext"></h1>
    </div>
  )
}

export default Title
