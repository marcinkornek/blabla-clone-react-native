// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { View, ScrollView, Text, TextInput, Picker, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';

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
});

class RideForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    rideOptions: PropTypes.object.isRequired,
    ride: PropTypes.object
  }

  render() {
    const { handleSubmit, rideOptions } = this.props
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
    let cars = rideOptions.cars.map((car, i) =>
      <Picker.Item
        key={'car' + car.id}
        value={car.id}
        label={car.name}
      />
    )
    const carPlaceholder =
      <Picker.Item
        key={'car-placeholder'}
        value={null}
        label="Choose car"
      />

    return (
      <ScrollView>
        <Field
          name="start_city"
          label="Start city"
          component={GeosuggestField}
        />
        <Field
          name="destination_city"
          label="Destination city"
          component={GeosuggestField}
        />
        <Field
          name="start_date"
          label="Start date and time"
          minDate={minumumStartDate}
          component={DatetimepickerField}
        />
        <Field
          name="car_id"
          label="Car"
          component={SelectField}
        >
          {[carPlaceholder, ...cars]}
        </Field>
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
          style={styles.submitButton}
          title='Submit'
          backgroundColor='#23a2e3'
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
