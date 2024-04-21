import React from 'react'
import HeroSec from './HeroSec'
import IdxBestSeller from './IdxBestSeller'
import IdxShopLips from './IdxShopLips'
import Trending from './Trending'
import Discovermode from './Discovermode'

const Index = () => {
  return (
    <div className="container">
      <HeroSec />
      <IdxBestSeller />
      <IdxShopLips />
      <Trending />
      <Discovermode />
    </div>
  )
}

export default Index
