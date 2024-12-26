import { useState, useMemo } from 'react'
import './projects.scss'
import ProjectModal from '../ProjectModal'
import Diapo from '../Diapo'

// Importation des données des projets
import projectData from '../../datas/projectData.json'

// URLs des images de logos
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
  const [selectedTools, setSelectedTools] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)

  // Utilisation de useMemo pour éviter de recalculer filteredProjects à chaque render
  const filteredProjects = useMemo(() => {
    if (selectedTools.length === 0) {
      return projectData
    }
    return projectData.filter((project) =>
      selectedTools.every((toolUrl) => project.tools.includes(toolUrl)),
    )
  }, [selectedTools]) // Se déclenche uniquement lorsque selectedTools change

  const handleToolToggle = (toolUrl) => {
    setSelectedTools((prev) =>
      prev.includes(toolUrl)
        ? prev.filter((url) => url !== toolUrl)
        : [...prev, toolUrl],
    )
  }

  const handleClearFilters = () => {
    setSelectedTools([])
  }

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <div>
      <div className="projects__filters">
        <div
          className="projects__filters--tools"
          role="region"
          aria-labelledby="tools-filter"
        >
          {allTools.map((tool) => (
            <div
              key={tool.name}
              className={`projects__filters--tools--item ${selectedTools.includes(tool.logo) ? 'active' : ''}`}
              onClick={() => handleToolToggle(tool.logo)}
              role="button"
              aria-pressed={selectedTools.includes(tool.logo)}
              tabIndex="0"
              aria-label={`Filtrer par ${tool.name}`}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleToolToggle(tool.logo)
              }
            >
              <img src={tool.logo} alt={tool.name} loading="lazy" />
            </div>
          ))}
        </div>

        <button
          className="projects__filters--clear"
          onClick={handleClearFilters}
          aria-label="Réinitialiser les filtres"
        >
          Réinitialiser les filtres
        </button>
      </div>

      <Diapo projects={filteredProjects} onProjectClick={openModal} />

      {selectedProject && (
        <ProjectModal project={selectedProject} closeModal={closeModal} />
      )}
    </div>
  )
}

export default Projects
