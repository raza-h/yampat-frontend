// Upload.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../pictures/logo.png";
import Line from "../pictures/Line2.png";
import PizZip from "pizzip";

import Docxtemplater from "docxtemplater";

import Arrow from "../pictures/Arrow.png";
import axios from "axios";
import { supabase } from "../client";
import { extractJSONObjectFromString } from "../utils/stringToJson";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();
  const [wordCount, setWordCount] = useState(0);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [submission, setSubmission] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        setSubmission(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("num of words", wordCount);
  }, [wordCount]);

  const handleFileChange1 = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      countWordsInDocx(selectedFile);
    }
  };

  const getData = async () => {
    const user = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("feedback")
      .select()
      .eq("id", user?.data?.user?.id);

    if (data) {
      const updatedData = data.map((obj) => {
        const feedback = extractJSONObjectFromString(obj?.feedback);
        const marks = feedback?.Marks;
        return { ...obj, marks }; // Add marks property to the object
      });
      return updatedData;
    }
  };

  const countWordsInDocx = (file) => {
    try {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;

        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip);

        const text = doc.getFullText();

        setText(text);

        // Split the text into words and count them
        const words = text.split(/\s+/);
        setWordCount(words.length);
      };

      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error counting words:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const goToHome=()=>
  {
    window.location.replace("/files")
  }
  const handleUpload = async () => {
    if (selectedFile) {
      // Store file information in localStorage
      localStorage.setItem("fileName", encodeURIComponent(selectedFile.name));
      localStorage.setItem("fileSize", encodeURIComponent(selectedFile.size));
      localStorage.setItem("wordCount", encodeURIComponent(wordCount));
      localStorage.setItem("text", text);
      //   localStorage.setItem('fileSize', encodeURIComponent(selectedFile.size));

      const user = await supabase.auth.getUser();
      console.log("user", user?.data?.user?.id);

      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);

      axios
        .post("https://guarded-walk.railway.app/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          // Handle successful upload response

          console.log("File uploaded successfully:", response.data);

          const filename = user?.data?.user?.id + "/" + selectedFile.name;

          const { data, error } = await supabase.storage
            .from("files")
            .upload(filename, selectedFile, {
              cacheControl: "3600",
              upsert: true,
            });

          console.log(data, error);

          // Redirect to the FileInfo page
          window.location.replace("/file-info");
        })
        .catch((error) => {
          // Handle upload error
          console.error("Error uploading file:", error);
        });
    } else {
      console.log("No file selected.");
    }
  };

  const runTwoFunction = (event) => {
    handleFileChange1(event);
    handleFileChange(event);
  };
  const toLogout = () => {
    window.location.replace("/logout");
  };

  return (
    <div className="w-full flex flex-col bg-background">
      <div className="flex justify-between">
        <div>
          <img onClick={goToHome} className="ml-7" src={Logo} />
        </div>
        {/* <button onClick={toLogout} className='bg-Blue1 px-4 py-2 rounded-md mt-5 h-full '>
        Logout
      </button> */}
      </div>

      <div className="font-inter h-full min-h-screen w-full flex justify-around mt-20">
        <div className="w-1/2 overflow-y-auto flex flex-col">
          <div className="flex justify-center text-lg md:text-2xl font-bold">
            Previous Submissions
          </div>
          <div className="ml-10 flex justify-around font-bold mt-10">
            <div className="text-md md:text-lg">Paper Title</div>
            <div className="text-md md:text-lg">Marks obtained</div>
          </div>
          {submission.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-around my-3 text-Blue1">
                <div>{item.document}</div>
                <div>{item.marks}</div>
              </div>
              {index !== submission.length - 1 && (
                <div className="flex justify-center">
                  <img src={Line} alt={`line-${index}`} />
                </div>
              )}
            </React.Fragment>
          ))}
          {/* <div className="flex justify-around my-3 text-Blue1">
            <div>File1.docx</div>
            <div>80</div>
          </div>
          <div className="flex justify-center ">
            <img src={Line} />
          </div>
          <div className="flex justify-around my-3 text-Blue1">
            <div>File2.docx</div>
            <div>90</div>
          </div>
          <div className="flex justify-center">
            <img src={Line} />
          </div>
          <div className="flex justify-around my-3 text-Blue1">
            <div>File3.docx</div>
            <div>50</div>
          </div>
          <div className="flex justify-center">
            <img src={Line} />
          </div>
          <div className="flex justify-around my-3 text-Blue1">
            <div>File4.docx</div>
            <div>80</div>
          </div>
          <div className="flex justify-center">
            <img src={Line} />
          </div>
          <div className="flex justify-around my-3 text-Blue1">
            <div>File5.docx</div>
            <div>80</div>
          </div> */}
        </div>

        <div className="w-1/3 flex flex-col">
          <div className="flex justify-center text-lg md:text-2xl font-bold">
            Upload Submissions
          </div>
          <div className=" mt-10 h-1/4 md:h-2/5 w-3/4 md:w-11/12 flex flex-col justify-around border border-dashed border-Blue3 p-4">
            <div></div>
            <div className="flex justify-center text-Gray1 text-sm md:text-lg font-semibold">
              Drag or select file to upload
            </div>
            <div className="flex justify-center">
              <input
                className="ml-1 md:ml-20"
                type="file"
                accept=".docx"
                onChange={runTwoFunction}
              />
            </div>
            <div></div>
            {/* <div className='flex justify-center'>
              <button className='bg-Blue1 text-white px-9 rounded-md py-3'>
                Select file
              </button>
            </div> */}
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="flex justify-between py-1 md:py-3 px-1 md:px-10 bg-Blue1 text-white"
              onClick={handleUpload}
            >
              <div></div>
              <div>Upload Document</div>
              <div></div>
              <div className="ml-3">
                <img src={Arrow} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
