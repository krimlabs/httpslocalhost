import React from 'react';

import leftYellowDots from 'assets/img/left-dots-yellow.png';
import rightYellowDots from 'assets/img/right-dots-yellow.png';
import shield from 'assets/img/shield.svg';
import colors from 'utils/colors';

const Container = ({children}) => {
  return (<div className="vh-100 overflow-y-hidden">
    <div className="b f3 w-80 center mt3 cf">
      <div className="fl">
        <img src={shield} alt="" style={{height: 36}}/>
      </div>
      <div className="fl pt1 pl2" style={{color: colors.steelGrayDark}}>HTTPS Localhost</div>
    </div>
    <div>
      <img src={leftYellowDots} alt="" className="fixed" style={{left: 0, top: 100, zIndex: -1}}/>
      <img src={rightYellowDots} alt="" className="fixed" style={{right: 0, top: 30, zIndex: -1}}/>
    </div>
    <div 
      className="bg-white w-80 center vh-100 mt2 shadow-1" 
      style={{
        borderRadius: '16px 16px 0 0'
      }}
    >
      {children}
    </div>
  </div>)
};

export default Container;
