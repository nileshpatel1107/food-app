import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './middleware/ProtectedRoute';
import AddRestaurantForm from './pages/restorent/AddRestaurantForm';
import RestaurantDetails from './components/restorent/RestaurantDetails';
import AddMenu from './components/resrorentmenu/Addrestorentmenu';

import GridExample from './components/restorent/RestorentList';
import AgGridTable from './utils/AgGridTable';
import RestaurantList from './components/restorent/RestorentList';
import EditRestaurant from './components/restorent/EditRestaurant';
import RestaurantLayout from './components/restorent/RestorentLayout';

function App() {
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);
  const defaultColumnDefs = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ];

  return (
    <div className="App">

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/layout" element={<RestaurantLayout />} />
          <Route path="/restorantlist" element={<RestaurantList />} />

          {/* Protected Routes */}
          {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}

          {/* Restaurant Parent Route */}
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurant/EditRestaurant/" element={<EditRestaurant />} />
          {/* <Route path="/restaurant/Details/:id" element={<RestaurantDetails restaurants={restaurantData} />} /> */}


          <Route path="/add" element={<AddRestaurantForm />} /> {/* /restaurant/add */}
          <Route path="/details/:id" element={<RestaurantDetails />} /> {/* /restaurant/details/:id */}
          <Route path='/addmenu' element={<AddMenu />} /> {/* /restaurant/addmenu */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
