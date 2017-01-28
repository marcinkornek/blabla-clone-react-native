import React from 'react';
import DatePicker from 'react-native-datepicker';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginLeft: 15,
    marginTop: 0,
    marginBottom: 5,
  },
  inputStyle: {
    height: 40,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingTop: 0,
    width: 190,
  },
  dateIcon: {
  },
  dateInput: {
    alignItems: 'flex-start',
    paddingLeft: 5,
  }
});

export const DatetimepickerField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <View>
    <DatePicker
      style={styles.inputStyle}
      customStyles={{ dateIcon: styles.dateIcon, dateInput: styles.dateInput }}
      mode="datetime"
      is24Hour={true}
      date={input.value}
      placeholder={label}
      onDateChange={(value) => {input.onChange(value)}}
      format="DD-MM-YYYY H:mm"
      {...input}
      {...custom}
    />
    <Text style={styles.error}>{touched && error}</Text>
  </View>
);
