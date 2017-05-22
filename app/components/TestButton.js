import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

const TestButton = ({ test }) => (
  <Button
    title='TEST'
    onPress={test}
  />
);

TestButton.propTypes = {
  test: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  test: () => dispatch({type: 'Test'}),
//   logout: () => dispatch({ type: 'Logout' }),
//   loginScreen: () =>
//     dispatch(NavigationActions.navigate({ routeName: 'Login' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestButton);
