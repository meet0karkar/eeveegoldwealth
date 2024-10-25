'use client'
import React, { useState } from 'react'

const page = () => {
    const [blog,setblog]= useState([]);
    const [title,settitle] = useState('');
    const [desc,setdesc] = useState('');
    const [img,setimg] = useState('');
    const addblog = () =>{
        var allblogs = [...blog]
        var newblog = {
            "title":title,
            "desc":desc
        }
        // allblogs.push(newblog);
        setblog(allblogs)
        localStorage.setItem("blogs", JSON.stringify(allblogs));

    }
  return (
    <div>
      <form action="" method='post' onSubmit={() => addblog()}>
        <input type="text" name='title' placeholder='Enter Title' onChange={(e)=>settitle(e.target.value)} className='my-1 px-2 py-1 border border-2 rounded-sm border-black' /><br/>
        <input type="text" name='desc' placeholder='description' onChange={(e)=>setdesc(e.target.value)} className='my-1 px-2 py-1 border border-2 rounded-sm border-black'/><br/>
        {/* <input type="file" name='desc' className='my-1 px-2 py-1 border border-2 rounded-sm border-black' /><br/> */}
        <input type="submit" value="Add" className='my-1 px-2 py-1 border border-2 rounded-sm border-black'/>
      </form>
    </div>
  )
}

export default page
