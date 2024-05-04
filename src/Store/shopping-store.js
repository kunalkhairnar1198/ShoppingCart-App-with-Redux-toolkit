import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './CartSlice/cart-slice';

const store = configureStore({
    reducer:{
        cart:cartReducer
    }
})

export default store;