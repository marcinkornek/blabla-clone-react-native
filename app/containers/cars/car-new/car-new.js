// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { fetchCarsOptions, createCar, initializeCar } from '../../../actions/cars'
import { hideModal } from '../../../actions/modals';

// components
import CarForm from '../../../components/cars/car-form/car-form'
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const styles = (layout) => StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: stylesColors[layout].primaryBg,
  }
});

export class CarNew extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    carOptions: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    headerTitle: 'Add car'
  }

  componentWillMount() {
    const { fetchCarsOptions, initializeCar } = this.props

    initializeCar({})
    fetchCarsOptions()
  }

  handleSubmit(data) {
    const { createCar, isModal, hideModal, layout, navigation } = this.props
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
        if (isModal) {
          hideModal()
        } else {
          let car = response.payload.data.id
          navigation.navigate('carShow', {car: car, layout: layout});
        }
      })
  }

  renderCarForm() {
    const { carOptions, isSaving, layout } = this.props

    return(
      <CarForm
        isSaving={isSaving}
        carOptions={carOptions}
        layout={layout}
        onSubmit={this.handleSubmit.bind(this)}
      />
    )
  }

  render() {
    const { isFetching, isStarted, layout } = this.props

    return (
      <ScrollView style={styles(layout).view}>
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
    carOptions: state.carOptions,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  fetchCarsOptions,
  createCar,
  initializeCar,
  hideModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarNew)
