// utils
import React, { Component, PropTypes } from 'react'
import { ListItem } from 'react-native-elements';

export class UsersIndexItem extends Component {
  render() {
    const { user, navigation } = this.props

    return (
      <ListItem
        onPress={() => navigation.navigate('userShow', { id: user.id })}
        key={user.id}
        title={user.full_name}
        avatar={{uri: user.avatar}}
      />
    )
  }
}
