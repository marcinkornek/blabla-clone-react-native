// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { max } from 'ramda'

// actions
import {
  fetchRides,
  refreshRides,
  setDefaultRidesPer,
  updateRidesSearch,
  updateRidesFilters,
  clearRidesSearch,
  clearRidesFilters,
} from '../../../actions/rides';

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'
import { RenderRidesFilters } from '../../../components/rides/render-rides-filters/render-rides-filters'
import { RenderRidesSearch } from '../../../components/rides/render-rides-search/render-rides-search'

const per = 20
const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    marginTop: -10,
  },
  view: {
    flex: 1,
  },
});

export class RidesIndex extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    rides: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    filters: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    tabBar: ({ state }) => ({
      label: 'Rides',
    }),
  };

  state = {
    showSearch: false,
    showFilters: false,
  };

  static defaultProps = {
    ride: {}
  }

  componentWillMount() {
    const { refreshRides, setDefaultRidesPer, rides, pagination } = this.props;

    setDefaultRidesPer(per)
    refreshRides(this.initialPer())
  }

  componentDidUpdate(oldProps) {
    const { notificationActive, ride, navigation } = this.props;

    if (notificationActive !== oldProps.notificationActive) {
      navigation.navigate('rideShow', {id: notificationActive.ride.id})
    }

    if (ride.isSaving == false && oldProps.ride.isSaving == true) {
      this.refreshRides()
    }
  }

  refreshRides() {
    this.props.refreshRides(this.initialPer())
  }

  fetchRides(page, per) {
    this.props.fetchRides(page, per)
  }

  initialPer() {
    const { rides } = this.props;

    if (rides.length >= 3 * per) {
      return 3 * per
    } else if (rides.length >= 2 * per) {
      return 2 * per
    } else {
      return per
    }
  }

  renderRightButton() {
    return (
      <View style={styles.filtersContainer}>
        <Icon.Button
          onPress={() => this.toggleSearch()}
          name="md-search"
          backgroundColor='transparent'
          underlayColor='transparent'
          color="#23a2e3"
          size={30}
        />
        <MaterialCommunityIcons.Button
          onPress={() => this.toggleFilters()}
          name="filter-variant"
          backgroundColor='transparent'
          underlayColor='transparent'
          color="#23a2e3"
          size={30}
        />
      </View>
    )
  }

  toggleSearch() {
    this.setState({showSearch: !this.state.showSearch})
  }

  toggleFilters() {
    this.setState({showFilters: !this.state.showFilters})
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
    const { rides, isFetching, isStarted, pagination, isAuthenticated, navigation } = this.props;

    return (
      <RenderList
        items={rides}
        pagination={pagination}
        isFetching={isFetching}
        isStarted={isStarted}
        fetchItems={this.fetchRides.bind(this)}
        refreshItems={this.refreshRides.bind(this)}
        renderRow={this.renderRide.bind(this)}
        showAddButton={isAuthenticated}
        addButtonLink={() => navigation.navigate('rideNew')}
        per={per}
        onEndReachedThreshold={200}
        emptyListText='No rides'
      />
    )
  }

  renderRidesSearch() {
    const { search } = this.props;

    if (this.state.showSearch) {
      return (
        <RenderRidesSearch
          onSubmit={this.searchRides.bind(this)}
          clearSearch={this.clearSearch.bind(this)}
          search={search}
        />
      )
    }
  }

  renderRidesFilters() {
    const { filters } = this.props;

    if (this.state.showFilters) {
      return (
        <RenderRidesFilters
          onSubmit={this.filterRides.bind(this)}
          clearFilters={this.clearFilters.bind(this)}
          filters={filters}
        />
      )
    }
  }

  filterRides(data) {
    const { updateRidesFilters, refreshRides } = this.props;

    updateRidesFilters(data)
    refreshRides(per)
  }

  searchRides(data) {
    const { updateRidesSearch, refreshRides } = this.props;

    updateRidesSearch(data)
    refreshRides(per)
  }

  clearSearch() {
    const { refreshRides, clearRidesSearch } = this.props;

    clearRidesSearch()
    refreshRides(per)
  }

  clearFilters() {
    const { refreshRides, clearRidesFilters } = this.props;

    clearRidesFilters()
    refreshRides(per)
  }

  render() {
    return (
      <View style={styles.view}>
        <View>
          {this.renderRidesSearch()}
          {this.renderRidesFilters()}
        </View>
        {this.renderRidesList()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pagination: state.rides.pagination,
    rides: state.rides.items,
    filters: state.ridesFilters.filters,
    search: state.ridesFilters.search,
    isStarted: state.rides.isStarted,
    isFetching: state.rides.isFetching,
    isAuthenticated: state.session.isAuthenticated,
    notificationActive: state.notificationActive.item,
    ride: state.ride,
  }
};

const mapDispatchToProps = {
  fetchRides,
  refreshRides,
  setDefaultRidesPer,
  updateRidesSearch,
  updateRidesFilters,
  clearRidesSearch,
  clearRidesFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndex)
