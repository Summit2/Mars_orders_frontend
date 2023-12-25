import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cargoReducer from "./reducers/CargoSlice.tsx"
import orderReducer from "./reducers/OrderSlice.tsx"
import userReducer from "./reducers/UserSlice.tsx"

const rootReducer = combineReducers({
    cargoReducer,
    orderReducer,
    userReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']