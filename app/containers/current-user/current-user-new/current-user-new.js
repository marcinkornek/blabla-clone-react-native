// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, Alert, StyleSheet } from 'react-native';
import _ from 'lodash';

// actions
import { createCurrentUser } from '../../../actions/current-user';
import { showModal } from '../../../actions/modals';

// components
import CurrentUserNewForm from '../../../components/current-user/current-user-new-form/current-user-new-form'

const styles = (layout) => StyleSheet.create({
  view: {
    marginTop: 10,
  }
});

export class CurrentUserNew extends Component {
  static propTypes = {
    isSaving: PropTypes.bool.isRequired,
    layout: PropTypes.string.isRequired,
  }

  handleSubmit(data) {
    const { createCurrentUser, showModal } = this.props
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
          showModal('LOGIN', { title: 'Account created', subtitle: 'You can login now' })
        }
      })
  }

  renderForm() {
    const { isSaving, layout } = this.props;

    return (
      <CurrentUserNewForm
        isSaving={isSaving}
        layout={layout}
        onSubmit={this.handleSubmit.bind(this)}
      />
    )
  }

  render() {
    const { layout } = this.props;

    return (
      <ScrollView style={styles(layout).view}>
        {this.renderForm()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSaving: state.currentUser.isSaving,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  createCurrentUser,
  showModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserNew)
