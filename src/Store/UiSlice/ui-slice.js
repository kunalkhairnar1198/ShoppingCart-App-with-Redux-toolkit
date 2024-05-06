import { createSlice } from "@reduxjs/toolkit";

const initialUiState ={
    isvisible:false
}

const uiSlice = createSlice({
    name:'UI',
    initialState: initialUiState,
    reducers:{
        toggleCartVisible(state, action){
            state.isvisible = !state.isvisible
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;