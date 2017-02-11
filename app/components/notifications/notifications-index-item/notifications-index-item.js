// utils
import React, { Component, PropTypes } from 'react'
import { View } from 'react-native';

// components
import { RideRequestCreated } from './notifications-index-item-ride-request-created'
import { RideRequestUpdated } from './notifications-index-item-ride-request-updated'

export class NotificationsIndexItem extends React.Component {
  static propTypes = {
    notification: PropTypes.object.isRequired,
    markAsSeen: PropTypes.func.isRequired
  }

  renderNotification(notification) {
    switch (notification.notification_type) {
    case "ride_request_created":
      return (
        <RideRequestCreated
          notification={notification}
          navigation={navigation}
        />
      )
    case "ride_request_accepted":
    case "ride_request_rejected":
      return (
        <RideRequestUpdated
          notification={notification}
          navigation={navigation}
        />
      )
    }
  }

  render() {
    const { notification } = this.props

    return this.renderNotification(notification)
  }
}
