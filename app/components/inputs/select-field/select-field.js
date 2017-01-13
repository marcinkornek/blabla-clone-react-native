import React from 'react';
import { View, Text, Picker } from 'react-native';

export const SelectField = field => (
  <View>
    <Picker
      selectedValue={field.input.value}
      onValueChange={value => field.input.onChange(value)}
      children={field.children}
    />
    <Text>{field.meta.touched && field.meta.error}</Text>
  </View>
);
