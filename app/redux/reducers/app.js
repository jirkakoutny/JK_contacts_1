const initialState = {
    me: null,
    contacts: [],
    personIndex: 1,
    people: [],
    actionQueue: [],
    isConnected: false,
    user: null
};

function app(state = initialState, action) {
    console.log('//////////////////////////////');
    console.log('//////////////////////////////');
    console.log('//////////////////////////////');
    console.log(state, action);
    switch (action.type) {

        case 'INC_PERSON_INDEX':
            return Object.assign({}, state, {
                personIndex: state.personIndex + 1,
            });
        case 'ME_LOADED':
            console.log('Me loaded...dispatched');
            console.log(action);
            return Object.assign({}, state, {
                me: action.me,
            });
        case 'CONTACTS_LOADED':
            console.log('Contacts loaded...dispatched');
            console.log(action.contacts);
            return Object.assign({}, state,
                {
                    contacts: action.contacts,
                }
            );
        case 'CONTACTS_CHILD_ADDED':
            console.log('Contacts child added...dispatched');
            console.log(action);
            console.log('Length ' + state.contacts.length);
            var dup_array = state.contacts.slice();
            const indexA = dup_array.map(i => i.email).indexOf(action.contact.email)
            console.log(indexA);
            if (indexA > -1) {
                console.log('Already have item on index ' + indexA);
                dup_array[indexA] = action.contact;
            }
            else {
                console.log('Adding  item');
                dup_array = dup_array.concat([action.contact]);
            }
            console.log('Length ' + dup_array.length);
            return Object.assign({}, state, {
                contacts: dup_array,
            });
        case 'CONTACTS_CHILD_CHANGED':
            console.log('Contacts child changed...dispatched');
            console.log(action);
            const index = state.contacts.map(i => i.email).indexOf(action.contact.email)
            console.log(index);
            var dup_array = state.contacts.slice();
            dup_array[index] = action.contact;
            return Object.assign({}, state, {
                contacts: dup_array
            });
        case 'CONTACTS_CHILD_REMOVED':
            console.log('Contacts child changed...dispatched');
            console.log(action);

            var dup_array = state.contacts.slice().filter(({ email }) => email !== action.contact.email);
            return Object.assign({}, state, {
                contacts: dup_array,
            });

        case 'SAVE_PERSON':
            return Object.assign({}, state, {
                people: [action.person].concat(state.people),
            });
        case 'CHANGE_CONNECTION_STATUS':
            return Object.assign({}, state, {
                isConnected: action.isConnected,
            });
        case 'ADD_TO_ACTION_QUEUE':
            return Object.assign({}, state, {
                actionQueue: state.actionQueue.concat([action.payload]),
            });
        case 'REMOVE_FROM_ACTION_QUEUE':
            return Object.assign({}, state, {
                actionQueue: _.without(state.actionQueue, action.payload),
            });
        // case 'SIGN_IN_SUCCESS':
        //   // return { ...state, ...INITIAL_STATE, user: action.payload };
        //   return Object.assign({}, state, {
        //     user: action.payload
        //   });
        case 'SIGN_IN_FAILURE':
            // return { ...state, ...INITIAL_STATE, error: action.payload };
            return Object.assign({}, state, {
                user: null
            });
        default:
            return state;
    }
}

export default app;
