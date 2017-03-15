// utils
import React, { Component, PropTypes } from 'react'
import { View } from 'react-native';

// components
import { RideRequestCreated } from './notifications-index-item-ride-request-created'
import { RideRequestUpdated } from './notifications-index-item-ride-request-updated'

const NOTIFICATION_COMPONENTS = {
  'ride_request_created': RideRequestCreated,
  'ride_request_accepted': RideRequestUpdated,
  'ride_request_rejected': RideRequestUpdated,
}

export class NotificationsIndexItem extends React.Component {
  static propTypes = {
    notification: PropTypes.object.isRequired,
    markAsSeen: PropTypes.func.isRequired
  }

  renderNotification(notification, layout, navigation) {
    const SpecificNotification = NOTIFICATION_COMPONENTS[notification.notification_type]

    return (
      <SpecificNotification
        notification={notification}
        layout={layout}
        navigation={navigation}
      />
    )
  }

  render() {
    const { notification, layout, navigation } = this.props

    return this.renderNotification(notification, layout, navigation)
  }
}
