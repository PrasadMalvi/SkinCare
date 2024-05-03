import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import upload_area from '../Components/Assets/cloud-computing.png';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    profileImage: null,
    dob: null,
    mname: '',
    lname: '',
    number: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
    fetchProfileData();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch('http://localhost:4000/orderdetails', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setOrderHistory(data.orders);
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await fetch('http://localhost:4000/profile', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserInfo(data.user);
        setProfileImage(data.user.profileImage);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const imageHandler = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUploadProfilePic = async () => {
    try {
      if (!profileImage) {
        throw new Error('No file selected');
      }
  
      const formData = new FormData();
      formData.append('profilePicture', profileImage);
  
      const response = await fetch('http://localhost:4000/upload/profile-pics', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        setUserInfo({ ...userInfo, profileImage: data.image_url });
      } else {
        throw new Error(data.message || 'Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };
  

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('http://localhost:4000/profile/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (data.success) {
        alert('Profile Saved');
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      try {
        const response = await fetch('http://localhost:4000/profile/delete', {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
          },
        });
        const data = await response.json();
        if (data.success) {
          // Perform logout
          localStorage.removeItem('auth-token');
          // Redirect to the home page
          navigate('/');
        }
      } catch (error) {
        console.error('Error deleting user account:', error);
      }
    }
  };
  

  const handleImageClick = (productId) => {
    setSelectedProductId(productId);
    navigate(`/product/${productId}`);
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
      <div className="profile-pic">
        {editMode ? (
          <>
            <label htmlFor="file-input">
              <img
                src={profileImage instanceof File ? URL.createObjectURL(profileImage) : (userInfo.profileImage ? userInfo.profileImage : upload_area)}
                className="profile-thumbnail-img"
                alt="Profile"
                required
              />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            <button onClick={handleUploadProfilePic} className='profile-btn profile-btn1'>Upload</button>
          </>
        ) : (
          <img
            src={profileImage instanceof File ? URL.createObjectURL(profileImage) : (userInfo.profileImage ? userInfo.profileImage : upload_area)}
            className="profile-thumbnail-img"
            alt="Profile"
          />
        )}
      </div>

        <div className="profile-info">
          <h1>Hello, {userInfo.name}</h1>
          {!editMode && (
            <div>
              <input
                type="text"
                value={userInfo.email || ''}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                placeholder="Email"
                className="input-fields"
                disabled
              />
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                placeholder="First Name"
                className="input-fields"
                disabled
              />
              <input
                type="text"
                value={userInfo.mname}
                onChange={(e) => setUserInfo({ ...userInfo, mname: e.target.value })}
                placeholder="Middle Name"
                className="input-fields"
                disabled
              />
              <input
                type="text"
                value={userInfo.lname}
                onChange={(e) => setUserInfo({ ...userInfo, lname: e.target.value })}
                placeholder="Last Name"
                className="input-fields"
                disabled
              />
              <input
                type="text"
                value={userInfo.number}
                onChange={(e) => setUserInfo({ ...userInfo, number: e.target.value })}
                placeholder="Mobile Number"
                className="input-fields"
                disabled
              />
              <button onClick={() => setEditMode(true)} className='profile-btn'>Edit</button>
            </div>
          )}
          {editMode && (
            <>
              <input
                type="text"
                value={userInfo.email || ''}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                placeholder="Email"
                className="input-fields"
                disabled
              />
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                placeholder="First Name"
                className="input-fields"
                disabled
              />
              <input
                type="text"
                value={userInfo.mname}
                onChange={(e) => setUserInfo({ ...userInfo, mname: e.target.value })}
                placeholder="Middle Name"
                className="input-fields"
                required
              />
              <input
                type="text"
                value={userInfo.lname}
                onChange={(e) => setUserInfo({ ...userInfo, lname: e.target.value })}
                placeholder="Last Name"
                className="input-fields"
                required
              />
              <input
                type="text"
                value={userInfo.number}
                onChange={(e) => setUserInfo({ ...userInfo, number: e.target.value })}
                placeholder="Mobile Number"
                className="input-fields"
                required
              />
              <button onClick={handleSaveProfile} className='profile-btn'>Save</button>
            </>
          )}
          {/* Delete button */}
          <button onClick={handleDeleteAccount} className='profile-btn delete-btn'>Delete Account</button>
        </div>
      </div>
      
            <div className="order-history">
                <h2>Order History</h2>
                <hr />
                <div className="orders">
                    {orderHistory.map(order => (
                        <div key={order.orderId} className="order">
                            <div className="order-details">
                                {order.orderedProducts.map(product => (
                                    <div key={product.productId} className="product">
                                        <hr />
                                        <br />
                                        <div className="order-left">
                                            <div className="order-image">
                                                <img
                                                    onClick={() => handleImageClick(product.productId)}
                                                    src={product.image}
                                                    alt="Product"
                                                />
                                            </div>
                                            <ul>
                                                <li><strong>Product Name:</strong> {product.name}</li>
                                                <li><strong>Quantity:</strong> {product.quantity}</li>
                                                <li><strong>Total Price:</strong> {product.new_price * product.quantity}</li>
                                            </ul>
                                        </div>

                                        <div className='order-right'>
                                            <p hidden><strong>Order ID:</strong> {order.orderId}</p>
                                            <p><strong>Full Name:</strong> {order.fullName}</p>
                                            <p><strong>Address:</strong> {order.addressLine1},<br/> {order.addressLine2},<br/> {order.city},<br/> {order.state},<br/> {order.postalCode},<br/> {order.country}</p>
                                            <p><strong>Payment Method:</strong> {order.paymentMethod} On Delivery</p>
                                            <p><strong>Status:</strong> {order.status}</p> {/* Display order status */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>{/* Render the component for updating order status */}
        </div>
    );
};

export default ProfilePage;
