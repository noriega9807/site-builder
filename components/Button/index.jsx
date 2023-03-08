import PropTypes from 'prop-types'

import { ButtonTheme, ButtonSize, ButtonForm } from '/styles/alias/Button'

const Button = ({ theme, outline, size, form, disabled, label, ...props }) => {
  const formClass = form ? ButtonForm[form] : ''
  const outlineClass = outline ? 'btn-outline' : ''
  const disabledClass = disabled ? 'btn-disabled' : ''
  return (
    <button
      type="button"
      className={`btn ${outlineClass} ${disabledClass} ${ButtonSize[size]} ${ButtonTheme[theme]} ${formClass} normal-case`}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(Object.keys(ButtonTheme)),
  size: PropTypes.oneOf(Object.keys(ButtonSize)),
  form: PropTypes.oneOf(Object.keys(ButtonForm)),
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
}

Button.defaultProps = {
  onClick: undefined,
  theme: 'primary',
  outline: false,
  size: 'medium',
  form: '',
  disabled: false
}

export default Button