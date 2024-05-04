import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import  {  cartActions } from '../../Store/CartSlice/cart-slice';

const CartButton = (props) => {
  const dispatch = useDispatch()

  const toggleHandler=()=>{
    dispatch(cartActions.toggleCartVisible())
  }

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
