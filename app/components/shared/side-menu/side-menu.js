// utils
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export class SideMenu extends Component {
  goToDashboard() {
    this.context.drawer.close();
    Actions.ridesIndex();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight onPress={() => this.goToDashboard()}>
          <Text style={styles.controlText}>Dashboard</Text>
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
  }
})
