import { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSwipeable } from 'react-swipeable'
import { useNavigate } from 'react-router-dom'
import './diapo.scss'
import rightArrow from '../../assets/images/chevron_carousel_right.webp'
import leftArrow from '../../assets/images/chevron_carousel_left.webp'
import IsMobile from '../../utils/isMobile'

const VISIBLE_ITEMS = 4

function Diapo({ projects, onProjectClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const isMobile = IsMobile()
  const navigate = useNavigate()

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
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 500) // Durée de l'animation en millisecondes, ajustez selon vos besoins
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      nextPhoto()
    }, 3000) // Intervalle de 3 secondes, ajustez selon vos besoins
    return () => clearInterval(interval)
  }, [nextPhoto])

  const openProject = (project) => {
    if (isMobile) {
      navigate(`/project/${project.id}`)
    } else {
      onProjectClick(project)
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextPhoto,
    onSwipedRight: prevPhoto,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const getVisibleProjects = () => {
    const start = currentIndex
    const end = (currentIndex + VISIBLE_ITEMS) % projects.length
    if (start < end) {
      return projects.slice(start, end)
    } else {
      return [...projects.slice(start), ...projects.slice(0, end)]
    }
  }

  if (!projects.length) {
    return <div>No projects available</div>
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
            key={project.id}
            onClick={() => openProject(project)}
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
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onProjectClick: PropTypes.func.isRequired,
}

export default Diapo
