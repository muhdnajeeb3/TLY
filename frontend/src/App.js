

import {BrowserRouter, Route} from 'react-router-dom'
import HomeScreens from './screens/HomeScreens';
import ProductScreen from './screens/ProductScreen';


function App() {
  return (
    <BrowserRouter>
    <div className="grid-conatiner">
        <header className="row">
             <div>
                <a className="brand" href="index.html">amazona</a>
            </div>
            <div>
                <a href="/cart">Cart</a>
                <a href="/signin">Sign In</a>
            </div>
        </header>
        <main>
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
