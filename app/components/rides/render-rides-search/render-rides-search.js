// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Button } from 'react-native-elements';

// components
import { GeosuggestField } from '../../inputs/geosuggest-field/geosuggest-field';

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 10,
  },
  view: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export class RenderRidesSearch extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { ride, handleSubmit } = this.props;

    return (
      <View style={styles.view}>
        <Field
          name="start_city"
          label="Start city"
          component={GeosuggestField}
        />
        <Field
          name="destination_city"
          label="Destination city"
          component={GeosuggestField}
        />
        <Button
          raised
          style={styles.submitButton}
          title={'Submit'}
          backgroundColor='#23a2e3'
          onPress={handleSubmit}
        />
      </View>
    )
  }
}

RenderRidesSearch = reduxForm({
  form: 'RidesSearchForm',
})(RenderRidesSearch)

RenderRidesSearch = connect(
  (state, props) => ({
    initialValues: props.filters
  })
)(RenderRidesSearch)

export default RenderRidesSearch
