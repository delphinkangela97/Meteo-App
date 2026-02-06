import React, { useState } from 'react'

const SearchBar = () =>{
  const[city, setCity] = useState("");

  return <form className='flex'>
    <input type='text' placeholder='Enter city name' value={city} onChange={(e)=>setCity(e.target.value)}
    className='flex-1 p-2 border-gray-300 rounded-l-lg outline-none bg-black/90 border-r-0'/>
    <button className='bg-blue-500 border cursor-pointer p-2 hover:bg-blue-600 border-1-0 rounded-r-lg'  type='submit'>Search</button>
  </form>
   
}

export default SearchBar