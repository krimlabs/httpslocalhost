import React from 'react';

import steelGrayTexture from 'assets/img/ui-elements/texture-bg.png';
import Underlined from 'components/Underlined';
import colors from 'utils/colors';
import Purchase from 'screens/landing/pricing/Purchase';

const Pricing = () => {
  return (<div
    id="pricing"
    style={{background: `url(${steelGrayTexture})`,color: colors.steelGrayDark}}
    className="pa4 pb5 w-60 br2 center"
  >
    <Underlined heading={"Pricing"} />
    <div className="cf mt4">
      <div className="w-90 w-60-ns fl-ns">
        <ul>
          <li className="mt1">HTTPSLocalhost is free to evaluate for 14 days.</li>
          <li className="mt1">All licensed users are entitled to free updates.</li>
          <li className="mt1">A licences once purchased cannot be refunded.</li>
          <li className="mt1">Bulk purchases are discounted.</li>
          <li className="mt1">All payments are handled by Paypal.</li>
        </ul>
      </div>
      <div className="w-90 w-40-ns fl-ns bl b--black-10 pl3">
        <Purchase />
      </div>
    </div>
  </div>);
};

export default Pricing;