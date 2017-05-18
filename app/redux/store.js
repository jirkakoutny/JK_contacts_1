
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import reducer from './reducer';
import { syncFirebase } from '../firebase/firebase'

const middleWare = [thunk, createLogger()];

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

export default configureStore = (onComplete) => {
    const store = autoRehydrate()(createStoreWithMiddleware)(reducer);

    syncFirebase(store)

    //AsyncStorage.clear();

    persistStore(store, { storage: AsyncStorage }, onComplete);

    return store;
};
