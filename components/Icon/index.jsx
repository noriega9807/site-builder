import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IconStyle, IconSize } from '/styles/alias/Icon'

const Icon = ({ style, icon, color, size }) => {
  return <FontAwesomeIcon color={color} size={size} icon={[style, icon]} />
}

Icon.propTypes = {
  style: PropTypes.oneOf(Object.keys(IconStyle)).isRequired, 
  icon: PropTypes.string.isRequired, 
  color: PropTypes.string, 
  size: PropTypes.oneOf(IconSize) 
}

Icon.defaultProps = {
  color: null,
  size: '1x'
}

export default Icon