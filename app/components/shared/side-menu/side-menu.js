// utils
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export class SideMenu extends Component {
  goToRidesIndex() {
    this.context.drawer.close();
    Actions.ridesIndex();
  }

  renderUserInfo() {
    const { currentUser } = this.props;

    if (currentUser) {
      return(
        <View style={styles.userInfo}>
          <Image source={{uri: currentUser.avatar}} style={styles.avatar} />
          <Text style={styles.controlText}>
            {currentUser.first_name}
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderUserInfo()}
        <TouchableHighlight onPress={() => this.goToRidesIndex()}>
          <Text style={styles.controlText}>Rides</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

SideMenu.contextTypes = {
  drawer: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: 'black',
  },
  controlText: {
    color: 'white',
    fontSize: 13,
    marginTop: 25,
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  userInfo: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
})
