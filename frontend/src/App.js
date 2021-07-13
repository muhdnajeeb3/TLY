import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userAction";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import SellerRoute from "./components/SellerRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreens from "./screens/HomeScreens";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SellerScreen from "./screens/SellerScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import signinScreen from "./screens/SigninScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";

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
                {userInfo.name} <i className="fa fa-caret-down"></i>{''}
                </Link>
                <ul className="dropdown-content">
                  <li>
                      <Link to='/orderHistory'>Order History</Link> 
                  </li>
                  <li>
                    <Link to='/profile'>User Profile</Link>
                  </li>
                  <li>
                    <Link to='#signout' onClick={signoutHandler}>Signout</Link>
                  </li>   
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
               <div className='dropdown'>
               <Link to='#admin'>Seller {' '} <i className='fa fa-caret-down'></i></Link>
               <ul className='dropdown-content'>
                 
                 <li>
                   <Link to='/productlist/seller'>Products</Link>
                 </li>
                 <li>
                   <Link to='/orderlist/seller'>Orders</Link>
                 </li>
            
               </ul>
             </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className='dropdown'>
                <Link to='#admin'>Admin {' '} <i className='fa fa-caret-down'></i></Link>
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/dashboard'>Dashboard</Link>
                  </li>
                  <li>
                    <Link to='/productlist'>Products</Link>
                  </li>
                  <li>
                    <Link to='/orderlist'>Orders</Link>
                  </li>
                  <li>
                    <Link to='/userlist'>Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route path='/seller/:id' component={SellerScreen} ></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={signinScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path='/orderHistory' component={OrderHistoryScreen}></Route>
          <PrivateRoute path='/profile' component={ProfileScreen}></PrivateRoute>
          <AdminRoute path='/productlist' component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path='/userlist' component={UserListScreen}></AdminRoute>
          <AdminRoute path='/user/:id/edit' component={UserEditScreen}></AdminRoute>

          <AdminRoute path='/orderlist' component={OrderListScreen} exact></AdminRoute>
          <SellerRoute path='/productlist/seller' component={ProductListScreen}></SellerRoute>
          <SellerRoute path='/orderlist/seller' component={OrderListScreen}></SellerRoute>


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
