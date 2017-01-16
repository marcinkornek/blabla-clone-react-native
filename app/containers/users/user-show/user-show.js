// utils
import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';

// actions
import { fetchUser } from '../../../actions/users';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RenderUserAge } from '../../../components/shared/render-user-age/render-user-age'

const styles = StyleSheet.create({
  view: {
    paddingTop: 80,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export class UserShow extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number.isRequired,
  }

  static defaultProps = {
    user: {}
  }

  componentDidMount() {
    const { fetchUser, userId } = this.props;

    fetchUser(userId)
  }

  componentDidUpdate(oldProps) {
    const { user } = this.props;

    if (user !== oldProps.user) {
      Actions.refresh({
        userId: user.id,
        title: `${user.full_name} profile`
      })
    }
  }

  renderUserInfo() {
    const { user } = this.props

    return(
      <View>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
        <Text>{user.full_name}</Text>
        <RenderUserAge user={user} />
        <Text>{user.email}</Text>
      </View>
    )
  }

  render() {
    const { isStarted, isFetching } = this.props

    return (
      <ScrollView style={styles.view}>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderUserInfo()}
        </AsyncContent>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.item,
    isStarted: state.user.isStarted,
    isFetching: state.user.isFetching,
    currentUserId: state.session.item.id,
  }
}

const mapDispatchToProps = {
  fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
