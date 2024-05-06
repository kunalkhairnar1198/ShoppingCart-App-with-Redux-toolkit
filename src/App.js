import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { uiActions } from './Store/UiSlice/ui-slice';

let isInitial = true;

function App() {
    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.ui.isvisible)
    const cart = useSelector(state => state.cart)
    const notification = useSelector(state => state.ui.notification)
    console.log(cart)


    useEffect(()=>{
      const sentCartData =async()=>{
        dispatch(uiActions.showNotification({
          status:'pending',
          title:'sending....',
          message:'sending cart data!'
        }))
        const response = await fetch('https://react-http-30a1e-default-rtdb.firebaseio.com/cart.json',{
            method:'PUT',
            body:JSON.stringify(cart),
          });

          if(!response.ok){
            throw new Error('sending cart data failed')
            
          }

          const responseData = await response.json()
          dispatch(uiActions.showNotification({
            status:'success',
            title:'Success!',
            message:'sending cart data suceesfuly!'
          }))
      }
      if(isInitial){
        isInitial = false;
        return;
      }
      sentCartData().catch(error =>
        dispatch(uiActions.showNotification({
          status:'error',
          title:'Error!',
          message:'sending cart data failed!'
        }))
       )
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
