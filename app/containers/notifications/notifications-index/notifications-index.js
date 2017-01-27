// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet, ListView, RefreshControl, Text } from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import _ from 'lodash';

// actions
import { fetchNotifications, markNotificationAsSeen } from '../../../actions/notifications'

// components
import { RenderActivityIndicator } from '../../../components/shared/render-activity-indicator/render-activity-indicator'
import { NotificationsIndexItem } from '../../../components/notifications/notifications-index-item/notifications-index-item'

const per = 15
const styles = StyleSheet.create({
  view: {
    marginTop: 60,
  }
});

export class NotificationsIndex extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      data: [],
      dataSource: ds.cloneWithRows([]),
      refreshing: false
    };
  }

  componentDidMount() {
    const { isAuthenticated, fetchNotifications } = this.props

    if (isAuthenticated) fetchNotifications()
  }

  componentDidUpdate(prevProps) {
    const { notifications } = this.props;

    if (notifications !== prevProps.notifications) {
      let newData = this.state.data.concat(notifications)

      this.setState({
        data: newData,
        dataSource: this.state.dataSource.cloneWithRows(newData)
      })
    }
  }

  renderNotificationsList() {
    const { notifications, isFetching, isStarted } = this.props;

    if (_.isEmpty(this.state.data) && isFetching) {
      return (
        <RenderActivityIndicator />
      )
    } else if (_.isEmpty(this.state.data)) {
      return(
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyList}>No notifications</Text>
        </View>
      )
    } else {
      return (
        <ListView
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this.renderNotification.bind(this)}
          canLoadMore={true}
          onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }

        />
      )
    }
  }

  renderNotification(notification) {
    const { markAsSeen } = this.props

    return (
      <NotificationsIndexItem
        key={`notification${notification.id}`}
        notification={notification}
        markAsSeen={this.markAsSeen.bind(this)}
      />
    )
  }

  markAsSeen(notificationId) {
    const { markNotificationAsSeen } = this.props

    markNotificationAsSeen(notificationId)
  }

  loadMoreContentAsync = async () => {
    const { isAuthenticated, fetchNotifications } = this.props
    page = page + 1

    if (isAuthenticated) fetchNotifications(page, per)
  }

  canLoadMore() {
    parseInt(page, 10) < parseInt(this.props.pagination.total_pages, 10)
  }

  onRefresh() {
    const { isAuthenticated, fetchNotifications } = this.props

    if (isAuthenticated) fetchNotifications(1, per)
  }

  render() {
    const { isFetching, isStarted } = this.props;

    return (
      <View style={styles.view}>
        {this.renderNotificationsList()}
      </View>
    );
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
  markNotificationAsSeen
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex)
