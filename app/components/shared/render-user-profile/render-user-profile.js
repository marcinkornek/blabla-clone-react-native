// utils
import React, { PropTypes } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
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
  </View>
)

RenderUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
}
