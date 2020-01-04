import React from 'react'

const injectIsMobile = Child =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isMobile: false};

      this.onResize = this.onResize.bind(this);
    }

    componentWillMount() {
      typeof window !== 'undefined' && window.addEventListener('resize', this.onResize)
    }

    componentDidMount() {
      this.onResize();
    }

    componentWillUnmount() {
      typeof window !== 'undefined' && window.removeEventListener('resize', this.onResize)
    }

    onResize() {
      const isMobile = typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 768px)').matches
      ;
      this.setState({isMobile})
    }

    render() {
      return (<Child isMobile={this.state.isMobile} {...this.props} />);
    }
  }
;

export default injectIsMobile;
