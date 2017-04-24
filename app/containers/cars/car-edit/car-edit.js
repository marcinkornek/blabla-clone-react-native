// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { fetchCarsOptions, updateCar } from '../../../actions/cars'

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

export class CarEdit extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isStarted: PropTypes.bool.isRequired,
    carOptions: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    headerTitle: 'Edit car',
  }

  componentWillMount() {
    const { fetchCarsOptions, carId } = this.props

    fetchCarsOptions()
  }

  handleSubmit(data) {
    const { updateCar, layout, navigation } = this.props
    let body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (_.isObject(data[key])) { body.append(key, data[key]) }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })
    updateCar(body, data.id)
      .then((response)=> {
        if (!response.error) {
          let car = response.payload.data
          navigation.navigate('carShow', {car: car, layout: layout})
        }
      })
  }

  renderCarForm() {
    const { car, carOptions, isSaving, layout } = this.props

    return(
      <CarForm
        car={car}
        carOptions={carOptions}
        isSaving={isSaving}
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
    car: state.car.item,
    isSaving: state.car.isSaving,
    isFetching: state.carOptions.isFetching,
    isStarted: state.carOptions.isStarted,
    carOptions: state.carOptions,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  fetchCarsOptions,
  updateCar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarEdit)
