// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, List } from 'react-native-elements';

// actions
import { fetchUsers } from '../../../actions/users';

// components
import { UsersIndexItem } from '../../../components/users/users-index-item/users-index-item'
import { AsyncContent } from '../../../components/shared/async-content/async-content'

const per = 10
const styles = StyleSheet.create({
  view: {
    paddingTop: 80,
  }
});

class UsersIndex extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { fetchUsers } = this.props;

    fetchUsers(1, per)
  }

  renderUsersList() {
    const { users } = this.props

    return (
      users.map((user, i) =>
        <UsersIndexItem
          key={i}
          user={user}
        />
      )
    )
  }

  render() {
    const { isFetching, isStarted } = this.props;

    return(
      <ScrollView style={styles.view}>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          <List containerStyle={{marginBottom: 20}}>
            {this.renderUsersList()}
          </List>
        </AsyncContent>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.items,
    isStarted: state.users.isStarted,
    isFetching: state.users.isFetching,
  }
}

const mapDispatchToProps = {
  fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex)
