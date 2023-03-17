import './App.css';
import Header from './component/layout/Header/Header.jsx'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import WebFont from 'webfontloader';
import React, {useEffect} from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';

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
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product/:id' element={<ProductDetails/>}/>
    </Routes>
    
    <Footer/>
  </Router>
}

export default App;
