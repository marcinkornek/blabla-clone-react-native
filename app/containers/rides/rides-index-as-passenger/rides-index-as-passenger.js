// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, List } from 'react-native-elements';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import _ from 'lodash';

// actions
import { fetchRidesAsPassenger } from '../../../actions/rides';

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'

const per = 15
const styles = StyleSheet.create({
  view: {
    marginTop: 60,
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
    const { fetchRidesAsPassenger, currentUser } = this.props

    if (currentUser.id) fetchRidesAsPassenger(1, per, { user_id: currentUser.id })
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
    const { rides, isFetching, isStarted, fetchRidesAsPassenger, pagination } = this.props;

    return (
      <RenderList
        per={per}
        pagination={pagination}
        isFetching={isFetching}
        isStarted={isStarted}
        data={this.state.data}
        dataSource={this.state.dataSource}
        fetchItems={fetchRidesAsPassenger}
        renderRow={this.renderRide}
        emptyListText='No rides'
      />
    )
  }

  renderRide(ride) {
    return (
      <RidesIndexItem
        ride={ride}
        key={`ride${ride.id}`}
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
    pagination: state.rides.pagination,
    rides: state.rides.items,
    isStarted: state.rides.isStarted,
    isFetching: state.rides.isFetching,
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.item,
  }
};

const mapDispatchToProps = {
  fetchRidesAsPassenger,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndexAsPassenger)
