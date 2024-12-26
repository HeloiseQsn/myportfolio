// src/components/ProjectPage.js
import './project.scss'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import projectsData from '../../datas/projectData.json'
import Carousel from '../../components/Carousel'

function ProjectPage() {
  const { id } = useParams() // Récupère le paramètre 'id' de l'URL
  const navigate = useNavigate() // Hook pour naviguer entre les pages
  const [project, setProject] = useState(null) // État pour stocker les données du projet

  useEffect(() => {
    const project = projectsData.find((p) => p.id === parseInt(id)) // Trouve le projet avec l'ID correspondant
    if (project) {
      setProject(project) // Si le projet est trouvé, met à jour l'état
      document.title = project.title // Met à jour le titre de la page avec le titre du projet
    } else {
      navigate('/') // Si le projet n'est pas trouvé, redirige vers la page d'accueil
    }
  }, [id, navigate]) // Exécute cet effet à chaque changement de 'id' ou 'navigate'

  return (
    <div className="project-page">
      <button
        onClick={() => navigate(-1)}
        aria-label="Retour à la page précédente"
      >
        Retour
      </button>
      <h1 tabIndex="0">{project.title}</h1>{' '}
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
            aria-label={`Voir les livrables du projet sur Github : ${project.title}`}
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
              <img
                key={index}
                src={tool}
                alt={`Logo de l'outil ${index + 1}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
