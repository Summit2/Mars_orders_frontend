import {IDeleteCargofromOrder, IRequest} from "../../models/data.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface orderState {
    order: IRequest | null;
    isLoading: boolean;
    error: string;
    success: string;
}

const initialState: orderState = {
    order: null,
    isLoading: false,
    error: '',
    success: ''
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        ordersFetching(state) {
            state.isLoading = true
        },
        ordersFetched(state, action: PayloadAction<IRequest>) {
            state.isLoading = false
            state.error = ''
            state.order = action.payload
        },
        ordersDeleteSuccess(state, action: PayloadAction<IDeleteCargofromOrder>) {
            state.isLoading = false
            const text = action.payload.description ?? ""
            state.error = text
            state.success = "Груз успешно удалён из заявки"
        },
        ordersUpdated(state, action: PayloadAction<string[]>) {
            state.isLoading = false
            state.error = action.payload[0]
            state.success = action.payload[1]
        },
        ordersDeleteError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        ordersFetchedError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export default orderSlice.reducer;