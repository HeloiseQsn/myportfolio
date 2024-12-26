import './footer.scss'
import Linkedin from '../../assets/images/linkedin.webp'

function Footer() {
  return (
    <footer>
      <div>
        <a href="#home" aria-label="Retour au début de la page">
          Retour en haut de la page
        </a>
      </div>
      <div className="Linkedinlink">
        <a
          href="https://www.linkedin.com/in/h%C3%A9lo%C3%AFse-quinson-b5b5587b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consulter le profil LinkedIn de Héloïse Quinson"
        >
          <img src={Linkedin} alt="Logo LinkedIn - Héloïse Quinson" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
