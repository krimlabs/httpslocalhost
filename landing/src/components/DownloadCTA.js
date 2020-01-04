import React from 'react'

import appleBadge from 'assets/img/badge-macos.png'
import {trackMacAppDownload} from 'utils/tracker'

const DownloadCTA = () => {
  return (<a
    href="/HTTPSLocalhost-1.0.0.dmg"
    onClick={() => {
      trackMacAppDownload();
    }}>
    <div className="dib">
      <div
        className="br3 ba b--white bw1 dim pointer"
        style={{width: 160, padding: '8px 16px'}}
      >
        <img src={appleBadge} alt="Download HTTPSLocalhost for Mac" className=""/>
      </div>
    </div>
  </a>);
};

export default DownloadCTA;