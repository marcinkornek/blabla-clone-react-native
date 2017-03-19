// utils
import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { updateRidesAsDriverFilters, clearRidesAsDriverFilters } from '../../../actions/rides';
import { hideModal } from '../../../actions/modals';

// components
import RidesAsDriverFiltersForm from '../../../components/rides/rides-as-driver-filters-form/rides-as-driver-filters-form'

const styles = (layout) => StyleSheet.create({
  view: {
    flex: 1,
  }
});

export class RidesAsDriverFilters extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  renderRidesFiltersForm() {
    const { filters, layout } = this.props

    return (
      <RidesAsDriverFiltersForm
        filters={filters}
        layout={layout}
        onSubmit={this.filterRides.bind(this)}
        clearFilters={this.clearFilters.bind(this)}
      />
    )
  }

  filterRides(data) {
    const { updateRidesAsDriverFilters, hideModal } = this.props;

    updateRidesAsDriverFilters(data)
    hideModal()
  }

  clearFilters() {
    const { clearRidesAsDriverFilters, hideModal } = this.props;

    clearRidesAsDriverFilters()
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
    filters: state.ridesAsDriverFilters.filters,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  updateRidesAsDriverFilters,
  clearRidesAsDriverFilters,
  hideModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesAsDriverFilters)
