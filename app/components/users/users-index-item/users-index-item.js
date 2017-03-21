// utils
import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  userContainer: {
    backgroundColor: stylesColors[layout].primaryBg,
    borderBottomColor: stylesColors[layout].primaryBorder,
    borderBottomWidth: 2,
  },
  userTitle: {
    color: stylesColors[layout].primaryText,
  },
  userSubtitle: {
    color: stylesColors[layout].secondaryText,
  },
});

export class UsersIndexItem extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  render() {
    const { user, layout, navigation } = this.props

    return (
      <ListItem
        onPress={() => navigation.navigate('userShow', {user: user, layout: layout})}
        key={user.id}
        title={user.full_name}
        avatar={{uri: user.avatar}}
        underlayColor={stylesColors[layout].secondaryBg}
        containerStyle={styles(layout).userContainer}
        titleStyle={styles(layout).userTitle}
        subtitleStyle={styles(layout).userSubtitle}
      />
    )
  }
}
