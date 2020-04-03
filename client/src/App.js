import React, { Fragment } from 'react';
import './App.css';
import Header from './components/common/header';
import Footer from './components/common/footer';
import Routes from './routes';

function App() {
  return (
    <Fragment>
      <Header />
        <main className="container">
          <Routes />
        </main>
      <Footer />
    </Fragment>
  );
}

export default App;
