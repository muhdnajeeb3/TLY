
import { useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import HomeScreens from './screens/HomeScreens';
import ProductScreen from './screens/ProductScreen';


function App() {
  const cart =useSelector(state => state.cart)
  const {cartItems} = cart;

  return (
    <BrowserRouter>
    <div className="grid-conatiner">
        <header className="row">
             <div>
                <Link className="brand" to="/">amazona</Link>
            </div>
            <div>
                <Link to="/cart">Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
                </Link>
                <Link to="/signin">Sign In</Link>
            </div>
        </header>
        <main>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route> 
          <Route path="/" component={HomeScreens} exact></Route>
            
            
        </main>
        <div className='footer'>
         <center>All rights Reserved</center> 
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
