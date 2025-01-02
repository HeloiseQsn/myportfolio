import { useState, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSwipeable } from 'react-swipeable' // Importation de useSwipeable pour gérer les gestes de balayage
import { useNavigate } from 'react-router-dom'
import './diapo.scss'
import rightArrow from '../../assets/images/chevron_carousel_right.webp'
import leftArrow from '../../assets/images/chevron_carousel_left.webp'
import IsMobile from '../../utils/isMobile'

const VISIBLE_ITEMS = 4

function Diapo({ projects, onProjectClick }) {
  const [currentIndex, setCurrentIndex] = useState(0) // État pour suivre l'index de l'élément courant
  const [isAnimating, setIsAnimating] = useState(false) // État pour indiquer si une animation est en cours
  const isMobile = IsMobile() // Vérification si l'utilisateur est sur un appareil mobile
  const navigate = useNavigate() // Hook pour naviguer vers une autre page
  const intervalRef = useRef(null) // Référence pour stocker l'intervalle de défilement automatique

  const prevPhoto = useCallback(() => {
    if (isAnimating) return // Si une animation est en cours, ne rien faire
    setIsAnimating(true)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1,
    ) // Décrémenter l'index ou revenir au dernier élément si au début
  }, [isAnimating, projects.length])

  // Fonction pour afficher la photo suivante
  const nextPhoto = useCallback(() => {
    if (isAnimating) return // Si une animation est en cours, ne rien faire
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length) // Incrémenter l'index ou revenir au premier élément si à la fin
  }, [isAnimating, projects.length])

  // Utilisation de useEffect pour réinitialiser isAnimating après une durée d'animation
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  //Défilement automatique des projets
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextPhoto() // Passer à la photo suivante toutes les 3 secondes
    }, 3000)
    return () => clearInterval(intervalRef.current)
  }, [nextPhoto])

  // Fonction pour ouvrir un projet, soit en naviguant vers une nouvelle page, soit en déclenchant onProjectClick
  const openProject = (project) => {
    if (isMobile) {
      navigate(`/project/${project.id}`) // Naviguer vers la page du projet si sur mobile
    } else {
      onProjectClick(project) // Déclencher onProjectClick sinon
    }
  }

  // Configuration des gestionnaires de balayage
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextPhoto, // Passer à la photo suivante en balayant vers la gauche
    onSwipedRight: prevPhoto, // Passer à la photo précédente en balayant vers la droite
    preventDefaultTouchmoveEvent: true, // Empêcher le défilement par défaut
    trackMouse: true, // Suivre les gestes de la souris
  })

  // Fonction pour obtenir les projets visibles en fonction de l'index actuel
  const getVisibleProjects = () => {
    const start = currentIndex
    const end = (currentIndex + VISIBLE_ITEMS) % projects.length
    return start < end
      ? projects.slice(start, end) // Si start < end, retourner la tranche de projets visible
      : [...projects.slice(start), ...projects.slice(0, end)] // Sinon, combiner les deux tranches
  }

  if (!projects.length) {
    return (
      <div className="error">
        Pas de projet disponible avec ces technologies combinées.
      </div>
    )
  }

  const showNavigationButtons = projects.length > VISIBLE_ITEMS

  // Rendu du composant Diapo
  return (
    <div
      className="diapo"
      {...swipeHandlers}
      aria-live="polite"
      aria-atomic="true"
    >
      {showNavigationButtons && (
        <button
          className="diapo__button diapo__button--left"
          onClick={prevPhoto}
          aria-label="Diapo précédent"
        >
          <img src={leftArrow} alt="Flèche précédente" />
        </button>
      )}
      <div className="diapo__projects">
        {getVisibleProjects().map((project, index) => (
          <div
            key={project.id}
            onClick={() => openProject(project)}
            className={`diapo__projects--card ${index === 0 ? 'active' : ''}`}
            tabIndex={0}
            aria-label={`Projet ${index + 1}: ${project.title}`}
          >
            <div className="diapo__projects--card--image-container">
              <img src={project.image} alt={`Projet ${index + 1}`} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      {showNavigationButtons && (
        <button
          className="diapo__button diapo__button--right"
          onClick={nextPhoto}
          aria-label="Diapo suivante"
        >
          <img src={rightArrow} alt="Flèche suivante" />
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
