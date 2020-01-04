import React from 'react';

import FinalPush from 'components/footer/FinalPush';
import Faqs from 'components/footer/Faqs';
import Boring from 'components/footer/Boring';

const Footer = () => {
  return (<React.Fragment>
    <FinalPush />
    <div className="cf w-80 center mv5 pb5 f6">
      <div className="w-100 w-50-ns fl pr0 pr5-ns"><Faqs /></div>
      <div className="w-100 w-50-ns fl mt4 mt0-ns"><Boring /></div>
    </div>
  </React.Fragment>);
};

export default Footer;