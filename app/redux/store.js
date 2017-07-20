
import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';

import { syncFirebase } from '../firebase/firebase'
import reducer from './reducer';

const middleWare = [thunk, createLogger()];
const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

export default configureStore = (onComplete) => {
    const store = autoRehydrate()(createStoreWithMiddleware)(reducer);

    syncFirebase(store)

//  AsyncStorage.clear();

    persistStore(store, { storage: AsyncStorage }, onComplete);

    return store;
};
