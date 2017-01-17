// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, List } from 'react-native-elements';

// actions
import { fetchRides } from '../../../actions/rides';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'

const styles = StyleSheet.create({
  view: {
    marginTop: 80,
  }
});

export class RidesIndex extends Component {
  static propTypes = {
    rides: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.fetchRides()
  }

  renderRidesList() {
    const { rides } = this.props

    return (
      rides.map((ride, i) =>
        <RidesIndexItem
          ride={ride}
          key={`ride${i}`}
        />
      )
    )
  }

  render() {
    const { isFetching, isStarted } = this.props;

    return (
      <ScrollView style={styles.view}>
        <Button
          raised
          title='Add ride'
          backgroundColor='#ff4c4c'
          onPress={() => Actions.rideNew()}
        />
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          <List containerStyle={{marginBottom: 20}}>
            {this.renderRidesList()}
          </List>
        </AsyncContent>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rides: state.rides.items,
    isStarted: state.rides.isStarted,
    isFetching: state.rides.isFetching,
  }
};

const mapDispatchToProps = {
  fetchRides,
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndex)
