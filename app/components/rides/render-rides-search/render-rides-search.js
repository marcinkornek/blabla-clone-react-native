// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Button } from 'react-native-elements';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

// components
import { GeosuggestField } from '../../inputs/geosuggest-field/geosuggest-field';

const { width, height } = Dimensions.get('window')
const styles = (layout) => StyleSheet.create({
  searchContainer: {
    flexDirection: 'column',
  },
  geolocationField: {
    color: stylesColors[layout].primaryText,
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
    marginTop: 5,
    marginBottom: 5,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export class RenderRidesSearch extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    searchRides: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    layout: PropTypes.string.isRequired,
  }

  renderClearButton() {
    const { search, clearSearch, layout } = this.props;

    if (!_.isEmpty(search)) {
      return (
        <Button
          raised
          buttonStyle={styles(layout).submitButton}
          title={'Clear'}
          backgroundColor={stylesColors[layout].error}
          onPress={clearSearch}
        />
      )
    }
  }

  render() {
    const { ride, searchRides, layout } = this.props;

    return (
      <View style={styles(layout).view}>
        <View style={styles(layout).searchContainer}>
          <Field
            style={styles(layout).geolocationField}
            name="start_location"
            label="Start city"
            component={GeosuggestField}
            layout={layout}
          />
          <Field
            style={styles(layout).geolocationField}
            name="destination_location"
            label="Destination city"
            component={GeosuggestField}
            layout={layout}
          />
        </View>
        <View style={styles(layout).buttonsContainer}>
          <Button
            raised
            buttonStyle={styles(layout).submitButton}
            title={'Search'}
            backgroundColor={stylesColors[layout].buttonSubmit}
            onPress={searchRides}
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
