import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Dummy_Products = [
  {
    id:'p1',
    price: 6,
    title: 'My First book',
    description:'The first book i ever wrote'
  },
  {
    id:'p2',
    price: 5,
    title: 'My second book',
    description:'The second book i ever wrote'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{Dummy_Products.map((item)=>
        <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />)}
      </ul>
    </section>
  );
};

export default Products;
