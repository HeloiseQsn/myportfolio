import './header.scss'
import PropTypes from 'prop-types'
import Logodesktop from '../../assets/images/logo/Logo1250.webp'
import Logomobile from '../../assets/images/logo/Logo500.webp'

function Header({ openModal }) {
  const handleContactClick = (e) => {
    e.preventDefault()
    openModal()
  }

  return (
    <header>
      <picture>
        <source srcSet={Logodesktop} media="(min-width: 831px)" sizes="422px" />
        <source srcSet={Logomobile} media="(max-width: 830px)" sizes="146px" />
        <img src={Logodesktop} alt="Logo Héloïse Quinson" />
      </picture>
      <nav aria-label="Navigation principale">
        <ul>
          <li>
            <a
              href="#contact"
              onClick={handleContactClick}
              aria-label="Ouvrir le formulaire de contact"
            >
              Contact
            </a>
          </li>
          <li>
            <a href="#projects" aria-label="Voir mes projets">
              Mes projets
            </a>
          </li>
          <li>
            <a href="#about" aria-label="En savoir plus">
              Qui suis-je ?
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  openModal: PropTypes.func.isRequired,
}

export default Header
