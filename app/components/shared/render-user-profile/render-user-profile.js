// utils
import React, { PropTypes } from 'react'
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';
import moment from 'moment';

// styles
import stylesColors from '../../../constants/colors';

// components
import { RenderUserAge } from '../render-user-age/render-user-age'

const styles = (layout) => StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  imageAvatar: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  primaryText: {
    color: stylesColors[layout].primaryText,
  },
  title: {
    color: stylesColors[layout].primaryText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  user: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  view: {
    marginTop: 10,
  },
});

export const RenderUserProfile = ({user, layout, onSubmit, navigation}) => (
  <TouchableHighlight
    style={styles(layout).view}
    underlayColor={stylesColors[layout].primaryBg}
    onPress={onSubmit}
  >
    <View>
      <Text style={styles(layout).title}>Driver</Text>
      <View style={styles(layout).container}>
        <Image source={{uri: user.avatar}} style={styles(layout).imageAvatar} />
        <View>
          <View style={styles(layout).user}>
            <Text style={styles(layout).primaryText}>{user.full_name} (</Text>
            <RenderUserAge user={user} layout={layout} />
            <Text style={styles(layout).primaryText}>)</Text>
          </View>
          <Text style={styles(layout).primaryText}>
            member since: {moment(user.created_at).format('DD.MM.YYYY')}
          </Text>
          <Text style={styles(layout).primaryText}>
            last seen at: {moment(user.last_seen_at || Date.now()).format('DD.MM.YYYY')}
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
)

RenderUserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  layout: PropTypes.string.isRequired,
}
