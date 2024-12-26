import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import './carousel.scss'
import rightArrow from '../../assets/images/chevron_carousel_right.webp'
import leftArrow from '../../assets/images/chevron_carousel_left.webp'

function Carousel({ imagesDiap }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevPhoto = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagesDiap.length - 1 : prevIndex - 1,
    )
  }, [imagesDiap])

  const nextPhoto = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagesDiap.length - 1 ? 0 : prevIndex + 1,
    )
  }, [imagesDiap])

  if (!imagesDiap.length) {
    return <div>Pas d&apos;images disponibles</div>
  }

  return (
    <div className="carrousel" role="region" aria-label="Carousel d'images">
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

Carousel.propTypes = {
  imagesDiap: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Carousel
