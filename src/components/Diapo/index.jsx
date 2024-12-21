import PropTypes from 'prop-types'
import { useState, useCallback, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import './diapo.scss'
import rightArrow from '../../assets/images/chevron_carousel_right.webp'
import leftArrow from '../../assets/images/chevron_carousel_left.webp'

const VISIBLE_ITEMS = 4

function Diapo({ projects, onProjectClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 800)

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 800)
  }

  useEffect(() => {
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const prevPhoto = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1,
    )
  }, [isAnimating, projects.length])

  const nextPhoto = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }, [isAnimating, projects.length])

  useEffect(() => {
    if (!isSmallScreen) {
      const interval = setInterval(() => {
        nextPhoto()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [nextPhoto, isSmallScreen])

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setIsAnimating(false)
      }, 600)
      return () => clearTimeout(timeout)
    }
  }, [isAnimating])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextPhoto,
    onSwipedRight: prevPhoto,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  if (!projects.length) {
    return <div>No projects available</div>
  }

  const getVisibleProjects = () => {
    const start = currentIndex
    const end = (currentIndex + VISIBLE_ITEMS) % projects.length
    if (start < end) {
      return projects.slice(start, end)
    } else {
      return [...projects.slice(start), ...projects.slice(0, end)]
    }
  }

  return (
    <div className="diapo" {...swipeHandlers}>
      {projects.length > VISIBLE_ITEMS && (
        <button
          className="diapo__button diapo__button--left"
          onClick={prevPhoto}
        >
          <img src={leftArrow} alt="previous arrow" />
        </button>
      )}
      <div className="diapo__projects">
        {getVisibleProjects().map((project, index) => (
          <div
            key={index}
            onClick={() => onProjectClick(project)}
            className={`diapo__projects--card ${index === 0 ? 'active' : ''}`}
          >
            <div className="diapo__projects--card--image-container">
              <img src={project.image} alt={`Project ${index + 1}`} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      {projects.length > VISIBLE_ITEMS && (
        <button
          className="diapo__button diapo__button--right"
          onClick={nextPhoto}
        >
          <img src={rightArrow} alt="next arrow" />
        </button>
      )}
    </div>
  )
}

Diapo.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onProjectClick: PropTypes.func.isRequired,
}

export default Diapo
