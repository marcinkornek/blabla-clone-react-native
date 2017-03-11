// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { View, ScrollView, Text, TextInput, Picker, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

// form validators
import { RideValidator } from '../ride-validator/ride-validator'

// components
import { TextField } from '../../inputs/text-field/text-field';
import { SelectField } from '../../inputs/select-field/select-field';
import { DatetimepickerField } from '../../inputs/datetimepicker-field/datetimepicker-field';
import { GeosuggestField } from '../../inputs/geosuggest-field/geosuggest-field';

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 10,
  },
  addCarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 15,
    marginBottom: 5,
  },
  addCarButton: {
    width: 100,
    padding: 5,
    marginLeft: 0,
  },
  addCarText: {
    marginTop: 5,
  },
});

class RideForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    rideOptions: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    ride: PropTypes.object
  }

  renderCarField() {
    const { rideOptions, showModal } = this.props

    let cars = rideOptions.cars.map((car, i) =>
      <Picker.Item
        key={'car' + car.id}
        value={car.id}
        label={car.full_name}
      />
    )
    const carPlaceholder =
      <Picker.Item
        key={'car-placeholder'}
        value={null}
        label="Choose car"
      />

    if (rideOptions.cars.length > 0) {
      return (
        <Field
          name="car_id"
          label="Car"
          component={SelectField}
        >
          {[carPlaceholder, ...cars]}
        </Field>
      )
    } else {
      return (
        <View style={styles.addCarContainer}>
          <Button
            raised
            title='Add car'
            backgroundColor={stylesColors.buttonSubmit}
            buttonStyle={styles.addCarButton}
            onPress={() => showModal('CAR_NEW', { title: 'Add car', subtitle: 'You need to add car first to add ride' })}
          />
          <Text style={styles.addCarText}>You have to add car first</Text>
        </View>
      )
    }
  }

  render() {
    const { handleSubmit, rideOptions, isSaving } = this.props
    const minumumStartDate = moment().format('DD.MM.YYYY')

    let currencies = rideOptions.currencies.map((currency, i) =>
      <Picker.Item
        key={'currency' + i}
        value={currency}
        label={currency}
      />
    )
    const currencyPlaceholder =
      <Picker.Item
        key={'currency-placeholder'}
        value={null}
        label="Choose currency"
      />

    return (
      <ScrollView>
        <Field
          name="start_location"
          label="Start city"
          component={GeosuggestField}
        />
        <Field
          name="destination_location"
          label="Destination city"
          component={GeosuggestField}
        />
        <Field
          name="start_date"
          label="Start date and time"
          minDate={minumumStartDate}
          component={DatetimepickerField}
        />
        {this.renderCarField()}
        <Field
          name="places"
          label="Places"
          keyboardType="numeric"
          component={TextField}
        />
        <Field
          name="price"
          label="Price"
          keyboardType="numeric"
          component={TextField}
        />
        <Field
          name="currency"
          label="Currency"
          component={SelectField}
        >
          {[currencyPlaceholder, ...currencies]}
        </Field>
        <Button
          raised
          buttonStyle={styles.submitButton}
          title={isSaving ? 'Saving' : 'Submit'}
          loading={isSaving}
          backgroundColor={stylesColors.buttonSubmit}
          onPress={handleSubmit}
        />
      </ScrollView>
    )
  }
}

RideForm = reduxForm({
  form: 'RideForm',
  validate: RideValidator,
})(RideForm)

RideForm = connect(
  (state, props) => ({
    initialValues: props.ride
  })
)(RideForm)

export default RideForm
