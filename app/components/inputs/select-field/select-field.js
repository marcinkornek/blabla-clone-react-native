import React from 'react';
import { View, Text, Picker } from 'react-native';

export const SelectField = ({ input, children, meta: { touched, error }, ...custom }) => (
  <View>
    <Picker
      selectedValue={input.value}
      onValueChange={value => input.onChange(value)}
      children={children}
      {...custom}
    />
    <Text>{touched && error}</Text>
  </View>
);
