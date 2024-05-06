import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { uiActions } from './Store/UiSlice/ui-slice';
import { fetchCartData, sendCartData } from './Store/CartSlice/cart-slice';

let isInitial = true;

function App() {
    //update the state by dispach action to sent to the redux reducer
    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.ui.isvisible)
    const cart = useSelector(state => state.cart)

    //if update the state on redux reducer then notifiy update and retriwe data on the anywere of the components using useselector
    const notification = useSelector(state => state.ui.notification)
    console.log(cart)

    //Geting all data inside the application percistantly
    useEffect(()=>{
      dispatch(fetchCartData())
    },[dispatch])

    //when trigger addtocart handler or other increase , decrease Qunatity handler triggers then update the state from the reducer then if the cart have item then useEffect 
    // hook will execute and sent http request and put the cart data on http cart api from the frontend to backennd if the cart dependancy update then http put request will send on the firebase backend api call
    useEffect(()=>{
     if(isInitial){
      isInitial = false;
      return
     }

     dispatch(sendCartData(cart))
    },[cart,dispatch])

  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
     {isVisible && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
