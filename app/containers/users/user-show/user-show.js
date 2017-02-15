// utils
import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import moment from 'moment';
import _ from 'lodash';

// actions
import { fetchUser } from '../../../actions/users';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RenderUserAge } from '../../../components/shared/render-user-age/render-user-age'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'
import { CarsIndexItem } from '../../../components/cars/cars-index-item/cars-index-item'
import { EditButton } from '../../../components/shared/edit-button/edit-button'

const styles = StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    margin: 10,
    marginRight: 10,
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
  title: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
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
    marginTop: 0,
  },
});

export class UserShow extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
  }

  static defaultProps = {
    user: {
      rides_as_driver: [],
      cars: [],
    }
  }

  static navigationOptions = {
    header: ({ state }) => {
      return {
        title: state.params.myTitle,
        right: (
          <EditButton
            onClick={() => state.params.navigation.navigate('myProfileEdit')}
            showEdit={state.params.showEdit}
          />
        )
      }
    }
  }

  componentWillMount() {
    const { fetchUser, navigation } = this.props;
    const id = navigation.state.params.id

    fetchUser(id)
  }

  componentDidUpdate(oldProps) {
    const { user } = this.props;

    if (user !== oldProps.user) {
      this.setParams()
    }
  }

  setParams() {
    const { user, navigation } = this.props;
    const title = `${user.full_name} profile`

    navigation.setParams({
      myTitle: title,
      id: user.id,
      navigation: navigation,
      showEdit: this.showEdit()
    })
  }

  showEdit() {
    const { user, currentUser } = this.props;

    return user.id === currentUser.id
  }

  renderUserInfo() {
    const { user } = this.props

    return(
      <View style={styles.userInfoContainer}>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
        <Text style={styles.userName}>{user.full_name}</Text>
        <RenderUserAge user={user} style={styles.userInfo} />
        <Text style={styles.userInfo}>member since: {moment(user.created_at).format('DD.MM.YYYY')}</Text>
        <Text style={styles.userInfo}>last seen at: {moment(user.last_seen_at || Date.now()).format('DD.MM.YYYY')}</Text>
      </View>
    )
  }

  renderRidesAsDriver() {
    const { user } = this.props

    if (!_.isEmpty(user.rides_as_driver)) {
      return (
        <View>
          <Text style={styles.title}>Rides as driver</Text>
          {this.renderRidesAsDriverList()}
        </View>
      )
    }
  }

  renderRidesAsDriverList() {
    const { user } = this.props

    return (
      user.rides_as_driver.map((ride, i) =>
        <RidesIndexItem
          key={`ride-${i}`}
          ride={ride}
          withCarPhoto={true}
        />
      )
    )
  }

  renderUserCars() {
    const { user } = this.props

    if (!_.isEmpty(user.cars)) {
      return (
        <View>
          <Text style={styles.title}>Cars</Text>
          {this.renderUserCarsList()}
        </View>
      )
    }
  }

  renderUserCarsList() {
    const { user, currentUser } = this.props

    return (
      user.cars.map((car, i) =>
        <CarsIndexItem
          key={`car-${i}`}
          car={car}
          currentUser={currentUser}
        />
      )
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
          {this.renderRidesAsDriver()}
          {this.renderUserCars()}
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
    currentUser: state.session.item,
  }
}

const mapDispatchToProps = {
  fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
