import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';

function App() {
    const isVisible = useSelector(state => state.ui.isvisible)
    const cart = useSelector(state => state.cart)
  console.log(cart)
    useEffect(()=>{
        fetch('https://react-http-30a1e-default-rtdb.firebaseio.com/cart.json',{
          method:'PUT',
          body:JSON.stringify(cart),
        });
    },[cart])

  return (
    <Layout>
     {isVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
