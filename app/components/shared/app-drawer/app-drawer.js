import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { SideMenu } from '../side-menu/side-menu';
import { Actions, DefaultRenderer } from 'react-native-router-flux';

export class AppDrawer extends Component {
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
        content={<SideMenu />}
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
