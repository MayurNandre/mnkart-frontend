import React from 'react'
import ListOfCategory from '../Components/ListOfCategory'
import BannerProduct from '../Components/BannerProduct'
import HorizontalCardProduct from '../Components/HorizontalCardProduct'
import VerticalCardProduct from '../Components/VerticalCardProduct'

const Home = () => {
  return (
    <div className=''>
      <ListOfCategory />
      <BannerProduct/>

      <HorizontalCardProduct heading={"Top Airpode's"} category={"airpodes"}/>
      <HorizontalCardProduct heading={"Popular watches"} category={"watches"}/>

      <VerticalCardProduct heading={"Mobile's"} category={"mobile"}/>
      <VerticalCardProduct heading={"Mouse's"} category={"mouse"}/>
      <VerticalCardProduct heading={"Televisons's"} category={"televisons"}/>
      <VerticalCardProduct heading={"Camera's and photography"} category={"camera"}/>
      <VerticalCardProduct heading={"Wired earphones"} category={"earphones"}/>
      <VerticalCardProduct heading={"Speakers"} category={"speakers"}/>
      <VerticalCardProduct heading={"refrigerator's"} category={"refrigerator"}/>
      <VerticalCardProduct heading={"trimmers's"} category={"trimmers"}/>
      <VerticalCardProduct heading={"printers's"} category={"printers"}/>
      <VerticalCardProduct heading={"processor's"} category={"processor"}/>
    </div>
  )
}

export default Home
