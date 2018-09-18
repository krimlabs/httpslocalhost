import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import colors from 'utils/colors';
import loader from 'assets/img/mac-fan-spinner.svg';

const ButtonWrapper = ({href, children}) => (<div className="dib tc">
  {href.length > 0 ? <Link to={href} className="no-underline">{children}</Link> : children}
</div>);

ButtonWrapper.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
};

const Button = ({backgroundColor, onClick, text, height, loading, icon, className, href, type}) => {
  return (<ButtonWrapper href={href}>
    <button
      type={type}
      onClick={!loading ? onClick : () => {}}
      className={`b ph4 dt br3 pointer ba ${className}`}
      style={{
        backgroundColor: backgroundColor === 'yellow' ? colors.yellow :
          backgroundColor === 'white' ? colors.white : colors.black,
        color: colors.black,
        borderColor: backgroundColor === 'yellow' ? colors.yellow :
          backgroundColor === 'white' ? colors.black : colors.black,
        height
      }}
    >
      {loading && <img src={loader} className='h1 fl mr1' alt='Loading' style={{marginTop: 2}}/>}
      {icon && <img src={icon} className='h1 fl mr1' alt='' style={{marginTop: 2}}/>}
      <div
        className='dtc v-mid'
        style={{
          fontSize: 18
        }}
      >
        {text}
      </div>
    </button>
  </ButtonWrapper>);
};

Button.propTypes = {
  backgroundColor: PropTypes.oneOf(['yellow', 'white']),
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  height: PropTypes.number,
  loading: PropTypes.bool,
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  backgroundColor: 'yellow',
  height: 40,
  loading: false,
  className: '',
  href: '',
  type: 'button'
};

export default Button;
