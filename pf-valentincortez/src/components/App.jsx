
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar.jsx';
import { ItemListContainer } from './ItemListContainer/ItemListContainer.jsx';
import CartPage from './CartPage/CartPage.jsx'; 
import { CartProvider } from './CartContext/CartContext.jsx';


function App() {
  return (
    <Router>
      <CartProvider>
        <header id="header">
          <div id="marca">
            <a href="">BLM</a>
          </div>
          <NavBar />
        </header>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
