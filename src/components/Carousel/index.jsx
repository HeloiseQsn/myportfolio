import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import './carousel.scss'
import rightArrow from '../../assets/images/chevron_carousel_right.webp'
import leftArrow from '../../assets/images/chevron_carousel_left.webp'

function Carousel({ imagesDiap }) {
  const [currentIndex, setCurrentIndex] = useState(0) // déclaration de l'état pour gérer l'index de l'image courante, par défaut = 0

  // Utilisation de useCallback pour mémoriser la fonction et éviter les re-renders inutiles
  const prevPhoto = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      // Si l'index actuel est 0, on revient à la dernière image, sinon on décrémente l'index de 1
      prevIndex === 0 ? imagesDiap.length - 1 : prevIndex - 1,
    )
  }, [imagesDiap])

  const nextPhoto = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      // Si l'index actuel est le dernier, on revient à la première image, sinon on incrémente l'index de 1
      prevIndex === imagesDiap.length - 1 ? 0 : prevIndex + 1,
    )
  }, [imagesDiap])

  if (!imagesDiap.length) {
    return <div>Pas d&apos;images disponibles</div> // si pas d'image dispo, affichage de ce message
  }

  // Rendu du composant Carousel
  return (
    <div className="carrousel" role="region" aria-label="Carousel d'images">
      {/* Affichage des boutons de navigation uniquement si plus d'une image est disponible */}
      {imagesDiap.length > 1 && (
        <button
          className="carrousel__button carrousel__button--left"
          onClick={prevPhoto}
          aria-label="Image précédente"
        >
          <img src={leftArrow} alt="flèche précédente" />
        </button>
      )}
      <div className="carrousel__images">
        {/* Boucle sur les images et affichage de chaque image */}
        {imagesDiap.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1} sur ${imagesDiap.length}`}
            className={`carrousel__image ${index === currentIndex ? 'active' : ''}`}
            aria-hidden={index !== currentIndex}
          />
        ))}
      </div>
      {/* Affichage de l'indicateur de position uniquement si plus d'une image est disponible */}
      {imagesDiap.length > 1 && (
        <div className="carrousel__numslide" aria-live="polite">
          {`${currentIndex + 1} / ${imagesDiap.length}`}
        </div>
      )}
      {imagesDiap.length > 1 && (
        <button
          className="carrousel__button carrousel__button--right"
          onClick={nextPhoto}
          aria-label="Image suivante"
        >
          <img src={rightArrow} alt="flèche suivante" />
        </button>
      )}
    </div>
  )
}

// Définition des propTypes pour valider les props du composant
Carousel.propTypes = {
  imagesDiap: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Carousel
