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
  view: {
    marginTop: 60,
  },
  photo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

class CarShow extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUserId: PropTypes.number,
  }

  static defaultProps = {
    car: {}
  }

  componentWillMount() {
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
        onRight: () => this.renderRightAction()
      })
    }
  }

  renderRightTitle() {
    const { car, currentUserId } = this.props;

    if (car.owner_id === currentUserId) return "Edit"
  }

  renderRightAction() {
    const { car, currentUserId } = this.props;

    if (car.owner_id === currentUserId) return Actions.carEdit({carId: car.id})
  }

  renderCar() {
    const { car } = this.props

    return(
      <View>
        <Image source={{uri: car.car_photo}} style={styles.photo} />
        <Text>{car.full_name} {car.production_year}</Text>
        <Text>{car.places_full}</Text>
        <Text>{car.color}</Text>
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
    currentUserId: state.session.item.id,
  }
}

const mapDispatchToProps = {
  fetchCar
}

export default connect(mapStateToProps, mapDispatchToProps)(CarShow)
