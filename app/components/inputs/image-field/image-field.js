// utils
import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

// styles
import stylesColors from '../../../constants/colors';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  quality: 0.3
};
const styles = (layout) => StyleSheet.create({
  error: {
    color: stylesColors[layout].error,
    marginLeft: 15,
    marginTop: 3,
    marginBottom: 5,
  },
});

export class ImageField extends Component {
  onChange(e) {
    const { input } = this.props;

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        input.onChange({ uri: response.uri, name: response.fileName, type: 'image/jpg' })
      }
    });
  }

  render() {
    const { input, label, meta: { touched, error }, layout, ...custom } = this.props;

    return (
      <View>
        <Button
          raised
          title='Add photo'
          backgroundColor={stylesColors[layout].imageFieldButton}
          onPress={this.onChange.bind(this)}
        />
        <Text style={styles(layout).error}>{touched && error}</Text>
      </View>
    )
  }
}
