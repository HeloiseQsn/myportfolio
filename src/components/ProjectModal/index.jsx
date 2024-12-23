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
      <div className="modal__content">
        <div className="close">
          <button onClick={closeModal}>Fermer</button>
        </div>
        <h2>{project.title}</h2>
        <p className="modal__content--subtitle">{project.description}</p>

        <Carousel imagesDiap={project.imagesDiap} />

        <div className="modal__content--description">
          <div className="modal__content--description--context">
            <h3>Contexte du projet</h3>
            <div className="github">{project.context}</div>
            <a
              href={project.githublink}
              className="githubLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accéder aux livrables du projet sur Github
            </a>
          </div>
          <div className="modal__content--description--competences">
            <h3>Compétences développées</h3>
            <div>{project.skills}</div>
          </div>
          <div className="modal__content--description--challenges">
            <h3>Défis rencontrés</h3>
            <div>{project.challenges}</div>
          </div>
          <div className="modal__content--description--tools">
            <h3>Outils utilisés</h3>
            <div className="modal__content--description--tools--logo">
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
