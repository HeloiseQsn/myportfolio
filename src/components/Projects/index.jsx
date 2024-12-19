import { useState } from 'react'
import './projects.scss'
import SliderItem from '../SliderItem'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ProjectModal from '../ProjectModal'

// Importation des données des projets
import projectData from '../../datas/projectData.json'

const CSS3 =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/CSS3.webp'
const Express =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/express.webp'
const Figma =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/figma.webp'
const HTML5 =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/html5.webp'
const JS =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/JS.webp'
const MongoDB =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/mongodb.webp'
const NodeJS =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/nodejs.webp'
const Notion =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/notion.webp'
const ReactImg =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/react.webp'
const VsCode =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/vscode.webp'
const Sass =
  'https://raw.githubusercontent.com/HeloiseQsn/myportfolio/refs/heads/master/src/assets/images/tools/sass.webp'

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

  // Fonction pour filtrer les projets en fonction des outils sélectionnés
  const filterProjects = () => {
    if (selectedTools.length === 0) {
      return projectData
    }
    return projectData.filter((project) =>
      selectedTools.every((toolUrl) => project.tools.includes(toolUrl)),
    )
  }

  // Fonction pour gérer les filtres (sélectionner un seul outil à la fois)
  const handleToolToggle = (toolUrl) => {
    setSelectedTools([toolUrl]) // Sélectionner seulement le filtre cliqué
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
    ({
      id,
      title,
      description,
      image,
      tools,
      imagesDiap,
      context,
      skills,
      challenges,
      githublink,
    }) => (
      <SliderItem
        key={id}
        content={
          <div
            className="carousel-item"
            onClick={() =>
              openModal({
                title,
                description,
                image,
                tools,
                imagesDiap,
                context,
                skills,
                challenges,
                githublink,
              })
            }
          >
            <div className="image-container">
              <img src={image} alt={title} />
            </div>
            <div className="informations_container">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        }
      />
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
              className={`filter-item ${selectedTools.includes(tool.logo) ? 'active' : ''}`}
              onClick={() => handleToolToggle(tool.logo)}
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
