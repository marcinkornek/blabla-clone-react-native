// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { max } from 'ramda'

// styles
import stylesColors from '../../../constants/colors';

// actions
import {
  fetchRides,
  refreshRides,
  setDefaultRidesPer,
  updateRidesSearch,
  clearRidesSearch,
} from '../../../actions/rides';
import { showModal } from '../../../actions/modals';

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'
import { RenderRidesSearch } from '../../../components/rides/render-rides-search/render-rides-search'

const per = 20
const { width, height } = Dimensions.get('window')
const styles = (layout) => StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    marginTop: -5,
  },
  modalStyles: {
    margin: 20,
    flex: 0,
    height: 370,
  },
  modalUserStyles: {
    marginTop: height - 300,
    backgroundColor: stylesColors[layout].secondaryBg,
  },
  view: {
    flex: 1,
    backgroundColor: stylesColors[layout].primaryBg,
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
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    tabBar: {
      label: 'Rides',
    },
    header: (navigation, header) => ({
      ...header,
      title: 'Rides',
      right: (
        <View style={styles('base').filtersContainer}>
          <Icon.Button
            onPress={() => {
              const state = navigation.state
              const showSearch = state.params && state.params.showSearch ? !state.params.showSearch : true
              return (navigation.setParams({showSearch: showSearch}))
            }}
            name="md-search"
            backgroundColor='transparent'
            underlayColor='transparent'
            color={stylesColors['base'].buttonSubmit}
            size={30}
          />
          <MaterialCommunityIcons.Button
            onPress={() => {
              const state = navigation.state
              return (navigation.setParams({showFilters: true}))
            }}
            name="filter-variant"
            backgroundColor='transparent'
            underlayColor='transparent'
            color={stylesColors['base'].buttonSubmit}
            size={30}
          />
        </View>
      )
    })
  };

  componentWillMount() {
    const { refreshRides, setDefaultRidesPer, rides, pagination } = this.props;

    setDefaultRidesPer(per)
    refreshRides(this.initialPer())
  }

  componentDidUpdate(oldProps) {
    const { notificationActive, ride, filters, showModal, modalType, layout, navigation } = this.props;
    const state = navigation.state

    if (state.params && state.params.showFilters && oldProps.modalType === undefined) {
      showModal('RIDES_FILTERS', { title: 'Set filters', modalStyles: styles(layout).modalStyles })
    }

  if (oldProps.modalType === 'RIDES_FILTERS') {
      navigation.setParams({showFilters: false})
    }

    if (filters !== oldProps.filters) {
      this.refreshRides()
    }

    if (notificationActive !== oldProps.notificationActive) {
      navigation.navigate('rideShow', {ride: notificationActive.ride, layout: layout})
    }

    if (ride && ride.isSaving == false && oldProps.ride.isSaving == true) {
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

  showUserModal(ride) {
    const { showModal, layout, navigation } = this.props;

    showModal('USER_SHOW', {
      user: ride.driver, layout: layout, modalStyles: styles(layout).modalUserStyles, navigation: navigation
    })
  }

  renderRide(ride) {
    const { navigation, layout } = this.props;

    return (
      <RidesIndexItem
        ride={ride}
        layout={layout}
        navigation={navigation}
        showUserModal={this.showUserModal.bind(this)}
        key={`ride${ride.id}`}
      />
    )
  }

  renderRidesList() {
    const { rides, isFetching, isStarted, pagination, isAuthenticated, layout, navigation } = this.props;

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
        layout={layout}
        onEndReachedThreshold={200}
        emptyListText='No rides'
      />
    )
  }

  renderRidesSearch() {
    const { search, layout, navigation } = this.props;
    const state = navigation.state

    if (state.params && state.params.showSearch) {
      return (
        <RenderRidesSearch
          search={search}
          layout={layout}
          onSubmit={this.searchRides.bind(this)}
          clearSearch={this.clearSearch.bind(this)}
        />
      )
    }
  }

  searchRides(data) {
    const { refreshRides, updateRidesSearch } = this.props;

    updateRidesSearch(data)
    refreshRides(per)
  }

  clearSearch() {
    const { refreshRides, clearRidesSearch } = this.props;

    clearRidesSearch()
    refreshRides(per)
  }

  render() {
    const { layout } = this.props;

    return (
      <View style={styles(layout).view}>
        {this.renderRidesSearch()}
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
    modalType: state.modal.modalType,
    layout: state.settings.layout,
  }
};

const mapDispatchToProps = {
  fetchRides,
  refreshRides,
  setDefaultRidesPer,
  updateRidesSearch,
  clearRidesSearch,
  showModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndex)
