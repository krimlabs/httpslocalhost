import React from 'react';

import DownloadCTA from 'components/DownloadCTA';
import colors from 'utils/colors';

const FinalPush = () => {
  return (<div className="mt5 ph3 pv5 br4 w-80 box-shadow-1 center" style={{backgroundColor: colors.green}}>

    <div className="w-80 cf center">
      <div className="w-80 w-50-ns white fl-ns tc tl-ns center">
        <div className="f3 mb1 b">Download HTTPSLocalhost for Mac</div>
        <div>
          <span className="o-80 mr1">Free for lifetime.</span>
        </div>
      </div>
      <div className="w-80 w-50-ns fl-ns tc mt4 mt0-ns center">
        <DownloadCTA/>  
      </div>
    </div>
  </div>);
};

export default FinalPush;