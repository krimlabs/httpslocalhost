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
import StatusBar from 'screens/proxies/StatusBar';
import Loading from 'screens/proxies/Loading';
import Onboarding from 'screens/proxies/Onboarding';

const store = createStore({
  deleteDockOpen: false,
  proxyToDelete: null
});

const Proxies = () => {
  const {collection, isNewProxyDockOpen, fetchingCollection} = proxiesStore.state;
  const {deleteDockOpen, proxyToDelete} = store.state;

  if (fetchingCollection) return (<Loading />);
  return (<div className="relative">
    {collection.length > 0 ?
      <React.Fragment>
        <div
          className="absolute br-100 shadow-1 grow pointer dt tc fr nt3 right-0 mr3"
          style={{backgroundColor: colors.yellow, height: 48, width: 48}}
          onClick={() => {
            proxiesStore.update({isNewProxyDockOpen: true});
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
      </React.Fragment>:
      <Onboarding 
        onGetStartedClick={() => {proxiesStore.update({isNewProxyDockOpen: true})}}
      />
    }
    <Dock
      position='bottom'
      isVisible={isNewProxyDockOpen}
      onVisibleChange={visibility => proxiesStore.update({isNewProxyDockOpen: visibility})}
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
    {collection.length > 0 && <StatusBar />}
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
