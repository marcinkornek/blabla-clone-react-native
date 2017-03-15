// utils
import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import moment from 'moment';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { fetchUser } from '../../../actions/users';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RenderUserAge } from '../../../components/shared/render-user-age/render-user-age'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'
import { CarsIndexItem } from '../../../components/cars/cars-index-item/cars-index-item'
import { EditButton } from '../../../components/shared/edit-button/edit-button'

const styles = (layout) => StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    margin: 10,
    marginRight: 10,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: stylesColors[layout].userShowAvatarBorder,
  },
  userInfoContainer: {
    backgroundColor: stylesColors[layout].userShowUserContainerBg,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    backgroundColor: stylesColors[layout].primaryBg,
    color: stylesColors[layout].primaryText,
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: stylesColors[layout].userShowUserContainerText,
  },
  userInfo: {
    fontSize: 16,
    color: stylesColors[layout].userShowUserContainerText,
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
    layout: PropTypes.string.isRequired,
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
    const { user, layout } = this.props

    return(
      <View style={styles(layout).userInfoContainer}>
        <Image source={{uri: user.avatar}} style={styles(layout).avatar} />
        <Text style={styles(layout).userName}>{user.full_name}</Text>
        <RenderUserAge user={user} style={styles(layout).userInfo} />
        <Text style={styles(layout).userInfo}>member since: {moment(user.created_at).format('DD.MM.YYYY')}</Text>
        <Text style={styles(layout).userInfo}>last seen at: {moment(user.last_seen_at || Date.now()).format('DD.MM.YYYY')}</Text>
      </View>
    )
  }

  renderRidesAsDriver() {
    const { user, layout } = this.props

    if (!_.isEmpty(user.rides_as_driver)) {
      return (
        <View>
          <Text style={styles(layout).title}>Rides as driver</Text>
          {this.renderRidesAsDriverList()}
        </View>
      )
    }
  }

  renderRidesAsDriverList() {
    const { user, layout, navigation } = this.props

    return (
      user.rides_as_driver.map((ride, i) =>
        <RidesIndexItem
          key={`ride-${i}`}
          ride={ride}
          layout={layout}
          navigation={navigation}
          withCarPhoto={true}
        />
      )
    )
  }

  renderUserCars() {
    const { user, layout } = this.props

    if (!_.isEmpty(user.cars)) {
      return (
        <View>
          <Text style={styles(layout).title}>Cars</Text>
          {this.renderUserCarsList()}
        </View>
      )
    }
  }

  renderUserCarsList() {
    const { user, currentUser, layout, navigation } = this.props

    return (
      user.cars.map((car, i) =>
        <CarsIndexItem
          key={`car-${i}`}
          car={car}
          layout={layout}
          navigation={navigation}
          currentUser={currentUser}
        />
      )
    )
  }

  render() {
    const { isStarted, isFetching, layout } = this.props

    return (
      <ScrollView style={styles(layout).view}>
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
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
