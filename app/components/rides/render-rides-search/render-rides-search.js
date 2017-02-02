// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Button } from 'react-native-elements';
import _ from 'lodash';

// components
import { GeosuggestField } from '../../inputs/geosuggest-field/geosuggest-field';

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'column',
  },
  geolocationField: {
    marginTop: -15,
    marginBottom: -5,
    width: width - 150,
  },
  submitButton: {
    marginTop: 10,
    height: 30,
    marginRight: 5,
    marginLeft: 0,
  },
  view: {
    marginTop: 0,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export class RenderRidesSearch extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  renderClearButton() {
    const { search, clearSearch } = this.props;
    console.log(search);

    if (!_.isEmpty(search)) {
      return (
        <Button
          raised
          buttonStyle={styles.submitButton}
          title={'Clear'}
          backgroundColor='red'
          onPress={clearSearch}
        />
      )
    }
  }

  render() {
    const { ride, handleSubmit } = this.props;

    return (
      <View style={styles.view}>
        <View style={styles.searchContainer}>
          <Field
            style={styles.geolocationField}
            name="start_location"
            label="Start city"
            component={GeosuggestField}
          />
          <Field
            style={styles.geolocationField}
            name="destination_location"
            label="Destination city"
            component={GeosuggestField}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            raised
            buttonStyle={styles.submitButton}
            title={'Search'}
            backgroundColor='#23a2e3'
            onPress={handleSubmit}
          />
          {this.renderClearButton()}
        </View>
      </View>
    )
  }
}

RenderRidesSearch = reduxForm({
  form: 'RidesSearchForm',
})(RenderRidesSearch)

RenderRidesSearch = connect(
  (state, props) => ({
    initialValues: props.search
  })
)(RenderRidesSearch)

export default RenderRidesSearch
