import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

const HOST = createSlice({
  name: "HOST",
  initialState: "http://localhost:9000",
  // initialState: "http://3.38.232.237:9000",
});

const isLogin = createSlice({
  name: "isLogin",
  initialState: false,
  reducers: {
    update(state) {
      return !state;
    },
  },
});

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    name: "",
    email: "",
    phoneNum: "",
    bank: "",
    account: "",
  },
  reducers: {
    updateUserName(state, value) {
      state.name = value.payload;
    },
    updateUserEmail(state, value) {
      state.email = value.payload;
    },
    updateUserPhoneNum(state, value) {
      state.phoneNum = value.payload;
    },
    updateUserBank(state, value) {
      state.bank = value.payload;
    },
    updateUserAccount(state, value) {
      state.account = value.payload;
    },
    removeUserInfo() {
      return {
        name: "",
        email: "",
        phoneNum: "",
        bank: "",
        account: "",
      };
    },
  },
});

const incInfo = createSlice({
  name: "userInfo",
  initialState: {
    corporateName: "",
    ceo: "",
    businessLoc: "",
    registerNum: "",
  },
  reducers: {
    updateCorporateName(state, value) {
      state.corporateName = value.payload;
    },
    updateCeo(state, value) {
      state.ceo = value.payload;
    },
    updateBusinessLoc(state, value) {
      state.businessLoc = value.payload;
    },
    updateRegisterNum(state, value) {
      state.registerNum = value.payload;
    },
  },
});


// eslint-disable-next-line no-unused-vars
// let password = createSlice({
//   name: 'password',
//   initialState: '',
//   reducers: {
//     updatePassword(state, value) {
//       return value.payload
//     }
//   }
// })

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["token"],
};

const rootReducer = combineReducers({
  login: isLogin.reducer,
  info: userInfo.reducer,
  incInfo: incInfo.reducer,
  HOST: HOST.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // eslint-disable-next-line no-dupe-keys
      serializableCheck: false,
    }).concat(logger),
  // }),
});

export default store;

export const { update } = isLogin.actions;
export const { updateUserName, updateUserEmail, updateUserPhoneNum, updateUserBank, updateUserAccount } = userInfo.actions;
export const { updateCorporateName, updateCeo, updateBusinessLoc, updateRegisterNum } = incInfo.actions;
// export let { updatePassword } = password.actions;
