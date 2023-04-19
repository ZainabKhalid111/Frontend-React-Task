import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import NavbarComponent from './Components/NavbarComponent';
import { CartProvider } from './contexts/cartContex';

const AsyncHome = lazy(() => import("./Pages/HomePage/HomePage"));
const AsyncItems = lazy(() => import("./Pages/Items"));
const AsyncCheckout = lazy(() => import("./Pages/Checkout"));
const AsyncAddItems = lazy(() => import("./Pages/AddItems"));

function App() {
  return (
    <CartProvider>
      {/* this is the provider which is used to provide the cartItems
     and functions to add and remove items from cart to all the components */}
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <NavbarComponent />
          <Routes>
            <Route index element={<AsyncHome />} />
            <Route path='/add-item' element={<AsyncAddItems />} />
            <Route path='/items' element={<AsyncItems />} />
            <Route path='/checkout' element={<AsyncCheckout />} />
          </Routes>
        </Router>
      </Suspense>
    </CartProvider>
  );
}

export default App;





