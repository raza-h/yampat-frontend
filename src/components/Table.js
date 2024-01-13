import React, { useEffect, useState } from "react";
import { supabase } from "../client";

// const data = [
//   {
//     title: "ABC sample filename.docx",
//     author: "Abc name",
//     fileSize: "325 KB",
//     uploadTime: "Aug 12, 5:40 PM",
//     pages: "8 pages",
//   },
//   {
//     title: "ABC sample filename.docx",
//     author: "Abc name",
//     fileSize: "325 KB",
//     uploadTime: "Aug 12, 5:40 PM",
//     pages: "8 pages",
//   },
//   {
//     title: "ABC sample filename.docx",
//     author: "Abc name",
//     fileSize: "325 KB",
//     uploadTime: "Aug 12, 5:40 PM",
//     pages: "8 pages",
//   },
//   {
//     title: "ABC sample filename.docx",
//     author: "Abc name",
//     fileSize: "325 KB",
//     uploadTime: "Aug 12, 5:40 PM",
//     pages: "8 pages",
//   },

//   // Add more data objects here as needed
// ];

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const file = await getFiles();
      if (file) {
        setData(file);
      }
    };

    fetchData();
  }, []);

  const getFiles = async () => {
    const user = await supabase.auth.getUser();
    console.log("user", user?.data?.user?.id);

    const { data, error } = await supabase.storage
      .from("files")
      .list(user?.data?.user?.id, {
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    console.log(data);

    const formattedFiles = data?.map((obj) => {
      const formattedDate = new Date(obj?.updated_at);
      const formattedTime = formattedDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return (
          parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
        );
      }

      const formattedSize = formatBytes(obj?.metadata?.size);

      return {
        ...obj,
        time: formattedTime,
        size: formattedSize,
      };
    });

    return formattedFiles;
  };

  return (
    <div className="w-full md:w-[77vw] mx-auto font-inter bg-background overflow-y-auto">
      <div className="px-10 md:px-0">
        <div className="container mx-auto h-[55vh] my-8 pt-7 pb-20 px-10 bg-background rounded-lg border border-Gray4 overflow-x-auto">
          <table className="min-w-full table-auto text-xs md:text-sm bg-background">
            {" "}
            {/* min-w-full for full width on small screens */}
            <thead>
              <tr>
                <th className=" px-6 py-3 text-left">Paper Title</th>
                {/* <th className="px-6 py-3 text-left">Author</th> */}
                <th className="px-6 py-3 text-left">File Size</th>
                <th className="px-6 py-3 text-left">Upload Time</th>
                {/* <th className="px-6 py-3 text-left">Pages</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-Blue1">
                    {item?.name || "------"}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {item?.author || "------"}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.size || "------"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.time || "------"}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {item?.pages || "------"}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
