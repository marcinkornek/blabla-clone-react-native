// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// actions
import { logInFromStorage, logoutCurrentUser } from './actions/session';
import { fetchCurrentUser } from './actions/current-user';

// components
import { Root } from './navigation-routes'

export class Router extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    session: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { logInFromStorage, fetchCurrentUser, session } = this.props;

    logInFromStorage(session)
      .then((response) => {
        if (!response.error) {
          fetchCurrentUser()
        }
      })
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <Root
        isAuthenticated={isAuthenticated}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
    session: state.session,
  }
}

const mapDispatchToProps = {
  logInFromStorage,
  logoutCurrentUser,
  fetchCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
