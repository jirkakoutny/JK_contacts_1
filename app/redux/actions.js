import { NetInfo } from 'react-native';
import { meRef } from '../firebase/firebase'
import { authRef } from '../firebase/firebase'

export const meLoaded = (me) => {
  return { type: 'ME_LOADED', me: me };
};

export const contactsLoaded = (contacts) => {
  console.log('contacts dispatched');
  console.log(contacts);
  return { type: 'CONTACTS_LOADED', contacts: contacts };
};

export const contactsChildAdded = (contact) => {
  return { type: 'CONTACTS_CHILD_ADDED', contact: contact };
};

export const contactsChildChanged = (contact) => {
  return { type: 'CONTACTS_CHILD_CHANGED', contact: contact.val() };
};

export const contactsChildRemoved = (contact) => {
  store.dispatch({ type: 'CONTACTS_CHILD_REMOVED', contact: data.val() });
};

export const connectionState = ({ status }) => {
  return { type: 'CHANGE_CONNECTION_STATUS', isConnected: status };
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