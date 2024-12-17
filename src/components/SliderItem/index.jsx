import PropTypes from 'prop-types'
import './sliderItem.scss'

function SliderItem({ content }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
      {content}
    </div>
  )
}

// Validation des props
SliderItem.propTypes = {
  content: PropTypes.node.isRequired, // Assure que 'content' est un élément React ou autre type valide
}

export default SliderItem
