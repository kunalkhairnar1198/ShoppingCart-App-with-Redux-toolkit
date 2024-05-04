import { createSlice } from "@reduxjs/toolkit";

const initialCartState ={
    isvisible:true
}

const cartSlice = createSlice({
    name:'cart',
    initialState: initialCartState,
    reducers:{
        toggleCartVisible(state, action){
            state.isvisible = !state.isvisible
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;