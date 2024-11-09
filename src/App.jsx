import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';  
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import ContexProvider from '../Store/shopping-cart-context.jsx';
function App() {
  

  return (
    <ContexProvider>
      <Header 
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
      </Shop>
    </ContexProvider>
  );
}

export default App;
