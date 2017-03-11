// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableHighlight, View, Picker } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import pluralize from 'pluralize';
import { Button } from 'react-native-elements';

// styles
import stylesColors from '../../../constants/colors';

// components
import { SelectField } from '../../inputs/select-field/select-field';

const styles = StyleSheet.create({
  picker: {
    width: 200,
    marginLeft: -7,
  },
  button: {
    width: 200,
    marginLeft: 0,
  }
});

export class RenderRideOfferForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
  }

  isNotAuthor() {
    const { currentUser, ride } = this.props

    if (currentUser.id != ride.driver.id) return true
  }

  renderRideOfferForm() {
    const { handleSubmit, currentUser, ride } = this.props;
    const places = new Array(ride.free_places_count).fill(undefined).map((place, i) =>
      <Picker.Item
        key={i}
        value={i + 1}
        label={pluralize('place', i + 1, true)}
      />
    )
    const placesPlaceholder =
      <Picker.Item
        key="places-placeholder"
        value={null}
        label="Click to choose places"
      />

    if (currentUser.id && ride.free_places_count > 0 && this.isNotAuthor()) {
      return(
        <View>
          <Field
            name='places'
            component={SelectField}
            style={styles.picker}
          >
            {[placesPlaceholder, ...places]}
          </Field>
          <Button
            raised
            title='Book seats'
            backgroundColor={stylesColors.buttonSubmit}
            onPress={handleSubmit}
            fontSize={16}
            buttonStyle={styles.button}
          />
        </View>
      )
    } else if (currentUser.id && ride.free_places_count == 0 && this.isNotAuthor()) {
      return(
        <Text>No places</Text>
      )
    }
  }

  render() {
    return(
      <View>
        {this.renderRideOfferForm()}
      </View>
    )
  }
}

export default reduxForm({
  form: 'RenderRideOfferForm'
})(RenderRideOfferForm)
