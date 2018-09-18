import React from 'react';
import PropTypes from 'prop-types';

import colors from 'utils/colors';

const Input = ({
  placeholder, label, labelFontSize, value, error,
  valueFontSize, onChange, className, type, inputStyle,
  disabled
}) => {
  return (<div className={`tl ${className}`}>
    {label && <div className='mb2' style={{color: colors.black, fontSize: labelFontSize}}>{label}</div>}
    <input
      placeholder={placeholder}
      value={value} onChange={onChange} type={type}
      disabled={disabled}
      className='ba pa2 w-100' style={{
        borderColor: colors.lighterGray, borderRadius: 8,
        fontSize: valueFontSize, color: colors.black, outline: 'none',
        WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box', boxSizing: 'border-box',
        ...inputStyle
      }}
    />
    {error && <div className='orange mt1 f6'>{error}</div>}
  </div>);
};

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  labelFontSize: PropTypes.number,
  valueFontSize: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  inputStyle: PropTypes.object,
  disabled: PropTypes.bool
};

Input.defaultProps = {
  labelFontSize: 16,
  valueFontSize: 16,
  className: '',
  type: 'text',
  placeholder: '',
  inputStyle: {}
};

export default Input;
