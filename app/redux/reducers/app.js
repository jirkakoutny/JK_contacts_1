const initialState = {
    me: null,
    contacts: [],
    actionQueue: [],
    isConnected: false,
};

function app(state = initialState, action) {
    switch (action.type) {
        case 'ME_LOADED':
            return Object.assign({}, state, {
                me: action.me,
            });
        case 'CONTACT_DETAIL':
            return Object.assign({}, state, {
                contact: action.contact,
            });
        case 'CONTACTS_LOADED':
            return Object.assign({}, state, {
                contacts: action.contacts,
            });
        case 'CONTACTS_CHILD_ADDED':
            var dup_array = state.contacts.slice();
            var index = dup_array.map(i => i.email).indexOf(action.contact.email)
            if (index > -1) {
                dup_array[index] = action.contact;
            }
            else {
                dup_array = dup_array.concat([action.contact]);
            }
            return Object.assign({}, state, {
                contacts: dup_array,
            });
        case 'CONTACTS_CHILD_CHANGED':
            var dup_array = state.contacts.slice();
            var index = state.contacts.map(i => i.email).indexOf(action.contact.email)
            if (index > -1) {
                dup_array[index] = action.contact;
            }
            return Object.assign({}, state, {
                contacts: dup_array
            });
        case 'CONTACTS_CHILD_REMOVED':
            var dup_array = state.contacts.slice().filter(({ email }) => email !== action.contact.email);
            return Object.assign({}, state, {
                contacts: dup_array,
            });

        // case 'ADD_TO_ACTION_QUEUE':
        //     return Object.assign({}, state, {
        //         actionQueue: state.actionQueue.concat([action.payload]),
        //     });
        // case 'REMOVE_FROM_ACTION_QUEUE':
        //     return Object.assign({}, state, {
        //         actionQueue: _.without(state.actionQueue, action.payload),
        //     });

        case 'CHANGE_CONNECTION_STATUS':
            return Object.assign({}, state, {
                isConnected: action.isConnected,
            });
        default:
            return state;
    }
}

export default app;
