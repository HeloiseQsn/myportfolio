import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from '../pages/home'
import Contact from '../pages/contact'
import Project from '../pages/project'
import Error from '../pages/error'

function RoutesPortfolio() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default RoutesPortfolio
