import React from 'react';
import DatePicker from 'react-native-datepicker';

export const DatetimepickerField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <DatePicker
    mode="datetime"
    is24Hour={true}
    date={input.value}
    placeholder={label}
    onDateChange={(value) => {input.onChange(value)}}
    format="DD-MM-YYYY h:mm"
    {...input}
    {...custom}
  />
);
