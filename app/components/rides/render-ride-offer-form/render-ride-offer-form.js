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

const styles = (layout) => StyleSheet.create({
  button: {
    width: 200,
    marginLeft: 0,
  },
  picker: {
    color: stylesColors[layout].primaryText,
    width: 200,
    marginLeft: -7,
  },
  primaryText: {
    color: stylesColors[layout].primaryText,
  },
});

export class RenderRideOfferForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  isNotAuthor() {
    const { currentUser, ride } = this.props

    if (currentUser.id != ride.driver.id) return true
  }

  renderRideOfferForm() {
    const { handleSubmit, currentUser, ride, layout } = this.props;
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
            layout={layout}
            style={styles(layout).picker}
          >
            {[placesPlaceholder, ...places]}
          </Field>
          <Button
            raised
            title='Book seats'
            backgroundColor={stylesColors[layout].buttonSubmit}
            onPress={handleSubmit}
            fontSize={16}
            buttonStyle={styles(layout).button}
          />
        </View>
      )
    } else if (currentUser.id && ride.free_places_count == 0 && this.isNotAuthor()) {
      return(
        <Text style={styles(layout).primaryText}>No places</Text>
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
