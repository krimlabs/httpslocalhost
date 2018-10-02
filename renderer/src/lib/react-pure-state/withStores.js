/***********************************************************************
 * Helper HOC to subscribe to multiple stores
 * ---------------------------------------------------------------------
 * Unlike redux-connect, this doesn't pass the store as props.
 * Instead, it just forces the component to re-read the store whenever 
 * a change is detected.

 * Usage:
 * class Component extends React.Component {}
 * export default withStores([store1, store2], Component);
************************************************************************/

import React from 'react';

const withStores = (stores, WrappedComponent) => {
  class WithStoreHOC extends React.Component {
    constructor(props) {
      super(props);
      this.unsubscribeFunctions = stores.map(store => 
        store.subscribe(() => this.forceUpdate())
      );
    }

    componentDidMount() {
      this.stores = stores;
    }

    componentWillUnmount() {
      this.unsubscribeFunctions.map(
        unsubscribeFunction => unsubscribeFunction()
      );
    }

    render() {
      return (<WrappedComponent />);
    }
  }
    
  return WithStoreHOC;
};

export default withStores;
