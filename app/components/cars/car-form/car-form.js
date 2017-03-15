// utils
import React, { Component, PropTypes }   from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
import _ from 'lodash';
import { Button } from 'react-native-elements';

// styles
import stylesColors from '../../../constants/colors';

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
    isSaving: PropTypes.bool.isRequired,
    layout: PropTypes.string.isRequired,
  }

  render() {
    const { handleSubmit, carOptions, isSaving, layout } = this.props
    const colors = carOptions.colors.map((color) =>
      <Picker.Item
        key={color}
        value={color}
        label={color}
      />
    )
    const colorPlaceholder =
      <Picker.Item
        key="color-placeholder"
        value={null}
        label="Choose color"
      />
    const comforts = carOptions.comforts.map((comfort) =>
      <Picker.Item
        key={comfort}
        value={comfort}
        label={comfort}
      />
    )
    const comfortPlaceholder =
      <Picker.Item
        key="comfort-placeholder"
        value={null}
        label="Choose comfort"
      />
    const categories = carOptions.categories.map((category) =>
      <Picker.Item
        key={category}
        value={category}
        label={category}
      />
    )
    const categoryPlaceholder =
      <Picker.Item
        key="category-placeholder"
        value={null}
        label="Choose category"
      />

    return (
      <ScrollView>
        <Field
          name='brand'
          label='Brand'
          component={TextField}
          layout={layout}
        />
        <Field
          name='model'
          label='Model'
          component={TextField}
          layout={layout}
        />
        <Field
          name='places'
          label='Places'
          keyboardType="numeric"
          maxLength={2}
          component={TextField}
          layout={layout}
        />
        <Field
          name='production_year'
          label='Production year'
          keyboardType="numeric"
          maxLength={4}
          component={TextField}
          layout={layout}
        />
        <Field
          name='color'
          label='Color'
          component={SelectField}
          layout={layout}
        >
          {[colorPlaceholder, ...colors]}
        </Field>
        <Field
          name='comfort'
          label='Comfort'
          component={SelectField}
          layout={layout}
        >
          {[comfortPlaceholder, ...comforts]}
        </Field>
        <Field
          name='category'
          label='Category'
          component={SelectField}
          layout={layout}
        >
          {[categoryPlaceholder, ...categories]}
        </Field>
        <Field
          type="file"
          name="car_photo"
          component={ImageField}
          layout={layout}
        />
        <Button
          raised
          title={isSaving ? 'Saving' : 'Submit'}
          loading={isSaving}
          backgroundColor={stylesColors[layout].buttonSubmit}
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
