import { fetchData, fetchCodeList, updateData, getFile, updateFile, get1dOutput, calculate } from '../services/design';

export default {
  namespace: 'design',

  state: {
    module1D: {},
    codelists: {},
    file: '',
    d1_output: [],
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

    *updateData(_, { call, put, select }) {
      const data = yield select(state => state.design.module1D);
      const response = yield call(updateData, data);
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

    *updateFile({ payload }, { call, put }) {
      const response = yield call(updateFile, payload);
      // console.log(response);
      yield put({
        type: 'save1d',
        payload: response,
      });
    },

    *get1dOutput(_, { call, put }) {
      const response = yield call(get1dOutput);
      // console.log(response);
      yield put({
        type: 'saveD1Output',
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

    saveD1Output(state, action) {
      return {
        ...state,
        d1_output: action.payload,
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
