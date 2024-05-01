import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import upload_area from '../Components/Assets/cloud-computing.png';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    profileImage: null,
    dob: null,
    mname: '',
    lname: '',
    number: '',
  });

  const [profileImage, setProfileImage] = useState(null); // Initialize profileImage state with null
  const [orderHistory, setOrderHistory] = useState([]); // Initialize orderHistory state with an empty array

  useEffect(() => {
    // Fetch order history data when the component mounts
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch('http://localhost:4000/orderhistory', {
        method: 'GET',
        headers: {
          Accept: 'application/form-data',
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('auth-token')}`, // Include user token for authentication
        },
      });

      const data = await response.json();
      if (data.success) {
        setOrderHistory(data.orders); // Update orderHistory state with fetched order data
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const imageHandler = (e) => {
    setProfileImage(e.target.files[0]); // Update profileImage state when a new image is selected
  };

  const handleSaveProfile = async () => {
    // Implement save profile logic
  };

  const Save_ProfileImage = async () => {
    // Implement logic to save profile image
  };

  return (
    <div className="profile-container">
      {/* Profile details form */}
      <div className="profile-details">
        <div className="profile-pic">
          <label htmlFor="file-input">
            <img src={profileImage ? URL.createObjectURL(profileImage) : upload_area} className="profile-thumbnail-img" alt="" />
          </label>
          <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
        </div>
        <div className="profile-info">
          {/* Profile details form */}
          <h1>Hello.. {userInfo.name}</h1>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            placeholder="First Name"
            className='input-fields'
          />
          {/* Add input fields for other user information */}
          <button onClick={handleSaveProfile} className="profile-btn">Save Profile</button>
        </div>
      </div>
      {/* Map through orderHistory array and display order details */}
      {fetchOrderHistory}


    </div>
  );
};

export default ProfilePage;
