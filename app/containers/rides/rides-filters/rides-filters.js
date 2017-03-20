// utils
import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { updateRidesFilters, clearRidesFilters } from '../../../actions/rides';
import { hideModal } from '../../../actions/modals';

// components
import RidesFiltersForm from '../../../components/rides/rides-filters-form/rides-filters-form'

const styles = (layout) => StyleSheet.create({
  view: {
    flex: 1,
  }
});

export class RidesFilters extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  renderRidesFiltersForm() {
    const { filters, layout } = this.props

    return (
      <RidesFiltersForm
        filters={filters}
        layout={layout}
        onSubmit={this.filterRides.bind(this)}
        clearFilters={this.clearFilters.bind(this)}
      />
    )
  }

  filterRides(data) {
    const { updateRidesFilters, hideModal } = this.props;

    updateRidesFilters(data)
    hideModal()
  }

  clearFilters() {
    const { clearRidesFilters, hideModal } = this.props;

    clearRidesFilters()
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
    filters: state.ridesFilters.filters,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  updateRidesFilters,
  clearRidesFilters,
  hideModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesFilters)
