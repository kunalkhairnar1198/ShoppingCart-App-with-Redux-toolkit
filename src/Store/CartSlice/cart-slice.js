import {createSlice} from '@reduxjs/toolkit'
import { uiActions } from '../UiSlice/ui-slice'

const initialCartState = {
    items:[],
    totalQuantity:0,
}

const cartSlice =createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers:{
        replaceCart(state, action) {
            console.log('REPLACE CART')
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
          },

        addItemToCart(state, action) {
            console.log('EXECUTE')
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
              state.items.push({
                id: newItem.id,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price,
                name: newItem.title,
              });
            } else {
              existingItem.quantity++;
              existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
          },
          
          removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
              state.items = state.items.filter((item) => item.id !== id);
            } else {
              existingItem.quantity--;
              existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
          },
        },
})

//create a action creator for executing the api call they will help to reduce the code reusabilit and update the cart itmems manages cartdata in the application using http request
export const sendCartData =(cart)=>{

  return async(dispatch) =>{
  
    dispatch(uiActions.showNotification({
      status:'pending',
      title:'sending....',
      message:'sending cart data!'
    }));

    const sendRequest =async()=>{
      //this put request handle all request put post delete and update the cart handler render from the cart updates
      const response = await fetch('https://react-http-30a1e-default-rtdb.firebaseio.com/cart.json',{
            method:'PUT',
            body:JSON.stringify(cart),
          });

          if(!response.ok){
            throw new Error('sending cart data failed')
          }
          const responseData = await response.json()
          console.log(responseData)
    }
    try {
      await sendRequest();
        //handling the error ui if the sucessfuly data send then update the error and then get notify on the screen
        dispatch(uiActions.showNotification({
          status:'success',
          title:'Success!',
          message:'sending cart data suceesfuly!'
        }))
    } catch (error) {
      //if the error then update the throgh the dispatch to the reducer redux state and update the notification and reflect changes on the screen
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error!',
        message:'sending cart data failed!'
      }))
    }
  }
}

//Geting cart data inside centralized reflect to the screen percistantly
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-30a1e-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;