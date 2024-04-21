import React  from 'react'
import './Discovermode.css'
const Discovermode = () =>{
    const discProduct = [
        { id: 1, image: require('../Components/Assets/disc1.webp'), name: 'EYE' , link: '/eye'},
        { id: 2, image: require('../Components/Assets/disc2.webp'), name: 'FACE', link: '/face'},
        { id: 3, image: require('../Components/Assets/disc3.webp'), name: 'LIPS', link: '/lips'},
    ]
  return (
    <div className='discover'>
        <h2><b>Discover</b><i> More</i></h2>
        <div className='discover-content'>
        {discProduct.map((discProduct) => (
          <div key={discProduct.id} className='disc'>
            <img src={discProduct.image} className='disc-img' alt={discProduct.name} />
            <a href={discProduct.link}><p className='disc-name'>{discProduct.name}</p></a>
          </div>
        ))}
        </div>
        <div className='disc-blank'>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className='form'>
                <form className='disc-cont'>
                    <h2>Are you on the list?</h2>
                    <h3>Join to get exclusive offers & discounts</h3>
                    <input type='email' placeholder='   Enter your email here' className='disc-input' />
                    <button type='submit' className='btn'><b>JOIN</b></button>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Discovermode