import { createSlice } from "@reduxjs/toolkit";

const initialUiState ={
    isvisible:false,
    notification:null
}

const uiSlice = createSlice({
    name:'UI',
    initialState: initialUiState,
    reducers:{
        toggleCartVisible(state, action){
            state.isvisible = !state.isvisible
        },
        showNotification(state, action){
            state.notification = {status : action.payload.status, title: action.payload.title, message: action.payload.message}
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;