import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";


function Breaking() {
  const [openCreate, setCreate] = useState(false);
  const [openModal, setModal] = useState(false);




  return (
    <div className=" w-11/12  mx-auto p-4 ">
      {/* Container  */}
      <div>
        <div className=" text-center text-2xl font-semibold  underline ">
          <h4>Breaking News</h4>
        </div>
 
<div className=" flex justify-end ">
  <button className=" p-2 bg-blue-950 text-white rounded-lg flex items-center gap-4  " onClick={()=>setCreate(!openCreate)}> <FaPlusCircle />  Create Breaking</button>
</div>
    {/* Create Breaking */}

    <div>

    </div>


      </div>





    </div>
  );
}

export default Breaking;
