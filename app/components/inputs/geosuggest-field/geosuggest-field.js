// utils
import React, { Component, PropTypes } from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  error: {
    color: stylesColors[layout].error,
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
    color: stylesColors[layout].primaryText,
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
    backgroundColor: stylesColors[layout].geosuggestFieldClearBg,
    width: 25,
    height: 25,
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: stylesColors[layout].geosuggestFieldClearText
  },
});

export class GeosuggestField extends Component {
  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal({type: 'cities'})
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
    const { input, layout } = this.props;

    if (input.value)  {
      return (
        <TouchableOpacity
          style={styles(layout).clearLink}
          underlayColor={stylesColors[layout].primaryBg}
          onPress={() => this.clearSelect()}
        >
          <Text style={styles(layout).clearText}>x</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { input, label, meta: { touched, error }, layout, ...custom } = this.props;

    return (
      <View>
        <View style={styles(layout).inputContainer}>
          <TextInput
            style={styles(layout).inputStyle}
            placeholderTextColor={stylesColors[layout].primaryText}
            underlineColorAndroid={stylesColors[layout].primaryText}
            onFocus={() => this.openSearchModal()}
            onChange={() => this.openSearchModal()}
            placeholder={label}
            value={input.value.address}
            {...custom}
          />
          {this.renderClearButton()}
        </View>
        <Text style={styles(layout).error}>{touched && error}</Text>
      </View>
    )
  }
};
