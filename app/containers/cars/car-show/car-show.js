// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { initializeCar, fetchCar } from '../../../actions/cars';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { EditButton } from '../../../components/shared/edit-button/edit-button'

const styles = (layout) => StyleSheet.create({
  carName: {
    color: stylesColors[layout].primaryText,
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
  primaryText: {
    color: stylesColors[layout].primaryText,
  },
  view: {
    flex: 1,
    backgroundColor: stylesColors[layout].primaryBg,
  },
});

class CarShow extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    layout: PropTypes.string.isRequired,
  }

  static defaultProps = {
    car: {}
  }

  static navigationOptions = {
    header: ({ state }) => {
      return {
        title: state.params.myTitle,
        right: (
          <EditButton
            layout={state.params.layout}
            onClick={() => state.params.navigation.navigate('carEdit', {id: state.params.id})}
            showEdit={state.params.showEdit}
          />
        )
      }
    }
  }

  componentWillMount() {
    const { initializeCar, fetchCar, navigation } = this.props
    const initialCar = navigation.state.params.car
    const layout = navigation.state.params.layout

    this.setParams(initialCar, layout)
    initializeCar(initialCar)
    fetchCar(initialCar.id)
  }

  setParams(car, layout) {
    const { navigation } = this.props;
    const title = `${car.user.full_name} car`

    navigation.setParams({
      myTitle: title,
      id: car.id,
      layout: layout,
      navigation: navigation,
      showEdit: this.showEdit(car)
    })
  }

  showEdit(car) {
    const { currentUser } = this.props;

    return car.owner_id === currentUser.id
  }

  renderCar() {
    const { car, layout } = this.props

    return(
      <View style={styles(layout).container}>
        <Image source={{uri: car.car_photo}} style={styles(layout).photo} />
        <Text style={styles(layout).carName}>{car.full_name} {car.production_year}</Text>
        <Text style={styles(layout).primaryText}>{car.places_full}</Text>
        <Text style={styles(layout).primaryText}>{car.color}</Text>
        <Text style={styles(layout).primaryText}>{car.comfort}</Text>
        <Text style={styles(layout).primaryText}>{car.category}</Text>
      </View>
    )
  }

  render() {
    const { isFetching, isStarted, layout } = this.props

    return (
      <View style={styles(layout).view}>
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
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  initializeCar,
  fetchCar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarShow)
