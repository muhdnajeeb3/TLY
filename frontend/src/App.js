import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userAction";
import CartScreen from "./screens/CartScreen";
import HomeScreens from "./screens/HomeScreens";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import signinScreen from "./screens/SigninScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch =useDispatch();
  const signoutHandler =() =>{
      dispatch(signout())
  }
  return (
    <BrowserRouter>
      <div className="grid-conatiner">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazona
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-carret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <Link to='#signout' onClick={signoutHandler}>Signout</Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={signinScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
           <Route path="/" component={HomeScreens} exact></Route>
        </main>
        <div className="footer">
          <center>All rights Reserved</center>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
