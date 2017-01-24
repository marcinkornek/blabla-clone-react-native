// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

// actions
import { fetchCurrentUser } from '../../../actions/current-user';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const styles = StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    margin: 10,
    marginRight: 10,
    borderRadius: 80,
  },
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  view: {
    marginTop: 60,
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

    return (
      <View style={styles.container}>
        <Image source={{uri: currentUser.avatar}} style={styles.avatar} />
        <Text style={styles.userName}>{currentUser.first_name} {currentUser.last_name}</Text>
        <Text>{currentUser.email}</Text>
        <Text>{currentUser.gender}</Text>
        <Text>{moment(currentUser.date_of_birth).format('DD.MM.YYYY')}</Text>
        <Text>{currentUser.tel_num}</Text>
      </View>
    )
  }

  renderUserLinks() {
    const { currentUser } = this.props

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='white'
          onPress={() => Actions.userShow({userId: currentUser.id})}
        >
          <Text>View my public profile</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const { isStarted, isFetching } = this.props

    return (
      <ScrollView style={styles.view}>
        {this.renderUserInfo()}
        {this.renderUserLinks()}
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
