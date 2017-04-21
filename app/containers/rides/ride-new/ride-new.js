// utils
import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { fetchRideOptions, createRide } from '../../../actions/rides'
import { showModal } from '../../../actions/modals';

// components
import RideForm from '../../../components/rides/ride-form/ride-form'
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const styles = (layout) => StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: stylesColors[layout].primaryBg,
  }
});

export class RideNew extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    rideOptions: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    headerTitle: 'Add ride'
  }

  componentWillMount() {
    this.props.fetchRideOptions()
  }

  renderRideForm() {
    const { rideOptions, isFetching, isStarted, isSaving, showModal, layout } = this.props

    if (rideOptions.cars.length === 0 && isStarted && !isFetching) {
      showModal('CAR_NEW', { title: 'Add car', subtitle: 'You need to add car first to add ride' })
    }

    return (
      <RideForm
        isSaving={isSaving}
        rideOptions={rideOptions}
        layout={layout}
        showModal={showModal}
        onSubmit={this.handleSubmit.bind(this)}
      />
    )
  }

  handleSubmit(data) {
    const { createRide, layout, navigation } = this.props
    var body = new FormData()

    Object.keys(data).forEach((key) => {
      if (key == 'destination_location' || key == 'start_location') {
        body.append(key + '_address', data[key].address)
        body.append(key + '_latitude', data[key].latitude)
        body.append(key + '_longitude', data[key].longitude)
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })
    createRide(body)
      .then((response) => {
        let ride = response.payload.data
        navigation.navigate('rideShow', {ride: ride, layout: layout});
      })
  }

  render() {
    const { isFetching, isStarted, layout } = this.props

    return (
      <ScrollView style={styles(layout).view}>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderRideForm()}
        </AsyncContent>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSaving: state.ride.isSaving,
    isFetching: state.rideOptions.isFetching,
    isStarted: state.rideOptions.isStarted,
    rideOptions: state.rideOptions,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  fetchRideOptions,
  createRide,
  showModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(RideNew)
