import createStore from 'pure-store';
import {emit} from 'eiphop';

const store = createStore({
  isServerBooting: false,
  isServerRunning: false
});

export const startServer = () => {
  console.log(2)
  store.update({isServerBooting: true});
  emit('generateCertsAddToTrustStoreAndEtcHosts')
    .then(res => {
      console.log("Success", res);
      store.update({isServerRunning: true});
    })
    .catch(err => {
      console.log(err);
    })
    .then(() => {
      store.update({isServerBooting: false});
    })
  ;
}

export default store;