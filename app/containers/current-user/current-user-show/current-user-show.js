// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, StyleSheet, Image, TouchableHighlight } from 'react-native';
import moment from 'moment';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { fetchCurrentUser } from '../../../actions/current-user';

// components
import { EditButton } from '../../../components/shared/edit-button/edit-button'

const styles = (layout) => StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    margin: 10,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: stylesColors[layout].avatarBorder,
  },
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
  },
  primaryText: {
    fontSize: 16,
    color: stylesColors[layout].primaryText,
  },
  userInfo: {
    fontSize: 16,
    color: stylesColors[layout].userInfoContainerText,
  },
  userInfoContainer: {
    backgroundColor: stylesColors[layout].userInfoContainerBg,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: stylesColors[layout].userInfoContainerText,
  },
  view: {
    backgroundColor: stylesColors[layout].primaryBg,
  },
});

export class UserShow extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    layout: PropTypes.string.isRequired,
  }

  static defaultProps = {
    currentUser: {}
  }

  static navigationOptions = props => {
    const { navigation } = props;
    const { state, setParams } = navigation;
    const { params } = state;

    return {
      tabBarLabel: 'My profile',
      headerTitle: 'My profile',
      headerRight:
        <EditButton
          layout={params.layout}
          onClick={() => navigation.navigate('myProfileEdit')}
          showEdit={true}
        />
    }
  }

  renderUserInfo() {
    const { currentUser, layout } = this.props

    return (
      <View style={styles(layout).userInfoContainer}>
        <Image source={{uri: currentUser.avatar}} style={styles(layout).avatar} />
        <Text style={styles(layout).userName}>{currentUser.first_name} {currentUser.last_name}</Text>
        <Text style={styles(layout).userInfo}>{currentUser.email}</Text>
        <Text style={styles(layout).userInfo}>{currentUser.gender}</Text>
        <Text style={styles(layout).userInfo}>{moment(currentUser.date_of_birth).format('DD.MM.YYYY')}</Text>
        <Text style={styles(layout).userInfo}>{currentUser.tel_num}</Text>
      </View>
    )
  }

  renderUserLinks() {
    const { currentUser, layout, navigation } = this.props

    return (
      <View style={styles(layout).container}>
        <TouchableHighlight
          underlayColor={stylesColors[layout].primaryBg}
          onPress={() => navigation.navigate('userShow', {user: currentUser, layout: layout})}
        >
          <Text style={styles(layout).primaryText}>View my public profile</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const { isStarted, isFetching, layout } = this.props

    return (
      <ScrollView style={styles(layout).view}>
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
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  fetchCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
