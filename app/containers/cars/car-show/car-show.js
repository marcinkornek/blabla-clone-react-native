// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { TouchableHighlight, Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import _ from 'lodash';

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

  static navigationOptions = props => {
    const { navigation } = props;
    const { state, setParams } = navigation;
    const { params } = state;

    return {
      headerTitle: `${state.params.car.user.full_name} car`,
      headerRight:
        <EditButton
          layout={params.layout}
          onClick={() => params.navigation.navigate('carEdit', {id: params.id})}
          showEdit={params.showEdit}
        />
    }
  }

  componentWillMount() {
    const { initializeCar, fetchCar, modalProps, navigation } = this.props
    let car, layout

    if (navigation) {
      car = navigation.state.params.car
      layout = navigation.state.params.layout
      this.setParams(car, layout)
    } else {
      car = modalProps.car
    }

    initializeCar(car)
    fetchCar(car.id)
  }

  setParams(car, layout) {
    const { navigation } = this.props;

    navigation.setParams({
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

  showEdit(car) {
    const { currentUser } = this.props;

    return car.owner_id === currentUser.id
  }

  renderCar() {
    const { car, layout } = this.props

    return(
      <View style={styles(layout).container}>
        <Text style={styles(layout).carName}>{car.full_name} {car.production_year}</Text>
        <Image source={{uri: car.car_photo}} style={styles(layout).photo} />
        <Text style={styles(layout).primaryText}>
          {car.places_full}, {car.color}, {car.comfort}, {car.category}
        </Text>
      </View>
    )
  }

  render() {
    const { isFetching, isStarted, modalProps, layout } = this.props
    let backgroundColor

    if (!_.isEmpty(modalProps)) {
      backgroundColor = stylesColors[layout].secondaryBg
    } else {
      backgroundColor = stylesColors[layout].primaryBg
    }

    return (
      <ScrollView style={[styles(layout).view, { backgroundColor: backgroundColor } ]}>
        {this.renderCar()}
      </ScrollView>
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
    modalProps: state.modal.modalProps,
  }
}

const mapDispatchToProps = {
  initializeCar,
  fetchCar,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarShow)
