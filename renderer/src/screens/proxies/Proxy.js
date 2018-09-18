import React from 'react';

import {deleteProxy} from 'domain/proxies';

const Proxy = ({editable, proxy}) => {
  return (<div className="ba b--black-10 br2 pa3 cf">
    <div className="w-80 fl-ns">
      <div>From <span className="green">https://</span> {proxy.from}</div>
      <div className="mt2">To <span className="red">http://</span> {proxy.to}</div>
    </div>

    <div className="w-20 fl-ns">
      <button 
        className="bg-red white pointer dim br-pill ba b--black-10"
        onClick={() => {deleteProxy(proxy._id)}}
      >
        x
      </button>
    </div>
  </div>);
}

export default Proxy;