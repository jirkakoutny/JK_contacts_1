import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppWithNavigationState from './config/router';
import configureStore from './redux/store';

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

    return (
      <Provider store={this.state.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
