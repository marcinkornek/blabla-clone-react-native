import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
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
      if (!isAuthenticated) this.props.navigation.navigate('login')
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
    return {}
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}
