import './footer.scss'
import Linkedin from '../../assets/images/linkedin.webp'

function Footer() {
  return (
    <footer>
      <div>Retour haut de page</div>
      <div className="Linkedinlink">
        <a href="https://www.linkedin.com/in/h%C3%A9lo%C3%AFse-quinson-b5b5587b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
          <img src={Linkedin} alt="lien vers Linkedin" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
