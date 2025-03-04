import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import chatSlice from "./slice/chat-slice";
import userDataSlice from "./slice/user-slice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userList: userDataSlice,
  chatList: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
