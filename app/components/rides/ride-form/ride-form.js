// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

// form validators
import { RideValidator } from '../ride-validator/ride-validator'

// components
import { TextField } from '../../inputs/text-field/text-field';
import { SelectField } from '../../inputs/select-field/select-field';
import { DatetimepickerField } from '../../inputs/datetimepicker-field/datetimepicker-field';

class RideForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    rideOptions: PropTypes.object.isRequired,
    ride: PropTypes.object
  }

  render() {
    const { handleSubmit, rideOptions } = this.props
    const minumumStartDate = moment().format('DD.MM.YYYY')

    return (
      <ScrollView>
        <Field
          name="start_city"
          label="Start city"
          autoFocus={true}
          component={TextField}
        />
        <Field
          name="destination_city"
          label="Destination city"
          component={TextField}
        />
        <Field
          name="start_date"
          label="Start date"
          minDate={minumumStartDate}
          component={DatetimepickerField}
        />
        <Field
          name="places"
          label="Places"
          component={TextField}
        />
        <Button
          raised
          title='Submit'
          backgroundColor='#ff4c4c'
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
