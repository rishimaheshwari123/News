import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Categorycard from '../../home/Categorycard'

function Category() {
    const{category} = useSelector(state=>state.news)

    useEffect(()=>{
        console.log(category)
    },[])
  return (
    <div>
    {/* cards */}
        <div>
        {
            category && 
            category?.map((cate)=>{
                if(cate?.active){
                    <div key={cate?._id}>
                    <Categorycard category={cate} />
                </div>
                }
            })
        }

        </div>


        <div>

        </div>

    </div>
  )
}

export default Category