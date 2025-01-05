import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png';
function Home() {
  return (
   <div className='home'>
   <Navbar></Navbar>
   <div className='hero'>
    <img src={hero_banner}  className ='banner-img' alt="" />
    <div className="hero-caption">
      <img src={hero_title}   className='caption-img' alt="" />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, magnam temporibus fuga dicta accusamus sit inventore.</p>
    
    </div>
   </div>

   </div>

  )
}

export default Home