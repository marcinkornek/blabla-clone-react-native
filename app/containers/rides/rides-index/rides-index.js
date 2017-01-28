// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet, ListView, RefreshControl, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, List } from 'react-native-elements';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import _ from 'lodash';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

// actions
import { fetchRides } from '../../../actions/rides';

// components
import { RenderActivityIndicator } from '../../../components/shared/render-activity-indicator/render-activity-indicator'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'

const per = 15
let page = 1
const styles = StyleSheet.create({
  emptyList: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyListContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    marginTop: 60,
  },
});

export class RidesIndex extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    rides: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      data: [],
      dataSource: ds.cloneWithRows([]),
      refreshing: false
    };
  }

  componentDidMount() {
    this.props.fetchRides(page, per)
  }

  componentDidUpdate(prevProps) {
    const { rides } = this.props;

    if (rides !== prevProps.rides) {
      let newData = this.state.data.concat(rides)

      this.setState({
        data: newData,
        dataSource: this.state.dataSource.cloneWithRows(newData)
      })
    }
  }

  renderRidesList() {
    const { rides, isFetching, isStarted } = this.props;

    if (_.isEmpty(this.state.data) && isFetching) {
      return (
        <RenderActivityIndicator />
      )
    } else if (_.isEmpty(this.state.data)) {
      return(
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyList}>No rides</Text>
        </View>
      )
    } else {
      return (
        <ListView
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this.renderRide}
          canLoadMore={true}
          onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      )
    }
  }

  renderRide(ride) {
    return (
      <RidesIndexItem
        ride={ride}
        key={`ride${ride.id}`}
      />
    )
  }

  renderAddFloatingRideButton() {
    const { isAuthenticated, isFetching } = this.props;

    if (isAuthenticated && !(_.isEmpty(this.state.data) && isFetching)) {
      return (
        <ActionButton
          buttonColor="#23a2e3"
          onPress={() => Actions.rideNew()}
        />
      )
    }
  }

  loadMoreContentAsync = async () => {
    page = page + 1
    this.props.fetchRides(page, per)
  }

  canLoadMore() {
    parseInt(page, 10) < parseInt(this.props.pagination.total_pages, 10)
  }

  onRefresh() {
    this.props.fetchRides(1, per)
  }

  render() {
    return (
      <View style={styles.view}>
        {this.renderRidesList()}
        {this.renderAddFloatingRideButton()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pagination: state.rides.pagination,
    rides: state.rides.items,
    isStarted: state.rides.isStarted,
    isFetching: state.rides.isFetching,
    isAuthenticated: state.session.isAuthenticated,
  }
};

const mapDispatchToProps = {
  fetchRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndex)
