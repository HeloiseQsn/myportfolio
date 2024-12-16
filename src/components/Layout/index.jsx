import PropTypes from 'prop-types' //pour validation des props
import './layout.scss'
import Header from '../Header'
import Footer from '../Footer'

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired, //pour éviter erreur EsLint : on valide que children peut-être n'importe quel type de rendu react + on rend la props obligatoire
}

export default Layout
