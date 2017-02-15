// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native';

// actions
import { fetchCars, refreshCars } from '../../../actions/cars'

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { CarsIndexItem } from '../../../components/cars/cars-index-item/cars-index-item'

const per = 20
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

class CarsIndex extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    cars: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
  }

  componentWillMount() {
    const { refreshCars, currentUser } = this.props

    if (currentUser.id) refreshCars(currentUser.id, per)
  }

  refreshCars(per) {
    const { refreshCars, currentUser } = this.props

    if (currentUser.id) refreshCars(currentUser.id, per)
  }

  fetchCars(page, per) {
    const { fetchCars, currentUser } = this.props

    if (currentUser.id) fetchCars(currentUser.id, page, per)
  }

  renderCar(car) {
    const { navigation } = this.props;

    return (
      <CarsIndexItem
        car={car}
        navigation={navigation}
        key={`car${car.id}`}
      />
    )
  }

  renderCarsList() {
    const { cars, isFetching, isStarted, pagination, navigation } = this.props;

    return (
      <RenderList
        items={cars}
        pagination={pagination}
        isFetching={isFetching}
        isStarted={isStarted}
        fetchItems={this.fetchCars.bind(this)}
        refreshItems={this.refreshCars.bind(this)}
        renderRow={this.renderCar.bind(this)}
        showAddButton={true}
        addButtonLink={() => navigation.navigate('carNew')}
        per={per}
        onEndReachedThreshold={200}
        emptyListText='No cars'
      />
    )
  }

  render() {
    return (
      <View style={styles.view}>
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
  fetchCars,
  refreshCars,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex)
