import React, { useState } from 'react';
import './index.css'; // Import your CSS file here
const Checkoutpage = () => {
    const [selectedAddress, setSelectedAddress] = useState('home');
  
    return (
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-white py-3 px-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-swiggy-orange p-2 rounded-md mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L4 9V21H20V9L12 3Z" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <span className="font-bold text-gray-800">SECURE CHECKOUT</span>
          </div>
          <div className="flex items-center">
            <button className="flex items-center mr-6 text-gray-700">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 110-18 9 9 0 010 18z"></path>
              </svg>
              <span>Help</span>
            </button>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Nikunj</span>
            </div>
          </div>
        </header>
  
        <div className="container mx-auto py-6 px-4 md:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Section */}
            <div className="flex-1">
              {/* Unavailable Items Section */}
              <div className="swiggy-card bg-white mb-6 p-6">
                <div className="flex items-start">
                  <div className="bg-gray-200 p-2 rounded-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-bold">1 item unavailable</h2>
                    <p className="text-gray-600 mt-1">Sorry! few items are now out of stock.</p>
                    
                    <button className="swiggy-btn-primary mt-4">
                      REMOVE UNAVAILABLE ITEMS
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Address Selection Section */}
              <div className="swiggy-card bg-white mb-6 p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-black p-2 rounded-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-bold">Select delivery address</h2>
                    <p className="text-gray-600 mt-1">You have a saved address in this location</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Home Address */}
                  <div 
                    className={`address-card ${selectedAddress === 'home' ? 'selected' : ''}`} 
                    onClick={() => setSelectedAddress('home')}
                  >
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                      <span className="font-semibold">Home</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Sp Hostel Gulbai Tekra, Kakliben Vyas Marg, Gulbai Tekra, Ahmedabad, Gujarat 380009, India
                    </p>
                    <div className="mt-3 text-sm text-gray-500">
                      14 MINS
                    </div>
                    <button className="bg-swiggy-green text-white px-4 py-2 text-sm font-medium rounded mt-3">
                      DELIVER HERE
                    </button>
                  </div>
                  
                  {/* Add New Address */}
                  <div className="address-card hover:border-swiggy-green cursor-pointer">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 mr-2 text-swiggy-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      <span className="font-semibold">Add New Address</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Kakliben Vyas Marg, Gulbai Tekra, Ahmedabad, Gujarat 380009, India
                    </p>
                    <button className="swiggy-btn-secondary mt-3">
                      ADD NEW
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Payment Section Placeholder */}
              <div className="swiggy-card bg-white p-6">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-bold">Payment</h2>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Section - Order Summary */}
            <div className="md:w-96">
              <div className="swiggy-card bg-white p-6">
                <div className="restaurant-card">
                  <img src="/api/placeholder/48/48" alt="Restaurant" className="restaurant-logo" />
                  <div>
                    <h3 className="restaurant-name">Theobroma</h3>
                    <p className="restaurant-area">CG Road</p>
                  </div>
                </div>
                
                {/* Unavailable item */}
                <div className="item-unavailable mb-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-800 p-1 rounded-full text-xs mr-2 mt-1">
                      V
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Choice of Croissant/Danish + Beverage</p>
                        </div>
                        <div className="flex items-center">
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-2">Unavailable</span>
                          <button>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Special Instructions */}
                <div className="mb-6">
                  <div className="flex items-center text-gray-700 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    <span className="text-sm">Any suggestions? We will pass it on...</span>
                  </div>
                </div>
                
                {/* No-contact Delivery Option */}
                <div className="border border-gray-200 rounded-md p-4 mb-6">
                  <label className="flex items-start cursor-pointer">
                    <input type="checkbox" className="custom-checkbox" />
                    <div className="ml-2">
                      <p className="font-medium">Opt in for No-contact Delivery</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD).
                      </p>
                    </div>
                  </label>
                </div>
                
                {/* Apply Coupon */}
                <div className="border border-gray-200 rounded-md p-4 mb-6">
                  <button className="flex items-center w-full text-left">
                    <svg className="w-5 h-5 mr-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <span className="font-medium">Apply Coupon</span>
                  </button>
                </div>
                
                {/* Bill Details */}
                <div>
                  <h3 className="font-bold mb-4">Bill Details</h3>
                  <div className="space-y-2">
                    <div className="bill-item">
                      <span className="text-gray-700">Item Total</span>
                      <span>₹460</span>
                    </div>
                    <div className="bill-item">
                      <div className="flex items-center">
                        <span className="text-gray-700">Delivery Fee | 1.0 kms</span>
                        <div className="info-icon" data-tooltip="Distance based fee">
                          <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                      <span>₹42</span>
                    </div>
                    <div className="bill-item">
                      <span className="text-gray-700">Delivery Tip</span>
                      <span className="text-swiggy-orange">Add tip</span>
                    </div>
                    <div className="bill-item">
                      <div className="flex items-center">
                        <span className="text-gray-700">Platform fee</span>
                        <div className="info-icon" data-tooltip="Helps us operate and improve our platform">
                          <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 line-through mr-2">₹30.00</span>
                        <span>₹9</span>
                      </div>
                    </div>
                    <div className="bill-item">
                      <div className="flex items-center">
                        <span className="text-gray-700">GST and Restaurant Charges</span>
                        <div className="info-icon" data-tooltip="GST and restaurant packing charges">
                          <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                      <span>₹104.42</span>
                    </div>
                  </div>
                  
                  <div className="bill-total">
                    <div className="flex justify-between font-bold">
                      <span>TO PAY</span>
                      <span>₹615</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Unavailable Items Alert */}
              <div className="bottom-notification">
                <div className="flex items-center">
                  <div className="bg-red-500 p-1 rounded-full mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <span>Item(s) unavailable</span>
                  <button className="ml-2 text-gray-300 underline">
                    Try alternatives or remove unavailable item(s) to place an order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Checkoutpage;