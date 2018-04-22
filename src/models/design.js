import { fetchData, fetchCodeList, updateData, getFile, updateFile, getAeroData, getFoilData, getPathData, getPrefData,calculate } from '../services/design';

export default {
  namespace: 'design',

  state: {
    module1D: {},
    codelists: {},
    file: {},
    aero: [],
    foil: [],
    path: [],
    pref: {},
    calculate:{},
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const response = yield call(fetchData, payload);
      yield put({
        type: 'save1d',
        payload: response,
      });
    },

    *fetchCodeList({ payload }, { call, put }) {
      const response = yield call(fetchCodeList, payload);
      yield put({
        type: 'saveCodeList',
        payload: response,
      });
    },

    *updateData({ payload }, { call, put, select }) {
      const data = yield select(state => state.design.module1D);
      const response = yield call(updateData, payload, data);
      yield put({
        type: 'saveFile',
        payload: response,
      });
    },

    *getFile({ payload }, { call, put }) {
      const response = yield call(getFile, payload);
      yield put({
        type: 'saveFile',
        payload: response,
      });
    },

    *updateFile({ payload }, { call, put, select }) {
      const data = yield select(state => state.design.file);
      const response = yield call(updateFile, payload, data);
      // console.log(response);
      yield put({
        type: 'save1d',
        payload: response,
      });
    },

    *getAeroData(_, { call, put }) {
      const sessionid = localStorage.getItem('design.client.sessionid');
      const response = yield call(getAeroData,sessionid);
      // console.log(response);
      yield put({
        type: 'saveAero',
        payload: response,
      });
    },

    *getFoilData(_, { call, put }) {
      const sessionid = localStorage.getItem('design.client.sessionid');
      const response = yield call(getFoilData,sessionid);
      yield put({
        type: 'saveFoil',
        payload: response,
      });
    },

    *getPathData(_, { call, put }) {
      const sessionid = localStorage.getItem('design.client.sessionid');
      const response = yield call(getPathData,sessionid);
      yield put({
        type: 'savePath',
        payload: response,
      });
    },

    *getPrefData(_, { call, put }) {
      const sessionid = localStorage.getItem('design.client.sessionid');
      const response = yield call(getPrefData,sessionid);
      yield put({
        type: 'savePref',
        payload: response,
      });
    },

    *calculate(payload, { call, put }) {
      const response = yield call(calculate,payload);
      yield put({
        type: 'saveCalculate',
        payload: response,
      });
    },
  },

  reducers: {
    save1d(state, action) {
      // console.log('save1d', state, action.payload);
      const result = {
        ...state,
        module1D: { ...state.module1D, ...action.payload },
      };
      // console.log('save1d', result);
      return result;
    },

    saveCodeList(state, action) {
      return {
        ...state,
        codelists: { ...action.payload },
      };
    },

    saveFile(state, action) {
      return {
        ...state,
        file: { ...action.payload },
      };
    },

    saveAero(state, action) {
      return {
        ...state,
        aero: action.payload,
      };
    },

    saveFoil(state, action) {
      return {
        ...state,
        foil: action.payload,
      };
    },

    savePath(state, action) {
      return {
        ...state,
        path: action.payload,
      };
    },

    savePref(state, action) {
      return {
        ...state,
        pref: action.payload,
      };
    },

    saveCalculate(state, action) {
      return {
        ...state,
        calculate: { ...action.payload },
      };
    },
  },
};
