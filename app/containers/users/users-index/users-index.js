// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button, List } from 'react-native-elements';

// actions
import { fetchUsers, refreshUsers } from '../../../actions/users';

// components
import { RenderList } from '../../../components/shared/render-list/render-list'
import { UsersIndexItem } from '../../../components/users/users-index-item/users-index-item'

const per = 20
const styles = (layout) => StyleSheet.create({
  view: {
    flex: 1,
  }
});

class UsersIndex extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    headerTitle: 'Users list'
  }

  componentWillMount() {
    this.props.fetchUsers(1, per)
  }

  refreshUsers(per) {
    this.props.refreshUsers(per)
  }

  fetchUsers(page, per) {
    this.props.fetchUsers(page, per)
  }

  renderUser(user) {
    const { layout, navigation } = this.props;

    return (
      <UsersIndexItem
        user={user}
        layout={layout}
        navigation={navigation}
        key={`user${user.id}`}
      />
    )
  }

  renderUsersList() {
    const { users, isFetching, isStarted, pagination, layout } = this.props;

    return (
      <RenderList
        items={users}
        pagination={pagination}
        isFetching={isFetching}
        isStarted={isStarted}
        fetchItems={this.fetchUsers.bind(this)}
        refreshItems={this.refreshUsers.bind(this)}
        renderRow={this.renderUser.bind(this)}
        per={per}
        layout={layout}
        onEndReachedThreshold={200}
        emptyListText='No users'
      />
    )
  }

  render() {
    const { layout } = this.props;

    return(
      <View style={styles(layout).view}>
        {this.renderUsersList()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pagination: state.users.pagination,
    users: state.users.items,
    isStarted: state.users.isStarted,
    isFetching: state.users.isFetching,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  fetchUsers,
  refreshUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex)
