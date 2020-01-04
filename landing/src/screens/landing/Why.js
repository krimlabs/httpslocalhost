import React from 'react';

import Benefit from 'screens/landing/why/Benefit';
import localProdParity from 'assets/illustrations/local-prod-parity.svg';
import consumeHttps from 'assets/illustrations/consume-https-resources.svg';
import reducedWarnings from 'assets/illustrations/reduced-warnings.svg';
import betterAddresses from 'assets/illustrations/better-addresses.svg';

const benefits = [{
  imgSrc: localProdParity,
  title: 'Increase parity with prod environment',
  body: 'Get a step closer to achieving 100% parity with your prod systems.'
}, {
  imgSrc: consumeHttps,
  title: 'Consume secure resources locally',
  body: 'Working with secure AWS Lambda or your staging server? Connect seamlessly to secure servers, without any warnings.'
}, {
  imgSrc: reducedWarnings,
  title: 'Reduce TLS warnings with chrome & electron apps',
  body: 'Reduce noise while developing locally, without suppressing logs, which come with an increased security risk.'
}, {
  imgSrc: betterAddresses,
  title: 'Beautiful & more sensible addresses',
  body: 'Get a unique local address for all your active projects. Distinguish projects by name, not by port numbers.'
}];

const Why = () => {
  return (<div className="w-90 center">
    <div className="cf w-100 bg-white br0 br4-ns box-shadow-1">
      {benefits.map((b, i) => <Benefit key={i} {...b} />)}
    </div>
  </div>);
};

export default Why;
