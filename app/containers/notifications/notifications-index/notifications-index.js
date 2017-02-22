// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native';

// actions
import { fetchNotifications, refreshNotifications, markNotificationAsSeen } from '../../../actions/notifications'

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { NotificationsIndexItem } from '../../../components/notifications/notifications-index-item/notifications-index-item'

const per = 20
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export class NotificationsIndex extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: ({ state }) => {
      return {
        title: 'Notifications'
      }
    }
  }

  componentWillMount() {
    const { isAuthenticated, refreshNotifications } = this.props

    if (isAuthenticated) refreshNotifications(per)
  }

  refreshNotifications(per) {
    const { isAuthenticated, refreshNotifications } = this.props

    if (isAuthenticated) refreshNotifications(per)
  }

  fetchNotifications(page, per) {
    const { isAuthenticated, fetchNotifications } = this.props

    if (isAuthenticated) fetchNotifications(page, per)
  }

  renderNotification(notification) {
    const { markAsSeen, navigation } = this.props;

    return (
      <NotificationsIndexItem
        key={`notification${notification.id}`}
        notification={notification}
        navigation={navigation}
        markAsSeen={this.markAsSeen.bind(this)}
      />
    )
  }

  markAsSeen(notificationId) {
    const { markNotificationAsSeen } = this.props

    markNotificationAsSeen(notificationId)
  }

  renderNotificationsList() {
    const { notifications, isFetching, isStarted, pagination } = this.props;

    return (
      <RenderList
        items={notifications}
        pagination={pagination}
        isFetching={isFetching}
        isStarted={isStarted}
        fetchItems={this.fetchNotifications.bind(this)}
        refreshItems={this.refreshNotifications.bind(this)}
        renderRow={this.renderNotification.bind(this)}
        per={per}
        onEndReachedThreshold={200}
        emptyListText='No notifications'
      />
    )
  }

  render() {
    return(
      <View style={styles.view}>
        {this.renderNotificationsList()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.items,
    isStarted: state.notifications.isStarted,
    isFetching: state.notifications.isFetching,
    pagination: state.notifications.pagination,
    isAuthenticated: state.session.isAuthenticated,
  }
}

const mapDispatchToProps = {
  fetchNotifications,
  refreshNotifications,
  markNotificationAsSeen,
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex)
