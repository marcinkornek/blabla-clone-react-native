import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

var options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export class ImageField extends Component {
  onChange(e) {
    const { input } = this.props;

    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        // // You can display the image using either data...
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // // or a reference to the platform specific asset location
        // if (Platform.OS === 'ios') {
        //   const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // } else {
        //   const source = {uri: response.uri, isStatic: true};
        // }

        // this.setState({
        //   avatarSource: source
        // });

        input.onChange({ uri: response.uri, name: response.fileName, type: 'image/jpg' })
      }
    });
  }

  render() {
    return (
      <Button
        raised
        title='Add photo'
        backgroundColor='#ff4c4c'
        onPress={this.onChange.bind(this)}
      />
    )
  }
}
