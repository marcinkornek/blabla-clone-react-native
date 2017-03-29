// utils
import React from 'react';
import DatePicker from 'react-native-datepicker';
import { Text, View, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

const styles = (layout) => StyleSheet.create({
  error: {
    color: stylesColors[layout].error,
    marginLeft: 15,
    marginTop: 0,
    marginBottom: 5,
  },
  inputStyle: {
    height: 40,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
    width: 150,
  },
  dateInput: {
    alignItems: 'flex-start',
    paddingLeft: 5,
    borderColor: stylesColors[layout].transparent,
  },
  dateText: {
    color: stylesColors[layout].primaryText,
    fontSize: 15,
    paddingBottom: 5
  },
  placeholderText: {
    color: stylesColors[layout].primaryText,
    fontSize: 15,
    paddingBottom: 5
  },
});

export const DatepickerField = ({ input, label, meta: { touched, error }, layout, ...custom }) => (
  <View>
    <DatePicker
      style={styles(layout).inputStyle}
      customStyles={{
        dateIcon: styles(layout).dateIcon,
        dateInput: styles(layout).dateInput,
        placeholderText: styles(layout).placeholderText,
        dateText: styles(layout).dateText,
      }}
      mode="date"
      date={input.value}
      placeholder={label}
      onDateChange={(value) => {input.onChange(value)}}
      format="YYYY-MM-DD"
      {...input}
      {...custom}
    />
    <Text style={styles(layout).error}>{touched && error}</Text>
  </View>
);
