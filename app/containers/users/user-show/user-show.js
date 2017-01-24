// utils
import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import _ from 'lodash';

// actions
import { fetchUser } from '../../../actions/users';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RenderUserAge } from '../../../components/shared/render-user-age/render-user-age'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'
import { CarsIndexItem } from '../../../components/cars/cars-index-item/cars-index-item'

const styles = StyleSheet.create({
  view: {
    marginTop: 60,
  },
  avatar: {
    width: 100,
    height: 100,
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
    user: {
      rides_as_driver: { items: [] },
      cars: { items: [] },
    }
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
        <Text>member since: {moment(user.created_at).format('DD.MM.YYYY')}</Text>
        <Text>last seen at: {moment(user.last_seen_at || Date.now()).format('DD.MM.YYYY')}</Text>
      </View>
    )
  }

  renderRidesAsDriver() {
    const { user } = this.props

    if (!_.isEmpty(user.rides_as_driver.items)) {
      return (
        <View>
          <Text>Rides as driver</Text>
          {this.renderRidesAsDriverList()}
        </View>
      )
    }
  }

  renderRidesAsDriverList() {
    const { user } = this.props

    return (
      user.rides_as_driver.items.map((ride, i) =>
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

    if (!_.isEmpty(user.cars.items)) {
      return (
        <View>
          <Text>Cars</Text>
          {this.renderUserCarsList()}
        </View>
      )
    }
  }

  renderUserCarsList() {
    const { user, currentUserId } = this.props

    return (
      user.cars.items.map((car, i) =>
        <CarsIndexItem
          key={`car-${i}`}
          car={car}
          currentUserId={currentUserId}
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
    currentUserId: state.session.item.id,
  }
}

const mapDispatchToProps = {
  fetchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
