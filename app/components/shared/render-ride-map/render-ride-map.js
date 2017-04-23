// utils
import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    height: 200,
    marginRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export class RenderRideMap extends Component {
  static propTypes = {
    start_location: PropTypes.object.isRequired,
    destination_location: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  getCoordinates() {
    const { start_location, destination_location, layout } = this.props

    return (
      [
        {
          latitude: parseFloat(start_location.latitude),
          longitude: parseFloat(start_location.longitude),
          title: 'Start location',
          description: start_location.address,
          pinColor: stylesColors['base'].locationStart,
        },
        {
          latitude: parseFloat(destination_location.latitude),
          longitude: parseFloat(destination_location.longitude),
          title: 'Destination location',
          description: destination_location.address,
          pinColor: stylesColors['base'].locationDestination,
        },
      ]
    )
  }

  coordinatesAreValid() {
    const { start_location, destination_location } = this.props

    return (
      !isNaN(start_location.latitude) && !isNaN(start_location.longitude) &&
        !isNaN(destination_location.latitude) && !isNaN(destination_location.longitude)
    )
  }

  render() {
    const { layout } = this.props
    const coordinates = this.getCoordinates()

    if (!this.coordinatesAreValid()) return null
    return (
      <View style={styles(layout).mapContainer}>
        <MapView
          ref={(ref) => { this.mapRef = ref }}
          style={styles(layout).map}
          cacheEnabled={true}
          onLayout = {() => this.mapRef.fitToCoordinates(coordinates, { edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }, animated: false })}
        >
          {coordinates.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker}
              title={marker.title}
              description={marker.description}
              pinColor={marker.pinColor}
            />
          ))}
        </MapView>
      </View>
    )
  }
}
