// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// actions
import { logInFromStorage, logoutCurrentUser } from './actions/session';
import { fetchCurrentUser } from './actions/current-user';

// components
import { Root } from './navigation-routes'

export class RootRouter extends Component {
  static propTypes = {
    playerId: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    session: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { logInFromStorage, fetchCurrentUser, session, playerId } = this.props;

    logInFromStorage(session, playerId)
      .then((response) => {
        if (!response.error) {
          fetchCurrentUser()
        }
      })
  }

  render() {
    const { isAuthenticated, playerId } = this.props

    return (
      <Root
        isAuthenticated={isAuthenticated}
        playerId={playerId}
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

export default connect(mapStateToProps, mapDispatchToProps)(RootRouter)
