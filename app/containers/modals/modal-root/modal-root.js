// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Modal, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// actions
import { hideModal, showModal } from '../../../actions/modals';

// components
import Login from '../../session/login/login'
import Register from '../../current-user/current-user-new/current-user-new'
import CarNew from '../../cars/car-new/car-new'

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
    flex: 1,
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
    borderRadius: 5,
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
  },
});

const MODAL_COMPONENTS = {
  'LOGIN': Login,
  'REGISTER': Register,
  'CAR_NEW': CarNew,
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
    return (
      <View style={styles.modalCloseIcon}>
        <MaterialIcons.Button
          name="close"
          backgroundColor="transparent"
          color="#23A2E3"
          size={25}
          onPress={this.closeModal.bind(this)}
        />
      </View>
    )
  }

  renderTitle() {
    const { modalProps } = this.props;

    if (modalProps.title) {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {modalProps.title}
          </Text>
        </View>
      )
    }
  }

  renderSubtitle() {
    const { modalProps } = this.props;

    if (modalProps.subtitle) {
      return (
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            {modalProps.subtitle}
          </Text>
        </View>
      )
    }
  }

  render() {
    const { modalType, modalProps } = this.props;
    if (!modalType) return null

    const SpecificModal = MODAL_COMPONENTS[modalType]

    return (
      <Modal
        animationType="slide"
        onRequestClose={this.closeModal.bind(this)}
        transparent
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            {this.renderTitle()}
            {this.renderModalCloseIcon()}
            {this.renderSubtitle()}
            <SpecificModal {...this.props} isModal={true} />
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
  }
}

const mapDispatchToProps = {
  showModal,
  hideModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot)
