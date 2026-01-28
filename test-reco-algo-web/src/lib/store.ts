import { configureStore } from "@reduxjs/toolkit";
import { recoApi } from "./features/api/recoApi";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [recoApi.reducerPath]: recoApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(recoApi.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
