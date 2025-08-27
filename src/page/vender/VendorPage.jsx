import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import API from '../../API/Api';

function VendorPage() {
  const [vendor,setvendor]=useState();
  const getallvendor = async () => {
    try {
      const res = await API.get("/allvendor");
      setvendor(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getallvendor();
  }, []);
  return (
    <>
        <Link to="/admin/register"><button className='bg-green-500 text-white text-xl font-semibold py-2 px-3 rounded-lg hover:cursor-pointer hover:bg-green-700 flex items-center gap-2'>
           <FaPlus /> ADD VENDOR
        </button></Link>
        
    </>
  )
}

export default VendorPage