// utils
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, Text, TextInput, Picker, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

// form validators
import { UserEditValidator } from '../user-edit-validator/user-edit-validator'

// inputs
import { TextField } from '../../inputs/text-field/text-field';
import { SelectField } from '../../inputs/select-field/select-field';
import { DatepickerField } from '../../inputs/datepicker-field/datepicker-field';
import { ImageField } from '../../inputs/image-field/image-field';

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
})

class CurrentUserEditForm extends Component {
  renderCirrentAvatar() {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <View>
          <Text>Current avatar:</Text>
          <Image source={{uri: currentUser.avatar}} style={styles.avatar} />
        </View>
      )
    }
  }

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
        {this.renderCirrentAvatar()}
        <Field
          type="file"
          name="avatar"
          component={ImageField}
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

CurrentUserEditForm = reduxForm({
  form: 'CurrentUserEditForm',
  validate: UserEditValidator,
})(CurrentUserEditForm);

CurrentUserEditForm = connect(
  (state, props) => ({
    initialValues: props.currentUser
  })
)(CurrentUserEditForm)

export default CurrentUserEditForm
