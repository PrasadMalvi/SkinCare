import React, { useState } from 'react';
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

  const imageHandler = (e) => {
    setProfileImage(e.target.files[0]); // Update profileImage state when a new image is selected
  };

  const handleSaveProfile = async () => {
    // Implement save profile logic
  };

  const Save_ProfileImage = async () => {
    try {
      let formData = new FormData();
      formData.append('profilePicture', profileImage); // Append the selected profile image to formData

      const response = await fetch('http://localhost:4000/upload/profile-pic', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUserInfo({ ...userInfo, profileImage: data.image_url }); // Update userInfo state with the image URL
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
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
          <input
            type="text"
            value={userInfo.mname}
            onChange={(e) => setUserInfo({ ...userInfo, mname: e.target.value })}
            placeholder="Middle Name"
            className='input-fields'
          />
          <input
            type="text"
            value={userInfo.lname}
            onChange={(e) => setUserInfo({ ...userInfo, lname: e.target.value })}
            placeholder="Last Name"
            className='input-fields'
          />
          <input
            type="text"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            placeholder="Email"
            className='input-fields'
          />
          <input
            type="text"
            value={userInfo.number}
            onChange={(e) => setUserInfo({ ...userInfo, number: e.target.value })}
            placeholder="Phone Number"
            className='input-fields'
          />
          <DatePicker
            selected={userInfo.dob ? new Date(userInfo.dob) : null}
            onChange={(date) => setUserInfo({ ...userInfo, dob: date })}
            dateFormat="yyyy-MM-dd"
            placeholderText="Date of Birth"
            className='input-fields'
          />
          
          <button onClick={handleSaveProfile} className="profile-btn">Save Profile</button>
        </div>
      </div>
      {/* Order history section */}
      <div className="order-history">
        <h2>Order History</h2>
        <hr />
        {/* Order history content */}
      </div>
    </div>
  );
};

export default ProfilePage;
