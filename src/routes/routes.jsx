import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from '../pages/home'
import Error from '../pages/error'

function RoutesPortfolio() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default RoutesPortfolio
