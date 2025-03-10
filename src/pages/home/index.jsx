import './home.scss'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileImage from '../../components/ProfileImg'
import Title from '../../components/Title'
import ContactForm from '../../components/Contactform'
import Projects from '../../components/Projects'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import IsMobile from '../../utils/isMobile'

// Configuration de l'élément racine pour la modale afin de respecter les règles d'accessibilité
Modal.setAppElement('#root')

function Home() {
  // État pour contrôler l'ouverture et la fermeture de la modale de contact
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Vérification si l'utilisateur utilise un appareil mobile
  const isMobile = IsMobile()
  // Hook pour la navigation entre les pages
  const navigate = useNavigate()

  // Fonction pour ouvrir la modale de contact ou rediriger vers la page contact sur mobile
  const openModal = () => {
    if (isMobile) {
      navigate('/contact') // Redirection sur mobile
    } else {
      setIsModalOpen(true) // Ouverture de la modale sur desktop
    }
  }

  // Fonction pour fermer la modale
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Effet pour gérer le focus sur le premier élément de la modale lors de son ouverture
  useEffect(() => {
    if (isModalOpen) {
      const firstInput = document.querySelector('input, textarea, button')
      firstInput && firstInput.focus() // Mise au focus du premier champ de la modale
    }
  }, [isModalOpen])

  return (
    <div>
      <Header openModal={openModal} />
      <main className="home" id="home">
        <ProfileImage />
        <Title />
        <h2 id="projects">Mes projets</h2>
        <Projects />
        <h2 id="about">Qui suis-je ?</h2>
        <div className="about">
          <p>
            Je m&apos;appelle Héloïse, j&apos;ai 34 ans et je suis en
            reconversion dans le développement web 😊. Passionnée de musique, de
            danse et culture bretonne, j&apos;ai fait mes premiers pas dans la
            vie active en tant que professeure de harpe celtique. Expérience qui
            aura duré un an, le temps de réaliser que j'avais envie d'autre chose.
          </p>
          <p>
            J&apos;ai donc repris une voie un peu plus conventionnelle, en
            intégrant un BTS Assistante de gestion PME/PMI, qui m&apos;a conduit
            vers les Ressources Humaines. Après 3 ans d&apos;alternance dans le
            cadre d&apos;une licence et d&apos;un master RH, j&apos;ai occupé
            pendant 7 ans des postes d&apos;Assistante RH en industries
            agro-alimentaire (coopérative laitière) et de production de cartons.
          </p>
          <p>
            Je dois avouer que les dernières années, je m&apos;arrangeais
            toujours pour trouver des petites choses à développer à mon niveau
            (notamment sur Excel) pour faciliter mon quotidien et celui de mon
            équipe. Je dois aussi avouer que je préférais les développer que les
            utiliser 🤫.
          </p>
          <p>
            Puis je suis devenue maman, une merveilleuse et intense expérience. J&apos;ai eu envie
            de me reconcentrer sur l&apos;essentiel et la question de la
            reconversion a été au centre de mes réflexions. J&apos;avais très
            très envie de tenter le développement web. Pour acquérir les
            premières bases, je me suis inscrite à la{' '}
            <a
              href="https://openclassrooms.com/fr/paths/899-developpeur-web?utm_source=google&utm_medium=cpc&utm_campaign=display_google_fr_fr_b2c_prospecting_perf-max-track-developpement_230117_00_adgroup-is-&utm_source=google&utm_medium=cpc&gad_source=1&gclid=CjwKCAiA34S7BhAtEiwACZzv4dRHEparGKGDAoIEFsUnmXbKGEzCVSzvf3FaaCFGQ1ikExIDu4D9LhoCBqoQAvD_BwE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Formation Développement web d'OpenClassRoom"
            >
              formation Développement web
            </a>{' '}
            d&apos;OpenClassRoom.
          </p>
          <p>
            Je souhaite désormais trouver mon premier poste de Développeuse sur
            le bassin Rennais. Si vous êtes à la recherche d&apos;une candidate
            motivée et enthousiaste, qui ne demande qu&apos;à apprendre
            davantage, n&apos;hésitez pas à me contacter 😊 !
          </p>
        </div>
        <div className="contact">
          <button
            onClick={openModal}
            aria-label="Ouvrir le formulaire de contact"
          >
            Me contacter
          </button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Formulaire de contact"
          aria-labelledby="contact-modal-title"
          aria-describedby="contact-modal-description"
        >
          <div className="close">
            <button
              onClick={closeModal}
              aria-label="Fermer la fenêtre de contact"
            >
              Fermer
            </button>
          </div>
          <ContactForm closeModal={closeModal} />
        </Modal>
      </main>
      <Footer />
    </div>
  )
}

export default Home
