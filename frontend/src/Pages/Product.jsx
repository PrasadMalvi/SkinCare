import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context'
import { useParams } from 'react-router-dom';
import BreadCrum from '../Components/BreadChrums/BreadCrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import './Product.css'
import Description from '../Components/Description/Description';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';

const Product = () => {
  const { allProducts } = useContext(Context);
  const { productId } = useParams();

  const [product, setProduct] = useState(null); // Use state for product and loading
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const foundProduct = allProducts.find((e) => e.id === Number(productId));
    setProduct(foundProduct);
    setIsLoading(false); // Set loading to false when product found
  }, [allProducts, productId]);

  if (isLoading) return <div>Loading product...</div>; // Display loading message

  if (!product) return <div>Product not found.</div>; // Handle missing product

  return (
    <div className="product_container">
      <BreadCrum product={product} categoryPath={`/${product.category}`} />
      <ProductDisplay product={product} />
      <Description />
      <RelatedProduct />
    </div>
  );
};

export default Product
