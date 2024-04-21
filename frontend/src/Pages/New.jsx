import React, { useEffect, useState } from 'react'
import './New.css'
import Item from '../Components/Item/Item'
const New = (props) => {
  const [newcollection, setNewCollection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollection')
    .then((response)=>response.json())
    .then((data)=>setNewCollection(data));
  },[]);
  return (
    <div className='newcollection'>
        <img className='shopcategory-banner' src={props.banner} alt='' />
        <p>New</p>
      <p className='best_selle-para'><b><i> Collections</i></b></p>
        <div className="collections">
            {newcollection.map((item,i) => {
                return <Item
                key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                new_price={item.new_price} 
                old_price={item.old_price} />
            })}
        </div>
      
    </div>
  )
}

export default New
