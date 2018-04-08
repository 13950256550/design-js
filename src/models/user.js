import { routerRedux } from 'dva/router';
import { query as queryUsers, queryCurrent, getCurrentUserMenus } from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    menus: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({payload}, { call, put }) {
      const response = yield call(queryCurrent,payload);
      // console.log(response)
      if(response && response.data){
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      }else{
        yield put({
          type: 'login/logout',
        });
      }

    },

    *fetchMenus({payload}, { call, put }) {
      const response = yield call(getCurrentUserMenus,payload);
      if(response && response.length>0){
        yield put({
          type: 'saveMenus',
          payload: response,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },

    saveMenus(state, action) {
      return {
        ...state,
        menus: action.payload,
      };
    },
  },
};
