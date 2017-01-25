// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import moment from 'moment';
import MapView from 'react-native-maps';

// actions
import { fetchRide } from '../../../actions/rides';
import { createRideRequest } from '../../../actions/ride-requests';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RenderUserProfile } from '../../../components/shared/render-user-profile/render-user-profile'
import { RenderCarInfo } from '../../../components/shared/render-car-info/render-car-info'
import { RenderRideOffer } from '../../../components/rides/render-ride-offer/render-ride-offer'

const styles = StyleSheet.create({
  view: {
    marginTop: 60,
    marginLeft: 10,
  },
  rideDetails: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  rideDestination: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  container: {
    height: 200,
    marginRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
const markerIDs = ['startCity', 'destinationCity'];
const { width, height } = Dimensions.get('window')

export class RideShow extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number,
  }

  static defaultProps = {
    currentUserId: {},
    ride: {
      start_city: {},
      destination_city: {},
      car: {},
      driver: {}
    }
  }

  state = {
    markers: []
  }

  componentDidMount() {
    const { rideId, fetchRide } = this.props

    fetchRide(rideId)
  }

  componentDidUpdate(oldProps) {
    const { ride } = this.props;

    if (ride !== oldProps.ride) {
      const coordinates = [
        this.createMarker(ride.start_city.latitude, ride.start_city.longitude),
        this.createMarker(ride.destination_city.latitude, ride.destination_city.longitude)
      ]

      Actions.refresh({
        rideId: ride.id,
        title: `${ride.start_city.address} - ${ride.destination_city.address}`,
        rightTitle: this.renderRightTitle(),
        onRight: this.renderRightAction()
      })

      if (this.coordinatesAreValid()) {
        this.setState({markers: coordinates})
        setTimeout(() => {
          this.fitToCoordinates(coordinates);
        }, 1000);
      }
    }
  }

  fitToCoordinates(coordinates) {
    return (
      this.map.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: false,
      })
    )
  }

  renderRightTitle() {
    const { ride, currentUserId } = this.props;

    if (ride.driver.id === currentUserId) {
      return "Edit"
    } else {
      return undefined
    }
  }

  renderRightAction() {
    const { ride, currentUserId } = this.props;

    if (ride.driver.id === currentUserId) {
      return () => Actions.rideEdit({rideId: ride.id})
    } else {
      return undefined
    }
  }

  renderRide() {
    const { ride } = this.props

    return (
      <View style={styles.rideDetails}>
        <Text style={styles.rideDestination}>
          {ride.start_city.address} - {ride.destination_city.address}
        </Text>
        <Text>{moment(ride.starts_date).format('DD.MM.YY H:MM')}</Text>
        {this.renderMap()}
      </View>
    )
  }

  renderMap() {
    const { ride } = this.props

    if (this.coordinatesAreValid()) {
      return (
        <View style={styles.container}>
          <MapView
            ref={ref => { this.map = ref; }}
            style={styles.map}
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

  coordinatesAreValid() {
    const { ride } = this.props

    return (
      !isNaN(ride.start_city.latitude) && !isNaN(ride.start_city.longitude) &&
        !isNaN(ride.destination_city.latitude) && !isNaN(ride.destination_city.longitude)
    )
  }

  createMarker(latitude, longitude) {
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
  }

  renderDriver() {
    return(
      <RenderUserProfile user={this.props.ride.driver} />
    )
  }

  renderCar() {
    return(
      <RenderCarInfo car={this.props.ride.car} />
    )
  }

  renderOffer() {
    return(
      <RenderRideOffer
        ride={this.props.ride}
        currentUserId={this.props.currentUserId}
        handleSubmit={this.createRideRequest.bind(this)}
      />
    )
  }

  createRideRequest(data) {
    const { createRideRequest, ride } = this.props

    createRideRequest(ride.id, data.places)
  }

  renderRightTitle() {
    const { ride, currentUserId } = this.props;

    if (ride.driver.id === currentUserId) {
      return "Edit"
    }
  }

  renderRightAction() {
    const { ride, currentUserId } = this.props;

    if (ride.driver.id === currentUserId) return () => Actions.rideEdit({rideId: ride.id})
  }

  render() {
    const { isFetching, isStarted } = this.props;

    return (
      <ScrollView style={styles.view}>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderRide()}
          {this.renderDriver()}
          {this.renderCar()}
          {this.renderOffer()}
        </AsyncContent>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ride: state.ride.item,
    isStarted: state.ride.isStarted,
    isFetching: state.ride.isFetching,
    currentUserId: state.session.item.id,
  }
};

const mapDispatchToProps = {
  fetchRide,
  createRideRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RideShow)
