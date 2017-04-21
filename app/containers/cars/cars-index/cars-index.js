// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { fetchCars, refreshCars } from '../../../actions/cars'

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { CarsIndexItem } from '../../../components/cars/cars-index-item/cars-index-item'

const per = 20
const styles = (layout) => StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: stylesColors[layout].primaryBg,
  },
});

class CarsIndex extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    cars: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    tabBarLabel: 'My cars',
    headerTitle: 'My cars'
  }

  static defaultProps = {
    car: {}
  }

  componentDidMount() {
    const { refreshCars, currentUser } = this.props

    if (currentUser.id) refreshCars(currentUser.id, per)
  }

  componentDidUpdate(oldProps) {
    const { car } = this.props;

    if (car.isSaving == false && oldProps.car.isSaving == true) {
      this.refreshCars()
    }
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
    const { layout, navigation } = this.props;

    return (
      <CarsIndexItem
        car={car}
        layout={layout}
        navigation={navigation}
        key={`car${car.id}`}
      />
    )
  }

  renderCarsList() {
    const { cars, isFetching, isStarted, pagination, layout, navigation } = this.props;

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
        layout={layout}
        onEndReachedThreshold={200}
        emptyListText='No cars'
      />
    )
  }

  render() {
    const { layout } = this.props;

    return (
      <View style={styles(layout).view}>
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
    car: state.car,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  fetchCars,
  refreshCars,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex)
