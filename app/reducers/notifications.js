import {
  NOTIFICATIONS_FETCH_REQUEST,
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATIONS_REFRESH_REQUEST,
  NOTIFICATIONS_REFRESH_SUCCESS,
  NOTIFICATION_ADD_SUCCESS,
  NOTIFICATION_UPDATE_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/action-types'
import { unionWith } from 'ramda';
const comparator = function(a1, a2) { return a1.id === a2.id; };

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export function notifications(state = initialState, action) {
  let item, items, pagination, unreadCount
  switch (action.type) {
  case LOGOUT_SUCCESS:
    return {
      ...initialState
    };
  case NOTIFICATIONS_FETCH_REQUEST:
    console.log('NOTIFICATIONS_FETCH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case NOTIFICATIONS_FETCH_SUCCESS:
    console.log('NOTIFICATIONS_FETCH_SUCCESS');
    items = action.payload.data.items
    pagination = action.payload.data.meta
    return {
      ...state,
      isFetching: false,
      items: unionWith(
        comparator,
        items,
        state.items,
      ),
      pagination: pagination
    };
  case NOTIFICATIONS_REFRESH_REQUEST:
    console.log('NOTIFICATIONS_REFRESH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
    };
  case NOTIFICATIONS_REFRESH_SUCCESS:
    console.log('NOTIFICATIONS_REFRESH_SUCCESS');
    items = action.payload.data.items
    pagination = action.payload.data.meta
    return {
      ...state,
      isFetching: false,
      items: unionWith(
        comparator,
        items,
        state.items,
      ),
      pagination: pagination,
    };
  case NOTIFICATION_ADD_SUCCESS:
    console.log('NOTIFICATION_ADD_SUCCESS');
    item = action.item
    unreadCount = item.unread_count
    delete item['unread_count']
    return {
      ...state,
      items: [...state.items, item],
      pagination: {
        ...state.pagination,
        unread_count: unreadCount
      }
    };
  case NOTIFICATION_UPDATE_SUCCESS:
    console.log('NOTIFICATION_UPDATE_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      isFetching: false,
      items: state.items.map(i => {
        if (i.id == item.id) {
          return {
            ...i,
            seen_at: item.seen_at
          }
        } else {
          return i
        }
      }),
      pagination: {
        ...state.pagination,
        unread_count: item.unread_count
      }
    };
  default:
    return state;
  }
}
