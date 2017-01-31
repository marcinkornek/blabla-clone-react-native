// utils
import React, { Component, PropTypes } from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputStyle: {
    flex: 1,
    height: 40,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 10,
  },
  clearLink: {
    backgroundColor: '#e4e4e4',
    width: 25,
    height: 25,
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: 'white'
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

  clearSelect() {
    const { input } = this.props;

    input.onChange(null)
  }

  renderClearButton() {
    const { input } = this.props;

    if (input.value)  {
      return (
        <TouchableOpacity
          style={styles.clearLink}
          underlayColor='white'
          onPress={() => this.clearSelect()}
        >
          <Text style={styles.clearText}>x</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { input, label, meta: { touched, error }, ...custom } = this.props;

    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            onFocus={() => this.openSearchModal()}
            onChange={() => this.openSearchModal()}
            placeholder={label}
            value={input.value.address}
            {...custom}
          />
          {this.renderClearButton()}
        </View>
        <Text style={styles.error}>{touched && error}</Text>
      </View>
    )
  }
};
