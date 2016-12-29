import React from 'react';
import DatePicker from 'react-native-datepicker';

export const DatepickerField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <DatePicker
    mode="date"
    date={input.value}
    placeholder={label}
    onDateChange={(value) => {input.onChange(value)}}
    format="DD-MM-YYYY"
    {...input}
    {...custom}
  />
);
