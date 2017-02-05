// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView, RefreshControl, View, Text } from 'react-native';
import _ from 'lodash';

// components
import { RenderActivityIndicator } from '../../../components/shared/render-activity-indicator/render-activity-indicator'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const styles = StyleSheet.create({
  emptyList: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyListContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export class RenderList extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    dataSource: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
    renderRow: PropTypes.func.isRequired,
    per: PropTypes.number.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      data: props.data,
      dataSource: props.dataSource,
      refreshing: false,
    };
  }

  onLoadNextPage() {
    const { fetchItems, per } = this.props;
    const { current_page } = this.props.pagination;

    fetchItems(current_page + 1, per);
  }

  canLoadMore() {
    const { total_pages, current_page } = this.props.pagination;

    !total_pages || current_page < total_pages
  }

  onRefresh() {
    const { fetchItems, per } = this.props;

    fetchItems(1, per)
  }

  render() {
    const { data, dataSource, isFetching, isStarted, renderRow, emptyListText } = this.props;

    if (_.isEmpty(data) && isFetching) {
      return (
        <RenderActivityIndicator />
      )
    } else if (_.isEmpty(data)) {
      return(
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyList}>{emptyListText}</Text>
        </View>
      )
    } else {
      return (
        <ListView
          dataSource={dataSource}
          renderRow={renderRow}
          canLoadMore={this.canLoadMore.bind(this)}
          onEndReached={this.onLoadNextPage.bind(this)}
          onEndReachedThreshold={100}
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
}
