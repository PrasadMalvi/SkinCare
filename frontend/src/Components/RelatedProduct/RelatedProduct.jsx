import React, { useEffect, useRef, useState } from 'react';
import './RelatedProduct.css';
import Item from '../Item/Item';

const RelatedProduct = () => {
  const [newcollection, setNewCollection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollection')
    .then((response)=>response.json())
    .then((data)=>setNewCollection(data));
  },[]);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 300; // Adjust scroll distance as needed
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300; // Adjust scroll distance as needed
    }
  };

  return (
    <div className='relatedproduct'>
      <h1>Related Products</h1>
      <div className='relatedproduct-items' ref={scrollRef}>
        {newcollection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
      <div className="scroll-arrows">
        <button className="scroll-arrow left" onClick={scrollLeft}>◀</button>
        <button className="scroll-arrow right" onClick={scrollRight}>▶</button>
      </div>
    </div>
  );
};

export default RelatedProduct;
