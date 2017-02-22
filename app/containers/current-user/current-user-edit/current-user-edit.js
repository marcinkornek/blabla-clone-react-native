// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

// actions
import { updateCurrentUser } from '../../../actions/current-user';

// components
import CurrentUserEditForm from '../../../components/current-user/current-user-edit-form/current-user-edit-form'

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  }
});

export class CurrentUserEdit extends Component {
  handleSubmit(data) {
    const { updateCurrentUser, navigation } = this.props
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
          navigation.navigate('accountTabs');
        }
      })
  }

  render() {
    const { currentUser, isSaving } = this.props;

    return (
      <ScrollView style={styles.view}>
        <CurrentUserEditForm
          currentUser={currentUser}
          isSaving={isSaving}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.item,
    isSaving: state.currentUser.isSaving,
  }
}

const mapDispatchToProps = {
  updateCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserEdit)
