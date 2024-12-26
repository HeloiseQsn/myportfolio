import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import './carousel.scss'
import rightArrow from '../../assets/images/chevron_carousel_right.webp'
import leftArrow from '../../assets/images/chevron_carousel_left.webp'

function Carousel({ imagesDiap = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0) //initialisation à 0 de la variable index courant

  const prevPhoto = useCallback(() => {
    //mémorisation de la fonction avec useCallback pour éviter renders inutiles
    setCurrentIndex(
      (
        prevIndex, //si index = 0, on retourne à la dernière photo du carousel, sinon index courant - 1
      ) => (prevIndex === 0 ? imagesDiap.length - 1 : prevIndex - 1),
    )
  }, [imagesDiap])

  const nextPhoto = useCallback(() => {
    setCurrentIndex(
      (
        prevIndex, //si index = total des images -1, retour à la 1ère photo, sinon index +1
      ) => (prevIndex === imagesDiap.length - 1 ? 0 : prevIndex + 1),
    )
  }, [imagesDiap])

  if (!imagesDiap.length) {
    return <div>Pas d&apos;images disponibles</div>
  }

  return (
    <div className="carrousel" role="region" aria-label="Carousel d'images">
      {imagesDiap.length > 1 && ( // Si plus d'une image, affiche le bouton pour aller à la photo précédente
        <button
          className="carrousel__button carrousel__button--left"
          onClick={prevPhoto} // au clic, appel de la fonction prev photo
          aria-label="Image précédente"
        >
          <img src={leftArrow} alt="flèche précédente" />
        </button>
      )}
      <div className="carrousel__images">
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
      {imagesDiap.length > 1 && ( // Si plus d'une image, affiche le numéro de l'image courante / total des images
        <div className="carrousel__numslide" aria-live="polite">
          {`${currentIndex + 1} / ${imagesDiap.length}`}
        </div>
      )}
      {imagesDiap.length > 1 && ( // Si plus d'une image, affiche le bouton pour aller à la photo suivante
        <button
          className="carrousel__button carrousel__button--right"
          onClick={nextPhoto} // Appelle 'nextPhoto' au clic
          aria-label="Image suivante"
        >
          <img src={rightArrow} alt="flèche suivante" />
        </button>
      )}
    </div>
  )
}

// Validation des props pour s'assurer que 'imagesDiap' est un tableau de chaînes de caractères
Carousel.propTypes = {
  imagesDiap: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Carousel
