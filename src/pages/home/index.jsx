import ProfileImage from '../../components/ProfileImg'
import Title from '../../components/Title'

function Home() {
  return (
    <div className="mainHome">
      <ProfileImage />
      <Title />
      <h2>Mes projets</h2>
      <h2>Qui suis-je ? </h2>
      <h2>Mes expériences</h2>
    </div>
  )
}

export default Home
