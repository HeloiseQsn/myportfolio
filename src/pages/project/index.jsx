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
    } else {
      navigate('/') // Si le projet n'est pas trouvé, redirige vers la page d'accueil
    }
  }, [id, navigate]) // Exécute cet effet à chaque changement de 'id' ou 'navigate'

  if (!project) {
    return <div>Chargement...</div> // Affiche un indicateur de chargement si le projet n'est pas encore disponible
  }

  return (
    <div className="project-page">
      <button onClick={() => navigate('/')}>Retour</button>
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
