// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Modal, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { hideModal } from '../../../actions/modals';

// components
import Login from '../../session/login/login'
import Register from '../../current-user/current-user-new/current-user-new'
import CarNew from '../../cars/car-new/car-new'
import UserShow from '../../users/user-show/user-show'
import CarShow from '../../cars/car-show/car-show'
import RidesAsDriverFilters from '../../rides/rides-as-driver-filters/rides-as-driver-filters'
import RidesAsPassengerFilters from '../../rides/rides-as-passenger-filters/rides-as-passenger-filters'
import RidesFilters from '../../rides/rides-filters/rides-filters'

const styles = (layout) => StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  modalHeader: {
  },
  modalCloseIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  modalContent: {
    flex: 1,
    margin: 0,
    padding: 15,
    borderRadius: 0,
    backgroundColor: stylesColors[layout].modalBg,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: stylesColors[layout].modalText,
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitleContainer: {
    color: stylesColors[layout].modalTextSubtitle,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
  },
});

const MODAL_COMPONENTS = {
  'LOGIN': Login,
  'REGISTER': Register,
  'USER_SHOW': UserShow,
  'CAR_SHOW': CarShow,
  'CAR_NEW': CarNew,
  'RIDES_AS_DRIVER_FILTERS': RidesAsDriverFilters,
  'RIDES_AS_PASSENGER_FILTERS': RidesAsPassengerFilters,
  'RIDES_FILTERS': RidesFilters,
}

export class ModalRoot extends Component {
  static propTypes = {
    modalType: PropTypes.string,
    modalProps: PropTypes.object.isRequired,
  };

  closeModal() {
    this.props.hideModal()
  }

  renderModalCloseIcon() {
    const { layout } = this.props;

    return (
      <View style={styles(layout).modalCloseIcon}>
        <MaterialIcons.Button
          name="close"
          backgroundColor="transparent"
          color={stylesColors[layout].modalCloseX}
          size={25}
          onPress={this.closeModal.bind(this)}
        />
      </View>
    )
  }

  renderTitle() {
    const { modalProps, layout } = this.props;

    if (modalProps.title) {
      return (
        <View style={styles(layout).titleContainer}>
          <Text style={styles(layout).title}>
            {modalProps.title}
          </Text>
        </View>
      )
    }
  }

  renderSubtitle() {
    const { modalProps, layout } = this.props;

    if (modalProps.subtitle) {
      return (
        <View style={styles(layout).subtitleContainer}>
          <Text style={styles(layout).subtitle}>
            {modalProps.subtitle}
          </Text>
        </View>
      )
    }
  }

  render() {
    const { modalType, modalProps, layout } = this.props;
    if (!modalType) return null
    const SpecificModal = MODAL_COMPONENTS[modalType]

    return (
      <Modal
        animationType="slide"
        onRequestClose={this.closeModal.bind(this)}
        transparent
      >
        <View style={styles(layout).modal}>
          <View style={[styles(layout).modalContent, modalProps.modalStyles]}>
            {this.renderTitle()}
            {this.renderSubtitle()}
            <SpecificModal {...this.props} isModal={true} />
            {this.renderModalCloseIcon()}
          </View>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalType: state.modal.modalType,
    modalProps: state.modal.modalProps,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  hideModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot)
