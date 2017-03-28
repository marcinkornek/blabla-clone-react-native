// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Button } from 'react-native-elements';
import _ from 'lodash';

// styles
import stylesColors from '../../../constants/colors';

// components
import { SelectField } from '../../inputs/select-field/select-field';
import { ToggleField } from '../../inputs/toggle-field/toggle-field';

const styles = (layout) => StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectField: {
    color: stylesColors[layout].primaryText,
    flexShrink: 1,
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

const ORDER_TYPES = [
  { label: 'newest', value: 'newest' },
  { label: 'oldest', value: 'oldest' },
  { label: 'recently added', value: 'recently_added' },
  { label: 'cheapest', value: 'cheapest' },
  { label: 'expensive', value: 'expensive' },
]
const CURRENCY_TYPES = [
  { label: 'PLN', value: 'pln' },
  { label: 'EUR', value: 'eur' },
  { label: 'USD', value: 'usd' },
]
const STATUS_TYPES = [
  { label: 'pending', value: 'pending' },
  { label: 'accepted', value: 'accepted' },
  { label: 'rejected', value: 'rejected' },
]

export class RidesAsPassengerFiltersForm extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    layout: PropTypes.string.isRequired,
  }

  renderClearButton() {
    const { filters, clearFilters, layout } = this.props;

    if (!_.isEmpty(filters)) {
      return (
        <Button
          raised
          buttonStyle={styles(layout).submitButton}
          title={'Clear'}
          backgroundColor={stylesColors[layout].error}
          onPress={clearFilters}
        />
      )
    }
  }

  render() {
    const { ride, handleSubmit, layout } = this.props;
    const orders = ORDER_TYPES.map((item) =>
      <Picker.Item
        key={item.value}
        value={item.value}
        label={item.label}
      />
    )
    const orderPlaceholder =
      <Picker.Item
        key="order-placeholder"
        value={null}
        label="order"
      />
    const currencies = CURRENCY_TYPES.map((item) =>
      <Picker.Item
        key={item.value}
        value={item.value}
        label={item.label}
      />
    )
    const currencyPlaceholder =
      <Picker.Item
        key="currency-placeholder"
        value={null}
        label="currency"
      />
    const statuses = STATUS_TYPES.map((item) =>
      <Picker.Item
        key={item.value}
        value={item.value}
        label={item.label}
      />
    )
    const statusPlaceholder =
      <Picker.Item
        key="status-placeholder"
        value={null}
        label="status"
      />

    return (
      <View style={styles(layout).view}>
        <Field
          style={styles(layout).selectField}
          name="order_by_type"
          label="Order"
          component={SelectField}
          layout={layout}
        >
          {[orderPlaceholder, ...orders]}
        </Field>
        <Field
          style={styles(layout).selectField}
          name="currency"
          label="Currency"
          component={SelectField}
          layout={layout}
        >
          {[currencyPlaceholder, ...currencies]}
        </Field>
        <Field
          style={styles(layout).selectField}
          name="status"
          label="Status"
          component={SelectField}
          layout={layout}
        >
          {[statusPlaceholder, ...statuses]}
        </Field>
        <Field
          name='show_past'
          label='Show past'
          component={ToggleField}
          layout={layout}
        />
        <Field
          name='show_full'
          label='Show full'
          component={ToggleField}
          layout={layout}
        />
        <View style={styles(layout).buttonsContainer}>
          {this.renderClearButton()}
          <Button
            raised
            buttonStyle={styles(layout).submitButton}
            title={'Filter'}
            backgroundColor={stylesColors[layout].buttonSubmit}
            onPress={handleSubmit}
          />
        </View>
      </View>
    )
  }
}

RidesAsPassengerFiltersForm = reduxForm({
  form: 'RidesAsPassengerFiltersForm',
})(RidesAsPassengerFiltersForm)

RidesAsPassengerFiltersForm = connect(
  (state, props) => ({
    initialValues: props.filters
  })
)(RidesAsPassengerFiltersForm)

export default RidesAsPassengerFiltersForm
