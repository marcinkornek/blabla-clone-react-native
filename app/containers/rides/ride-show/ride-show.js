// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableHighlight, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import MapView from 'react-native-maps';
import Collapsible from 'react-native-collapsible';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { initializeRide, fetchRide } from '../../../actions/rides';
import { createRideRequest, changeRideRequest } from '../../../actions/ride-requests';
import { showModal } from '../../../actions/modals';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RideRequestsIndex } from '../../../components/rides/ride-requests-index/ride-requests-index'
import { RenderUserProfile } from '../../../components/shared/render-user-profile/render-user-profile'
import { RenderCarInfo } from '../../../components/shared/render-car-info/render-car-info'
import { RenderRideOffer } from '../../../components/rides/render-ride-offer/render-ride-offer'
import { EditButton } from '../../../components/shared/edit-button/edit-button'

const { width, height } = Dimensions.get('window')
const styles = (layout) => StyleSheet.create({
  container: {
    height: 200,
    marginRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rideDetails: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  rideDestination: {
    color: stylesColors[layout].primaryText,
    fontSize: 18,
    fontWeight: 'bold'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalStyles: {
    marginTop: height - 300,
    backgroundColor: stylesColors[layout].secondaryBg,
  },
  toggleMap: {
    color: stylesColors[layout].primaryText,
  },
  view: {
    backgroundColor: stylesColors[layout].primaryBg,
    paddingTop: 10,
    paddingLeft: 10,
  },
});
const markerIDs = ['startCity', 'destinationCity'];

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

  static navigationOptions = {
    header: ({ state }) => {
      return {
        title: state.params.myTitle,
        right: (
          <EditButton
            layout={state.params.layout}
            onClick={() => state.params.navigation.navigate('rideEdit', {id: state.params.id})}
            showEdit={state.params.showEdit}
          />
        )
      }
    }
  }

  state = {
    markers: [],
    hideMap: true,
  }

  componentWillMount() {
    const { initializeRide, fetchRide, navigation, ride } = this.props
    const initialRide = navigation.state.params.ride
    const layout = navigation.state.params.layout

    this.setParams(initialRide, layout)
    initializeRide(initialRide)
    fetchRide(initialRide.id)
  }

  setParams(ride, layout) {
    const { navigation } = this.props;
    const title = `${ride.start_location_address} - ${ride.destination_location_address}`

    navigation.setParams({
      myTitle: title,
      id: ride.id,
      layout: layout,
      navigation: navigation,
      showEdit: this.showEdit(ride)
    })
  }

  showEdit(ride) {
    const { currentUser } = this.props;

    return ride.driver_id === currentUser.id
  }

  fitToCoordinates(coordinates) {
    return (
      this.map.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: false,
      })
    )
  }

  coordinatesAreValid() {
    const { ride } = this.props

    if (ride.start_location === undefined) return false
    return (
      !isNaN(ride.start_location.latitude) && !isNaN(ride.start_location.longitude) &&
        !isNaN(ride.destination_location.latitude) && !isNaN(ride.destination_location.longitude)
    )
  }

  createMarker(latitude, longitude) {
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
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
    const { changeRideRequest } = this.props

    changeRideRequest(rideRequestId, status)
  }

  toggleMap() {
    const { ride } = this.props;
    const coordinates = [
      this.createMarker(ride.start_location.latitude, ride.start_location.longitude),
      this.createMarker(ride.destination_location.latitude, ride.destination_location.longitude)
    ]

    if (this.coordinatesAreValid()) {
      this.setState({hideMap: !this.state.hideMap, markers: coordinates})
      setTimeout(() => {
        this.fitToCoordinates(coordinates);
      }, 500);
    }
  }

  showCarModal() {
    const { navigation, showModal, ride, layout } = this.props;

    showModal('CAR_SHOW', {
      car: ride.car, layout: layout, modalStyles: styles(layout).modalStyles
    })
  }

  renderRide() {
    const { ride, layout } = this.props

    return (
      <View style={styles(layout).rideDetails}>
        <Text style={styles(layout).rideDestination}>
          {ride.start_location_address} - {ride.destination_location_address}
        </Text>
        <Text>{moment(ride.starts_date).format('DD.MM.YY H:MM')}</Text>
      </View>
    )
  }

  renderMapToggle() {
    const { layout } = this.props

    return (
      <View>
        <TouchableHighlight
          underlayColor={stylesColors[layout].primaryBg}
          onPress={() => this.toggleMap()}
        >
          <Text style={styles(layout).toggleMap}>{this.state.hideMap ? 'Show map' : 'Hide map'}</Text>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.hideMap}>
          {this.renderMap()}
        </Collapsible>
      </View>
    )
  }

  renderMap() {
    const { ride, layout } = this.props

    if (this.coordinatesAreValid()) {
      return (
        <View style={styles(layout).container}>
          <MapView
            ref={ref => { this.map = ref; }}
            style={styles(layout).map}
            initialRegion={{
              latitude: parseFloat(ride.start_location.latitude),
              longitude: parseFloat(ride.start_location.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {this.state.markers.map((marker, i) => (
              <MapView.Marker
                key={i}
                coordinate={marker}
              />
            ))}
          </MapView>
        </View>
      )
    }
  }

  renderDriver() {
    const { ride, currentUser, layout, navigation } = this.props

    if (ride.driver && !(ride.driver.id === currentUser.id)) {
      return(
        <RenderUserProfile
          user={ride.driver}
          layout={layout}
          navigation={navigation}
        />
      )
    }
  }

  renderCar() {
    const { ride, layout, navigation } = this.props

    if (ride.car) {
      return(
        <RenderCarInfo
          car={ride.car}
          layout={layout}
          onSubmit={this.showCarModal.bind(this)}
          navigation={navigation}
        />
      )
    }
  }

  renderOffer() {
    const { ride, currentUser, layout } = this.props

    if (ride.driver) {
      return(
        <RenderRideOffer
          ride={ride}
          currentUser={currentUser}
          layout={layout}
          handleSubmit={this.createRideRequest.bind(this)}
        />
      )
    }
  }

  renderRideRequests() {
    const { ride, currentUser, layout } = this.props

    if (ride.driver && (ride.driver.id === currentUser.id) && !_.isEmpty(ride.ride_requests)) {
      return(
        <RideRequestsIndex
          ride={ride}
          currentUser={currentUser}
          layout={layout}
          handleSubmit={this.changeRideRequest.bind(this)}
        />
      )
    }
  }

  render() {
    const { layout } = this.props;

    return (
      <ScrollView style={styles(layout).view}>
        {this.renderRide()}
        {this.renderMapToggle()}
        {this.renderDriver()}
        {this.renderCar()}
        {this.renderOffer()}
        {this.renderRideRequests()}
      </ScrollView>
    );
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
