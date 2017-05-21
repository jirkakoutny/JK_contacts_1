import { NetInfo } from 'react-native';
import { meRef } from '../firebase/firebase'
import { authRef } from '../firebase/firebase'


// *** Action Types ***
export const NAVIGATE = 'NAVIGATE'
export const NAV_PUSH = 'NAV_PUSH'
export const NAV_POP = 'NAV_POP'
export const NAV_JUMP_TO_KEY = 'NAV_JUMP_TO_KEY'
export const NAV_JUMP_TO_INDEX = 'NAV_JUMP_TO_INDEX'
export const NAV_RESET = 'NAV_RESET'


// *** Action Creators ***
// The following action creators were derived from NavigationStackReducer
export function navigatePush(state) {
	state = typeof state === 'string' ? { key: state, title: state } : state
	return {
		type: NAV_PUSH,
		state
	}
}

export function navigatePop() {
	return {
		type: NAV_POP
	}
}

export function navigateJumpToKey(key) {
	return {
		type: NAV_JUMP_TO_KEY,
		key
	}
}

export function navigateJumpToIndex(index) {
	return {
		type: NAV_JUMP_TO_INDEX,
		index
	}
}

export function navigateReset(routes, index) {
	return {
		type: NAV_RESET,
		index,
		routes
	}
}

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

export const logout = () => {
  console.log('Try to logout...');

  return (dispatch, getState) => {
    authRef.signOut().then(function () {
      // Sign-out successful.
      console.log('Logout success');
      dispatch({ type: 'LOGOUT_SUCCESS' });
    }).catch(function (error) {
      // An error happened.
      console.log('Logout error');
      dispatch({ type: 'LOGOUT_FAILURE' });
    })
  };
};

export const signin = ({ login, password }) => {
  console.log('Signing in me as ' + login);
  console.log('Signing in me with ' + password);

  return (dispatch, getState) => {
    authRef.signInWithEmailAndPassword(login, password).then(
      function () {
        console.log('Signin success');
        // dispatch({ type: 'SIGN_IN_SUCCESS' });
      }
    ).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log('Signing in failed on ' + errorCode);
      console.log('Signing in failed with ' + errorMessage);

      dispatch({ type: 'SIGN_IN_FAILURE' });
      //  return { type: 'CONNECTION_ONLINE' }; 
    });
  };
};

export const setAuthUser = (user) => {
  console.log('Setauthuserr user: ' + user);
  return { type: 'SET_AUTH_USER', payload: user };
};

export const meLoaded = ({ me }) => {
  return { type: 'ME_LOADED', me: me };
};

export const goOnline = ({ }) => {
  return { type: 'CONNECTION_ONLINE' };
};

export const goOffline = ({ }) => {
  return { type: 'CONNECTION_ONLINE' };
};

