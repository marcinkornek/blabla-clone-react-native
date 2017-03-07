// utils
import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

// actions
import { fetchRideOptions, createRide } from '../../../actions/rides'
import { showModal } from '../../../actions/modals';

// components
import RideForm from '../../../components/rides/ride-form/ride-form'
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const styles = StyleSheet.create({
  emptyCars: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyCarsContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view: {
    marginTop: 10,
  }
});

export class RideNew extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    rideOptions: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: ({ state }) => {
      return {
        title: 'Add ride'
      }
    }
  }

  componentWillMount() {
    this.props.fetchRideOptions()
  }

  renderRideForm() {
    const { rideOptions, isFetching, isStarted, isSaving, showModal } = this.props

    if (rideOptions.cars.length === 0 && isStarted && !isFetching) {
      showModal('CAR_NEW', { title: 'Add car', subtitle: 'You need to add car first to add ride' })
    }

    return (
      <RideForm
        isSaving={isSaving}
        rideOptions={rideOptions}
        onSubmit={this.handleSubmit.bind(this)}
        showModal={showModal}
      />
    )
  }

  handleSubmit(data) {
    const { createRide, navigation } = this.props
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
        let rideId = response.payload.data.id
        navigation.navigate('rideShow', {id: rideId});
      })
  }

  render() {
    const { isFetching, isStarted } = this.props

    return (
      <ScrollView style={styles.view}>
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
  }
}

const mapDispatchToProps = {
  fetchRideOptions,
  createRide,
  showModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(RideNew)
