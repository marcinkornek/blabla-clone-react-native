// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet, ListView, RefreshControl, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, List } from 'react-native-elements';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import _ from 'lodash';

// actions
import { fetchCars } from '../../../actions/cars'

// components
import { RenderActivityIndicator } from '../../../components/shared/render-activity-indicator/render-activity-indicator'
import { CarsIndexItem } from '../../../components/cars/cars-index-item/cars-index-item'

const per = 15
const styles = StyleSheet.create({
  view: {
    marginTop: 60,
  }
});

class CarsIndex extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    cars: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number,
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
    const { fetchCars, currentUserId } = this.props

    if (currentUserId) fetchCars(currentUserId, 1, per)
  }

  componentDidUpdate(prevProps) {
    const { cars } = this.props;

    if (cars !== prevProps.cars) {
      let newData = this.state.data.concat(cars)

      this.setState({
        data: newData,
        dataSource: this.state.dataSource.cloneWithRows(newData)
      })
    }
  }

  renderCarsList() {
    const { cars, isFetching, isStarted } = this.props;

    if (_.isEmpty(this.state.data) && isFetching) {
      return (
        <RenderActivityIndicator />
      )
    } else if (_.isEmpty(this.state.data)) {
      return(
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyList}>No cars</Text>
        </View>
      )
    } else {
      return (
        <ListView
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this.renderCar}
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

  renderCar(car) {

    return (
      <CarsIndexItem
        car={car}
        key={`car${car.id}`}
      />
    )
  }

  renderAddCarButton() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <Button
          raised
          title='Add car'
          backgroundColor='#23a2e3'
          onPress={() => Actions.carNew()}
        />
      )
    }
  }

  loadMoreContentAsync = async () => {
    const { fetchCars, currentUserId } = this.props

    page = page + 1
    if (currentUserId) fetchCars(currentUserId, page, per)
  }

  canLoadMore() {
    parseInt(page, 10) < parseInt(this.props.pagination.total_pages, 10)
  }

  onRefresh() {
    const { fetchCars, currentUserId } = this.props

    if (currentUserId) fetchCars(currentUserId, 1, per)
  }

  render() {
    const { isFetching, isStarted } = this.props;

    return (
      <View style={styles.view}>
        {this.renderAddCarButton()}
        {this.renderCarsList()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pagination: state.cars.pagination,
    cars: state.cars.items,
    isStarted: state.cars.isStarted,
    isFetching: state.cars.isFetching,
    currentUserId: state.session.item.id,
  }
}

const mapDispatchToProps = {
  fetchCars
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex)
