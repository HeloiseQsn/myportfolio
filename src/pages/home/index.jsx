import './home.scss'
import ProfileImage from '../../components/ProfileImg'
import Title from '../../components/Title'
import Projects from '../../components/Projects'

function Home() {
  return (
    <main className="main-home">
      <ProfileImage />
      <Title />
      <h2 id="projects">Mes projets</h2>
      <Projects />
      <h2 id="about">Qui suis-je ? </h2>
      <h2 id="experiences">Mes expériences</h2>
    </main>
  )
}

export default Home
