import React from 'react'
// import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'


function Github() {
    const Data = useLoaderData()
    // const [Data, setData] = useState([]);
    // useEffect(() => { 
    //     fetch('https://api.github.com/users/hiteshchoudhary')
    //      .then(response => response.json())
    //      .then(data => setData(data))
    //      console.log(Data);
   
    // }, []);
  return (
    <>
    <div className='text-center m-4 bg-gray-500 text-white p-4 text-3xl'>Github Followers: {Data.followers}</div>
    <img src={Data.avatar_url} alt="Github Profile Photo" width={300}/>
    </>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/Me-priyank')
    return response.json()
}