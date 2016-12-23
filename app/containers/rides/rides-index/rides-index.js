// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

// actions
import { fetchRides } from '../../../actions/rides';

// components
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'

export class RidesIndex extends Component {
  componentDidMount() {
    this.props.fetchRides()
  }

  renderRidesList() {
    const { rides } = this.props

    return (
      rides.map((ride, i) =>
        <RidesIndexItem
          ride={ride}
          key={`ride${i}`}
        />
      )
    )
  }

  render() {
    return (
      <View>
        {this.renderRidesList()}
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
