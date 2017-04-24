// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import { showModal, hideModal } from '../../../actions/modals';

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
  modalFiltersStyles: {
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

  static navigationOptions = props => {
    const { navigation } = props;
    const { state, setParams } = navigation;
    const { params } = state;

    return {
      tabBarLabel: 'Rides',
      headerTitle: 'Rides',
      headerRight:
        <View style={styles('base').filtersContainer}>
          <Ionicons.Button
            onPress={() => {
              const showSearch = params && params.showSearch ? !params.showSearch : true
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
    }
  }

  componentWillMount() {
    const { refreshRides, setDefaultRidesPer, rides, pagination } = this.props;

    setDefaultRidesPer(per)
    refreshRides(this.initialPer())
  }

  componentDidUpdate(oldProps) {
    const { notificationActive, ride, filters, showModal, modalType, layout, navigation } = this.props;
    const state = navigation.state

    if (state.params && state.params.showFilters && oldProps.modalType === undefined) {
      showModal('RIDES_FILTERS', { title: 'Set filters', modalStyles: styles(layout).modalFiltersStyles })
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

  hideModal() {
    this.props.hideModal()
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

  renderRide(ride) {
    const { navigation, layout, hideModal } = this.props;

    return (
      <RidesIndexItem
        ride={ride}
        layout={layout}
        navigation={navigation}
        key={`ride${ride.id}`}
        showUserModal={this.showUserModal.bind(this)}
        hideModal={this.hideModal.bind(this)}
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
          searchRides={this.searchRides.bind(this)}
          clearSearch={this.clearSearch.bind(this)}
        />
      )
    }
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
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndex)
