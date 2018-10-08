import React from 'react';

import securebar from 'assets/img/securebar.svg';
import insecurebar from 'assets/img/insecurebar.svg';
import person from 'assets/img/person.svg';
import comms from 'assets/img/comms.png';
import Button from 'components/ui/Button';


const Onboarding = () => {
  return (<React.Fragment>
    <div className="tc w-80 center gray pt4 pb3">
      Manage TLS secure local domains by proxying them to localhost.
    </div>

    <div className="tc">
      <img src={securebar} alt="" className="mt4 relative" style={{zIndex: 1}}/>
      <img src={comms} alt="" style={{marginTop: -16, marginBottom: -24}}/>
      <img src={insecurebar} alt="" className=""/>
    </div>

    <div className="tc mt5 w-100">
      <img src={person} alt="" className="fixed bottom-0 left-0 ml5"/>
      <Button text="Get started" href="/proxies" />
    </div>
  </React.Fragment>)
};

export default Onboarding;