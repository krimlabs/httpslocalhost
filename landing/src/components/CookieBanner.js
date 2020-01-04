import React from 'react';
import {Link} from 'react-router-dom';

import cookie from 'assets/illustrations/cookie.png';

class CookieBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bannerHidden: true};

    this.hideBannerOnThisMachine = this.hideBannerOnThisMachine.bind(this);
  }

  componentDidMount() {
    const bannerHidden = localStorage.getItem('bannerHidden');
    this.setState({bannerHidden});    
  }

  hideBannerOnThisMachine() {
    localStorage.setItem('bannerHidden', true);
    this.setState({bannerHidden: true});
  }

  render () {
    if (this.state.bannerHidden) return null;
    return (<div 
      className="bg-white fixed w-90 w-30-ns box-shadow-1 pa2 br3 cf"
      style={{bottom: 10, left: 10}}
    >
      <div className="w-10 fl pt1">
        <img src={cookie} alt={"Cookie"} />
      </div>
      <div className="w-90 fl black-60 f7 pl2 pt1">
        We use cookies to provide you with a better experience. By continuing to use this site, you are basically saying, "I'm fine with cookies".
        Read our <Link className="color-inherit no-underline i" to="/legal/privacy">privacy policy</Link>, <Link className="color-inherit no-underline i" to="/legal/cookies">cookie policy</Link> and <Link className="color-inherit no-underline i" to="/legal/terms">terms of service</Link>.

        <span className="b pointer dim ml1 blue" onClick={this.hideBannerOnThisMachine}>
          Dismiss this banner
        </span>.
      </div>
    </div>);
  }
}


export default CookieBanner;
