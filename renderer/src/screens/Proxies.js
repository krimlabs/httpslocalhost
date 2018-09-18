import React from 'react';
import {withStores} from 'lib/react-pure-state';

import proxiesStore, {fetchProxies, createProxy} from 'domain/proxies';
import Proxy from 'screens/proxies/Proxy';
import NewProxyForm from 'screens/proxies/NewProxyForm';

const Proxies = () => {
  const {collection} = proxiesStore.state;
  return (<div className="ph4 pt4">
    {collection.map((proxy, key) => (<Proxy key={key} editable={false} proxy={proxy} />))}
    <NewProxyForm />
  </div>);
}

export default withStores([proxiesStore], Proxies);
