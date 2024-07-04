import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Categorycard from '../../home/Categorycard'

function Category() {
    const{category} = useSelector(state=>state.news)

    useEffect(()=>{
        console.log(category)
    },[])
  return (
  <div className=' lg:w-11/12 mx-auto'>

<div className='main grid grid-cols-1 md:grid-cols-3   max-w-[1500px] mx-auto px-5 lg:pl-6'>
    {/* cards */}
        <div className='col-span-1 md:col-span-2  '>
        {
       
            category?.map((cate)=>(
             
                    <div key={cate?._id} className=' '>
                    <Categorycard category={cate} />
                </div>
            
            ))
        }

        </div>


        <div className='col-span-1 md:col-span-1 '>

        </div>

    </div>
  </div>
  )
}

export default Category