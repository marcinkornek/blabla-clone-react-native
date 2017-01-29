// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Button } from 'react-native-elements';

// components
import { SelectField } from '../../inputs/select-field/select-field';

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 10,
  },
  view: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export class RenderRidesFilters extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { ride, handleSubmit } = this.props;
    const orderTypes = ['newest', 'oldest', 'recently_added', 'cheapest', 'expensive']
    const orders = orderTypes.map((order) =>
      <Picker.Item
        key={order}
        value={order}
        label={order}
      />
    )
    const orderPlaceholder =
      <Picker.Item
        key="order-placeholder"
        value={null}
        label="Choose order"
      />

    return (
      <View style={styles.view}>
        <Field
          name="order_by_type"
          label="Order"
          component={SelectField}
        >
          {[orderPlaceholder, ...orders]}
        </Field>
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

RenderRidesFilters = reduxForm({
  form: 'RidesFiltersForm',
})(RenderRidesFilters)

RenderRidesFilters = connect(
  (state, props) => ({
    initialValues: props.filters
  })
)(RenderRidesFilters)

export default RenderRidesFilters
