import React from 'react';

import safe from 'assets/illustrations/safe.svg';
import productTour from 'assets/illustrations/product-tour.svg';

const How = () => {
  return (<div className="w-90 w-60-ns center mt0 mt5-ns pt0 pt3-ns">
    <div className="cf mt3">
      <div className="w-90 w-60-ns fl-ns f5 lh-copy black-60 f5 pr4">
        <div className="f4 mt5 mb3 b black-70">How it works</div>
        HTTPSLocalhost generates a self-signed certificate and adds it to your computers trusted store. 
        It then creates a mapping in your /etc/hosts file and starts a reverse proxy to tunnel https and web socket packets. 
      </div>
      <div className="w-90 w-40-ns fl-ns pt2 pt4-ns tr">
        <img
          src={productTour} 
          alt="Illustration showing a local https proxy from https://athena.local to http://localhost:8000"
          className=""
        />
      </div>
    </div>


    <div className="cf">
      <div className="w-90 w-60-ns fl-ns f5 lh-copy black-60 f5">
        <div className="f4 mt5 mb3 b black-70">Safer and less cumbersome</div>
          <p>
            Script based solutions like Devcert leave generate root certificate authorities 
            and leave key management to you. If an attacker gets hold of your key, it can 
            pose as any website, potentially stealing valuable information.
          </p>
          <p>
            HTTPSLocalhost fixes this problem in two steps. First, it deletes the self-signed 
            certificate and  private key as soon as the server starts. Second, it generates a 
            new certificate each time you start the app.
          </p>
      </div>
      <div className="w-90 w-40-ns fl-ns pl2 pl4-ns pt2 pt4-ns tr mt2 mt5-ns">
        <img
          src={safe} 
          alt="Illustration showing how HTTPSLocalhost is safer"
          className=""
        />
      </div>
    </div>
  </div>);
};

export default How;
