// utils
import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  error: {
    color: stylesColors[layout].error,
    marginLeft: 15,
    marginTop: -5,
    marginBottom: 5,
  },
  inputStyle: {
    color: stylesColors[layout].primaryText,
    height: 40,
    marginLeft: 8,
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 10,
  },
});

export class SelectField extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pickerValue: props.input.value
    }
  };

  render() {
    const { input, children, meta: { touched, error }, layout, ...custom } = this.props;

    return (
      <View>
        <Picker
          style={styles(layout).inputStyle}
          selectedValue={this.state && this.state.pickerValue}
          onValueChange={(value) => {
            this.setState({pickerValue: value});
            input.onChange(value)
          }}
          children={children}
          {...custom}
        />
        <Text style={styles(layout).error}>{touched && error}</Text>
      </View>
    )
  }
};
