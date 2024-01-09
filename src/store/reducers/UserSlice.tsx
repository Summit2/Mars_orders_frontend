import {IAuthResponse} from "../../models/data.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user: IAuthResponse | null
    isLoading: boolean 
    error: string
    success: string
    isAuth: boolean
    is_moderator: boolean | undefined | null
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    isAuth: false,
    error: '',
    success: '',
    is_moderator: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startProcess(state) {
            state.isLoading = true

        },
        setUserInfo(state, action: PayloadAction<IAuthResponse>){
            state.user = action.payload
        },
        setAuthStatus(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setStatuses(state, action: PayloadAction<string[]>) {
            state.isLoading = false
            state.error = action.payload[0]
            state.success = action.payload[1]
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
            state.success = ''
        },
        setIsModer(state, action: PayloadAction<boolean>) {
            state.is_moderator = action.payload;
        },
        resetStatuses(state) {
            state.isLoading = false
            state.error = ''
            state.success = ''
        },
    },
})

export default userSlice.reducer;