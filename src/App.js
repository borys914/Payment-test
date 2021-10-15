import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Layout from './components/Layout';
import ExploreNFTs from './pages/ExploreNFTsPage';
import MyAssetsPage from './pages/MyAssetsPage';
import TransactionsPage from './pages/TransactionsPage';
import AccountSettingPage from './pages/AccountSettingPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import { PageTitle, LoginUser } from './global/AppContext';
import './global/index.scss';

function App() {
  const [pageTitle, setPageTitle] = useState('');
  const [loginUser, setLoginUser] = useState(null);

  return (
    <LoginUser.Provider value={[loginUser, setLoginUser]}>
      <PageTitle.Provider value={[pageTitle, setPageTitle]}>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/login' render={() => <Login />} />
            <Route exact path='/register' render={() => <Register />} />
            <Route exact path='/explore-NFTs' render={() => <Layout children={<ExploreNFTs />} title="Explore NFT's" />} />
            <Route exact path='/my-assets' render={() => <Layout children={<MyAssetsPage />} title='My Assets' />} />
            <Route exact path='/transaction' render={() => <Layout children={<TransactionsPage />} title='Transactions' />} />
            <Route exact path='/settings-account' render={() => <Layout children={<AccountSettingPage />} title='Settings ( account )' />} />
            <Route exact path='/payment-method' render={() => <Layout children={<PaymentMethodPage />} title='Settings ( payment method )' />} />
            <Redirect to='/' />
          </Switch>
          <Footer />
        </Router>
      </PageTitle.Provider>
    </LoginUser.Provider>

  );
}

export default App;
