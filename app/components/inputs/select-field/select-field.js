import React from 'react';
import { Picker } from 'react-native';

export const SelectField = field => (
  <Picker
    selectedValue={field.input.value}
    onValueChange={value => field.input.onChange(value)}
    children={field.children}
  />
);
