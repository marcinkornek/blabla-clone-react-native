// utils
import React, { Component, PropTypes }   from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
import _ from 'lodash';
import { Button } from 'react-native-elements';

// form validators
import { CarValidator } from '../car-validator/car-validator'

// components
import { TextField } from '../../inputs/text-field/text-field';
import { SelectField } from '../../inputs/select-field/select-field';
import { ImageField } from '../../inputs/image-field/image-field';

export class CarForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    carOptions: PropTypes.object.isRequired,
    car: PropTypes.object,
  }

  render() {
    const { handleSubmit, carOptions } = this.props
    let colors = carOptions.colors.map((color, i) =>
      <Picker.Item
        key={'color' + i}
        value={color}
        label={color}
      />
    )
    let comforts = carOptions.comforts.map((comfort, i) =>
      <Picker.Item
        key={'comfort' + i}
        value={comfort}
        label={comfort}
      />
    )
    let categories = carOptions.categories.map((category, i) =>
      <Picker.Item
        key={'category' + i}
        value={category}
        label={category}
      />
    )

    return (
      <ScrollView>
        <Field
          name='brand'
          label='Brand'
          component={TextField}
        />
        <Field
          name='model'
          label='Model'
          component={TextField}
        />
        <Field
          name='places'
          label='Places'
          keyboardType="numeric"
          maxLength={2}
          component={TextField}
        />
        <Field
          name='production_year'
          label='Production year'
          keyboardType="numeric"
          maxLength={4}
          component={TextField}
        />
        <Field
          name='color'
          label='Color'
          component={SelectField}
        >
          {_.map(colors, (n) => n)}
        </Field>
        <Field
          name='comfort'
          label='Comfort'
          component={SelectField}
        >
          {_.map(comforts, (n) => n)}
        </Field>
        <Field
          name='category'
          label='Category'
          component={SelectField}
        >
          {_.map(categories, (n) => n)}
        </Field>
        <Field
          type="file"
          name="car_photo"
          component={ImageField}
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

CarForm = reduxForm({
  form: 'CarForm',
  validate: CarValidator
})(CarForm)

CarForm = connect(
  (state, props) => ({
    initialValues: props.car
  })
)(CarForm)

export default CarForm
