import { NavLink } from 'react-router-dom'
import './header.scss'
import Logodesktop from '../../assets/images/logo/Logo1250.webp'
import Logomobile from '../../assets/images/logo/Logo500.webp'

function Header() {
  return (
    <header>
      <picture>
        <source srcSet={Logodesktop} media="(min-width: 831px)" sizes="422px" />
        <source srcSet={Logomobile} media="(max-width: 830px)" sizes="146px" />
        <img src={Logodesktop} alt="Logo Héloïse Quinson" />
      </picture>
      <nav>
        <ul>
          <NavLink to="/contact">Contact</NavLink>
          <li>
            <a href="#projects">Mes projets</a>
          </li>
          <li>
            <a href="#about">Qui suis-je ?</a>
          </li>
          <li>
            <a href="#experiences">Mes expériences</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
