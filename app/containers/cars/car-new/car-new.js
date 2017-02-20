// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import _ from 'lodash';

// actions
import { fetchCarsOptions, createCar, initializeCar } from '../../../actions/cars'

// components
import CarForm from '../../../components/cars/car-form/car-form'
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  }
});

export class CarNew extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    carOptions: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: ({ state }) => {
      return {
        title: 'Add car'
      }
    }
  }

  componentWillMount() {
    const { fetchCarsOptions, initializeCar } = this.props

    initializeCar()
    fetchCarsOptions()
  }

  handleSubmit(data) {
    const { createCar, navigation } = this.props
    let body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (_.isObject(data[key])) { body.append(key, data[key]) }
      } else {
        if (!_.isEmpty(data[key])) { body.append(key, data[key]) }
      }
    })
    createCar(body)
      .then((response) => {
        let carId = response.payload.data.id
        navigation.navigate('carShow', {id: carId});
      })
  }

  renderCarForm() {
    const { carOptions, isSaving } = this.props

    return(
      <CarForm
        isSaving={isSaving}
        carOptions={carOptions}
        onSubmit={this.handleSubmit.bind(this)}
      />
    )
  }

  render() {
    const { isFetching, isStarted } = this.props

    return (
      <ScrollView style={styles.view}>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderCarForm()}
        </AsyncContent>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSaving: state.car.isSaving,
    isFetching: state.carOptions.isFetching,
    isStarted: state.carOptions.isStarted,
    carOptions: state.carOptions
  }
}

const mapDispatchToProps = {
  fetchCarsOptions,
  createCar,
  initializeCar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarNew)
