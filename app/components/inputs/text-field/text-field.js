import React from 'react';
import { TextInput } from 'react-native';

export const TextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextInput
    style={{height: 40}}
    placeholder={label}
    onChangeText={(value) => input.onChange(value)}
    {...input}
    {...custom}
  />
);
