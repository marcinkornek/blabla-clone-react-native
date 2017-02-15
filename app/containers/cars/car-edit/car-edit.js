// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import _ from 'lodash';

// actions
import { fetchCarsOptions, updateCar } from '../../../actions/cars'

// components
import CarForm from '../../../components/cars/car-form/car-form'
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  }
});

export class CarEdit extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isStarted: PropTypes.bool.isRequired,
    carOptions: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: ({ state }) => {
      return {
        title: 'Edit car',
      }
    }
  }

  componentWillMount() {
    const { fetchCarsOptions, carId } = this.props

    fetchCarsOptions()
  }

  handleSubmit(data) {
    const { updateCar, navigation } = this.props
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
        navigation.navigate('carShow', {id: carId})
      })
  }

  renderCarForm() {
    const { carOptions, car, isSaving } = this.props

    return(
      <CarForm
        car={car}
        isSaving={isSaving}
        onSubmit={this.handleSubmit.bind(this)}
        carOptions={carOptions}
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
    car: state.car.item,
    isSaving: state.car.isSaving,
    isFetching: state.carOptions.isFetching,
    isStarted: state.carOptions.isStarted,
    carOptions: state.carOptions
  }
}

const mapDispatchToProps = {
  fetchCarsOptions,
  updateCar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarEdit)
