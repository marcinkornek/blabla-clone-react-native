// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Alert, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import MapView from 'react-native-maps';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { initializeRide, fetchRide } from '../../../actions/rides';
import { createRideRequest, changeRideRequest } from '../../../actions/ride-requests';
import { showModal } from '../../../actions/modals';

// components
import { RideShowFuture } from '../../../components/rides/ride-show-future/ride-show-future'
import { RideShowPast } from '../../../components/rides/ride-show-past/ride-show-past'
import { EditButton } from '../../../components/shared/edit-button/edit-button'

const { width, height } = Dimensions.get('window')
const styles = (layout) => StyleSheet.create({
  modalStyles: {
    marginTop: height - 300,
    backgroundColor: stylesColors[layout].secondaryBg,
  },
  view: {
    backgroundColor: stylesColors[layout].primaryBg,
    padding: 10,
    paddingRight: 0,
  },
});

export class RideShow extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    layout: PropTypes.string.isRequired,
  }

  static defaultProps = {
    currentUser: {},
    ride: {
      start_location: {},
      destination_location: {},
      car: {},
      driver: {}
    }
  }

  static navigationOptions = props => {
    const { navigation } = props;
    const { state } = navigation;
    const { params } = state;

    return {
      headerTitle: `${params.ride.start_location_address} - ${params.ride.destination_location_address}`,
      headerRight: (
        <EditButton
          layout={params.layout}
          onClick={() => params.navigation.navigate('rideEdit', {id: params.id})}
          showEdit={params.showEdit}
        />
      ),
    };
  };

  componentWillMount() {
    const { initializeRide, fetchRide, navigation } = this.props
    const ride = navigation.state.params.ride
    const layout = navigation.state.params.layout

    this.setParams(ride, layout)
    initializeRide(ride)
    fetchRide(ride.id)
  }

  setParams(ride, layout) {
    const { navigation } = this.props;

    navigation.setParams({
      showEdit: this.showEdit(ride)
    })
  }

  showEdit(ride) {
    const { currentUser } = this.props;

    return ride.driver_id === currentUser.id
  }

  createRideRequest(data) {
    const { createRideRequest, ride } = this.props

    createRideRequest(ride.id, data.places)
      .then((response) => {
        if (!response.error) {
          Alert.alert(
            'Ride request created',
            'We will notify you as soon as driver accept or reject your offer.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          )
        }
      })
  }

  changeRideRequest(rideRequestId, status) {
    this.props.changeRideRequest(rideRequestId, status)
  }

  showCarModal() {
    const { showModal, ride, layout, navigation } = this.props;

    showModal('CAR_SHOW', {
      car: ride.car, layout: layout, modalStyles: styles(layout).modalStyles, navigation: navigation
    })
  }

  showUserModal() {
    const { showModal, ride, layout, navigation } = this.props;

    showModal('USER_SHOW', {
      user: ride.driver, layout: layout, modalStyles: styles(layout).modalStyles, navigation: navigation
    })
  }

  isRidePast() {
    return moment().diff(moment(this.props.ride.start_date)) < 0
  }

  render() {
    const { layout } = this.props;
    const SpecificComponent = this.isRidePast() ? RideShowFuture : RideShowPast

    return (
      <ScrollView style={styles(layout).view}>
        <SpecificComponent
          showCarModal={this.showCarModal.bind(this)}
          showUserModal={this.showUserModal.bind(this)}
          changeRideRequest={this.changeRideRequest.bind(this)}
          createRideRequest={this.createRideRequest.bind(this)}
          {...this.props}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ride: state.ride.item,
    isStarted: state.ride.isStarted,
    isFetching: state.ride.isFetching,
    currentUser: state.session.item,
    layout: state.settings.layout,
  }
};

const mapDispatchToProps = {
  initializeRide,
  fetchRide,
  createRideRequest,
  changeRideRequest,
  showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RideShow)
