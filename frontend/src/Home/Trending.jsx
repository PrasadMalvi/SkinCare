import React, { useEffect, useState } from 'react';
import './Trending.css';
import Item from '../Components/Item/Item';

const Trending = () => {
  const [newcollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollection')
      .then((response) => response.json())
      .then((data) => setNewCollection(data.reverse().slice(0, 4))); // Reverse the array and take the first 4 items
  }, []);

  return (
    <div className='trending-section'>
      <p>DON'T MISS OUT</p>
      <p className='best_selle-para'><b>Now</b><i> Trending</i></p>
      <div className="trending-section-product">
        {newcollection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default Trending;
