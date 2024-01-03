import {CargoItem} from "../../models/data.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CargoState {
    all_cargo: CargoItem[];
    cargo: CargoItem | null,
    isLoading: boolean;
    error: string;
    success: string;
    serialNumber: number;
}

const initialState: CargoState = {
    all_cargo: [],
    cargo: null,
    isLoading: false,
    error: '',
    success: '',
    serialNumber: 0
}

export const cargoSlice = createSlice({
    name: 'cargo',
    initialState,
    reducers: {
        increase(state) {
            state.serialNumber += 1
        },
        minus(state) {
            state.serialNumber = state.serialNumber == 0 ? 0 :  state.serialNumber - 1
        },
        reset(state) {
            state.serialNumber += 0
        },
        all_cargoFetching(state) {
            state.isLoading = true
            state.error = ''
            state.success = ''
        },
        all_cargoLoading(state)
        {
            state.isLoading = true
            
        },
        all_cargoLoaded(state)
        {
            state.isLoading = true
            
        },
        all_cargoFetched(state, action: PayloadAction<CargoItem[]>) {
            state.isLoading = false
            state.all_cargo = action.payload
        },
        all_cargoFetchedError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
            state.success = ''
        },
        cargoAddedIntoOrder(state, action: PayloadAction<string[]>) {
            state.isLoading = false
            state.error = action.payload[0]
            state.success = action.payload[1]
        },
        cargoFetching(state) {
            state.isLoading = true
            state.error = ''
            state.success = ''
        },
        cargoFetched(state, action: PayloadAction<CargoItem>) {
            state.isLoading = false
            state.error = ''
            state.cargo = action.payload
        },
        cargoFetchedError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
            state.all_cargo = []
            state.cargo = null
        },
    },
})

export default cargoSlice.reducer;