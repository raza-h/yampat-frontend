import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'; // You may need to import these icons from your icon library
// import Lock from '../pictures/lock.png'

function PasswordInputGroup(props) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const callTwoFunctions=(e)=>
  {
    setPassword(e.target.value);
    props.handleChange(e)


  }

  return (
    <div className="w-3/12 md:w-[410px] relative rounded-md shadow-sm">
      <span className="absolute inset-y-0 left-0 pl-5 flex items-center">
        {/* <img src={Lock}/> */}
      </span>
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        name='password'
        onChange={callTwoFunctions}
        // onChange={props.handleChange}
        className="w-full pl-6 py-4 border border-gray-300 rounded-md"
        placeholder={props.value}
      />
      <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
        {showPassword ? (
          <EyeOffIcon
            className="h-5 w-5 text-gray-400 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <EyeIcon
            className="h-5 w-5 text-gray-400 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        )}
      </span>
    </div>
  );
}

export default PasswordInputGroup;
