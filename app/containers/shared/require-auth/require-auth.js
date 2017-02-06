import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';

export default function requireAuth(ChildComponent) {
  class AuthenticatedComponent extends Component {
    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated)
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) this.props.authFailed()
    }

    render() {
      return this.props.isAuthenticated === true ? <ChildComponent { ...this.props } /> : null
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.session,
    isAuthenticated: state.session.isAuthenticated,
  })

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      authFailed: () => {
        Actions.login({type: 'reset'});
      }
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}
