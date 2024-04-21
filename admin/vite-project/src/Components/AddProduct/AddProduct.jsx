import React, { useEffect, useState } from 'react';
import './AddProduct.css';
import upload_area from '../../Assets/cloud-computing.png';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Face",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers:{
          Accept: 'application/json'
      },
      body:formData,
    }).then((resp)=> resp.json()).then((data)=>{responseData=data});
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);

      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed");
      })
    }
  };

  useEffect(() => {
    document.getElementById('file-input').addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const fileType = file.type.split('/')[0];
        if (fileType !== 'image') {
          alert('Please select an image file.');
          this.value = ''; // Clear the file input
        }
      }
    });
  }, []);

  return (
    <div className='add-product'>
      <div className="addproduct-item">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changHandler} type="text" name='name' placeholder='Type Here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changHandler} type="text" name="old_price" placeholder='Type Here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changHandler} type="text" name="new_price" placeholder='Type Here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changHandler} name="category" className='add-product-selector' id="">
          <option value='eye'>Eye</option>
          <option value='lips'>Lips</option>
          <option value='face'>Face</option>
          <option value='bestseller'>Best-Seller</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" accept="image/*" name="image" id="file-input" hidden />
      </div>
      <button onClick={Add_Product} className='addproduct-btn'>Add Product</button>
    </div>
  );
}

export default AddProduct;
