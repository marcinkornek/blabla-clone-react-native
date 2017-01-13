// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

// actions
import { fetchCars } from '../../../actions/cars'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { CarsIndexItem } from '../../../components/cars/cars-index-item/cars-index-item'

const per = 10
const styles = StyleSheet.create({
  view: {
    paddingTop: 80,
  }
});

class CarsIndex extends Component {
  static propTypes = {
    cars: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number,
  }

  componentDidMount() {
    const { fetchCars, currentUserId } = this.props

    if (currentUserId) fetchCars(currentUserId, 1, per)
  }

  handlePageClick(e) {
    const { fetchCars, currentUserId } = this.props
    var page = e.selected + 1

    fetchCars(currentUserId, page, per)
  }

  renderCarsList() {
    const { cars, currentUserId } = this.props

    return (
      cars.map((car, i) =>
        <CarsIndexItem
          key={i}
          car={car}
          currentUserId={currentUserId}
        />
      )
    )
  }

  render() {
    const { isFetching, isStarted } = this.props;

    return (
      <View style={styles.view}>
        <Button
          raised
          title='Add car'
          backgroundColor='#ff4c4c'
          onPress={() => Actions.carNew()}
        />
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderCarsList()}
        </AsyncContent>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars.items,
    isStarted: state.cars.isStarted,
    isFetching: state.cars.isFetching,
    pagination: state.cars.pagination,
    currentUserId: state.session.item.id,
  }
}

const mapDispatchToProps = {
  fetchCars
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex)
