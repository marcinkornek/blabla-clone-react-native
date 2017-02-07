// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

// actions
import { fetchCar } from '../../../actions/cars';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const styles = StyleSheet.create({
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  container: {
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'column',
  },
  photo: {
    width: 100,
    height: 100,
    margin: 10,
  },
  view: {
    marginTop: 50,
  },
});

class CarShow extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
  }

  static defaultProps = {
    car: {}
  }

  componentDidMount() {
    const { fetchCar, carId } = this.props
    fetchCar(carId)
  }

  componentDidUpdate(oldProps) {
    const { car } = this.props;

    if (car !== oldProps.car) {
      Actions.refresh({
        carId: car.id,
        title: `${car.full_name} ${car.production_year}`,
        rightTitle: this.renderRightTitle(),
        onRight: this.renderRightAction()
      })
    }
  }

  renderRightTitle() {
    const { car, currentUser } = this.props;

    if (car.owner_id === currentUser.id) {
      return "Edit"
    } else {
      return undefined
    }
  }

  renderRightAction() {
    const { car, currentUser } = this.props;

    if (car.owner_id === currentUser.id) {
      return () => Actions.carEdit({carId: car.id})
    } else {
      return undefined
    }
  }

  renderCar() {
    const { car } = this.props

    return(
      <View style={styles.container}>
        <Image source={{uri: car.car_photo}} style={styles.photo} />
        <Text style={styles.carName}>{car.full_name} {car.production_year}</Text>
        <Text>{car.places_full}</Text>
        <Text>{car.color}</Text>
        <Text>{car.comfort}</Text>
        <Text>{car.category}</Text>
      </View>
    )
  }

  render() {
    const { isFetching, isStarted } = this.props

    return (
      <View style={styles.view}>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderCar()}
        </AsyncContent>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    car: state.car.item,
    isStarted: state.car.isStarted,
    isFetching: state.car.isFetching,
    currentUser: state.session.item,
  }
}

const mapDispatchToProps = {
  fetchCar
}

export default connect(mapStateToProps, mapDispatchToProps)(CarShow)
