// utils
import React, { Component, PropTypes } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

export class GeosuggestField extends Component {
  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.props.input.onChange(place)
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {
    const { input, label, meta: { touched, error }, ...custom } = this.props;

    return (
      <TextInput
        style={{height: 40}}
        onFocus={() => this.openSearchModal()}
        placeholder={label}
        value={input.value.address}
        {...custom}
      />
    )
  }
};
