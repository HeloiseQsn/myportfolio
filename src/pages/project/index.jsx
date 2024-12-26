// src/components/ProjectPage.js
import './project.scss'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import projectsData from '../../datas/projectData.json'
import Carousel from '../../components/Carousel'

function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)

  useEffect(() => {
    const project = projectsData.find((p) => p.id === parseInt(id))
    if (project) {
      setProject(project)
    } else {
      navigate('/')
    }
  }, [id, navigate])

  return (
    <div className="project-page">
      <button onClick={() => navigate(-1)}>Retour</button>
      <h1>{project.title}</h1>
      <p className="project-page__subtitle">{project.description}</p>
      <Carousel imagesDiap={project.imagesDiap} />
      <div className="project-page__description">
        <div className="project-page__description--context">
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
        <div className="project-page__description--competences">
          <h3>Compétences développées</h3>
          <div>{project.skills}</div>
        </div>
        <div className="project-page__description--challenges">
          <h3>Défis rencontrés</h3>
          <div>{project.challenges}</div>
        </div>
        <div className="project-page__description--tools">
          <h3>Outils utilisés</h3>
          <div className="project-page__description--tools--logo">
            {project.tools.map((tool, index) => (
              <img key={index} src={tool} alt={`tool-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
