// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import stylesColors from '../../../constants/colors';

// actions
import {
  fetchRidesAsDriver,
  refreshRidesAsDriver,
  setDefaultRidesAsDriverPer,
} from '../../../actions/rides';
import { showModal, hideModal } from '../../../actions/modals';

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'

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

export class RidesIndexAsDriver extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    rides: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = props => {
    const { navigation } = props;
    const { state, setParams } = navigation;
    const { params } = state;

    return {
      tabBarLabel: 'Rides as driver',
      headerTitle: 'Rides as driver',
      headerRight:
        <View style={styles('base').filtersContainer}>
          <MaterialCommunityIcons.Button
            onPress={() => {
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
    const { refreshRidesAsDriver, setDefaultRidesAsDriverPer, currentUser } = this.props

    if (currentUser.id) {
      setDefaultRidesAsDriverPer(per)
      refreshRidesAsDriver(currentUser.id, this.initialPer())
    }
  }

  componentDidUpdate(oldProps) {
    const { ride, filters, navigation, showModal, modalType, layout } = this.props;
    const state = navigation.state

    if (state.params && state.params.showFilters && oldProps.modalType === undefined) {
      showModal('RIDES_AS_DRIVER_FILTERS', { title: 'Set filters', modalStyles: styles(layout).modalStyles })
    }

    if (oldProps.modalType === 'RIDES_AS_DRIVER_FILTERS') {
      navigation.setParams({showFilters: false})
    }

    if (filters !== oldProps.filters) {
      this.refreshRides()
    }

    if (ride && ride.isSaving == false && oldProps.ride.isSaving == true) {
      this.refreshRides()
    }
  }

  refreshRides(per) {
    const { refreshRidesAsDriver, currentUser } = this.props

    if (currentUser.id) refreshRidesAsDriver(currentUser.id, this.initialPer())
  }

  fetchRides(page, per) {
    const { fetchRidesAsDriver, currentUser } = this.props

    if (currentUser.id) fetchRidesAsDriver(currentUser.id, page, per)
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

  renderRide(ride) {
    const { navigation, layout, hideModal } = this.props;

    return (
      <RidesIndexItem
        ride={ride}
        layout={layout}
        navigation={navigation}
        showUserModal={this.showUserModal.bind(this)}
        hideModal={this.hideModal.bind(this)}
        key={`ride${ride.id}`}
      />
    )
  }

  renderRidesList() {
    const { rides, isFetching, isStarted, pagination, layout, navigation } = this.props;

    return (
      <RenderList
        items={rides}
        pagination={pagination}
        isFetching={isFetching}
        isStarted={isStarted}
        fetchItems={this.fetchRides.bind(this)}
        refreshItems={this.refreshRides.bind(this)}
        renderRow={this.renderRide.bind(this)}
        showAddButton={true}
        addButtonLink={() => navigation.navigate('rideNew')}
        per={per}
        layout={layout}
        onEndReachedThreshold={200}
        emptyListText='No rides as driver'
      />
    )
  }

  render() {
    const { layout } = this.props;

    return (
      <View style={styles(layout).view}>
        {this.renderRidesList()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pagination: state.ridesAsDriver.pagination,
    rides: state.ridesAsDriver.items,
    filters: state.ridesAsDriverFilters.filters,
    isStarted: state.ridesAsDriver.isStarted,
    isFetching: state.ridesAsDriver.isFetching,
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.item,
    ride: state.ride,
    modalType: state.modal.modalType,
    layout: state.settings.layout,
  }
};

const mapDispatchToProps = {
  fetchRidesAsDriver,
  refreshRidesAsDriver,
  setDefaultRidesAsDriverPer,
  showModal,
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndexAsDriver)
