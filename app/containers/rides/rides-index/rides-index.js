// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// actions
import { fetchRides } from '../../../actions/rides';

export class RidesIndex extends Component {
  componentDidMount() {
    this.props.fetchRides()
  }

  renderRidesList() {
    const { rides } = this.props

    return (
      rides.map((ride, i) =>
        <Text key={i}>{ride.start_city}</Text>
      )
    )
  }

  render() {
    return (
      <View>
        <Text>
          {this.renderRidesList()}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rides: state.rides.items,
    isStarted: state.rides.isStarted,
    isFetching: state.rides.isFetching,
  }
};

const mapDispatchToProps = {
  fetchRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndex)
