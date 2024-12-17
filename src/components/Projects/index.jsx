import { useState } from 'react'
import './projects.scss'
import SliderItem from '../SliderItem'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ProjectModal from '../ProjectModal'

// // Importation des images

import bookiImg from '../../assets/images/projects/booki/bookiproj.webp'
import kasaImg from '../../assets/images/projects/kasa/kasaproj.webp'
import monVieuxGrimImg from '../../assets/images/projects/MVG/MVGproj.webp'
import ninaCarducciImg from '../../assets/images/projects/ninaCard/ninacarducciproj.webp'
import qwentaImg from '../../assets/images/projects/qwenta/qwentaproj.webp'
import sophieBluelImg from '../../assets/images/projects/sophieBl/sophiebluelproj.webp'

// import imgNC1 from '../../assets/projects/NinaCarducci/NCarducci-img1.jpg'
// import imgNC2 from '../../assets/projects/NinaCarducci/NCarducci-img2.jpg'
// import imgNC3 from '../../assets/projects/NinaCarducci/NCarducci-img3.jpg'

// import projectData from '../../datas/projectData.json'

import CSS3 from '../../assets/images/tools/CSS3.webp'
import Express from '../../assets/images/tools/express.webp'
import Figma from '../../assets/images/tools/figma.webp'
import HTML5 from '../../assets/images/tools/html5.webp'
import JS from '../../assets/images/tools/JS.webp'
import MongoDB from '../../assets/images/tools/mongodb.webp'
import NodeJS from '../../assets/images/tools/nodejs.webp'
import Notion from '../../assets/images/tools/notion.webp'
import ReactImg from '../../assets/images/tools/react.webp'
import VsCode from '../../assets/images/tools/vscode.webp'
import Sass from '../../assets/images/tools/sass.webp'

const allTools = [
  { name: 'HTML5', logo: HTML5 },
  { name: 'CSS3', logo: CSS3 },
  { name: 'JavaScript', logo: JS },
  { name: 'React', logo: ReactImg },
  { name: 'Node.js', logo: NodeJS },
  { name: 'Express', logo: Express },
  { name: 'MongoDB', logo: MongoDB },
  { name: 'VsCode', logo: VsCode },
  { name: 'Sass', logo: Sass },
  { name: 'Figma', logo: Figma },
  { name: 'Notion', logo: Notion },
]

function Projects() {
  const [selectedTools, setSelectedTools] = useState([]) // État pour gérer l'outil sélectionné dans les filtres
  const [selectedProject, setSelectedProject] = useState(null) // État pour gérer le projet sélectionné

  // Fonction pour récupérer l'image à partir du nom de fichier
  const getImage = (imageName) => {
    switch (imageName) {
      case 'booki.jpg':
        return bookiImg
      case 'kasa.webp':
        return kasaImg
      case 'monvieuxgrimoire.jpg':
        return monVieuxGrimImg
      case 'ninacarducci.webp':
        return ninaCarducciImg
      case 'Qwenta.jpg':
        return qwentaImg
      case 'sophiebluel.jpg':
        return sophieBluelImg
      case 'NCarducci-img1.jpg':
        return imgNC1
      case 'NCarducci-img2.jpg':
        return imgNC2
      case 'NCarducci-img3.jpg':
        return imgNC3
      default:
        return null // Ou une image par défaut si nécessaire
    }
  }

  // Fonction pour filtrer les projets en fonction des outils sélectionnés
  const filterProjects = () => {
    if (selectedTools.length === 0) {
      return projectData
    }
    return projectData.filter((project) =>
      selectedTools.every((tool) => project.tools.includes(tool)),
    )
  }

  // Fonction pour gérer les filtres (sélectionner un seul outil à la fois)
  const handleToolToggle = (toolName) => {
    setSelectedTools([toolName]) // Sélectionner seulement le filtre cliqué
  }

  // Fonction pour défiltrer
  const handleClearFilters = () => {
    setSelectedTools([])
  }

  // Ouvrir la modale en cliquant sur un projet
  const openModal = (project) => {
    setSelectedProject(project) // Ouvrir la modale avec les détails du projet sélectionné
  }

  // Fermer la modale
  const closeModal = () => {
    setSelectedProject(null)
  }

  // Génération des items du carousel filtré
  const items = filterProjects().map(
    ({ id, title, description, image, tools, imagesDiap }) => (
      <SliderItem key={id}>
        <div
          className="carousel-item"
          onClick={() =>
            openModal({ title, description, image, tools, imagesDiap })
          }
        >
          <div className="image-container">
            <img src={getImage(image)} alt={title} />
          </div>
          <div className="informations_container">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </SliderItem>
    ),
  )

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  return (
    <div className="projects-container">
      <div className="filters-container">
        <div className="tools-filter">
          {allTools.map((tool) => (
            <div
              key={tool.name}
              className={`filter-item ${selectedTools.includes(tool.name) ? 'active' : ''}`}
              onClick={() => handleToolToggle(tool.name)}
            >
              <img src={tool.logo} alt={tool.name} className="tool-logo" />
            </div>
          ))}
        </div>

        <button className="clear-filters-btn" onClick={handleClearFilters}>
          Réinitialiser les filtres
        </button>
      </div>

      <Carousel
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 0.5s ease-in-out"
        transitionDuration={700}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {items}
      </Carousel>

      {selectedProject && (
        <ProjectModal project={selectedProject} closeModal={closeModal} />
      )}
    </div>
  )
}

export default Projects
