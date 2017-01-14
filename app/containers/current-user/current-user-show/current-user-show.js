// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, StyleSheet, Image } from 'react-native';

// actions
import { fetchCurrentUser } from '../../../actions/current-user';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const styles = StyleSheet.create({
  view: {
    paddingTop: 80,
  },
  photo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export class UserShow extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    currentUser: {}
  }

  renderUserInfo() {
    const { currentUser } = this.props

    return(
      <View>
        <Image source={{uri: currentUser.avatar}} style={styles.photo} />
        <Text>{currentUser.full_name}</Text>
        <Text></Text>
        <Text>{currentUser.email}</Text>
      </View>
    )
  }

  render() {
    const { isStarted, isFetching } = this.props

    return (
      <ScrollView style={styles.view}>
        {this.renderUserInfo()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.item,
    isStarted: state.currentUser.isStarted,
    isFetching: state.currentUser.isFetching,
  }
}

const mapDispatchToProps = {
  fetchCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
