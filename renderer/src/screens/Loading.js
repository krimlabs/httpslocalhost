import React from 'react';
import {Redirect} from 'react-router-dom';
import {lifecycle} from 'recompose';

import {withStores} from 'lib/react-pure-state';

import loader from 'assets/img/mac-fan-spinner.svg';
import proxiesStore, {fetchProxies} from 'domain/proxies';

const Loading = () => {
  const {collection, fetchingCollection} = proxiesStore.state;
  return (<div className="dt h-75 w-100 tc">
    {fetchingCollection ? 
      <div className="dtc v-mid">
        <img src={loader} alt=""/>
      </div>
    : collection.length === 0 ?
      <Redirect to="/onboarding" />
    : <Redirect to="/proxies" />}
  </div>);
};

const LoadingWithProxies = lifecycle({
  componentDidMount() {
    fetchProxies();
  }
})(Loading);

export default withStores([proxiesStore], LoadingWithProxies);