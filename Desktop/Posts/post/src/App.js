import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'  // npm install bootstrap
// To use fontAwesome, put <script src="https://kit.fontawesome.com/7cf9993275.js" crossorigin="anonymous"></script> in index.html
import Navbar from './Components/Navbar'
import ProductList from './Components/ProductList'
import Details from './Components/Details'
import Default from './Components/Default'
import Cart from './Components/Cart'
import Model from './Components/Model'

class App extends Component {
  
  render() {
    return (
      // react.Fragment works the same way as div, but we don't have to create one more DOM
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path='/' exact component={ProductList}></Route>
          <Route path='/details' exact component={Details}></Route>
          <Route path='/Cart' exact component={Cart}></Route>
          <Route  component={Default}></Route>
        </Switch>
        <Model />
      </React.Fragment>
    )
  }
}

export default App
