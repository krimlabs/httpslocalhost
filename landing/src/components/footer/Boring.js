import React from 'react';
import {Link} from 'react-router-dom';

const aClass = 'blue dim no-underline';

const Boring = () => {
  return (<div className="black-60">
    <div className="f4 b mb3 black-80">Boring but important information</div>
    <div>
      <div className="b black-60 mb2 mt4">Find us elsewhere</div>
      <div className="dib mr3">
        <a className={`${aClass}`} href="">Product Hunt</a>
      </div>
      <div className="dib mr3">
        <a className={`${aClass}`} href="https://www.indiehackers.com/product/httpslocalhost">Indie Hackers</a>
      </div>
      <div className="dib mr3">
        <a className={`${aClass}`} href="mailto:admin@httpslocalhost.com">Email</a>
      </div>
    </div>


    <div>
      <div className="b black-60 mb2 mt4">Credits</div>
      <div>
        The design of this page is inspired by <a className={`${aClass}`} href="https://status.im/">Status</a>. 
        All illustrations and the logo are courtesy of <a className={`${aClass}`} href="https://undraw.co">Undraw</a>. 
        The app and this website is built using <a className={`${aClass}`} href="https://electronjs.org/">Electron</a> and <a className={`${aClass}`} href="https://reactjs.org/">React</a>. 
      </div>
    </div>

    <div>
      <div className="b black-60 mb2 mt4">Legal</div>
      <div>
        Usage of this website and the HTTPSLocalhost App is subject to these <Link className={`${aClass}`} to="/legal/terms">terms of services</Link> and <Link className={`${aClass}`} to="/legal/privacy">privacy policy</Link>. 
        All payments are processed by <a href="https://www.paypal.com/" className={`${aClass}`}>Paypal</a> and are subject to Paypal’s terms and conditions. This website uses cookies for marketing and technical purposes. Read our <Link className={`${aClass}`} to="/legal/cookies">cookie policy</Link>.
      </div>
    </div>


    <div>
      <div className="b black-60 mb2 mt4">Share HTTPSLocalhost</div>
      <div>
        Every share on twitter, facebook, email, reddit and hacker news helps. Thanks.
      </div>
    </div>

  </div>);
};

export default Boring;