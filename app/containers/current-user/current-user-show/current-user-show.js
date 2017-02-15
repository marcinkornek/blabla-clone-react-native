// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import moment from 'moment';

// actions
import { fetchCurrentUser } from '../../../actions/current-user';

const styles = StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    margin: 10,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: 'white',
  },
  userInfoContainer: {
    backgroundColor: '#23A2E3',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    fontSize: 16,
    color: 'white',
  },
  view: {
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

  static navigationOptions = {
    tabBar: {
      label: 'My profile',
    }
  }

  renderUserInfo() {
    const { currentUser } = this.props

    return (
      <View style={styles.userInfoContainer}>
        <Image source={{uri: currentUser.avatar}} style={styles.avatar} />
        <Text style={styles.userName}>{currentUser.first_name} {currentUser.last_name}</Text>
        <Text style={styles.userInfo}>{currentUser.email}</Text>
        <Text style={styles.userInfo}>{currentUser.gender}</Text>
        <Text style={styles.userInfo}>{moment(currentUser.date_of_birth).format('DD.MM.YYYY')}</Text>
        <Text style={styles.userInfo}>{currentUser.tel_num}</Text>
      </View>
    )
  }

  renderUserLinks() {
    const { currentUser, navigation } = this.props

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='white'
          onPress={() => navigation.navigate('userShow', { id: currentUser.id })}
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
  fetchCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
