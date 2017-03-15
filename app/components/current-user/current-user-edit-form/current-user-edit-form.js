// utils
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, Text, TextInput, Picker, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

// styles
import stylesColors from '../../../constants/colors';

// form validators
import { UserEditValidator } from '../user-edit-validator/user-edit-validator'

// inputs
import { TextField } from '../../inputs/text-field/text-field';
import { SelectField } from '../../inputs/select-field/select-field';
import { DatepickerField } from '../../inputs/datepicker-field/datepicker-field';
import { ImageField } from '../../inputs/image-field/image-field';

const styles = (layout) => StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  currentAvatarContainer: {
    margin: 10,
    marginLeft: 15,
  },
  primaryText: {
    color: stylesColors[layout].primaryText,
  },
})

class CurrentUserEditForm extends Component {
  renderCurrentAvatar() {
    const { currentUser, layout } = this.props;

    if (currentUser) {
      return (
        <View style={styles(layout).currentAvatarContainer}>
          <Text style={styles(layout).primaryText}>Current avatar:</Text>
          <Image source={{uri: currentUser.avatar}} style={styles(layout).avatar} />
        </View>
      )
    }
  }

  render() {
    const { handleSubmit, isSaving, layout } = this.props;
    const minumumBirthDate = moment().subtract(18, 'years').format('DD.MM.YYYY')

    return (
      <ScrollView>
        <Field
          name="first_name"
          label="First name"
          component={TextField}
          layout={layout}
        />
        <Field
          name="last_name"
          label="Last name"
          component={TextField}
          layout={layout}
        />
        <Field
          name="email"
          label="Email"
          keyboardType="email-address"
          component={TextField}
          layout={layout}
        />
        <Field
          name="gender"
          label="Gender"
          component={SelectField}
          layout={layout}
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
          layout={layout}
        />
        <Field
          name="tel_num"
          label="Tel. number"
          maxLength={10}
          keyboardType="numeric"
          component={TextField}
          layout={layout}
        />
        {this.renderCurrentAvatar()}
        <Field
          type="file"
          name="avatar"
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
