import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import  { uiActions } from '../../Store/UiSlice/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const totalQuant = useSelector(state => state.cart.totalQuantity)
  console.log(totalQuant)

  const toggleHandler=()=>{
    dispatch(uiActions.toggleCartVisible())
  }

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuant}</span>
    </button>
  );
};

export default CartButton;
