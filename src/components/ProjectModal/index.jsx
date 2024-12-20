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
        <p className="subtitle">{project.description}</p>

        <Carousel imagesDiap={project.imagesDiap} />

        <div className="modal-content-description">
          <div className="projectcontext">
            <h3>Contexte du projet</h3>
            <div className="github">{project.context}</div>
            <a
              href={project.githublink}
              className="githubLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accéder au code du projet sur Github
            </a>
          </div>
          <div className="projectcompetences">
            <h3>Compétences développées</h3>
            <div>{project.skills}</div>
          </div>
          <div className="projectdefis">
            <h3>Défis rencontrés</h3>
            <div>{project.challenges}</div>
          </div>
          <div className="tools-container">
            <h3>Outils utilisés</h3>
            <div className="img_container">
              {project.tools.map((tool, index) => (
                <img key={index} src={tool} alt={`tool-${index}`} />
              ))}
            </div>
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
    imagesDiap: PropTypes.arrayOf(PropTypes.string).isRequired,
    tools: PropTypes.arrayOf(PropTypes.string).isRequired,
    githublink: PropTypes.string.isRequired,
    context: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    challenges: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ProjectModal
