import {IDeleteCargofromOrder, IRequest, IOrder} from "../../models/data.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface orderState {
    orders: IRequest | null;
    id_order_draft: number | null;
    order_draft_data: IOrder | null;
    isLoading: boolean;
    error: string;
    success: string;
}

const initialState: orderState = {
    orders: null,
    id_order_draft: null,
    order_draft_data: null,
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
            state.orders = action.payload
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
        ordersLoaded(state){
            state.isLoading = false
        },
        ordersDeleteError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        ordersFetchedError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },

        OrderDraftIdFetched(state, action: PayloadAction<number | null>){
            state.id_order_draft = action.payload
        },
        DataOrderDraftFetched(state, action:PayloadAction<IOrder | null>)
        {
            state.order_draft_data = action.payload
        }
        
    
    },
})

export default orderSlice.reducer;