// utils
import React, { Component, PropTypes } from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 5,
  },
  inputStyle: {
    height: 40,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 10,
  },
});

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
      <View>
        <TextInput
          style={styles.inputStyle}
          onFocus={() => this.openSearchModal()}
          onChange={() => this.openSearchModal()}
          placeholder={label}
          value={input.value.address}
          {...custom}
        />
        <Text style={styles.error}>{touched && error}</Text>
      </View>
    )
  }
};
