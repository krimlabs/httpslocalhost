import React from 'react';
import createStore from 'pure-store';
import {withStores} from 'lib/react-pure-state';
import Dock from 'react-dock';

import certificateStore, {startServer} from 'domain/certificate';
import colors from 'utils/colors';
import Confirmation from 'components/Confirmation';

const store = createStore({
  isStartServerInfoDockOpen: false
});

const StatusBar = () => {
  const {isServerRunning, isServerBooting} = certificateStore.state;
  const {isStartServerInfoDockOpen} = store.state;
  return (<div
    className="absolute bottom-0 white pa1 w-100 nb2 f6" 
    style={{backgroundColor: colors.steelGrayDark}}
  >
    <div
      className={`dib mr1 shadow-1 ${isServerBooting ? 'bg-yellow' : isServerRunning ? 'bg-green' : 'bg-red'}`} 
      style={{height: 10, width: 10, borderRadius: 10}} 
    />

    {isServerBooting ? 
      <div className="dib">Booting up <span className="blink">...</span></div> :
      <div className="dib">Server {!isServerRunning && "not"} running</div>
    }
    <div
      className="fr dim bg-white ph2 pointer shadow-1 b ttu br1 black-70 shadow-1 f7"
      onClick={() => store.update({isStartServerInfoDockOpen: true})}
    >
      {!isServerBooting && isServerRunning ? 'Restart' : 'Start'}
    </div>

    <Dock
      position="top"
      isVisible={isStartServerInfoDockOpen}
      onVisibleChange={visibility => store.update({isStartServerInfoDockOpen: visibility})}
    >
      <Confirmation 
        title={"This action needs sudo access"}
        confirmLabel={"Ok, I'll give sudo access"}
        onCancel={() => store.update({isStartServerInfoDockOpen: false})}
        onConfirm={() => {
          store.update({isStartServerInfoDockOpen: false});
          startServer();
        }}
        content={<div className="w-80 center black-70">
          <div className="f6">
            Sudo is a big thing, but elevated access is needed to create a certificate, add it to trust store,
            edit /etc/hosts file and start a reverse proxy on port 443.  
          </div>
          <div className="mt1 f6">
            We use system apis and cannot see your sudo password.
          </div>
        </div>}
      />
    </Dock>
  </div>)
};

export default withStores([certificateStore, store], StatusBar);
