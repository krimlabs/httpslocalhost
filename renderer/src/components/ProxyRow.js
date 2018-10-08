import React from 'react';

import colors from 'utils/colors';
import dataFlowIcon from 'assets/img/data-flow-right.svg';

const shell = window.electron.shell;

const ProxyRow = ({proxy}) => {
  return (<div className="w-100 fl-ns">
    <div className="dib pointer" onClick={() => {
      shell.openExternal(`https://${proxy.from}`);
    }}>
      <span className="" style={{color: colors.secureGreen}}>https://</span>{proxy.from}
    </div>
    <div className="ml1 dib">
      <img src={dataFlowIcon} className="" style={{height: 8}}/>
    </div>
    <div className="f6 dib ml1 black-60">
      {proxy.to}
    </div>
  </div>);
};

export default ProxyRow;
