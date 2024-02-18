"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios';
const page = () => {
  const[loading,setLoading]=useState(false);
  const [Image,setImage]= useState<File | null>(null);
  const [images,setImages]=useState<{image_url:string;public_id:string;id:string}[]>([]);

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files){
      setImage(e.target.files[0])
    }
  }
  const FetchAllImage =async()=>{
    try {
      const {data:{images}} = await axios.get("/api/upload-image");
      setImages(images);
    } catch (error:any) {
      console.log(error.message)
    }
  }
  const onSubmitHandler = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      if(!Image){
        return
      }
      const formData =new FormData();
      formData.append("image",Image);
      const response=await axios.post("/api/upload-image",formData);
      const data=await response.data;
      await FetchAllImage();
      
    } catch (error:any) {
      console.log("Error",error.message);
    }
  }
  const deleteImage = async(e:string)=>{
    try {
      const {data}=await axios.delete("/api/upload-image/"+e.replace("nextjs-image-gallery/",""));
      await FetchAllImage();
      console.log({data})
      
    } catch (error:any) {
      console.log("Error",error.message);
    }
  }
  useEffect(()=>{
    FetchAllImage();
  },[])
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='w-1/2 mx-auto py-10' action="">
        <input onChange={onChangeHandler} type='file' name='' id=''  />
        <button className='bg-black px-4 py-2 rounded-sm text-white'>Upload</button>
      </form>
      <div className="px-10 flex flex-wrap gap-x-5">
        {images.map((cur,i)=>{
          return(
            <div key={i} className="lg:w-1/4 md:w-1/2 p-4 w-full">

            <a  className="block relative h-48 rounded overflow-hidden">
              <img
                alt='ecommerce'
                className='object-cover object-center w-full h-full block'
                src={cur.image_url}
              />
            </a>
            <div className='mt-4'>
              <button
              disabled={loading}
               onClick={()=>deleteImage(cur.public_id)} className='bg-black text-white rounded-sm px-5 py-2 disabled:bg-gray-400'>
                {loading?"loading...":"Delete"}
              </button>

            </div>
            </div>

          )
        })

        }
      </div>
    </div>
  )
}

export default page