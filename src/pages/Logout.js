import React from "react";
import { supabase } from '../client';
export default function () {
  async function handleLogout(){
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.replace("/login");
  }

  const goToHome=()=>
  {
    window.location.replace("/files")
  }
  return (
    // <div className="flex justify-center">
    //   <button className="bg-red-500 p-4 mt-5" onClick={handleLogout}>
    //     Logout
    //   </button>
    // </div>
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-xs max-h-full text-center">
      <div className="mb-4">
        <h1 className="text-lg font-bold text-gray-900 mb-4">Logout</h1>
        <p className="text-sm text-gray-600">
          After logging out of your account, you will not be able to access the Dashboard, Earnings, and Reports.
        </p>
      </div>
      <div className="flex justify-between">
        <button onClick={goToHome} className="bg-white text-gray-800 rounded border border-gray-400 py-2 px-4 hover:bg-gray-100">
          Cancel
        </button>
        <button onClick={handleLogout} className="bg-red-500 text-white rounded py-2 px-4 hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  </div>
  );
}
