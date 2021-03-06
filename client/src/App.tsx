
import './App.css';
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from './pages/Homepage';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Products from './pages/products/Products';
import Navbar from './components/Navbar'
import ProductDetails from './pages/products/ProductDetails';
import BasketPage from './pages/basket/BasketPage';
import LoadingComponent from './components/LoadingComponent';
import CheckoutPage from './pages/checkout/CheckoutPage';
import CustomOrder from './pages/custom/CustomOrder';
import { store, useAppDispatch } from './features/store/configureStore';
import { fetchBasketAsync, setBasket } from './pages/basket/basketSlice';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import { fetchCurrentUser } from './pages/account/accountSlice';
import PrivateRoute from './components/PrivateRoute';
import Orders from './pages/orders/Orders';
import CheckoutWrapper from './pages/checkout/CheckoutWrapper';
import Profile from './pages/profile/Profilepage';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

    if(loading) return <LoadingComponent message="Loading.."></LoadingComponent>

  return (
    <div className="App">
      <Navbar/>
       <Switch>
        <Route exact path='/' component={Homepage}></Route>
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/contact' component={Contact}></Route>
        <Route exact path='/products' component={Products}></Route>
        <Route exact path='/products/:id' component={ProductDetails}></Route>
        <Route exact path='/basket' component={BasketPage}></Route>
        <Route exact path='/checkout' component={CheckoutWrapper}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <PrivateRoute path='/orders' component={Orders} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/checkout' component={CheckoutPage} />
        {/*
 // @ts-ignore */}
        <Route  exact path='/custom' component={CustomOrder}></Route>
        </Switch>
        
    </div>
  );
}

export default App;
