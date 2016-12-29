// utils
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

// inputs
import { TextField } from '../../inputs/text-field/text-field';
import { SelectField } from '../../inputs/select-field/select-field';
import { DatepickerField } from '../../inputs/datepicker-field/datepicker-field';

let initialValues = {
  initialValues: {
    gender: "male"
  }
};

class CurrentUserNewForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    const minumumBirthDate = moment().subtract(18, 'years').format('DD.MM.YYYY')

    return (
      <ScrollView>
        <Field
          name="first_name"
          label="First name"
          autoFocus={true}
          component={TextField}
        />
        <Field
          name="last_name"
          label="Last name"
          component={TextField}
        />
        <Field
          name="email"
          label="Email"
          keyboardType="email-address"
          component={TextField}
        />
        <Field
          name="gender"
          label="Gender"
          component={SelectField}
        >
          <Picker.Item
            key={'male'}
            value={'male'}
            label={'male'}
          />
          <Picker.Item
            key={'female'}
            value={'female'}
            label={'female'}
          />
        </Field>
        <Field
          name="date_of_birth"
          label="Date of birth"
          maxDate={minumumBirthDate}
          component={DatepickerField}
        />
        <Field
          name="tel_num"
          label="Tel. number"
          maxLength={10}
          keyboardType="numeric"
          component={TextField}
        />
        <Field
          name="password"
          label="Password"
          secureTextEntry={true}
          component={TextField}
        />
        <Field
          name="password_confirmation"
          label="Password confirmation"
          secureTextEntry={true}
          component={TextField}
        />
        <Button
          raised
          title='Submit'
          backgroundColor='#ff4c4c'
          onPress={handleSubmit}
        />
      </ScrollView>
    );
  }
}

export default reduxForm({
  ...initialValues,
  form: 'CurrentUserNewForm',
  destroyOnUnmount: false,
})(CurrentUserNewForm);
