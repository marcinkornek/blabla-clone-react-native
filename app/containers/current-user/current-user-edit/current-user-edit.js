// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { updateCurrentUser } from '../../../actions/current-user';

// components
import CurrentUserEditForm from '../../../components/current-user/current-user-edit-form/current-user-edit-form'

const styles = (layout) => StyleSheet.create({
  view: {
    paddingTop: 10,
    backgroundColor: stylesColors[layout].primaryBg,
  }
});

export class CurrentUserEdit extends Component {
  static propTypes = {
    isSaving: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    headerTitle: 'Edit my profile'
  }

  handleSubmit(data) {
    const { updateCurrentUser, navigation } = this.props
    var body = new FormData();

    Object.keys(data).forEach(( key ) => {
      if (key == 'avatar') {
        if (_.isObject(data[key])) { body.append(key, data[key]) }
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
    const { currentUser, isSaving, layout } = this.props;

    return (
      <ScrollView style={styles(layout).view}>
        <CurrentUserEditForm
          currentUser={currentUser}
          isSaving={isSaving}
          layout={layout}
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
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  updateCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserEdit)
