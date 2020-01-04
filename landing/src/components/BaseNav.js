import React from 'react'
import {Link} from 'react-router-dom'

import logo from 'assets/img/logo.svg'
import {trackMacAppDownload} from 'utils/tracker'

const BaseNav = () => {
  return (<div className="cf white pv2 pv3-ns ph2 ph5-ns">
    <div className="w-100 w-50-ns fl-ns cf">
      <div className="fl">
        <img src={logo} style={{height: 56}} alt="HTTPSLocalhost logo without background"/>
      </div>
      <Link to="/" className="fl ml2 mt2 white no-underline">
        <div className="f3 b">HTTPSLocalhost</div>
        <div className="f5 o-90">The fastest way to get local https</div>
      </Link>
    </div>
    <div className="w-100 w-50-ns fl-ns mt3 tc tr-ns b f5">
      <div className="ml4 ml2-ns dib">
        <a 
          href="/HTTPSLocalhost-1.0.0.dmg" className="white no-underline"
          onClick={() => {
            trackMacAppDownload();
          }}
        >
          Download
        </a>
      </div>
      <div className="ml4 ml2-ns dib">
        <Link to="/" className="white no-underline">Donate</Link>
      </div>
    </div>
  </div>);
};

export default BaseNav;