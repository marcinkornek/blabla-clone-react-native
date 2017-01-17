// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import moment from 'moment';

// actions
import { updateCurrentUser } from '../../../actions/current-user';

// components
import CurrentUserEditForm from '../../../components/current-user/current-user-edit-form/current-user-edit-form'

export class CurrentUserEdit extends Component {
  handleSubmit(data) {
    const { updateCurrentUser } = this.props
    var body = new FormData();

    Object.keys(data).forEach(( key ) => {
      if (key == 'avatar') {
        if (_.isObject(data[key])) { body.append(key, data[key]) }
      } else if (key == 'date_of_birth' && _.isObject(data[key]) && data[key].getMonth === 'function') {
        body.append(key, moment(data[key]).format('DD-MM-YYYY'))
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })

    updateCurrentUser(body)
      .then((response) => {
        if (!response.error) {
          Actions.myAccount({type: 'reset'});
        }
      })
  }

  render() {
    const { currentUser } = this.props;

    return (
      <ScrollView style={styles.view}>
        <CurrentUserEditForm
          currentUser={currentUser}
          onSubmit={this.handleSubmit.bind(this)}
        />
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
  return {
    currentUser: state.currentUser.item
  }
}

const mapDispatchToProps = {
  updateCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserEdit)
