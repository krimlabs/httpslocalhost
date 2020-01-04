import React from 'react';

import dotTexture from 'assets/img/ui-elements/dot.svg';
import colors from 'utils/colors';
import BaseNav from 'components/BaseNav';
import DownloadCTA from 'components/DownloadCTA';
import MacbookDemo from 'screens/landing/hero/MacbookDemo';
import DemoSmall from 'screens/landing/hero/DemoSmall';
import injectIsMobile from 'components/injectIsMobile';

const Hero = ({isMobile}) => {
  return (<div
      className="w-90 w-80-ns center cf br3 br--top mt4 box-shadow-2 vh-100 vh-75-ns relative" 
      style={{background: `${colors.green} url("${dotTexture}")`}}
    >
    <BaseNav />
    <div className="w-100 w-40-ns mt4 mt2-ns mt6-ns ph4 ph5-ns fl-ns tc tl-ns">
      <div className="mt3 f3 normal b-ns white">
        Create and manage local https domains, use sensible names for your projects.
      </div>
      <div className="white mt2">
        Bye bye localhost:8000, meet https://myproject.com
      </div>
      <div className="mt4 tc tl-ns">
        <DownloadCTA />
      </div>
    </div>
    {/*Desktop size demo*/}
    <div className="w-100 w-70-ns absolute dn db-ns" style={{right: -40, bottom: -10}}>
      <div className="fr-ns">
        <span className="wistia_embed wistia_async_tgf67qrbr7 popover=true popoverAnimateThumbnail=true popoverContent=link">
          <MacbookDemo />    
        </span>
      </div>
    </div>

    {/*Phone size demo*/}
    <div className="db dn-ns w-70 center mt5">
      <span className="wistia_embed wistia_async_tgf67qrbr7 popover=true popoverAnimateThumbnail=true popoverContent=link">
        <DemoSmall />
      </span>
    </div>

  </div>);
};

export default injectIsMobile(Hero);
