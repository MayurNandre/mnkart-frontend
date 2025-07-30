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

      <HorizontalCardProduct heading={"Top Airpodes"} category={"airpodes"}/>
      <HorizontalCardProduct heading={"Popular watches"} category={"watches"}/>

      <VerticalCardProduct heading={"Mobiles"} category={"mobile"}/>
      <VerticalCardProduct heading={"Mouse"} category={"mouse"}/>
      <VerticalCardProduct heading={"Televisions"} category={"televisons"}/>
      <VerticalCardProduct heading={"Camera and photography"} category={"camera"}/>
      <VerticalCardProduct heading={"Wired earphones"} category={"earphones"}/>
      <VerticalCardProduct heading={"Speakers"} category={"speakers"}/>
      <VerticalCardProduct heading={"Refrigerators"} category={"refrigerator"}/>
      <VerticalCardProduct heading={"Trimmers"} category={"trimmers"}/>
      <VerticalCardProduct heading={"Printers"} category={"printers"}/>
      <VerticalCardProduct heading={"Processors"} category={"processor"}/>
    </div>
  )
}

export default Home
