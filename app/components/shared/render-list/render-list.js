// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView, RefreshControl, ScrollView, View, Text } from 'react-native';
import _ from 'lodash';

// components
import { RenderActivityIndicator } from '../../../components/shared/render-activity-indicator/render-activity-indicator'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const styles = StyleSheet.create({
  emptyList: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyListWrapper: {
    height: 10000,
  },
  emptyListContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export class RenderList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isStarted: PropTypes.bool.isRequired,
    fetchItems: PropTypes.func.isRequired,
    refreshItems: PropTypes.func.isRequired,
    renderRow: PropTypes.func.isRequired,
    per: PropTypes.number.isRequired,
    onEndReachedThreshold: PropTypes.number,
    emptyListText: PropTypes.string,
  }

  state = {
    refreshing: false,
  };

  onLoadNextPage() {
    const { fetchItems, per } = this.props;
    const { current_page, total_pages } = this.props.pagination;

    console.log('per', per);

    if (!total_pages || current_page < total_pages) {
      fetchItems(current_page + 1, per);
    }
  }

  onRefresh() {
    console.log('refresg');
    const { refreshItems, per } = this.props;

    refreshItems(per)
  }

  render() {
    const { items, isFetching, renderRow, emptyListText, onEndReachedThreshold } = this.props;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(items);

    if (dataSource.getRowCount() === 0 && isFetching) {
      return (
        <RenderActivityIndicator />
      )
    } else if (dataSource.getRowCount() === 0) {
      return(
        <View style={styles.emptyListWrapper}>
          <ScrollView
            contentContainerStyle={styles.emptyListContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          >
            <Text style={styles.emptyList}>{emptyListText || 'No items'}</Text>
          </ScrollView>
        </View>
      )
    } else {
      return (
        <ListView
          dataSource={dataSource}
          renderRow={renderRow}
          onEndReached={this.onLoadNextPage.bind(this)}
          onEndReachedThreshold={onEndReachedThreshold || 150}
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
