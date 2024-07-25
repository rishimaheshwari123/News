import React from 'react'
import banner from "../../../assest/banner.png"

function BannerImage() {
  return (

    <div className=' w-11/12 mx-auto lg:h-[80vh]'>
        <img src={banner} alt="" className=' h-full mx-auto' />
    </div>
  )
}

export default BannerImage