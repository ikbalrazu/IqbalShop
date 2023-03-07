import './App.css';
import Header from './component/layout/Header/Header.jsx'
import {BrowserRouter as Router} from "react-router-dom"
import WebFont from 'webfontloader';
import React, {useEffect} from 'react';
import Footer from './component/layout/Footer/Footer';

function App() {
  useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  },[]);
  return <Router>
    <Header/>
    <Footer/>
  </Router>
}

export default App;
