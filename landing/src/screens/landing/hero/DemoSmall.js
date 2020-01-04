import React from 'react';

import macbook from 'assets/img/ui-elements/macbook.png';

const DemoSmall = () => {
  // eslint-disable-next-line
  return (<a href="#" alt="Wista video anchor button">
    <div className="center mt3 pointer tc">
      <img src={macbook} alt=""/>
    </div>
  </a>);
};

export default DemoSmall;

