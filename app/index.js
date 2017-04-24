import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

// Delete
import { Tabs, Drawer } from './config/router.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  render() {
    if (this.state.isLoading)
      return null;
    
    var index = Platform.OS === 'ios' ? <Tabs/> : <Drawer/>

    return (
      <Provider store={this.state.store}>
        {index}
      </Provider>
    );
  }
}

export default App;
