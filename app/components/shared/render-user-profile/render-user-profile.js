// utils
import React, { PropTypes } from 'react'
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';
import moment from 'moment';

// styles
import stylesColors from '../../../constants/colors';

// components
import { RenderUserAge } from '../render-user-age/render-user-age'

const styles = StyleSheet.create({
  avatar: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  view: {
    marginTop: 10,
  },
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  user: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});

export const RenderUserProfile = ({user, navigation}) => (
  <View style={styles.view}>
    <Text style={styles.title}>Driver</Text>
    <View style={styles.container}>
      <Image source={{uri: user.avatar}} style={styles.avatar} />
      <View>
        <View style={styles.user}>
          <Text>{user.full_name}</Text>
          <RenderUserAge user={user} />
        </View>
        <Text>member since: {moment(user.created_at).format('DD.MM.YYYY')}</Text>
        <Text>last seen at: {moment(user.last_seen_at || Date.now()).format('DD.MM.YYYY')}</Text>
      </View>
    </View>
    <TouchableHighlight
      underlayColor={stylesColors.primaryBg}
      onPress={() => navigation.navigate('userShow', { id: user.id })}
    >
      <Text>view profile</Text>
    </TouchableHighlight>
  </View>
)

RenderUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
}
