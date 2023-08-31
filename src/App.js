
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/login.js';
import NavbarCaissier from './components/caissier/navbarCaissier';
import ProductList from './components/caissier/productList';
import BillPrint from './components/caissier/billPrint';
import NavbarGestionnaire from './components/gestionnaire/navbargetionnaire';
import Users from './components/gestionnaire/Users';
import UsersList from './components/gestionnaire/usersList';
import Products from './components/gestionnaire/products';
import ProductsList from './components/gestionnaire/productsList';
import Factures from './components/gestionnaire/factures';
import Commandes from './components/gestionnaire/commandes';
import CommandesList from './components/gestionnaire/commandesList';
import Ventes from './components/gestionnaire/ventes';
import Category from './components/gestionnaire/category/Category';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/caissier/productList">
            <NavbarCaissier/>
            <ProductList/>
          </Route>
          <Route exact path="/caissier/billprint">
            <NavbarCaissier/>
            <BillPrint/>
          </Route>
          <Route exact path="/gestionnaire/Users">
            <NavbarGestionnaire/>
            <UsersList/>
          </Route>
          <Route exact path="/gestionnaire/commandes">
            <NavbarGestionnaire/>
            <CommandesList/>
          </Route>
          <Route exact path="/gestionnaire/category">
            <NavbarGestionnaire/>
            <Category/>
          </Route>
          <Route exact path="/gestionnaire/products">
            <NavbarGestionnaire/>
            <ProductsList/>
          </Route>
          <Route exact path="/gestionnaire/factures">
            <NavbarGestionnaire/>
            <Factures/>
          </Route>
          <Route exact path="/gestionnaire/ventes">
            <NavbarGestionnaire/>
            <Ventes/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
