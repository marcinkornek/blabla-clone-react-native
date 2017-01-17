// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

// actions
import { createCurrentUser } from '../../../actions/current-user';

// components
import CurrentUserNewForm from '../../../components/current-user/current-user-new-form/current-user-new-form'

export class CurrentUserNew extends Component {
  handleSubmit(data) {
    const { createCurrentUser } = this.props
    var body = new FormData();

    Object.keys(data).forEach(( key ) => {
      if (key == 'avatar') {
        if (_.isObject(data[key])) { body.append(key, data[key]) }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })

    createCurrentUser(body)
      .then((response) => {
        if (!response.error) {
          Actions.login({type: 'reset'})
        }
      })
  }

  render() {
    return (
      <ScrollView style={styles.view}>
        <CurrentUserNewForm onSubmit={this.handleSubmit.bind(this)} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 80,
  }
});

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  createCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserNew)
