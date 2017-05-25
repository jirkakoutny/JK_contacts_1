import React, { Component } from 'react';
import { AppRegistry, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from './redux/store';

// import AppReducer from './redux/reducer';
import AppWithNavigationState from './config/router';

// Delete
import { Tabs, Drawer } from './config/router.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
    console.log("******************** App constructor ******************** ");
  }

  // store = createStore(AppReducer);

  render() {
    if (this.state.isLoading)
      return null;

    // var index = Platform.OS === 'ios' ? <Tabs /> : <Drawer />

    return (
      <Provider store={this.state.store}>
        <AppWithNavigationState />
      </Provider>
      //<Provider store={this.state.store}>
      //{index}
      //</Provider>
    );
  }
}

export default App;
