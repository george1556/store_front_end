import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import Dashboard from "./components/Dashboard";
import InventoryPage from "./components/InventoryPage";
import TransactionView from "./components/TransactionView";
import Login from "./components/Login";

import { fetchAllTransactions } from "./store/transactions/actions";
import { fetchAllCustomers } from "./store/customers/actions";
import { fetchAllMovies } from "./store/movies/actions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(fetchAllCustomers());
    dispatch(fetchAllMovies());
  });

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/inventory" component={InventoryPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/transactions" component={TransactionView} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
