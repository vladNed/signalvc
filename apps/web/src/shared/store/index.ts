import { configureStore } from "@reduxjs/toolkit";
import { baseApiInstance } from "@/shared/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApiInstance.reducerPath]: baseApiInstance.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApiInstance.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
