// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';

// actions
import { fetchCar } from '../../../actions/cars';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { EditButton } from '../../../components/shared/edit-button/edit-button'

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

  static navigationOptions = {
    header: ({ state }) => {
      return {
        title: state.params.myTitle,
        right: (
          <EditButton
            onClick={() => state.params.navigation.navigate('carEdit', {id: state.params.id})}
            showEdit={state.params.showEdit}
          />
        )
      }
    }
  }

  componentDidMount() {
    const { fetchCar, navigation } = this.props
    const id = navigation.state.params.id

    fetchCar(id)
  }

  componentDidUpdate(oldProps) {
    const { car } = this.props;

    if (car !== oldProps.car) {
      this.setParams()
    }
  }

  setParams() {
    const { car, navigation } = this.props;
    const title = `${car.user.full_name} car`

    navigation.setParams({
      myTitle: title,
      id: car.id,
      navigation: navigation,
      showEdit: this.showEdit()
    })
  }

  showEdit() {
    const { car, currentUser } = this.props;

    return car.owner_id === currentUser.id
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
