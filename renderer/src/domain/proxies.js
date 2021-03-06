import createStore from 'pure-store';
import {emit} from 'eiphop';

const store = createStore({
  collection: [],
  fetchingCollection: true,
  errors: {},
  isNewProxyDockOpen: false
});

export const fetchProxies = () => {
  store.update({fetchingCollection: true});
  emit('getProxies')
    .then(({proxies}) => {
      store.update({collection: proxies});
    })
    .catch(err => console.log(err))
    .then(() => store.update({fetchingCollection: false}))
  ;
}

export const createProxy = (from, to) => {
  store.update({creatingProxy: true, errors: {}});
  emit('createProxy', {from, to})
    .then(({proxy}) => {
      store.update({collection: [...store.state.collection, proxy]});
    })
    .catch(errors => store.update({errors}))
    .then(() => store.update({creatingProxy: false, isNewProxyDockOpen: false}))
  ;
};

export const deleteProxy = (id) => {
  emit('deleteProxy', {id})
    .then(({proxy}) => {
      store.update({collection: store.state.collection.filter(p => p._id !== id)})
    })
    .catch(err => console.log(err))
  ;
};

export default store;