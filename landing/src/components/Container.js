import React from 'react';

import colors from 'utils/colors';
import dotTexture from 'assets/img/ui-elements/dot.svg';
import BaseNav from 'components/BaseNav';
import Footer from 'components/Footer';

const Container = ({children}) => {
  return (<div>
    <div
      className="w-90 w-70-ns center mt4 br3 br--top box-shadow-2"
      style={{background: `${colors.green} url("${dotTexture}")`}}
    >
      <BaseNav />
    </div>
    <div className="w-90 w-80-ns pa3 pa5-ns br0 br4-ns mb5 center black-60 lh-copy bg-white box-shadow-1">
      {children}
    </div>
    <Footer />
  </div>);
};

export default Container;

