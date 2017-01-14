// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

// actions
import { fetchCar, fetchCarsOptions, updateCar } from '../../../actions/cars'

// components
import CarForm from '../../../components/cars/car-form/car-form'
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const styles = StyleSheet.create({
  view: {
    paddingTop: 80,
  }
});

export class CarEdit extends Component {
  static propTypes = {
    isFetchingCar: PropTypes.bool.isRequired,
    isStartedCar: PropTypes.bool.isRequired,
    car: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isStarted: PropTypes.bool.isRequired,
    carOptions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { fetchCar, fetchCarsOptions, carId } = this.props

    fetchCar(carId)
    fetchCarsOptions()
  }

  handleSubmit(data) {
    const { updateCar } = this.props
    let body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (_.isObject(data[key])) { body.append(key, data[key]) }
      } else {
        if (!_.isEmpty(data[key])) { body.append(key, data[key]) }
      }
    })
    updateCar(body, data.id)
      .then((response) => {
        let carId = response.payload.data.id
        Actions.carShow({carId: carId});
      })
  }

  renderCarForm() {
    const { carOptions, car } = this.props

    return(
      <CarForm
        car={car}
        onSubmit={this.handleSubmit.bind(this)}
        carOptions={carOptions}
      />
    )
  }

  render() {
    const { isFetching, isStarted, isFetchingCar, isStartedCar } = this.props

    return (
      <ScrollView style={styles.view}>
        <AsyncContent
          isFetching={isFetching || !isStarted || isFetchingCar || !isStartedCar}
        >
          {this.renderCarForm()}
        </AsyncContent>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    car: state.car.item,
    isFetchingCar: state.car.isFetching,
    isStartedCar: state.car.isStarted,
    isFetching: state.carOptions.isFetching,
    isStarted: state.carOptions.isStarted,
    carOptions: state.carOptions
  }
}

const mapDispatchToProps = {
  fetchCar,
  fetchCarsOptions,
  updateCar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarEdit)
