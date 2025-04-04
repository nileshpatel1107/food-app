import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios'; // For making API requests
import './index.css'; // Import the CSS file

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [isDeliveryConfirmed, setIsDeliveryConfirmed] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
  });

  const[userAddress, setUserAddress] = useState([]);


  //Fetch all address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get('http://localhost:5001/useraddress');
        setUserAddress(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };
    fetchAddress();
  }, [userAddress]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenAddressModal = () => setOpenAddressModal(true);
  const handleCloseAddressModal = () => setOpenAddressModal(false);
  const handleDeliveryConfirm = () => setIsDeliveryConfirmed(true);
  const handleChangeAddress = () => setIsDeliveryConfirmed(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async () => {
    try {
      // Replace 'userId' with the actual user ID (e.g., from authentication context or local storage)
      const userId = 'your-user-id-here'; // Replace this with the actual user ID
      const addressData = { ...newAddress, userId };

      // Send the new address to the backend API
      const response = await axios.post('http://localhost:5000/api/addresses', addressData);
      console.log('Address saved:', response.data);

      // Close the modal and confirm delivery
      handleCloseAddressModal();
      setIsDeliveryConfirmed(true);
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        {/* Left Section: Delivery Address with Timeline */}
        <div className="address-section">
          <div className="timeline">
            {/* Delivery Address Step */}
            <div className={`timeline-item ${isDeliveryConfirmed ? 'delivery-confirmed' : ''}`}>
              <div className="timeline-icon">
                <LocationOnIcon className={isDeliveryConfirmed ? 'icon-active' : 'icon-inactive'} />
              </div>
              <div className="timeline-content">
                <h2 className="section-title">Delivery address</h2>
                {isDeliveryConfirmed && <span className="check-icon">✔</span>}
                {!isDeliveryConfirmed && (
                  <>
                    <p className="section-subtitle">You have a saved address in this location</p>
                    {/* Address Card */}
                    <div className="address-card">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress}
                        onChange={() => setSelectedAddress(true)}
                        className="address-radio"
                      />
                      <div className="address-details">
                        <h3 className="address-title">Home</h3>
                        <p className="address-text">
                          SP Hostel Gulbai Tekra, Kolikaben Vyas Marg, Gulbai Tekra, Ahmedabad, 380009, India
                        </p>
                        <p className="address-time">22 MINS</p>
                        <button className="deliver-btn" onClick={handleDeliveryConfirm}>
                          DELIVER HERE
                        </button>
                      </div>
                    </div>
                    {/* Add New Address */}
                    <div className="add-new-address">
                      <button className="add-new-btn" onClick={handleOpenAddressModal}>
                        ADD NEW
                      </button>
                      <p className="add-new-text">
                        Kolikaben Vyas Marg, Gulbai Tekra, Ahmedabad 380009, India
                      </p>
                    </div>
                  </>
                )}
                {isDeliveryConfirmed && (
                  <div className="address-details">
                    <h3 className="address-title">Home</h3>
                    <p className="address-text">
                      SP Hostel Gulbai Tekra, Kolikaben Vyas Marg, Gulbai Tekra, Ahmedabad, 380009, India
                    </p>
                    <p className="address-time">22 MINS</p>
                    <button className="change-btn" onClick={handleChangeAddress}>
                      CHANGE
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method Step */}
            <div className="timeline-item">
              <div className="timeline-icon">
                <PaymentIcon className={isDeliveryConfirmed ? 'icon-active' : 'icon-inactive'} />
              </div>
              <div className="timeline-content">
                <h2 className="section-title">Choose payment method</h2>
                {isDeliveryConfirmed && (
                  <button className="proceed-btn">PROCEED TO PAY</button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="order-section">
          <div className="restaurant-header">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/McDonald%27s_logo.svg"
              alt="McDonald's Logo"
              className="restaurant-logo"
            />
            <h2 className="restaurant-name">McDonald's - Herminagar</h2>
          </div>

          {/* Order Items */}
          <div className="order-items">
            <div className="order-item">
              <div className="item-details">
                <span className="item-dot">●</span>
                <p>2 Crispy Veggie Burger</p>
              </div>
              <div className="item-quantity">
                <button className="quantity-btn">-</button>
                <span>4</span>
                <button className="quantity-btn">+</button>
                <p>₹786.94</p>
              </div>
            </div>
            <div className="order-item">
              <div className="item-details">
                <span className="item-dot">●</span>
                <p>2 Crispy Veggie Burger + McVeggie Burger + Fries (M)</p>
              </div>
              <div className="item-quantity">
                <button className="quantity-btn">-</button>
                <span>1</span>
                <button className="quantity-btn">+</button>
                <p>₹417.82</p>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <p className="suggestions-text">Any suggestions? We will pass it on...</p>

          {/* Delivery Instructions */}
          <div className="delivery-instructions">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>
                Opt in for No-contact Delivery. Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)
              </span>
            </label>
          </div>

          {/* Coupon */}
          <div className="coupon-section">
            <button className="coupon-btn" onClick={handleOpenModal}>
              Apply Coupon
            </button>
          </div>

          {/* Billing Details */}
          <div className="billing-details">
            <h3 className="section-title">Bill Details</h3>
            <div className="billing-item">
              <p>Item Total</p>
              <p>₹1224.76</p>
            </div>
            <div className="billing-item">
              <p>Delivery Fee | 3.7 kms</p>
              <p>₹50</p>
            </div>
            <div className="billing-item discount">
              <p>Extra discount for you</p>
              <p>-₹20</p>
            </div>
            <div className="billing-item">
              <p>Delivery Tip</p>
              <p className="tip-text">Add tip</p>
            </div>
            <div className="billing-item">
              <p>Platform fee</p>
              <p>₹9</p>
            </div>
            <div className="billing-item">
              <p>GST and Restaurant Charges</p>
              <p>₹102.86</p>
            </div>
          </div>

          {/* Total */}
          <div className="total-section">
            <p>TO PAY</p>
            <p>₹1367</p>
          </div>

          {/* Savings */}
          <div className="savings-section">
            Savings of ₹20
          </div>
        </div>

        {/* Coupon Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="coupon-modal-title"
          aria-describedby="coupon-modal-description"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Box className="coupon-modal">
            <div className="modal-header">
              <IconButton onClick={handleCloseModal} className="close-btn">
                <CloseIcon />
              </IconButton>
            </div>
            <div className="modal-content">
              <div className="coupon-input">
                <TextField
                  label="Enter coupon code"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className="coupon-input-field"
                />
                <Button variant="contained" className="apply-btn">
                  APPLY
                </Button>
              </div>
              <h3 className="modal-title">AVAILABLE COUPONS</h3>
              <div className="coupon-list">
                <div className="coupon-item">
                  <div className="coupon-icon">🎟️</div>
                  <div className="coupon-details">
                    <h4>FLAT100</h4>
                    <p>Get Flat Rs. 100 off</p>
                    <p>Use code FLAT100 & get flat ₹100 off orders above ₹499</p>
                    <button className="apply-coupon-btn">APPLY COUPON</button>
                  </div>
                </div>
                <div className="coupon-item">
                  <div className="coupon-icon">🎟️</div>
                  <div className="coupon-details">
                    <h4>TRYNEW</h4>
                    <p>Get 30% off</p>
                    <p>Use code TRYNEW & get 30% on orders above ₹179. Maximum discount ₹70.</p>
                    <button className="apply-coupon-btn">APPLY COUPON</button>
                  </div>
                </div>
                <div className="coupon-item">
                  <div className="coupon-icon">🎟️</div>
                  <div className="coupon-details">
                    <h4>SWIGGYPZ5</h4>
                    <p>Get flat 25% discount using Swiggy UPI</p>
                    <p>Flat 25% discount on orders above ₹299</p>
                    <button className="apply-coupon-btn">APPLY COUPON</button>
                  </div>
                </div>
              </div>
              <button className="more-btn">+ MORE</button>
            </div>
          </Box>
        </Modal>

        {/* Add New Address Modal */}
        <Modal
          open={openAddressModal}
          onClose={handleCloseAddressModal}
          aria-labelledby="address-modal-title"
          aria-describedby="address-modal-description"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Box className="address-modal">
            <div className="modal-header">
              <IconButton onClick={handleCloseAddressModal} className="close-btn">
                <CloseIcon />
              </IconButton>
            </div>
            <div className="modal-content">
              <h3 className="modal-title">ADD NEW ADDRESS</h3>
              <form className="address-form">
                <TextField
                  label="Address"
                  name="address"
                  value={newAddress.address}
                  onChange={handleAddressChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="normal"
                  multiline
                  rows={3}
                  required
                />
                <TextField
                  label="City"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="normal"
                  required
                />
                <TextField
                  label="State"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="normal"
                  required
                />
                <TextField
                  label="Country"
                  name="country"
                  value={newAddress.country}
                  onChange={handleAddressChange}
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="normal"
                  required
                />
                <Button
                  variant="contained"
                  className="save-address-btn"
                  onClick={handleSaveAddress}
                >
                  SAVE ADDRESS
                </Button>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CheckoutPage;