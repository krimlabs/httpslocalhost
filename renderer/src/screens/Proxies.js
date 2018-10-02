import React from 'react';
import {lifecycle} from 'recompose';
import Dock from 'react-dock';
import createStore from 'pure-store';
import {withStores} from 'lib/react-pure-state';

import proxiesStore, {fetchProxies, createProxy, deleteProxy} from 'domain/proxies';
import Proxy from 'screens/proxies/Proxy';
import NewProxyForm from 'screens/proxies/NewProxyForm';
import DeleteProxyConfirmation from 'screens/proxies/DeleteProxyConfirmation';
import plusIcon from 'assets/img/plus.svg';
import colors from 'utils/colors';

const store = createStore({
  newProxyDockOpen: false,
  deleteDockOpen: false,
  proxyToDelete: null
});

const Proxies = () => {
  const {collection} = proxiesStore.state;
  const {newProxyDockOpen, deleteDockOpen, proxyToDelete} = store.state;
  return (<div>
    <div
      className="absolute br-100 shadow-1 grow pointer dt tc fr nt3 right-0 mr5"
      style={{backgroundColor: colors.yellow, height: 48, width: 48}}
      onClick={() => {
        store.update({newProxyDockOpen: true})
      }}
    >
      <div className="dtc v-mid">
        <img src={plusIcon} className="h1 mt1"/>
      </div>
    </div>
    <div className="ph4 pt5 overflow-y-scroll" style={{height: '88vh'}}>
      {collection.map((proxy, key) => (<Proxy
        key={key} editable={false} proxy={proxy}
        onDelete={(proxyToDelete) => store.update({deleteDockOpen: true, proxyToDelete})}
      />))}
    </div>
    <Dock
      position='bottom'
      isVisible={newProxyDockOpen}
      onVisibleChange={visibility => store.update({newProxyDockOpen: visibility})}
    >
      <NewProxyForm />  
    </Dock>

    <Dock
      position='bottom'
      isVisible={deleteDockOpen}
      onVisibleChange={visibility => store.update({deleteDockOpen: visibility})}
    >
      {proxyToDelete && <DeleteProxyConfirmation
        proxy={proxyToDelete}
        onCancel={() => store.update({deleteDockOpen: false, proxyToDelete: null})}
        onConfirm={(proxy) => {
          store.update({deleteDockOpen: false, proxyToDelete: null});
          deleteProxy(proxy._id);
        }}
      />}
    </Dock>
  </div>);
}

const withProxies = lifecycle({
  componentDidMount() {
    if (proxiesStore.state.collection.length === 0) {
      fetchProxies();  
    }
  }
});

export default withStores([proxiesStore, store], withProxies(Proxies));
