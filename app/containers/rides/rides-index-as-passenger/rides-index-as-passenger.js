// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

// actions
import { fetchRidesAsPassenger, refreshRidesAsPassenger } from '../../../actions/rides';

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'

const per = 20
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export class RidesIndexAsPassenger extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    rides: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
  }

  static navigationOptions = {
    tabBar: {
      label: 'Rides as passenger',
    }
  }

  componentWillMount() {
    const { refreshRidesAsPassenger, currentUser } = this.props

    if (currentUser.id) refreshRidesAsPassenger(currentUser.id, per)
  }

   refreshRides(per) {
    const { refreshRidesAsPassenger, currentUser } = this.props

    if (currentUser.id) refreshRidesAsPassenger(currentUser.id, per)
  }

  fetchRides(page, per) {
    const { fetchRidesAsPassenger, currentUser } = this.props

    if (currentUser.id) fetchRidesAsPassenger(currentUser.id, page, per)
  }

  renderRide(ride) {
    const { navigation } = this.props;

    return (
      <RidesIndexItem
        ride={ride}
        navigation={navigation}
        key={`ride${ride.id}`}
      />
    )
  }

  renderRidesList() {
    const { rides, isFetching, isStarted, pagination } = this.props;

    return (
      <RenderList
        items={rides}
        pagination={pagination}
        isFetching={isFetching}
        isStarted={isStarted}
        fetchItems={this.fetchRides.bind(this)}
        refreshItems={this.refreshRides.bind(this)}
        renderRow={this.renderRide.bind(this)}
        per={per}
        onEndReachedThreshold={200}
        emptyListText='No rides as passenger'
      />
    )
  }

  render() {
    return (
      <View style={styles.view}>
        {this.renderRidesList()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pagination: state.ridesAsPassenger.pagination,
    rides: state.ridesAsPassenger.items,
    isStarted: state.ridesAsPassenger.isStarted,
    isFetching: state.ridesAsPassenger.isFetching,
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.item,
  }
};

const mapDispatchToProps = {
  fetchRidesAsPassenger,
  refreshRidesAsPassenger,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndexAsPassenger)
