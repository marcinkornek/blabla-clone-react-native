// utils
import React, { PropTypes } from 'react'
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

// components
import { RenderUserAge } from '../render-user-age/render-user-age'

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export const RenderUserProfile = ({user}) => (
  <View>
    <Image source={{uri: user.avatar}} style={styles.avatar} />
    <Text>{user.full_name}</Text>
    <RenderUserAge user={user} />
    <Text>{user.email}</Text>
    <Text>member since: {moment(user.created_at).format('DD.MM.YYYY')}</Text>
    <Text>last seen at: {moment(user.last_seen_at || Date.now()).format('DD.MM.YYYY')}</Text>
    <TouchableHighlight onPress={() => Actions.userShow({userId: user.id})}>
      <Text>view profile</Text>
    </TouchableHighlight>
  </View>
)

RenderUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
}
