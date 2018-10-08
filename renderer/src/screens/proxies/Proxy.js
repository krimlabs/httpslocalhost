import React from 'react';

import ProxyRow from 'components/ProxyRow';
import deleteIcon from 'assets/img/delete.svg';


const Proxy = ({editable, proxy, onDelete}) => {
  return (<div className="bb pa2 b--black-10 pv2 cf black-80 tl relative">
    <ProxyRow proxy={proxy} />

    <div className="absolute right-0 mt1">
      <div
        className="pointer dim h1"
        onClick={() => onDelete(proxy)}
      >
        <img src={deleteIcon} alt="" style={{height: '80%'}}/>
      </div>
    </div>
  </div>);
}

export default Proxy;
