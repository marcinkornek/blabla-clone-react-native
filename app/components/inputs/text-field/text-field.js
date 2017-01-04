import React from 'react';
import { TextInput, Text, View } from 'react-native';

export const TextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <View>
    <TextInput
      style={{height: 40}}
      placeholder={label}
      onChangeText={(value) => input.onChange(value)}
      {...input}
      {...custom}
    />
    <Text>{touched && error}</Text>
  </View>
);
