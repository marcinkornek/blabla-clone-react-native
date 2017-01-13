// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { SideMenu } from '../../../components/shared/side-menu/side-menu';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

// actions
import { logInFromStorage, logoutCurrentUser } from '../../../actions/session';
import { fetchCurrentUser } from '../../../actions/current-user';

export class AppDrawer extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { logInFromStorage, fetchCurrentUser } = this.props;

    AsyncStorage.getItem('session', (err, result) => {
      if (result) {
        data = JSON.parse(result)
        logInFromStorage(data)
          .then((response) => {
            if (!response.error) {
              fetchCurrentUser()
            }
          })
      }
    });
  }

  renderSideMenu() {
    const { currentUser, isStarted, isFetching, isAuthenticated } = this.props;

    return (
      <SideMenu
        currentUser={currentUser}
        isStarted={isStarted}
        isFetching={isFetching}
        isAuthenticated={isAuthenticated}
        onLogout={this.onLogout.bind(this)}
      />
    )
  }

  onLogout(currentUser) {
    const { logoutCurrentUser } = this.props

    logoutCurrentUser(currentUser)
      .then(AsyncStorage.clear())
      .then(Actions.login({type: 'reset'}))
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;

    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
      main: { paddingLeft: 3 },
    }

    return (
      <Drawer
        type="overlay"
        content={this.renderSideMenu()}
        tapToClose={true}
        openDrawerOffset={0.3} // 30% gap on the right side of drawer
        panCloseMask={0.4}
        styles={drawerStyles}
        panOpenMask={0.3}
        tweenEasing="easeInOutQuad"
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.item,
    isStarted: state.currentUser.isStarted,
    isFetching: state.currentUser.isFetching,
    isAuthenticated: state.session.isAuthenticated,
  }
}

const mapDispatchToProps = {
  logInFromStorage,
  fetchCurrentUser,
  logoutCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer)
