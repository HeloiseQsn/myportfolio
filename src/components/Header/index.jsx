import './header.scss'
import PropTypes from 'prop-types'
import Logodesktop from '../../assets/images/logo/Logo1250.webp'
import Logomobile from '../../assets/images/logo/Logo500.webp'

function Header({ openModal }) {
  return (
    <header>
      <picture>
        <source srcSet={Logodesktop} media="(min-width: 831px)" sizes="422px" />
        <source srcSet={Logomobile} media="(max-width: 830px)" sizes="146px" />
        <img src={Logodesktop} alt="Logo Héloïse Quinson" />
      </picture>
      <nav>
        <ul>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                openModal()
              }}
            >
              Contact{' '}
            </a>
          </li>
          <li>
            <a href="#projects">Mes projets</a>
          </li>
          <li>
            <a href="#about">Qui suis-je ?</a>
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
