// FileInfo.js
//hello
import React, { useEffect } from 'react';
import Logo from '../pictures/logo.png';
import { useLocation } from 'react-router-dom';
import Rectangle from '../pictures/Rectangle.png'

export default function FileInfo() {
  const fileName = localStorage.getItem('fileName');
  const fileSize = localStorage.getItem('fileSize');
  const wordCount=localStorage.getItem('wordCount')
  // Check if location or state is undefined

  const goToUpload=()=>
  {
    window.location.replace("/upload")
  }
  const goToHome=()=>
  {
    window.location.replace("/files")
  }
  const goToMarks=()=>
  {
    window.location.replace("/marks")
  }
  
  useEffect(() => {
    console.log(fileName,fileSize)
  
  }, [] );
  // Destructure state directly to avoid potential errors
  

  return (
    <div className='flex font-inter flex-col bg-background min-h-screen h-full w-full'>
      <div>
      <img onClick={goToHome} className='ml-7' src={Logo}/>
      </div>
      <div className='flex justify-center font-bold text-3xl'>
        Confirm Submission

      </div>

      <div className='flex justify-center mt-10 font-semibold'>
        Please confirm that this is the file you want to submit

      </div>

     <div className='flex justify-center mt-20'>
     <div className='border p-20 border-Gray2 w-[70vw] md:w-[30vw] h-[35vh] rounded-md flex flex-col justify-around'>
      <div className='ml-8 flex space-x-4 '>
        <div className='font-bold'>
          File Name:
        </div>
        <div>
        {decodeURIComponent(fileName)}
        </div>

      </div>
      <div className='ml-8 flex space-x-4 mt-10 '>
        <div className='font-bold'>
          File Size:
        </div>
        <div>
        {decodeURIComponent(fileSize)} bytes
        </div>

      </div>
      <div className='ml-8  flex space-x-4 mt-10'>
        <div className='font-bold'>
          Word Count:
        </div>
        <div>
        {decodeURIComponent(wordCount)} words
        </div>

      </div>
      
        
        
        </div>

      
     </div>
     <div className='flex justify-center mt-14 font-semibold'>
          <button onClick={goToUpload} className='bg-Gray3 py-3 px-10 rounded-md'>
            Cancel

          </button>
          <button onClick={goToMarks} className='ml-5 bg-Blue1 py-3 px-10 text-white rounded-md'>
            Confirm
          </button>

        </div>
      
      {/* <h1>File Information</h1>
      <p>File Name: {decodeURIComponent(fileName)}</p>
      <p>File Size: {decodeURIComponent(fileSize)} bytes</p>
      <p>Word Count: {decodeURIComponent(wordCount)} words</p> */}
      {/* Add more information as needed */}
    </div>
  );
}
