import {configureStore} from '@reduxjs/toolkit';
import uiReducer from './UiSlice/ui-slice';
import cartSliceReducer from './CartSlice/cart-slice';

const store = configureStore({
    reducer:{
        ui:uiReducer,
        cart:cartSliceReducer,
    }
})

export default store;