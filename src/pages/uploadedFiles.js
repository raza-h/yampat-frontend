import React, { useEffect } from "react";
import { useState } from "react";
import Logo from "../pictures/logo.png";
import Line3 from "../pictures/Line3.png";
import Table from "../components/Table";
import { supabase } from "../client";

export default function UploadedFiles() {
  // const [files, setFiles] = useState([
  //   {
  //     title: "ABCFilename1",
  //     fileSize: "300kB",
  //     uploadTime: "Aug 12, 5:40 PM",
  //     Author: "Abc name",
  //     pages: "8",
  //   },
  //   {
  //     title: "ABCFilename2",
  //     fileSize: "300kB",
  //     uploadTime: "Aug 12, 5:40 PM",
  //     Author: "Abc name",
  //     pages: "8",
  //   },
  //   {
  //     title: "ABCFilename3",
  //     fileSize: "300kB",
  //     uploadTime: "Aug 12, 5:40 PM",
  //     Author: "Abc name",
  //     pages: "8",
  //   },
  //   {
  //     title: "ABCFilename4",
  //     fileSize: "300kB",
  //     uploadTime: "Aug 12, 5:40 PM",
  //     Author: "Abc name",
  //     pages: "8",
  //   },
  // ]);
  const [files, setFiles] = useState([]);


  const goToUpload=()=>
  {
    window.location.replace("/upload")
  }
  const goToLogout=()=>
  {
    window.location.replace("/logout")
  }

  

  return (
    <div className="flex flex-col bg-background w-full h-full min-h-screen font-inter">
      <div className="flex justify-between">
      <div className="ml-7">
        <img src={Logo} />
      </div>
      <div className="mt-5 mr-6">
      <button onClick={goToLogout} className="bg-Blue1 text-white text-xs md:text-base py-1 px-4 rounded-md">
              logout
            </button> 
      </div>
      </div>
      <div className="flex justify-center text-3xl font-bold mt-4">
        Uploaded Documents
      </div>
      {/* <div className='w-full flex h-full justify-center mt-10'>
            <div className='w-[73vw] rounded-md h-[70vh] border border-Gray4'>

            </div>


        </div> */}

      <div className="flex justify-center mt-7">
        <div className="w-[73vw]">
          <div className="flex justify-between">
            <div></div>
            <button onClick={goToUpload} className="bg-Blue1 text-white text-xs md:text-base py-1 md:py-3 px-4 md:px-8 rounded-md">
              New Upload
            </button> 
          </div>
        </div>
      </div>

      <div className="mt-0">
        <Table files={files} />
      </div>
    </div>
  );
}
