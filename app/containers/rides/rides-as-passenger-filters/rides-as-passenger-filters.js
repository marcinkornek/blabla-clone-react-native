// utils
import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { updateRidesAsPassengerFilters, clearRidesAsPassengerFilters } from '../../../actions/rides';
import { hideModal } from '../../../actions/modals';

// components
import RidesAsPassengerFiltersForm from '../../../components/rides/rides-as-passenger-filters-form/rides-as-passenger-filters-form'

const styles = (layout) => StyleSheet.create({
  view: {
    flex: 1,
  }
});

export class RidesAsPassengerFilters extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  renderRidesFiltersForm() {
    const { filters, layout } = this.props

    return (
      <RidesAsPassengerFiltersForm
        filters={filters}
        layout={layout}
        onSubmit={this.filterRides.bind(this)}
        clearFilters={this.clearFilters.bind(this)}
      />
    )
  }

  filterRides(data) {
    const { updateRidesAsPassengerFilters, hideModal } = this.props;

    updateRidesAsPassengerFilters(data)
    hideModal()
  }

  clearFilters() {
    const { clearRidesAsPassengerFilters, hideModal } = this.props;

    clearRidesAsPassengerFilters()
    hideModal()
  }

  render() {
    const { layout } = this.props

    return (
      <ScrollView style={styles(layout).view}>
        {this.renderRidesFiltersForm()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.ridesAsPassengerFilters.filters,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  updateRidesAsPassengerFilters,
  clearRidesAsPassengerFilters,
  hideModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesAsPassengerFilters)
