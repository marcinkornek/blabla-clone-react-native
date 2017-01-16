// utils
import React, { Component, PropTypes } from 'react'
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export class UsersIndexItem extends Component {
  render() {
    const { user } = this.props

    return (
      <ListItem
        onPress={() => Actions.userShow({userId: user.id})}
        key={user.id}
        title={user.full_name}
        avatar={{uri: user.avatar}}
      />
    )
  }
}
