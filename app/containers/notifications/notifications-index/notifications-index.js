// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { fetchNotifications, refreshNotifications, markNotificationAsSeen } from '../../../actions/notifications'

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { NotificationsIndexItem } from '../../../components/notifications/notifications-index-item/notifications-index-item'

const per = 20
const styles = (layout) => StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: stylesColors[layout].primaryBg,
  },
});

export class NotificationsIndex extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    headerTitle: 'Notifications'
  }

  componentWillMount() {
    const { isAuthenticated, fetchNotifications } = this.props

    if (isAuthenticated) fetchNotifications(1, per)
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
    const { markAsSeen, layout, navigation } = this.props;

    return (
      <NotificationsIndexItem
        key={`notification${notification.id}`}
        notification={notification}
        layout={layout}
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
    const { notifications, isFetching, isStarted, pagination, layout } = this.props;

    return (
      <RenderList
        items={notifications}
        pagination={pagination}
        isFetching={isFetching}
        isStarted={isStarted}
        fetchItems={this.fetchNotifications.bind(this)}
        refreshItems={this.refreshNotifications.bind(this)}
        renderRow={this.renderNotification.bind(this)}
        layout={layout}
        per={per}
        onEndReachedThreshold={200}
        emptyListText='No notifications'
      />
    )
  }

  render() {
    const { layout } = this.props;

    return(
      <View style={styles(layout).view}>
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
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  fetchNotifications,
  refreshNotifications,
  markNotificationAsSeen,
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex)
