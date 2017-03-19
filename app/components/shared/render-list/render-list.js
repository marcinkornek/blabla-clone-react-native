// utils
import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView, RefreshControl, ScrollView, View, Text } from 'react-native';
import _ from 'lodash';
import ActionButton from 'react-native-action-button';

// styles
import stylesColors from '../../../constants/colors';

// components
import { RenderActivityIndicator } from '../../../components/shared/render-activity-indicator/render-activity-indicator'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const styles = (layout) => StyleSheet.create({
  emptyList: {
    color: stylesColors[layout].primaryText,
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyListContainer: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view: {
    flex: 1,
  }
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
    showAddButton: PropTypes.bool,
    addButtonLink: PropTypes.func,
    per: PropTypes.number.isRequired,
    onEndReachedThreshold: PropTypes.number,
    emptyListText: PropTypes.string,
    layout: PropTypes.string.isRequired,
  }

  state = {
    refreshing: false,
  };

  onLoadNextPage() {
    const { fetchItems, per } = this.props;
    const { current_page, total_pages } = this.props.pagination;

    if (!total_pages || current_page < total_pages) {
      fetchItems(current_page + 1, per);
    }
  }

  onRefresh() {
    const { refreshItems, per } = this.props;

    refreshItems(per)
  }

  renderList() {
    const { items, renderRow, onEndReachedThreshold } = this.props;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(items);

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

  renderEmptyView() {
    const { emptyListText, layout } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles(layout).emptyListContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
        <Text style={styles(layout).emptyList}>{emptyListText || 'No items'}</Text>
      </ScrollView>
    )
  }

  renderContainer() {
    const { items, isFetching } = this.props;

    if (items.length === 0 && isFetching) {
      return <RenderActivityIndicator />
    } else if (items.length === 0) {
      return this.renderEmptyView()
    } else {
      return this.renderList()
    }
  }

  renderAddFloatingButton() {
    const { showAddButton, addButtonLink, layout } = this.props;

    if (showAddButton) {
      return (
        <ActionButton
          buttonColor={stylesColors[layout].actionButton}
          onPress={addButtonLink}
        />
      )
    }
  }

  render() {
    const { layout } = this.props;

    return (
      <View style={styles(layout).view}>
        {this.renderContainer()}
        {this.renderAddFloatingButton()}
      </View>
    )
  }
}
