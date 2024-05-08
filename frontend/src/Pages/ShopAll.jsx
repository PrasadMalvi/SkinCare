import React, { useContext } from 'react'
import Item from '../Components/Item/Item';
import { Context } from '../Context/Context';
import './ShopAll.css'

function ShopAll(props) {
    const {allProducts} = useContext(Context);
  return (  
    <div className='shopcategory'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
            <div className="shopcategory-products">
                {allProducts.map((item, i) =>{
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
    </div>
  )
}

export default ShopAll