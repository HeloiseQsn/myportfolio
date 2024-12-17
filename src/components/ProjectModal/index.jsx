import PropTypes from 'prop-types'
import Carousel from '../Carousel'
import './projectmodal.scss'

function ProjectModal({ project, closeModal }) {
  const handleOutsideClick = (event) => {
    if (event.target.className === 'modal') {
      closeModal()
    }
  }

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          X
        </span>
        <h2>{project.title}</h2>
        <p>{project.description}</p>

        <Carousel imagesDiap={project.imagesDiap} />
        <div className="modal-content-description">
          <div className="projectcontext">
            <h3>Contexte du projet</h3>
            <p className="githubLink">Accéder au code du projet sur Github</p>
          </div>
          <div className="projectcompetences">
            <h3>Compétences développées</h3>
          </div>
          <div className="projectdefis">
            <h3>Défis rencontrés</h3>
          </div>
          <div className="tools-container">
            {' '}
            <h3>Outils utilisés</h3>
            {project.tools.map((tool, index) => (
              <img
                key={index}
                src={tool}
                alt={`tool-${index}`}
                className="tool-logo"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Validation des props
ProjectModal.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagesDiap: PropTypes.array.isRequired,
    tools: PropTypes.array.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired, // Fonction pour fermer la modal
}

export default ProjectModal
