import { fetchData, fetchCodeList, updateData, getFile, updateFile, calculate } from '../services/designS2';

export default {
  namespace: 'designS2',

  state: {
    moduleS2: {},
    codelists: {},
    file: {},
    calculate:{},
  },

  effects: {
    *fetchData({payload}, {call, put}) {
      const response = yield call(fetchData, payload);
      yield put({
        type: 'saveS2',
        payload: response,
      });
    },

    *fetchCodeList({payload}, {call, put}) {
      const response = yield call(fetchCodeList, payload);
      yield put({
        type: 'saveCodeList',
        payload: response,
      });
    },

    *updateData({payload}, {call, put, select}) {
      const data = yield select(state => state.designS2.moduleS2);
      const response = yield call(updateData, payload, data);
      yield put({
        type: 'saveFile',
        payload: response,
      });
    },
    *getFile({payload}, {call, put}) {
      const response = yield call(getFile, payload);
      yield put({
        type: 'saveFile',
        payload: response,
      });
    },

    *updateFile({payload}, {call, put, select}) {
      const data = yield select(state => state.designS2.file);
      const response = yield call(updateFile, payload, data);
      // console.log(response);
      yield put({
        type: 'saveS2',
        payload: response,
      });
    },
  },

  reducers: {
    saveS2(state, action) {
      const result = {
        ...state,
        moduleS2: { ...state.moduleS2, ...action.payload },
      };
      return result;
    },

    saveS2NrowMap(state, action){
      const moduleS2 = {}
      const moduleS2NrowMap = {...state.moduleS2["ControlVariable.nrowMap"]}
      moduleS2NrowMap[action.key] = {...action.payload}

      moduleS2["ControlVariable.nrowMap"] = {...moduleS2NrowMap};
      const result = {
        ...state,
        moduleS2: { ...state.moduleS2, ...moduleS2 },
      };
      console.log(result,action)
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

    saveCalculate(state, action) {
      return {
        ...state,
        calculate: { ...action.payload },
      };
    },

    clearCalculate(state) {
      return {
        ...state,
        calculate: { data:'' },
      };
    },
  },
};
