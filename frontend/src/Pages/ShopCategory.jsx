import React, {useContext} from 'react'
import './ShopCategory.css';
import { Context } from '../Context/Context';
import Item from '../Components/Item/Item';


const  ShopCategory = (props) => {
    
    const {allProducts} = useContext(Context);
  return (  
    <div className='shopcategory'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <p className='show'>
            <span>Showing 1 - 12</span> out of 49
        </p>
        <div className='shopcategory-sort'>
            Sort by <i className="fa-solid fa-caret-down"></i>
        </div>
        <div className="shopcategory-indexSort">
            <div className="shopcategory-products">
                {allProducts.map((item, i) =>{
                    if(props.category === item.category)
                    {
                    return <Item
                    key={i} 
                    id={item.id} 
                    name={item.name} 
                    image={item.image} 
                    new_price={item.new_price} 
                    old_price={item.old_price} />
                    }else{
                        return null;
                    }
                })}
            </div>
        </div>
    </div>
  )
}

export default ShopCategory