// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

// form validators
import { UserNewValidator } from '../user-new-validator/user-new-validator'

// inputs
import { TextField } from '../../inputs/text-field/text-field';
import { SelectField } from '../../inputs/select-field/select-field';
import { DatepickerField } from '../../inputs/datepicker-field/datepicker-field';
import { ImageField } from '../../inputs/image-field/image-field';

class CurrentUserNewForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
  }

  render() {
    const { handleSubmit, isSaving } = this.props;
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
            key={'gender-placeholder'}
            value={null}
            label="choose gender"
          />
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
          type="file"
          name="avatar"
          component={ImageField}
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
          title={isSaving ? 'Saving' : 'Submit'}
          loading={isSaving}
          backgroundColor='#23a2e3'
          onPress={handleSubmit}
        />
      </ScrollView>
    );
  }
}

export default reduxForm({
  form: 'CurrentUserNewForm',
  validate: UserNewValidator,
})(CurrentUserNewForm);
