import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../../config/router';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Contacts'));

function nav(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // case 'Login':
        //     nextState = AppNavigator.router.getStateForAction(
        //         NavigationActions.back(),
        //         state
        //     );
        //     break;
        // case 'Logout':
        //     nextState = AppNavigator.router.getStateForAction(
        //         NavigationActions.navigate({ routeName: 'Login' }),
        //         state
        //     );
        //     break;
        // case 'Test':
        //     nextState = AppNavigator.router.getStateForAction(action, state);
        //     break;
        case 'LOGOUT_SUCCESS':
            console.log('LOGOUT NAVIGATOR')

            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Login' }),
                state);
            console.log(nextState);
            break;
        case 'CONTACT_DETAIL':
            console.log('DETAIL NAVIGATOR')

            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Details' }),
                state);
            console.log(nextState);
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
}

export default nav;
