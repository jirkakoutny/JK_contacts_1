import { NetInfo } from 'react-native';
import { meRef } from '../firebase/firebase'

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
};

export const goOnline = ({  }) => {
  return { type: 'CONNECTION_ONLINE' };
};

export const goOffline = ({  }) => {
  return { type: 'CONNECTION_ONLINE' };
};

