import React from 'react';

import Hero from 'screens/landing/Hero';
import Why from 'screens/landing/Why';
import How from 'screens/landing/How';
import Footer from 'components/Footer';

const Landing = () => {
  return (<React.Fragment>
    <Hero />
    <Why />
    <How />
    <Footer />
  </React.Fragment>);
};

export default Landing;