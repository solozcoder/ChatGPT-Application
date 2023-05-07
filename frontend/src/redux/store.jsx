import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { messageApi } from "./services/messageSlice";

export const store = new configureStore({
  reducer: {
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(messageApi.middleware),
});

setupListeners(store.dispatch);
