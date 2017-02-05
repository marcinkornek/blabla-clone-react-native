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
import { RenderList } from '../../../components/shared/render-list/render-list'
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
    const { fetchCars, currentUser } = this.props

    if (currentUser.id) fetchCars(currentUser.id, 1, per)
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
     const { cars, isFetching, isStarted, fetchCars, pagination } = this.props;

     return (
       <RenderList
         per={per}
         pagination={pagination}
         isFetching={isFetching}
         isStarted={isStarted}
         data={this.state.data}
         dataSource={this.state.dataSource}
         fetchItems={fetchCars}
         renderRow={this.renderCar}
         emptyListText='No cars'
       />
     )
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
    currentUser: state.session.item,
  }
}

const mapDispatchToProps = {
  fetchCars
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex)
