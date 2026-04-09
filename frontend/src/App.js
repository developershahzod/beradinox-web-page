import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LaunchScreen from './components/LaunchScreen';

function App() {
  const [launched, setLaunched] = useState(false);
  const handleDone = useCallback(() => {
    setLaunched(true);
  }, []);

  return (
    <ThemeProvider>
    <CartProvider>
      <Router>
        {!launched && <LaunchScreen onDone={handleDone} />}
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          <div className="flex-1 lg:ml-64 flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contacts" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
              <Footer />
            </main>
          </div>
        </div>
      </Router>
    </CartProvider>
    </ThemeProvider>
  );
}

export default App;
