// utils
import React, { Component, PropTypes }   from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
import _ from 'lodash';
import { Button } from 'react-native-elements';

// components
import { ToggleField } from '../../inputs/toggle-field/toggle-field';

export class SettingsForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <ScrollView>
        <Field
          name='darkLayout'
          label='Dark layout'
          component={ToggleField}
        />
        <Field
          name='pushNotifications'
          label='Push notifications'
          component={ToggleField}
        />
        <Button
          raised
          title='Submit'
          backgroundColor='#23a2e3'
          onPress={handleSubmit}
        />
      </ScrollView>
    )
  }
}

SettingsForm = reduxForm({
  form: 'SettingsForm',
})(SettingsForm)

SettingsForm = connect(
  (state, props) => ({
    initialValues: props.settings
  })
)(SettingsForm)

export default SettingsForm
