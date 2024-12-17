import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
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

        <Carousel
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 1024 },
              items: 1,
            },
            desktop: {
              breakpoint: { max: 1024, min: 768 },
              items: 1,
            },
            tablet: {
              breakpoint: { max: 768, min: 464 },
              items: 1,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 0.5s ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {project.imagesDiap.map((image, index) => (
            <img key={index} src={image} alt={`slide-${index}`} />
          ))}
        </Carousel>

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
