import './home.scss'
import ProfileImage from '../../components/ProfileImg'
import Title from '../../components/Title'

function Home() {
  return (
    <main className="main-home">
      <ProfileImage />
      <Title />
      <h2>Mes projets</h2>
      <h2>Qui suis-je ? </h2>
      <h2>Mes expériences</h2>
    </main>
  )
}

export default Home
