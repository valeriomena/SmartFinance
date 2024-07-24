import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import BusinessList from './components/Business/BusinessList';
import BusinessDetail from './components/Business/BusinessDetail';
import BusinessForm from './components/Business/BusinessForm';
// Importar otros componentes según sea necesario

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/business" component={BusinessList} />
          <PrivateRoute path="/business/new" component={BusinessForm} />
          <PrivateRoute path="/business/:id" component={BusinessDetail} />
          {/* Añadir rutas para otros componentes */}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;