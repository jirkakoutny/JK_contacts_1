import { NetInfo } from 'react-native';
import { meRef } from '../firebase/firebase'
import { authRef } from '../firebase/firebase'

export const requestPerson = ({ index = 1 }) => {
  return (dispatch, getState) => {
    const { isConnected } = getState();

    dispatch({ type: 'INC_PERSON_INDEX' });
    const url = `https://swapi.co/api/people/${index}?format=json`;
    if (isConnected) {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          dispatch({ type: 'SAVE_PERSON', person: res });
          dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: url });
        });
    } else {
      dispatch({ type: 'ADD_TO_ACTION_QUEUE', payload: url });
    }
  };
};

export const requestPersonByUrl = ({ url }) => {
  return (dispatch, getState) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: 'SAVE_PERSON', person: res });
        dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', payload: url });
      });
  };
};

export const connectionState = ({ status }) => {
  return { type: 'CHANGE_CONNECTION_STATUS', isConnected: status };
};

export const loadMe = ({ index = 1 }) => {
  return (dispatch, getState) => {
    const { isConnected } = getState();

    if (isConnected) {
      meRef.on('value', (snapshot) => {
        dispatch({ type: 'ME_LOADED', me: snapshot.val() });
      })
      console.log('Loading me...');
    }
    else {
      console.log('Loading me not possible...');
    }
  };
}



export const meLoaded = ({ me }) => {
  return { type: 'ME_LOADED', me: me };
};

export const signin = ({ login, password }) => {
  console.log('Signing in me as ' + login);
  console.log('Signing in me with ' + password);

  return (dispatch, getState) => {
    authRef.signInWithEmailAndPassword(login, password).then(
      function () {
        dispatch({ type: 'SIGN_IN_SUCCESS' });
      }
    ).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log('Signing in failed on ' + errorCode);
      console.log('Signing in failed with ' + errorMessage);

      dispatch({ type: 'SIGN_IN_FAILURE' });
    });
  };
};

export const signout = () => {
  console.log('Signout');

  return (dispatch, getState) => {
    authRef.signOut().then(function () {
      dispatch({ type: 'LOGOUT_SUCCESS' });
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log('Signing in failed on ' + errorCode);
      console.log('Signing in failed with ' + errorMessage);

      dispatch({ type: 'LOGOUT_FAILURE' });
    })
  };
};

export const login = (user) => {
  console.log('Login ' + user);
  return { type: 'LOGIN', payload: user };
};

export const logout = () => {
  console.log('Logout');
  return { type: 'LOGOUT_SUCCESS' };
};